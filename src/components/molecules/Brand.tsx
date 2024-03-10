import Link from 'next/link'

import { DeveloperInfo } from './DeveloperInfo'
import { cn } from '@/util/styles'

export interface IBrandProps {}

export const Brand = () => {
  return (
    <div>
      <Link
        href="/"
        className={cn(
          'hover:underline font-semibold underline-offset-4 text-primary-500',
        )}
      >
        Ai News Editor!
      </Link>
      <DeveloperInfo />
    </div>
  )
}
