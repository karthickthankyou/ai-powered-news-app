import {
  schemaCreateArticle,
  schemaNumberID,
  schemaUpdateArticle,
} from '@/forms/schemas'
import { createTRPCRouter, protectedProcedure } from '..'
import { fetchAndScoreRelatedArticles } from './shared/articles'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const articlesRouter = createTRPCRouter({
  create: protectedProcedure('admin', 'reporter')
    .input(schemaCreateArticle)
    .mutation(async ({ ctx, input }) => {
      const summaryLength = 200
      const summary = input.body.substring(0, summaryLength)

      const article = await ctx.db.article.create({
        data: { ...input, summary, Reporter: { connect: { id: ctx.userId } } },
      })
      await ctx.ai.upsertArticle({
        ...article,
        createdAt: article.createdAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
      })
      return article
    }),
  findOne: protectedProcedure()
    .input(schemaNumberID)
    .query(async ({ ctx, input }) => {
      return ctx.db.article.findUnique({
        where: { id: input.id },
        include: { Reporter: { include: { User: true } } },
      })
    }),
  update: protectedProcedure('admin', 'reporter')
    .input(schemaUpdateArticle)
    .mutation(async ({ input: { articleId, published }, ctx }) => {
      const article = await ctx.db.article.update({
        data: { published },
        where: { id: articleId },
      })
      await ctx.ai.updateArticle(articleId, published)
      return article
    }),
  findAll: protectedProcedure('admin').query(({ ctx }) => {
    return ctx.db.article.findMany()
  }),

  userRecommendations: protectedProcedure().query(async ({ ctx }) => {
    const { ai, db, userId } = ctx
    return fetchAndScoreRelatedArticles({ ai, db, id: userId })
  }),
  moreLikeThis: protectedProcedure()
    .input(schemaNumberID)
    .query(async ({ ctx, input: { id } }) => {
      const { ai, db } = ctx
      return fetchAndScoreRelatedArticles({ ai, db, id: id.toString() })
    }),
  editorArticle: protectedProcedure()
    .input(schemaNumberID)
    .input(z.object({ editorId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id, editorId } = input

      const [article, editor] = await Promise.all([
        ctx.db.article.findUnique({
          where: { id },
        }),
        ctx.db.editor.findUnique({
          where: { id: editorId },
        }),
      ])

      if (!article) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Article not found.',
        })
      }

      if (!editor) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Editor not found.',
        })
      }

      const editorArticle = await ctx.db.editorArticle.findUnique({
        where: {
          editorId_originalArticleId: {
            editorId,
            originalArticleId: id,
          },
        },
        include: {
          OriginalArticle: true,
          Editor: true,
        },
      })
      if (editorArticle?.OriginalArticle) {
        return editorArticle
      } else {
        return ctx.ai.writeEditorArticle(article, editor, ctx.userId)
      }
    }),
})
