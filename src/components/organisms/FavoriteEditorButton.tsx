'use client'
import { trpcClient } from '@/trpc/clients/client'
import { RouterOutputs } from '@/trpc/clients/types'
import { cn } from '@/util/styles'
import { Heart } from 'lucide-react'

export const FavoriteEditorButton = ({
  editor,
}: {
  editor: RouterOutputs['editors']['findAll'][0]
}) => {
  const { data } = trpcClient.editors.getFavorite.useQuery({
    id: editor.id,
  })

  const utils = trpcClient.useUtils()
  const { mutateAsync: favorite } = trpcClient.editors.favorite.useMutation({
    onSuccess: () => {
      utils.editors.getFavorite.invalidate()
    },
  })

  return (
    <button
      onClick={async () => {
        await favorite({ id: editor.id })
      }}
    >
      <Heart
        className={cn(
          data
            ? 'fill-red-600 text-red stroke-red-600 transition-colors'
            : null,
        )}
      />
    </button>
  )
}
