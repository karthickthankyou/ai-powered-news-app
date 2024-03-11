import { SimpleSidebar } from '@/components/molecules/SimpleSidebar'
import { TellThem } from '@/components/molecules/TellThem'
import { AdminMenu } from '@/components/organisms/AdminMenu'
import { ReporterMenu } from '@/components/organisms/ReporterMenu'
import { trpcServer } from '@/trpc/clients/server'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    return <Link href="/sign-in">Sign In</Link>
  }

  const reporterMe = await trpcServer.reporters.reporterMe.query()
  if (!reporterMe) {
    return <TellThem role="reporter" uid={userId} />
  }

  return (
    <div className="flex">
      <div className="hidden w-full max-w-xs sm:block">
        <ReporterMenu />
      </div>
      <div className="flex-grow">
        <div className="sm:hidden">
          <SimpleSidebar>
            <ReporterMenu />
          </SimpleSidebar>
        </div>
        <div className="bg-white min-h-[calc(100vh-8rem)] py-2 px-4">
          {children}
        </div>
      </div>
    </div>
  )
}
