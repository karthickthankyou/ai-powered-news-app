import { auth } from '@clerk/nextjs'
import { TRPCError, initTRPC } from '@trpc/server'
import { prisma } from '@/db'
import { Role } from '@/util/types'
import { authorizeUser } from './util'

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = auth()

  // Todo: Add ai to the ctx.

  return {
    db: prisma,
    session,
    ...opts,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create()

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = (...roles: Role[]) =>
  t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Sign in to access this data.',
      })
    }

    await authorizeUser(ctx.session.userId, roles)

    return next({ ctx: { ...ctx, userId: ctx.session.userId } })
  })
