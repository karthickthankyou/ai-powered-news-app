import { prisma } from '@/db'
export default async function Home() {
  const users = await prisma.user.findMany()
  return (
    <main>
      {users.map((user) => (
        <div key={user.id} className="p-4">
          <div>{user.id}</div>
          <div>{user.name}</div>
        </div>
      ))}
    </main>
  )
}
