import { Title2 } from '@/components/atoms/typography'
import { DeleteAdminButton } from '@/components/organisms/DeleteAdminButton'
import { UserCard } from '@/components/organisms/UserCard'
import { CreateAdmin } from '@/components/templates/CreateAdmin'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page() {
  const admins = await trpcServer.admins.findAll.query()

  return (
    <div>
      <Title2 className="mb-2">Manage Admins</Title2>
      <CreateAdmin />

      <Title2 className="mt-8 mb-2">Admins</Title2>
      <div className="space-y-3">
        {admins.map((admin) => (
          <UserCard key={admin.User.id} user={admin.User}>
            <div className="flex justify-end mt-2">
              <DeleteAdminButton id={admin.id} />
            </div>
          </UserCard>
        ))}
      </div>
    </div>
  )
}
