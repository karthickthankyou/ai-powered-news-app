import Link from 'next/link'

import { BaseComponent } from '@/util/types'
import { cn } from '@/util/styles'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../atoms/tooltip'
import { Editor } from '@prisma/client'
import { EditorInfo } from './EditorInfo'
import { CloundinaryImage } from '../molecules/CloudinaryImage'

export const EditorLink = ({
  pathname,
  className,
  selected = false,
  editor,
}: {
  pathname: string
  selected?: boolean
  editor: Omit<Editor, 'createdAt' | 'updatedAt'>
} & BaseComponent) => {
  const href = {
    pathname,
    query: { editorId: editor.id },
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <Link
            href={href}
            className={cn(
              'inline-block',
              selected
                ? 'shadow-lg shadow-black/30 rounded-full my-2 scale-125  '
                : 'opacity-80',
            )}
          >
            <CloundinaryImage
              publicId={editor.imagePublicId}
              className="w-12 h-12 rounded-full "
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="left" arrowPadding={10}>
          <div className="mb-2 font-semibold">{editor.name}</div>
          <div className="grid grid-cols-2 gap-3">
            <EditorInfo editor={editor} />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
