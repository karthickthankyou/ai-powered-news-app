import { trpcServer } from '@/trpc/clients/server'
import { Title2 } from '@/components/atoms/typography'
import { UserCard } from '@/components/organisms/UserCard'

export default async function ManageArticles() {
  const users = await trpcServer.users.findAll.query()

  return (
    <main>
      <Title2>Manage Users</Title2>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div key={user.id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </main>
  )
}
