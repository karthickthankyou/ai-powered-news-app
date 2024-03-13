import { createTRPCRouter, protectedProcedure } from '..'

export const creditBalanceRoutes = createTRPCRouter({
  myCreditBalance: protectedProcedure().query(({ ctx }) => {
    return ctx.db.creditBalance.findUnique({ where: { userId: ctx.userId } })
  }),
  myCreditTransactions: protectedProcedure().query(({ ctx }) => {
    return ctx.db.transaction.findMany({
      where: { userId: ctx.userId },
      orderBy: { createdAt: 'desc' },
    })
  }),
})
