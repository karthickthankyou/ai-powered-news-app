import { StatCard } from '@/components/organisms/StatCard'
import { trpcServer } from '@/trpc/clients/server'
import { Lock, Pen, File, Glasses, User2 } from 'lucide-react'

export default async function Page() {
  const { admin, article, editor, reporter, user } =
    await trpcServer.admins.dashboard.query()

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard href={'/admin/manageAdmins'} label={'Admins'} Icon={Lock}>
        {admin}
      </StatCard>
      <StatCard href={'/admin/manageReporters'} label={'Reporters'} Icon={Pen}>
        {reporter}
      </StatCard>
      <StatCard href={'/admin/manageArticles'} label={'Articles'} Icon={File}>
        {article}
      </StatCard>
      <StatCard href={'/admin/manageEditors'} label={'Editors'} Icon={Glasses}>
        {editor}
      </StatCard>
      <StatCard href={'/admin/manageUsers'} label={'Users'} Icon={User2}>
        {user}
      </StatCard>
    </div>
  )
}
