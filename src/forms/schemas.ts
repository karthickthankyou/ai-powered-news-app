import { FeedbackType } from '@prisma/client'
import { z } from 'zod'

export const schemaCreateArticle = z.object({
  title: z.string(),
  body: z.string(),
  published: z.boolean(),
  tags: z.array(z.string()),
})

export const schemaUpdateArticle = z.object({
  articleId: z.number(),
  published: z.boolean(),
})

export const schemaGiveFeedback = z.object({
  articleId: z.number(),
  type: z.nativeEnum(FeedbackType),
})

export const schemaNumberID = z.object({
  id: z.number(),
})
