import { Index, Pinecone, RecordMetadata } from '@pinecone-database/pinecone'
import { INDEX_NAME } from './constants'
import { TRPCError } from '@trpc/server'

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
