import { prisma } from '@/db'
import { UserButton } from '@clerk/nextjs'
export default async function Home() {
  const users = await prisma.user.findMany()
  return (
    <main>
      <UserButton />
      {users.map((user) => (
        <div key={user.id} className="p-4">
          <div>{user.id}</div>
          <div>{user.name}</div>
        </div>
      ))}
    </main>
  )
}
