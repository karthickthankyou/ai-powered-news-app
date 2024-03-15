import { schemaCreateUser } from '@/forms/createUser'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { TRPCError } from '@trpc/server'

export const adminRoutes = createTRPCRouter({
  adminMe: protectedProcedure().query(({ ctx }) => {
    return ctx.db.admin.findUnique({
      where: { id: ctx.userId },
      include: { User: true },
    })
  }),
  findAll: protectedProcedure('admin').query(({ ctx }) => {
    return ctx.db.admin.findMany({ include: { User: true } })
  }),
  delete: protectedProcedure('admin')
    .input(schemaCreateUser)
    .mutation(({ ctx, input }) => {
      return ctx.db.admin.delete({ where: { id: input.id } })
    }),
  create: protectedProcedure('admin')
    .input(schemaCreateUser)
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.db.admin.findUnique({ where: input })
      console.log('admin', admin)
      if (admin) {
        return new TRPCError({
          code: 'BAD_REQUEST',
          message: 'The user is already an admin.',
        })
      }
      return ctx.db.admin.create({ data: input })
    }),
  dashboard: protectedProcedure('admin').query(async ({ ctx }) => {
    const [admin, reporter, editor, article, user] = await Promise.all([
      ctx.db.admin.count(),
      ctx.db.reporter.count(),
      ctx.db.editor.count(),
      ctx.db.article.count(),
      ctx.db.user.count(),
    ])

    return { admin, reporter, editor, article, user }
  }),
})
