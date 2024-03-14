'use client'
import { trpcClient } from '@/trpc/clients/client'
import { cn } from '@/util/styles'
import { BaseComponent } from '@/util/types'
import { EditorCard } from './EditorCard'
import { AlertBox } from '../molecules/AlertBox'

export const ListEditors = ({ className }: BaseComponent) => {
  const { data: myEditors } = trpcClient.editors.myEditors.useQuery()

  if (myEditors?.length === 0) {
    return <AlertBox>No editors found.</AlertBox>
  }
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
