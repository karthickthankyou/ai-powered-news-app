'use client'

import { Button } from '../atoms/button'

import { trpcClient } from '@/trpc/clients/client'
import { cn } from '@/util/styles'
import { revalidatePath } from '@/util/actions/revalidatePath'
import { BaseComponent } from '@/util/types'
import { usePathname } from 'next/navigation'

type InpublishButtonType = {
  articleId: number
  published: boolean
} & BaseComponent

export const UpdateArticleStateButton = ({
  articleId,
  className,
  published,
}: InpublishButtonType) => {
  const pathname = usePathname()
  const { mutateAsync, isLoading } = trpcClient.articles.update.useMutation({
    onSuccess() {
      revalidatePath(pathname)
    },
  })
  return (
    <Button
      variant={published ? 'link' : 'default'}
      size={'sm'}
      loading={isLoading}
      className={cn(className)}
      onClick={async () => {
        await mutateAsync({ articleId, published: !published })
      }}
    >
      {published ? 'Unpublish' : 'Publish'}
    </Button>
  )
}
