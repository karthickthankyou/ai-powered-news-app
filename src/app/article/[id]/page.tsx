import { ArticlePage } from '@/components/templates/ArticlePage'

export default async function Page({ params }: { params: { id: string } }) {
  const articleId = +params.id

  return <ArticlePage articleId={articleId} />
}
