import { AIService } from '@/ai/ai.service'
import { PrismaClient } from '@prisma/client'

export const fetchAndScoreRelatedArticles = async ({
  db,
  ai,
  id,
}: {
  db: PrismaClient
  ai: AIService
  id: string
}) => {
  const related = await ai.userRecommendations({ id })

  const articleIds = related.map((article) => +article.id)

  const articles = await db.article.findMany({
    where: {
      id: {
        in: articleIds,
      },
    },
    select: {
      title: true,
      createdAt: true,
      id: true,
      tags: true,
      summary: true,
    },
  })

  type RelatedArticle = (typeof articles)[0]

  return related
    .map(({ id, score }) => {
      const article = articles.find((article) => article.id === +id)
      if (article) {
        return { score, article }
      }
    })
    .filter(
      (article): article is { article: RelatedArticle; score: number } =>
        !!article,
    )
}
