import { ArticlePage } from '@/components/templates/ArticlePage'
import { EditorArticlePage } from '@/components/templates/EditorArticlePage'

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const articleId = +params.id

  const editorId = searchParams.editorId ? Number(searchParams.editorId) : null

  if (!editorId) {
    return <ArticlePage articleId={articleId} />
  }

  return <EditorArticlePage editorId={editorId} articleId={articleId} />
}
