'use client'
import { trpcClient } from '@/trpc/clients/client'
import { useToast } from '../molecules/Toaster/use-toast'
import { useEffect } from 'react'
import { Loading } from '../molecules/Loading'
import { ArticleCard } from '../organisms/ArticleCard'

export const HomePage = () => {
  const { data, isLoading, isFetching, error } =
    trpcClient.articles.userRecommendations.useQuery()
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({ title: error.data?.code })
    }
  }, [error, toast])

  return (
    <div className="space-y-6">
      {data?.map(({ article, score }) => (
        <ArticleCard key={article.id} article={article} score={score} />
      ))}
      {isFetching ? <Loading /> : null}
    </div>
  )
}
