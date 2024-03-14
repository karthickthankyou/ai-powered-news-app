'use client'
import { trpcClient } from '@/trpc/clients/client'
import { cn } from '@/util/styles'
import { BaseComponent } from '@/util/types'
import { EditorCard } from './EditorCard'

export const ListEditors = ({ className }: BaseComponent) => {
  const { data: myEditors } = trpcClient.editors.myEditors.useQuery()

  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4',
        className,
      )}
    >
      {myEditors?.map((editor) => (
        <EditorCard editor={editor} key={editor.id} />
      ))}
    </div>
  )
}
