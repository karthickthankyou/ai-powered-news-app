'use client'
import { trpcClient } from '@/trpc/clients/client'
import { Loading } from '../molecules/Loading'
import { AlertBox } from '../molecules/AlertBox'
import { cn } from '@/util/styles'
import { Title } from '../atoms/typography'
import { DisplayDate } from '../molecules/DisplayDate'
import { ReporterInfo } from '../molecules/ReporterInfo'
import { EditorInfo } from '../organisms/EditorInfo'

export interface IArticlePageProps {
  editorId: number
  articleId: number
}
export const EditorArticlePage = ({
  editorId,
  articleId,
}: IArticlePageProps) => {
  const { data: editorArticle, isLoading } =
    trpcClient.articles.editorArticle.useQuery({
      editorId,
      id: articleId,
    })

  if (isLoading) {
    return <Loading>Writing...</Loading>
  }

  if (!editorArticle) {
    return <AlertBox>Editor article not found.</AlertBox>
  }

  return (
    <div className={cn('max-w-lg mx-auto mb-24 mt-12')}>
      <Title className={cn('text-xl font-semibold mb-2')}>
        {editorArticle.title}
      </Title>
      <DisplayDate dateString={editorArticle.createdAt} />

      <ReporterInfo
        publicId={editorArticle.Editor.imagePublicId}
        name={editorArticle.Editor.name}
      />
      <div className="grid grid-cols-2 gap-4 mt-4 p-2 border rounded-lg">
        <EditorInfo editor={editorArticle.Editor} />
      </div>
      <div className="mt-4 whitespace-pre-wrap text-lg ">
        {editorArticle.body}
      </div>
    </div>
  )
}
