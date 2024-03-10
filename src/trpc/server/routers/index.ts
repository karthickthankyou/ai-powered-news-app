import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'

export const appRouter = createTRPCRouter({
  users: protectedProcedure('admin', 'reporter').query(({ ctx }) => {
    return ctx.db.user.findMany()
  }),
})

export type AppRouter = typeof appRouter
