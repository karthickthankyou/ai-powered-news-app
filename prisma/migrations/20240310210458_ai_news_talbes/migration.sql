-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('LOVE', 'LIKE', 'DISLIKE', 'HATE');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENGLISH', 'TAMIL', 'HINDI', 'FRENCH', 'SPANISH', 'GERMAN', 'MANDARIN', 'JAPANESE');

-- CreateEnum
CREATE TYPE "Style" AS ENUM ('SENSATIONALIST', 'CHEERLEADER_HYPE', 'POETIC_DESCRIPTIVE', 'STRAIGHTFORWARD_FACTUAL', 'CONSPIRACY_THEORIST', 'CELEBRITY_GOSSIP', 'BREAKING_NEWS_URGENCY', 'HAIKU', 'SHAKESPEAREAN_DRAMATIC', 'MOVIE_TRAILER_VOICEOVER', 'RALLY_CRY_RHETORIC', 'LEGAL_FORMALITIES', 'ACADEMIC_ANALYTICAL', 'SATIRICAL_HUMOR', 'CONVERSATIONAL_BLOG');

-- CreateEnum
CREATE TYPE "Verbosity" AS ENUM ('SUCCINCT', 'MODERATE', 'ELABORATE');

-- CreateEnum
CREATE TYPE "WordComplexity" AS ENUM ('ELEMENTARY', 'INTERMEDIATE', 'SOPHISTICATED');

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "summary" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "reporterId" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uid" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,
    "type" "FeedbackType" NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditBalance" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "notes" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creditBalanceId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Editor" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "imagePublicId" TEXT,
    "language" "Language" NOT NULL DEFAULT 'ENGLISH',
    "style" "Style" NOT NULL,
    "verbosity" "Verbosity" NOT NULL,
    "wordComplexity" "WordComplexity" NOT NULL,
    "additionalNotes" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Editor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditorArticle" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "summary" TEXT,
    "editorId" INTEGER NOT NULL,
    "originalArticleId" INTEGER NOT NULL,

    CONSTRAINT "EditorArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_favoriteEditors" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_uid_articleId_key" ON "Feedback"("uid", "articleId");

-- CreateIndex
CREATE UNIQUE INDEX "CreditBalance_userId_key" ON "CreditBalance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EditorArticle_editorId_originalArticleId_key" ON "EditorArticle"("editorId", "originalArticleId");

-- CreateIndex
CREATE UNIQUE INDEX "_favoriteEditors_AB_unique" ON "_favoriteEditors"("A", "B");

-- CreateIndex
CREATE INDEX "_favoriteEditors_B_index" ON "_favoriteEditors"("B");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "Reporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditBalance" ADD CONSTRAINT "CreditBalance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_creditBalanceId_fkey" FOREIGN KEY ("creditBalanceId") REFERENCES "CreditBalance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Editor" ADD CONSTRAINT "Editor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditorArticle" ADD CONSTRAINT "EditorArticle_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Editor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditorArticle" ADD CONSTRAINT "EditorArticle_originalArticleId_fkey" FOREIGN KEY ("originalArticleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteEditors" ADD CONSTRAINT "_favoriteEditors_A_fkey" FOREIGN KEY ("A") REFERENCES "Editor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteEditors" ADD CONSTRAINT "_favoriteEditors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
