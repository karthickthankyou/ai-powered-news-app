import { StatCard } from '@/components/organisms/StatCard'
import { trpcServer } from '@/trpc/clients/server'
import { FileArchive } from 'lucide-react'

export default async function Page() {
  const { articles } = await trpcServer.reporters.dashboard.query()

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        href={'/reporter/myArticles'}
        label={'My Articles'}
        Icon={FileArchive}
      >
        {articles}
      </StatCard>
    </div>
  )
}
