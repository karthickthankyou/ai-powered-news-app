'use client'
import { ForwardRefRenderFunction, forwardRef } from 'react'
import NextLink, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { Tally1 } from 'lucide-react'
import { cn } from '@/util/styles'

const CustomLinkComponent: ForwardRefRenderFunction<
  HTMLAnchorElement,
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps
> = ({ children, href, className, ...props }, ref) => {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <NextLink
      ref={ref}
      href={href}
      className={cn(
        active ? 'font-semibold text-primary' : '',
        'flex gap-1 transition-all relative',
        className,
      )}
      {...props}
    >
      {active ? <Tally1 className="absolute right-full" /> : null} {children}
    </NextLink>
  )
}

export const Link = forwardRef(CustomLinkComponent)
