import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { adminRoutes } from './admins'
import { articlesRouter } from './articles'
import { reporterRoutes } from './reporters'

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
  articles: articlesRouter,
})

export type AppRouter = typeof appRouter
