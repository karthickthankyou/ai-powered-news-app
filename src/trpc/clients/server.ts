import 'server-only'

import { headers } from 'next/headers'
import { createTRPCContext } from '../server'
import { TRPCClientError, createTRPCProxyClient } from '@trpc/client'
import { AppRouter, appRouter } from '../server/routers'
import { type TRPCErrorResponse } from '@trpc/server/rpc'

import { observable } from '@trpc/server/observable'
import { callProcedure } from '@trpc/server'
import { cache } from 'react'

const createContext = cache(() => {
  const heads = new Headers(headers())
  heads.set('x-trpc-source', 'rsc')

  return createTRPCContext({ headers: heads })
})

export const trpcServer = createTRPCProxyClient<AppRouter>({
  links: [
    () =>
      ({ op: { input, path, type } }) =>
        observable((observer) => {
          createContext()
            .then((ctx) => {
              return callProcedure({
                ctx,
                path,
                type,
                rawInput: input,
                procedures: appRouter._def.procedures,
              })
            })
            .then((data) => {
              observer.next({ result: { data } })
              observer.complete()
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause))
            })
        }),
  ],
})
