'use client'
import { trpcClient } from '@/trpc/clients/client'
import { cn } from '@/util/styles'
import { BaseComponent } from '@/util/types'
import { User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { EditorLink } from './EditorLink'
import { buttonVariants } from '@/util/styles/variants'

export const SelectEditors = ({ className }: BaseComponent) => {
  const { data: myEditors } = trpcClient.editors.myEditors.useQuery()
  const { data: favoriteEditors } =
    trpcClient.editors.favoriteEditors.useQuery()

  const { data } = trpcClient.creditBalance.myCreditBalance.useQuery()

  const searchParams = useSearchParams()
  const selectedEditorId = searchParams.get('editorId')
  const editorIdAsNumber = selectedEditorId ? +selectedEditorId : null
  const pathname = usePathname()

  const insufficientBalance = (data?.balance || 0) <= 0

  return (
    <div>
      <div
        className={cn(
          'flex flex-col items-center gap-2 py-16 p-2 max-h-screen overflow-y-auto',
          className,
          insufficientBalance ? 'pointer-events-none opacity-50' : '',
        )}
      >
        <Link
          href={pathname}
          className={cn(
            'w-12 h-12 rounded-full border border-black flex scale-110 justify-center items-center transition-all mb-4',
            !editorIdAsNumber ? 'shadow-lg shadow-black/30' : 'opacity-80',
          )}
        >
          <User />
        </Link>
        <div className={cn('h-1 bg-gray-400')} />
        {myEditors?.length ? (
          <div className="mb-4 flex flex-col gap-2">
            {myEditors?.map((editor) => (
              <EditorLink
                editor={editor}
                selected={editorIdAsNumber === editor.id}
                pathname={pathname}
                key={editor.id}
              />
            ))}
          </div>
        ) : null}
        {favoriteEditors?.map((editor) => (
          <EditorLink
            editor={editor}
            selected={editorIdAsNumber === editor.id}
            pathname={pathname}
            key={editor.id}
          />
        ))}
      </div>
      {insufficientBalance && (
        <Link
          href="/user/credits"
          className={cn(
            'mb-2',
            buttonVariants({ variant: 'link', size: 'sm' }),
          )}
        >
          Add credits
        </Link>
      )}
    </div>
  )
}
