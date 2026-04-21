import prisma from "@/lib/db";
import {
  cleanResumeText,
  extractTextFromPDF,
  normalizeResumeText,
} from "@/lib/analyze/resume";
import {generateCoverLetter} from "@/lib/generate/cover-letter";

import {inngest} from "../client";

export const coverLetterJob = inngest.createFunction(
  {id: "cover-letter", triggers: {event: "resume/cover-letter"}},
  async ({event, step}) => {
    const {resumeId, jdId, analyseId} = event.data;

    const {resumeText, jd, suggestions} = await step.run(
      "fetch-data",
      async () => {
        const existingCoverLetter = await prisma.coverLetter.findUnique({
          where: {analysisId: analyseId},
        });
        if (existingCoverLetter) {
          throw new Error(
            "Cover letter already exists for this analysis, aborting job.",
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

        let suggestions = {};
        if (analyseId) {
          const analysis = await prisma.analysis.findUnique({
            where: {id: analyseId},
          });
          if (analysis) {
            const suggestionsRecords = await prisma.suggestion.findMany({
              where: {analysisId: analyseId},
            });

            suggestions = suggestionsRecords.map(({type, content}) => ({
              type,
              content,
            }));
          }
        }

        const jd = {
          content: jdRecord.content,
          seniority: jdRecord.seniority,
          required_skills: jdRecord.requiredSkills.map((s) => s.name),
          preferred_skills: jdRecord.preferredSkills.map((s) => s.name),
          responsibilities: jdRecord.responsibilities.map((r) => r.content),
        };

        return {resumeText, jd, suggestions};
      },
    );

    const coverLetter = await step.run("generate-cover-letter", async () => {
      const existingCoverLetter = await prisma.coverLetter.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingCoverLetter) {
        throw new Error(
          "Cover letter already exists for this analysis, aborting job.",
        );
      }

      return await generateCoverLetter({
        resumeText,
        jd,
        suggestions,
      });
    });

    await step.run("save-cover-letter", async () => {
      const existingCoverLetter = await prisma.coverLetter.findUnique({
        where: {analysisId: analyseId},
      });
      if (existingCoverLetter) {
        throw new Error(
          "Cover letter already exists for this analysis, aborting job.",
        );
      }

      await prisma.coverLetter.create({
        data: {
          analysisId: analyseId,
          title: coverLetter.title,
          greeting: coverLetter.greeting,
          intro: coverLetter.intro,
          closing: coverLetter.closing,
          body: {
            create: coverLetter.body.map((content, idx) => ({
              content,
              order: idx,
            })),
          },
        },
        include: {
          body: true,
        },
      });

      return {success: true};
    });

    return {success: true};
  },
);
