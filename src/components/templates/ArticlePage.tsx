'use client'
import { trpcClient } from '@/trpc/clients/client'
import Image from 'next/image'
import { Loading } from '../molecules/Loading'
import { AlertBox } from '../molecules/AlertBox'
import { cn } from '@/util/styles'
import { DisplayDate } from '../molecules/DisplayDate'
import { MoreLikeThis } from '../organisms/MoreLikeThis'
import { ReactionPanel } from '../organisms/ReactionPanel'

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

      <div className="flex gap-2 items-center mt-8">
        <Image
          className="w-12 h-12 rounded-full"
          src={article.Reporter.User.image || '/user.png'}
          width={200}
          height={200}
          alt=""
        />
        <div>
          <div className="text-xs">Written by,</div>
          <div>{article.Reporter.User.name}</div>
        </div>
      </div>
      <div className="mt-4 whitespace-pre-wrap text-lg ">{article.body}</div>
      <ReactionPanel articleId={article.id} />

      <MoreLikeThis className="mt-8" id={article.id} />
    </div>
  )
}
