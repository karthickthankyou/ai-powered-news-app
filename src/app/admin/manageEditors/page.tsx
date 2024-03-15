import { trpcServer } from '@/trpc/clients/server'
import { Title2 } from '@/components/atoms/typography'

import { EditorCard } from '@/components/organisms/EditorCard'

export default async function ManageArticles() {
  const editors = await trpcServer.editors.findAll.query()

  return (
    <main>
      <Title2>Manage Editors</Title2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {editors.map((editor) => (
          <div key={editor.User.id}>
            <EditorCard editor={editor} />
          </div>
        ))}
      </div>
    </main>
  )
}
