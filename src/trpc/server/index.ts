import { auth } from '@clerk/nextjs'
import { initTRPC } from '@trpc/server'
import { prisma } from '@/db'

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
