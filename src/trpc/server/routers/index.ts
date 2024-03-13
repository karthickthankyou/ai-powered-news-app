import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { adminRoutes } from './admins'
import { articlesRouter } from './articles'
import { creditBalanceRoutes } from './creditBalance'
import { feedbackRoutes } from './feedbacks'
import { reporterRoutes } from './reporters'
import { stripeRoutes } from './stripe'

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  reporters: reporterRoutes,
  articles: articlesRouter,
  feedbacks: feedbackRoutes,
  creditBalance: creditBalanceRoutes,
  stripe: stripeRoutes,
})

export type AppRouter = typeof appRouter
