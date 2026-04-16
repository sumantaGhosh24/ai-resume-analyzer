/*
  Warnings:

  - A unique constraint covering the columns `[resumeId]` on the table `Analysis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobId]` on the table `Analysis` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Analysis_resumeId_key" ON "Analysis"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_jobId_key" ON "Analysis"("jobId");
