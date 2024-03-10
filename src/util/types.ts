import { ReactNode } from 'react'

export type Role = 'admin' | 'reporter'

export type BaseComponent = {
  children?: ReactNode
  className?: string
}
