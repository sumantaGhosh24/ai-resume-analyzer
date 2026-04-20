-- CreateTable
CREATE TABLE "RewrittenResume" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "RewrittenResume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewrittenExperience" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "rewrittenResumeId" TEXT,

    CONSTRAINT "RewrittenExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewrittenExperienceBullet" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rewrittenExperienceId" TEXT,

    CONSTRAINT "RewrittenExperienceBullet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewrittenProject" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rewrittenResumeId" TEXT,

    CONSTRAINT "RewrittenProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewrittenProjectBullet" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rewrittenProjectId" TEXT,

    CONSTRAINT "RewrittenProjectBullet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewrittenSkill" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rewrittenResumeId" TEXT,

    CONSTRAINT "RewrittenSkill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RewrittenResume_analysisId_key" ON "RewrittenResume"("analysisId");

-- AddForeignKey
ALTER TABLE "RewrittenResume" ADD CONSTRAINT "RewrittenResume_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewrittenExperience" ADD CONSTRAINT "RewrittenExperience_rewrittenResumeId_fkey" FOREIGN KEY ("rewrittenResumeId") REFERENCES "RewrittenResume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewrittenExperienceBullet" ADD CONSTRAINT "RewrittenExperienceBullet_rewrittenExperienceId_fkey" FOREIGN KEY ("rewrittenExperienceId") REFERENCES "RewrittenExperience"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewrittenProject" ADD CONSTRAINT "RewrittenProject_rewrittenResumeId_fkey" FOREIGN KEY ("rewrittenResumeId") REFERENCES "RewrittenResume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewrittenProjectBullet" ADD CONSTRAINT "RewrittenProjectBullet_rewrittenProjectId_fkey" FOREIGN KEY ("rewrittenProjectId") REFERENCES "RewrittenProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewrittenSkill" ADD CONSTRAINT "RewrittenSkill_rewrittenResumeId_fkey" FOREIGN KEY ("rewrittenResumeId") REFERENCES "RewrittenResume"("id") ON DELETE SET NULL ON UPDATE CASCADE;
