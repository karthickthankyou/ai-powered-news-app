import { Index, Pinecone, RecordMetadata } from '@pinecone-database/pinecone'
import { INDEX_NAME } from './constants'
import { TRPCError } from '@trpc/server'
import { RouterOutputs } from '@/trpc/clients/types'
import { Article, Editor, FeedbackType } from '@prisma/client'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/db'
import {
  stylePrompts,
  verbosityPrompts,
  wordComplexityPrompts,
} from './prompts'
import { MessageParam } from '@anthropic-ai/sdk/resources/messages.mjs'

export class AIService {
  private readonly pineconeIndex: Index<RecordMetadata>
  private readonly anthropic: Anthropic

  constructor() {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || '',
    })
    this.anthropic = new Anthropic()
    // defaults to process.env["ANTHROPIC_API_KEY"]

    this.pineconeIndex = pinecone.Index(INDEX_NAME)
  }

  async addUser({ uid }: { uid: string }) {
    const values = await this.createEmbedding('default user')

    await this.pineconeIndex.upsert([
      {
        id: uid,
        values: values.data[0].embedding,
        metadata: {
          id: uid,
          type: 'user',
        },
      },
    ])
  }

  async upsertArticle(article: RouterOutputs['articles']['create']) {
    const combinedText = `${article.title} ${article.body} ${article.tags.join(
      ' ',
    )}`

    const values = await this.createEmbedding(combinedText)

    await this.pineconeIndex.upsert([
      {
        id: article.id.toString(),
        values: values.data[0].embedding,
        metadata: {
          ...article,
          type: 'article',
          summary: article.summary || '',
        },
      },
    ])
  }
  async updateArticle(articleId: number, published: boolean) {
    await this.pineconeIndex.update({
      id: articleId.toString(),
      metadata: { published },
    })
  }

  async userRecommendations({
    id,
  }: {
    id: string
  }): Promise<{ id: string; score: number }[]> {
    const { records } = await this.pineconeIndex.fetch([id])

    const userRecord = records[id]

    if (!userRecord?.values) {
      console.log('userRecord', userRecord)

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'User record not found',
      })
    }

    const queryResponse = await this.pineconeIndex.query({
      topK: 10,
      vector: userRecord.values,
      includeMetadata: false,
      includeValues: false,
      filter: { type: 'article', published: true },
    })

    return queryResponse.matches.map(({ id, score }) => ({
      id,
      score: score || 0,
    }))
  }

  async giveFeedback({
    uid,
    articleId,
    type,
  }: {
    uid: string
    articleId: number
    type: FeedbackType
  }) {
    const { records } = await this.pineconeIndex.fetch([
      uid,
      articleId.toString(),
    ])
    const userRecord = records[uid]
    const articleRecord = records[articleId.toString()]

    if (!userRecord || !articleRecord) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'User or article vector not found',
      })
    }

    const userVector = userRecord.values
    const articleVector = articleRecord.values

    const adjustmentScale = this.adjustmentScales[type]

    const newUserVector = userVector.map(
      (value, index) =>
        value + adjustmentScale * (articleVector[index] - value),
    )

    await this.pineconeIndex.upsert([{ id: uid, values: newUserVector }])
  }

  private adjustmentScales: { [key: string]: number } = {
    [FeedbackType.LOVE]: 0.3,
    [FeedbackType.LIKE]: 0.15,
    [FeedbackType.DISLIKE]: -0.15,
    [FeedbackType.HATE]: -0.3,
  }

  async writeEditorArticle(article: Article, editor: Editor, userId: string) {
    const messages: MessageParam[] = []

    messages.push({
      role: 'user',
      content: `
      Article title: ${article.title}
      Article body: ${article.body},

      style: ${editor.style}
      styleDescription: ${stylePrompts[editor.style]}

      verbosity: ${editor.verbosity}
      verbosityDescription: ${verbosityPrompts[editor.verbosity]}

      wordComplexity: ${editor.wordComplexity}
      wordComplexityDescription: ${wordComplexityPrompts[editor.wordComplexity]}

      language: Please use the language ${editor.language}

      ${editor.additionalNotes ? 'Additional notes: ' + editor.additionalNotes : null}

      `,
    })
    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        messages,
        max_tokens: 1000,
        system:
          'You are a news editor. Without any preamble or introduction, Rewrite the given article to suit the users requirements.',
      })

      // Todo: Update credit balance

      const { input_tokens: inputTokens, output_tokens: outputTokens } =
        response.usage
      const usage =
        (inputTokens * 3) / 1_000_000 + (outputTokens * 15) / 1_000_000
      await prisma.creditBalance.upsert({
        where: { userId },
        create: {
          balance: -usage,
          userId,
          Transactions: {
            create: {
              amount: -usage,
              inputTokens,
              outputTokens,
              userId,
              notes: `Rewrite article "${article.title}" with "${editor.name}".`,
            },
          },
        },
        update: {
          balance: { decrement: usage },
          Transactions: {
            create: {
              amount: -usage,
              inputTokens,
              outputTokens,
              userId,
              notes: `Rewrite article "${article.title}" with "${editor.name}".`,
            },
          },
        },
      })

      const rewrittenArticle = response.content[0].text

      const editorArticle = await prisma.editorArticle.create({
        data: {
          body: rewrittenArticle,
          title: article.title,
          editorId: editor.id,
          originalArticleId: article.id,
        },
        include: {
          Editor: true,
          OriginalArticle: true,
        },
      })
      return editorArticle
    } catch (error) {
      console.log('Error', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong.',
      })
    }
  }

  private createEmbedding(content: string) {
    const apiUrl = 'https://api.voyageai.com/v1/embeddings'
    const data = {
      input: content,
      model: 'voyage-2',
    }
    const voyageAIKey = process.env.VOYAGE_AI_KEY

    if (!voyageAIKey) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Voyage API Key is missing.',
      })
    }

    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${voyageAIKey}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((embeddings) => {
        return embeddings
      })
      .catch((error) => {
        console.error('Error fetching embeddings:', error)
      })
  }
}
