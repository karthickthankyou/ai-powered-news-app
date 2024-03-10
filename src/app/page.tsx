import { trpcServer } from '@/trpc/clients/server'
import { UserButton } from '@clerk/nextjs'

export default async function Home() {
  const users = await trpcServer.users.query()
  return (
    <main>
      {users?.map((user) => (
        <div key={user.id} className="p-4">
          <div>{user.id}</div>
          <div>{user.name}</div>
        </div>
      ))}
    </main>
  )
}
