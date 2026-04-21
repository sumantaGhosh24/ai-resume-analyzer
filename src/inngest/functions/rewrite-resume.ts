import prisma from "@/lib/db";
import {
  cleanResumeText,
  extractTextFromPDF,
  normalizeResumeText,
} from "@/lib/analyze/resume";
import {rewriteResumeAI} from "@/lib/generate/rewrite-resume";

import {inngest} from "../client";

export const rewriteResume = inngest.createFunction(
  {id: "resume-rewrite", triggers: {event: "resume/rewrite"}},
  async ({event, step}) => {
    const {resumeId, jdId, analyseId} = event.data;

    const {resumeText, jd} = await step.run("fetch-data", async () => {
      const existingRewriteResume = await prisma.rewrittenResume.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingRewriteResume) {
        throw new Error(
          "Rewrite resume already exists for this analysis, aborting job.",
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

      const jd = {
        content: jdRecord.content,
        seniority: jdRecord.seniority,
        required_skills: jdRecord.requiredSkills.map((s) => s.name),
        preferred_skills: jdRecord.preferredSkills.map((s) => s.name),
        responsibilities: jdRecord.responsibilities.map((r) => r.content),
      };

      let resumeText = "";
      if (resumeRecord.fileUrl) {
        const raw = await extractTextFromPDF(resumeRecord.fileUrl);

        const clean = cleanResumeText(raw);

        resumeText = normalizeResumeText(clean);
      } else {
        throw new Error("No resume fileUrl");
      }

      return {resumeText, jd};
    });

    const missingSkills = await step.run("find-missing-skills", async () => {
      const existingRewriteResume = await prisma.rewrittenResume.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingRewriteResume) {
        throw new Error(
          "Rewrite resume already exists for this analysis, aborting job.",
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

    const rewritten = await step.run("rewrite", async () => {
      const existingRewriteResume = await prisma.rewrittenResume.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingRewriteResume) {
        throw new Error(
          "Rewrite resume already exists for this analysis, aborting job.",
        );
      }

      return await rewriteResumeAI({
        resumeText,
        jd,
        missingSkills,
      });
    });

    await step.run("save-rewrite", async () => {
      const existingRewriteResume = await prisma.rewrittenResume.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingRewriteResume) {
        throw new Error(
          "Rewrite resume already exists for this analysis, aborting job.",
        );
      }

      const created = await prisma.rewrittenResume.create({
        data: {
          analysisId: analyseId,
          summary: rewritten.summary,
        },
      });

      if (Array.isArray(rewritten.experience)) {
        for (const exp of rewritten.experience) {
          const expRow = await prisma.rewrittenExperience.create({
            data: {
              title: exp.title,
              company: exp.company,
              rewrittenResumeId: created.id,
            },
          });

          if (Array.isArray(exp.bullets) && exp.bullets.length) {
            await prisma.rewrittenExperienceBullet.createMany({
              data: exp.bullets.map((b: string) => ({
                content: b,
                rewrittenExperienceId: expRow.id,
              })),
            });
          }
        }
      }

      if (Array.isArray(rewritten.projects)) {
        for (const proj of rewritten.projects) {
          const projRow = await prisma.rewrittenProject.create({
            data: {
              name: proj.name,
              rewrittenResumeId: created.id,
            },
          });

          if (Array.isArray(proj.bullets) && proj.bullets.length) {
            await prisma.rewrittenProjectBullet.createMany({
              data: proj.bullets.map((b: string) => ({
                content: b,
                rewrittenProjectId: projRow.id,
              })),
            });
          }
        }
      }

      if (Array.isArray(rewritten.skills) && rewritten.skills.length) {
        await prisma.rewrittenSkill.createMany({
          data: rewritten.skills.map((skill: string) => ({
            name: skill,
            rewrittenResumeId: created.id,
          })),
        });
      }

      return {success: true};
    });

    return {success: true};
  },
);
