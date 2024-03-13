import { trpcClient } from '@/trpc/clients/client'
import { BaseComponent } from '@/util/types'
import { Loading } from '../molecules/Loading'
import { Title2 } from '../atoms/typography'
import { ArticleCardMoreLikeThis } from './ArticleCardMoreLikeThis'

export const MoreLikeThis = ({
  id,
  children,
  className,
}: BaseComponent & { id: number }) => {
  const { data, isLoading } = trpcClient.articles.moreLikeThis.useQuery({
    id,
  })

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className={className}>
      <Title2>More like this</Title2>
      <div className="flex flex-col gap-6 mt-4">
        {data
          ?.filter((article) => article.article.id !== id)
          .map((article) => (
            <ArticleCardMoreLikeThis
              relatedArticle={article}
              key={article.article.id}
            />
          ))}
      </div>
    </div>
  )
}
