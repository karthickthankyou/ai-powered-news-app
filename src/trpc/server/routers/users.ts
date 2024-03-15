import { createTRPCRouter, protectedProcedure } from '..'

export const userRoutes = createTRPCRouter({
  dashboard: protectedProcedure().query(async ({ ctx }) => {
    const [balance, editors] = await Promise.all([
      ctx.db.creditBalance.findUnique({ where: { userId: ctx.userId } }),
      ctx.db.editor.count({ where: { userId: ctx.userId } }),
    ])

    return { balance: balance?.balance || 0, editors }
  }),
  findAll: protectedProcedure('admin').query(({ ctx }) => {
    return ctx.db.user.findMany()
  }),
})
