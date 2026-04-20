/*
  Warnings:

  - You are about to drop the column `resumeId` on the `RewrittenExperience` table. All the data in the column will be lost.
  - You are about to drop the column `experienceId` on the `RewrittenExperienceBullet` table. All the data in the column will be lost.
  - You are about to drop the column `resumeId` on the `RewrittenProject` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `RewrittenProjectBullet` table. All the data in the column will be lost.
  - You are about to drop the column `resumeId` on the `RewrittenSkill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RewrittenExperience" DROP COLUMN "resumeId";

-- AlterTable
ALTER TABLE "RewrittenExperienceBullet" DROP COLUMN "experienceId";

-- AlterTable
ALTER TABLE "RewrittenProject" DROP COLUMN "resumeId";

-- AlterTable
ALTER TABLE "RewrittenProjectBullet" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "RewrittenSkill" DROP COLUMN "resumeId";
