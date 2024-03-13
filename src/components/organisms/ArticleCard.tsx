import Link from 'next/link'
import { DisplayDate } from '../molecules/DisplayDate'

import { cn } from '@/util/styles'
import { RouterOutputs } from '@/trpc/clients/types'
import { Badge } from '../atoms/badge'
import { ReactionPanel } from './ReactionPanel'

export const ArticleCard = ({
  article,
  score,
}: {
  article: NonNullable<
    RouterOutputs['articles']['userRecommendations'][0]['article']
  >
  score: number
}) => {
  return (
    <div className={cn()}>
      <Link href={`/article/${article.id}`}>
        <div
          className={cn(
            'text-lg font-semibold hover:underline line-clamp-2 max-w-lg underline-offset-4 ',
          )}
        >
          {article.title}
        </div>
      </Link>

      <div className="max-w-md mt-1 text-sm gray-500 line-clamp-2">
        {article.summary}
      </div>
      <DisplayDate dateString={article.createdAt} className="mt-2" />
      <div className="flex flex-wrap gap-2 mt-2">
        {article.tags.map((tag) => (
          <Badge key={tag} variant={'outline'}>
            {tag}
          </Badge>
        ))}
      </div>
      <ReactionPanel articleId={article.id} className="mt-2" />

      <div className="mt-1 text-xs text-gray-500">
        Current relevance{' '}
        <span className="font-semibold">{Math.floor(score * 100)}</span>
      </div>
    </div>
  )
}
