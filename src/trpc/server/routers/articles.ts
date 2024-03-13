import { schemaCreateArticle, schemaUpdateArticle } from '@/forms/schemas'
import { createTRPCRouter, protectedProcedure } from '..'

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
})
