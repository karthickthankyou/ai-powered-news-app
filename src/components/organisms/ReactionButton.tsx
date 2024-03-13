import { trpcClient } from '@/trpc/clients/client'
import { FeedbackType } from '@prisma/client'
import { LucideIcon } from 'lucide-react'
import { Button } from '../atoms/button'
import { cn } from '@/util/styles'

export interface IReactionButtonProps {
  Icon: LucideIcon
  type: FeedbackType
  articleId: number
  selected?: boolean
}

export const ReactionButton = ({
  Icon,
  type,
  articleId,
  selected,
}: IReactionButtonProps) => {
  const utils = trpcClient.useUtils()

  const { mutateAsync: giveFeedback, isLoading } =
    trpcClient.feedbacks.giveMyFeedback.useMutation({
      onSuccess: () => {
        utils.feedbacks.myFeedback.invalidate()
        utils.articles.userRecommendations.invalidate()
      },
    })
  return (
    <Button
      size={'icon'}
      variant={'ghost'}
      onClick={async () => {
        await giveFeedback({
          articleId,
          type,
        })
      }}
      loading={isLoading}
      className={cn(
        'transition-all',
        selected ? 'shadow-lg border border-black scale-110' : '',
      )}
    >
      <Icon />
    </Button>
  )
}
