import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { adminRoutes } from './admins'
import { articlesRouter } from './articles'
import { feedbackRoutes } from './feedbacks'
import { reporterRoutes } from './reporters'

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
  articles: articlesRouter,
  feedbacks: feedbackRoutes,
})

export type AppRouter = typeof appRouter
