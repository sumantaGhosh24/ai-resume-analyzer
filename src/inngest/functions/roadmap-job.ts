import prisma from "@/lib/db";
import {
  cleanResumeText,
  extractTextFromPDF,
  normalizeResumeText,
} from "@/lib/analyze/resume";
import {generateRoadmap} from "@/lib/generate/roadmap";

import {inngest} from "../client";

export const roadmapJob = inngest.createFunction(
  {id: "roadmap-generator", triggers: {event: "resume/roadmap"}},
  async ({event, step}) => {
    const {analyseId, resumeId, jdId} = event.data;

    const {resumeText, jd} = await step.run("fetch-data", async () => {
      const existingRoadmap = await prisma.roadmap.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingRoadmap) {
        throw new Error(
          "Roadmap already exists for this analysis, aborting job.",
        );
      }

      const resumeRecord = await prisma.resume.findUnique({
        where: {id: resumeId},
      });

      const jdRecord = await prisma.jobDescription.findUnique({
        where: {id: jdId},
        include: {
          requiredSkills: true,
          preferredSkills: true,
          responsibilities: true,
        },
      });

      if (!resumeRecord) {
        throw new Error("Resume not found");
      }
      if (!jdRecord) {
        throw new Error("Job description not found");
      }

      let resumeText = "";
      if (resumeRecord.fileUrl) {
        const raw = await extractTextFromPDF(resumeRecord.fileUrl);

        const clean = cleanResumeText(raw);

        resumeText = normalizeResumeText(clean);
      } else {
        throw new Error("No resume fileUrl");
      }

      const jd = {
        content: jdRecord.content,
        seniority: jdRecord.seniority,
        required_skills: jdRecord.requiredSkills.map((s) => s.name),
        preferred_skills: jdRecord.preferredSkills.map((s) => s.name),
        responsibilities: jdRecord.responsibilities.map((r) => r.content),
      };

      return {resumeText, jd};
    });

    const missingSkills = await step.run("find-missing-skills", async () => {
      const existingRoadmap = await prisma.roadmap.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingRoadmap) {
        throw new Error(
          "Roadmap already exists for this analysis, aborting job.",
        );
      }

      const existingMissingSkills = await prisma.missingSkill.findMany({
        where: {analysisId: analyseId},
        select: {name: true},
      });
      if (existingMissingSkills && existingMissingSkills.length > 0) {
        return existingMissingSkills.map((s) => s.name);
      }

      return [];
    });

    const roadmap = await step.run("generate-roadmap", async () => {
      const existingRoadmap = await prisma.roadmap.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingRoadmap) {
        throw new Error(
          "Roadmap already exists for this analysis, aborting job.",
        );
      }

      return await generateRoadmap({missingSkills, resumeText, jd});
    });

    await step.run("save-roadmap", async () => {
      const existingRoadmap = await prisma.roadmap.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingRoadmap) {
        throw new Error(
          "Roadmap already exists for this analysis, aborting job.",
        );
      }

      const createdRoadmap = await prisma.roadmap.create({
        data: {
          analysisId: analyseId,
          title: roadmap.title,
          duration: roadmap.duration,
        },
      });

      for (const phase of roadmap.phases || []) {
        const createdPhase = await prisma.roadmapPhase.create({
          data: {
            roadmapId: createdRoadmap.id,
            title: phase.title,
            duration: phase.duration,
          },
        });

        for (const task of phase.tasks || []) {
          await prisma.roadmapTask.create({
            data: {
              phaseId: createdPhase.id,
              task: task.task,
              resource: task.resource ?? null,
            },
          });
        }
      }

      return {success: true};
    });

    return {success: true};
  },
);
