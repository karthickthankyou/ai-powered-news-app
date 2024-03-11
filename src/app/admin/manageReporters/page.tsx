import { Title2 } from '@/components/atoms/typography'
import { DeleteAdminButton } from '@/components/organisms/DeleteAdminButton'
import { DeleteReporterButton } from '@/components/organisms/DeleteReporterButton'
import { UserCard } from '@/components/organisms/UserCard'
import { CreateAdmin } from '@/components/templates/CreateAdmin'
import { CreateReporter } from '@/components/templates/CreateReporter'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page() {
  const reporters = await trpcServer.reporters.findAll.query()

  return (
    <div>
      <Title2 className="mb-2">Manage Reporters</Title2>
      <CreateReporter />

      <Title2 className="mt-8 mb-2">Reporter</Title2>
      <div className="space-y-3">
        {reporters.map((admin) => (
          <UserCard key={admin.User.id} user={admin.User}>
            <div className="flex justify-end mt-2">
              <DeleteReporterButton id={admin.id} />
            </div>
          </UserCard>
        ))}
      </div>
    </div>
  )
}
