/*
  Warnings:

  - You are about to drop the `InterviewFeedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterviewMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterviewQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterviewSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterviewStrength` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterviewTip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterviewWeakness` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InterviewFeedback" DROP CONSTRAINT "InterviewFeedback_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewMessage" DROP CONSTRAINT "InterviewMessage_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewQuestion" DROP CONSTRAINT "InterviewQuestion_analysisId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewStrength" DROP CONSTRAINT "InterviewStrength_feedbackId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewTip" DROP CONSTRAINT "InterviewTip_feedbackId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewWeakness" DROP CONSTRAINT "InterviewWeakness_feedbackId_fkey";

-- DropTable
DROP TABLE "InterviewFeedback";

-- DropTable
DROP TABLE "InterviewMessage";

-- DropTable
DROP TABLE "InterviewQuestion";

-- DropTable
DROP TABLE "InterviewSession";

-- DropTable
DROP TABLE "InterviewStrength";

-- DropTable
DROP TABLE "InterviewTip";

-- DropTable
DROP TABLE "InterviewWeakness";

-- DropEnum
DROP TYPE "InterviewStatus";

-- DropEnum
DROP TYPE "InterviewType";
