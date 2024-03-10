'use client'

import { trpcClient } from '@/trpc/clients/client'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  const { data, isLoading } = trpcClient.users.useQuery()
  return (
    <main>
      <UserButton />
      {data?.map((user) => (
        <div key={user.id} className="p-4">
          <div>{user.id}</div>
          <div>{user.name}</div>
        </div>
      ))}
    </main>
  )
}
