import prisma from "@/lib/db";
import {
  cleanResumeText,
  extractTextFromPDF,
  normalizeResumeText,
} from "@/lib/analyze/resume";
import {runATSSimulation} from "@/lib/generate/ats";

import {inngest} from "../client";

export const atsSimulation = inngest.createFunction(
  {id: "ats-simulation", triggers: {event: "analysis/ats"}},
  async ({event, step}) => {
    const {resumeId, jdId, analyseId} = event.data;

    const {resumeText, jd} = await step.run("fetch-data", async () => {
      const existingAtsResult = await prisma.aTSResult.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingAtsResult) {
        throw new Error(
          "ATS result already exists for this analysis, aborting job.",
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

    const atsResult = await step.run("run-ats", async () => {
      const existingAtsResult = await prisma.aTSResult.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingAtsResult) {
        throw new Error(
          "ATS result already exists for this analysis, aborting job.",
        );
      }

      return await runATSSimulation({
        resumeText: resumeText,
        jd,
      });
    });

    await step.run("save-ats-result", async () => {
      const existingAtsResult = await prisma.aTSResult.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingAtsResult) {
        throw new Error(
          "ATS result already exists for this analysis, aborting job.",
        );
      }

      const ats = await prisma.aTSResult.create({
        data: {
          analysisId: analyseId,
          atsScore: atsResult.ats_score,
          keywordMatch: atsResult.keyword_match,
          formattingScore: atsResult.formatting_score,
          sectionScore: atsResult.section_score,
          passProbability: atsResult.pass_probability,
        },
      });

      if (Array.isArray(atsResult.issues) && atsResult.issues.length > 0) {
        await prisma.aTSIssue.createMany({
          data: atsResult.issues.map((content: string) => ({
            atsId: ats.id,
            content,
          })),
        });
      }

      if (
        Array.isArray(atsResult.suggestions) &&
        atsResult.suggestions.length > 0
      ) {
        await prisma.aTSSuggestion.createMany({
          data: atsResult.suggestions.map((content: string) => ({
            atsId: ats.id,
            content,
          })),
        });
      }
    });

    return {success: true};
  },
);
