import { trpcClient } from '@/trpc/clients/client'
import { RouterOutputs } from '@/trpc/clients/types'
import { cn } from '@/util/styles'
import { FeedbackType } from '@prisma/client'
import { Angry, Frown, LucideIcon, Smile, SmilePlus } from 'lucide-react'
import { ReactionButton } from './ReactionButton'

export interface IReactionPanelProps {
  className?: string
  feedback?: RouterOutputs['feedbacks']['giveMyFeedback']
  articleId: number
}

type FeedbackOption = {
  type: FeedbackType
  Icon: LucideIcon
}

const feedbackOptions: FeedbackOption[] = [
  { type: FeedbackType.LOVE, Icon: SmilePlus },
  { type: FeedbackType.LIKE, Icon: Smile },
  { type: FeedbackType.DISLIKE, Icon: Frown },
  { type: FeedbackType.HATE, Icon: Angry },
]

export const ReactionPanel = ({
  className,
  articleId,
}: IReactionPanelProps) => {
  const { data: myFeedback } = trpcClient.feedbacks.myFeedback.useQuery({
    id: articleId,
  })

  return (
    <div className={cn(`flex gap-2 mt-2`, className)}>
      {feedbackOptions.map((reaction) => (
        <ReactionButton
          key={reaction.type}
          Icon={reaction.Icon}
          selected={myFeedback?.type === reaction.type}
          type={reaction.type}
          articleId={articleId}
        />
      ))}
    </div>
  )
}
