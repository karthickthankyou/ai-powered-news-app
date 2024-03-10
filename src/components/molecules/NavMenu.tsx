import { cn } from '@/util/styles'
import { BaseComponent } from '@/util/types'
import Link from 'next/link'

export const NavMenu = ({ className }: BaseComponent) => {
  return (
    <div className={cn('flex gap-2', className)}>
      <Link href="/editors">Editors</Link>
    </div>
  )
}
