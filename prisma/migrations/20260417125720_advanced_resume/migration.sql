/*
  Warnings:

  - You are about to drop the column `experienceMatch` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `missingSkills` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `projectMatch` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `responsibilityMatch` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `seniorityMatch` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `skillMatch` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `suggestions` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `structuredData` on the `JobDescription` table. All the data in the column will be lost.
  - You are about to drop the column `parsedData` on the `Resume` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SuggestionType" AS ENUM ('SUMMARY', 'SKILLS', 'EXPERIENCE', 'PROJECT');

-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('TECHNICAL', 'BEHAVIORAL', 'PROJECT');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ABANDONED');

-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "experienceMatch",
DROP COLUMN "missingSkills",
DROP COLUMN "projectMatch",
DROP COLUMN "responsibilityMatch",
DROP COLUMN "score",
DROP COLUMN "seniorityMatch",
DROP COLUMN "skillMatch",
DROP COLUMN "suggestions";

-- AlterTable
ALTER TABLE "JobDescription" DROP COLUMN "structuredData";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "parsedData";

-- CreateTable
CREATE TABLE "ResumeSkill" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ResumeSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeExperience" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "years" DOUBLE PRECISION,

    CONSTRAINT "ResumeExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeExperienceBullet" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ResumeExperienceBullet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeProject" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ResumeProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeProjectBullet" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ResumeProjectBullet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeEducation" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "year" TEXT,

    CONSTRAINT "ResumeEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JDRequiredSkill" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JDRequiredSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JDPreferredSkill" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JDPreferredSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JDResponsibility" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "JDResponsibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalysisScore" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "totalScore" DOUBLE PRECISION NOT NULL,
    "skillMatch" DOUBLE PRECISION NOT NULL,
    "experienceMatch" DOUBLE PRECISION NOT NULL,
    "projectMatch" DOUBLE PRECISION NOT NULL,
    "responsibilityMatch" DOUBLE PRECISION NOT NULL,
    "seniorityMatch" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AnalysisScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissingSkill" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MissingSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "type" "SuggestionType" NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ATSResult" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "atsScore" DOUBLE PRECISION NOT NULL,
    "keywordMatch" DOUBLE PRECISION NOT NULL,
    "formattingScore" DOUBLE PRECISION NOT NULL,
    "sectionScore" DOUBLE PRECISION NOT NULL,
    "passProbability" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ATSResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ATSSuggestion" (
    "id" TEXT NOT NULL,
    "atsId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ATSSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ATSIssue" (
    "id" TEXT NOT NULL,
    "atsId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ATSIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverLetter" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "greeting" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "closing" TEXT NOT NULL,

    CONSTRAINT "CoverLetter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverLetterParagraph" (
    "id" TEXT NOT NULL,
    "coverLetterId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "CoverLetterParagraph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roadmap" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "Roadmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapPhase" (
    "id" TEXT NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "RoadmapPhase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapTask" (
    "id" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "resource" TEXT,

    CONSTRAINT "RoadmapTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "type" "InterviewType" NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "difficulty" TEXT,

    CONSTRAINT "InterviewQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "analysisId" TEXT,
    "status" "InterviewStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "InterviewSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewMessage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "InterviewMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewFeedback" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InterviewFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewStrength" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "InterviewStrength_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewWeakness" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "InterviewWeakness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewTip" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "InterviewTip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ResumeSkill_resumeId_idx" ON "ResumeSkill"("resumeId");

-- CreateIndex
CREATE INDEX "ResumeSkill_name_idx" ON "ResumeSkill"("name");

-- CreateIndex
CREATE INDEX "ResumeExperience_resumeId_idx" ON "ResumeExperience"("resumeId");

-- CreateIndex
CREATE INDEX "ResumeProject_resumeId_idx" ON "ResumeProject"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "AnalysisScore_analysisId_key" ON "AnalysisScore"("analysisId");

-- CreateIndex
CREATE INDEX "MissingSkill_analysisId_idx" ON "MissingSkill"("analysisId");

-- CreateIndex
CREATE UNIQUE INDEX "ATSResult_analysisId_key" ON "ATSResult"("analysisId");

-- CreateIndex
CREATE INDEX "ATSSuggestion_atsId_idx" ON "ATSSuggestion"("atsId");

-- CreateIndex
CREATE UNIQUE INDEX "CoverLetter_analysisId_key" ON "CoverLetter"("analysisId");

-- CreateIndex
CREATE INDEX "CoverLetterParagraph_coverLetterId_idx" ON "CoverLetterParagraph"("coverLetterId");

-- CreateIndex
CREATE UNIQUE INDEX "Roadmap_analysisId_key" ON "Roadmap"("analysisId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewFeedback_sessionId_key" ON "InterviewFeedback"("sessionId");

-- AddForeignKey
ALTER TABLE "ResumeSkill" ADD CONSTRAINT "ResumeSkill_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeExperience" ADD CONSTRAINT "ResumeExperience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeExperienceBullet" ADD CONSTRAINT "ResumeExperienceBullet_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "ResumeExperience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProject" ADD CONSTRAINT "ResumeProject_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProjectBullet" ADD CONSTRAINT "ResumeProjectBullet_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ResumeProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeEducation" ADD CONSTRAINT "ResumeEducation_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JDRequiredSkill" ADD CONSTRAINT "JDRequiredSkill_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobDescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JDPreferredSkill" ADD CONSTRAINT "JDPreferredSkill_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobDescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JDResponsibility" ADD CONSTRAINT "JDResponsibility_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobDescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisScore" ADD CONSTRAINT "AnalysisScore_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissingSkill" ADD CONSTRAINT "MissingSkill_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ATSResult" ADD CONSTRAINT "ATSResult_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ATSSuggestion" ADD CONSTRAINT "ATSSuggestion_atsId_fkey" FOREIGN KEY ("atsId") REFERENCES "ATSResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ATSIssue" ADD CONSTRAINT "ATSIssue_atsId_fkey" FOREIGN KEY ("atsId") REFERENCES "ATSResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverLetter" ADD CONSTRAINT "CoverLetter_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverLetterParagraph" ADD CONSTRAINT "CoverLetterParagraph_coverLetterId_fkey" FOREIGN KEY ("coverLetterId") REFERENCES "CoverLetter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapPhase" ADD CONSTRAINT "RoadmapPhase_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapTask" ADD CONSTRAINT "RoadmapTask_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "RoadmapPhase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestion" ADD CONSTRAINT "InterviewQuestion_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewMessage" ADD CONSTRAINT "InterviewMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "InterviewSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewFeedback" ADD CONSTRAINT "InterviewFeedback_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "InterviewSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewStrength" ADD CONSTRAINT "InterviewStrength_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "InterviewFeedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewWeakness" ADD CONSTRAINT "InterviewWeakness_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "InterviewFeedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewTip" ADD CONSTRAINT "InterviewTip_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "InterviewFeedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;
