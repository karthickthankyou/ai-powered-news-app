import { cn } from '@/util/styles'
import { BaseComponent } from '@/util/types'
import { ReactNode } from 'react'

export const Title = ({ children, className }: BaseComponent) => {
  return (
    <div className={cn('text-xl font-semibold capitalize mb-2', className)}>
      {children}
    </div>
  )
}

export const Title2 = ({ children, className }: BaseComponent) => {
  return (
    <div className={cn('text-lg font-semibold capitalize mb-2', className)}>
      {children}
    </div>
  )
}
export const Title3 = ({ children, className }: BaseComponent) => {
  return (
    <div className={cn('font-semibold capitalize mb-2', className)}>
      {children}
    </div>
  )
}
export const Description = ({ children, className }: BaseComponent) => {
  return <div className={cn('text-gray-700', className)}>{children}</div>
}
