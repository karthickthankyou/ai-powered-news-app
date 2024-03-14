import { SimpleSidebar } from '@/components/molecules/SimpleSidebar'
import { UserMenu } from '@/components/organisms/UserMenu'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <div className="hidden w-full max-w-xs sm:block">
        <UserMenu />
      </div>
      <div className="flex-grow ">
        <div className="sm:hidden">
          <SimpleSidebar>
            <UserMenu />
          </SimpleSidebar>
        </div>
        <div className=" min-h-[calc(100vh-8rem)] py-2 px-4">{children}</div>
      </div>
    </div>
  )
}
