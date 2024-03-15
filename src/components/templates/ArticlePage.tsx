'use client'
import { trpcClient } from '@/trpc/clients/client'
import Image from 'next/image'
import { Loading } from '../molecules/Loading'
import { AlertBox } from '../molecules/AlertBox'
import { cn } from '@/util/styles'
import { DisplayDate } from '../molecules/DisplayDate'
import { MoreLikeThis } from '../organisms/MoreLikeThis'
import { ReactionPanel } from '../organisms/ReactionPanel'
import { ReporterInfo } from '../molecules/ReporterInfo'

export interface IArticlePageProps {
  articleId: number
}

export const ArticlePage = ({ articleId }: IArticlePageProps) => {
  const { data: article, isLoading } = trpcClient.articles.findOne.useQuery({
    id: articleId,
  })

  if (isLoading) {
    return <Loading />
  }
  if (!article) {
    return <AlertBox>Article not found.</AlertBox>
  }

  return (
    <div className={cn('max-w-lg mx-auto mb-24 mt-12')}>
      <h1 className={cn('text-xl font-semibold mb-2')}>{article.title}</h1>
      <DisplayDate dateString={article.createdAt} />
      <ReporterInfo
        image={article.Reporter.User.image}
        name={article.Reporter.User.name}
      />

      <div className="mt-4 whitespace-pre-wrap text-lg ">{article.body}</div>
      <ReactionPanel articleId={article.id} />

      <MoreLikeThis className="mt-8" id={article.id} />
    </div>
  )
}
