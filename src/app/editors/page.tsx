import { EditorCard } from '@/components/organisms/EditorCard'
import { trpcServer } from '@/trpc/clients/server'
import { auth } from '@clerk/nextjs'

export default async function Page() {
  const editors = await trpcServer.editors.findAll.query()
  const { userId } = auth()

  return (
    <div className="grid grid-cols-4 gap-3">
      {editors.map((editor) => (
        <EditorCard
          editor={editor}
          key={editor.id}
          isOwner={userId === editor.userId}
        />
      ))}
    </div>
  )
}
