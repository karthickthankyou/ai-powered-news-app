import { Brand } from '../molecules/Brand'
import { Container } from '../atoms/container'
import { Sidebar } from './Sidebar'
import { UserButton } from '@clerk/nextjs'
import { NavMenu } from '../molecules/NavMenu'

export interface INavbarProps {}

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full  bg-white/60 backdrop-blur backdrop-filter">
      <Container className="h-12">
        <div className="flex items-center justify-between h-full">
          <Brand />
          <div className="flex items-center gap-3">
            <NavMenu className="mr-8" />
            <UserButton />
            <Sidebar />
          </div>
        </div>
      </Container>
    </nav>
  )
}
