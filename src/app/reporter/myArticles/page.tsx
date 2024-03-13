import { AlertBox } from '@/components/molecules/AlertBox'
import { ArticleCardSimple } from '@/components/organisms/ArticleCardSimple'
import { UpdateArticleStateButton } from '@/components/organisms/UpdateArticleStateButton'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page() {
  const myArticles = await trpcServer.reporters.myArticles.query()

  if (!myArticles.length) {
    return <AlertBox>No articles.</AlertBox>
  }

  return (
    <div className="flex flex-col gap-6">
      {myArticles.map((article) => (
        <div key={article.id}>
          <ArticleCardSimple article={article} />
          <UpdateArticleStateButton
            published={article.published}
            articleId={article.id}
            className="mt-2"
          />
        </div>
      ))}
    </div>
  )
}
