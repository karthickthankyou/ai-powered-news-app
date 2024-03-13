import { Index, Pinecone, RecordMetadata } from '@pinecone-database/pinecone'
import { INDEX_NAME } from './constants'
import { TRPCError } from '@trpc/server'
import { RouterOutputs } from '@/trpc/clients/types'

export class AIService {
  private readonly pineconeIndex: Index<RecordMetadata>

  constructor() {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || '',
    })
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
