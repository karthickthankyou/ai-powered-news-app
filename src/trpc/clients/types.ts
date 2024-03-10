import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { AppRouter } from '../server/routers'

export type RouterOutputs = inferRouterOutputs<AppRouter>
export type RouterInputs = inferRouterInputs<AppRouter>
