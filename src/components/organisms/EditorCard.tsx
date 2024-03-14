import { RouterOutputs } from '@/trpc/clients/types'
import { Title2 } from '../atoms/typography'

import { cn } from '@/util/styles'

import { CloundinaryImage } from '../molecules/CloudinaryImage'
import { EditorInfo } from './EditorInfo'
import { UpdateEditor } from './UpdateEditor'
import { DeleteEditor } from './DeleteEditor'
import { FavoriteEditorButton } from './FavoriteEditorButton'

export const EditorCard = ({
  editor,
  isOwner = false,
}: {
  editor: NonNullable<RouterOutputs['editors']['myEditors'][0]>
  isOwner?: boolean
}) => {
  return (
    <div className={cn(' bg-white shadow-xl rounded-lg overflow-hidden')}>
      <CloundinaryImage publicId={editor.imagePublicId} />
      <div className="p-3">
        <div className="flex justify-between gap-2 items-center mb-2">
          <Title2 className="mb-0">{editor.name}</Title2>

          {isOwner ? (
            <div className="flex justify-between gap-3">
              <div className="flex gap-3">
                <UpdateEditor editor={editor} />
                <DeleteEditor editor={editor} />
              </div>
            </div>
          ) : (
            <FavoriteEditorButton editor={editor} />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <EditorInfo editor={editor} />
        </div>

        <div className="mt-4 text-xs">{editor.User.name}</div>
      </div>
    </div>
  )
}
