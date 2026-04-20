import prisma from "@/lib/db";
import {
  cleanResumeText,
  extractTextFromPDF,
  normalizeResumeText,
  safeJson,
} from "@/lib/analyze/resume";
import {cleanJobDescription} from "@/lib/analyze/jd";
import {
  exactMatch,
  findMissingSkills,
  projectMatch,
  semanticMatch,
  seniorityMatch,
} from "@/lib/analyze/matching";
import {generateAISuggestions} from "@/lib/generate/suggestions";
import {extractJDWithAI} from "@/lib/generate/jd";
import {responsibilityMatch} from "@/lib/generate/responsibility";
import {structuredResumeData} from "@/lib/generate/resume";

import {inngest} from "./client";

export const processResume = inngest.createFunction(
  {id: "process-resume", triggers: {event: "resume/uploaded"}},
  async ({event, step}) => {
    const {fileUrl, resumeId, jdText, jdId, analyseId} = event.data;

    await prisma.analysis.update({
      where: {id: analyseId},
      data: {status: "PROCESSING"},
    });

    const {parsedResume, resumeText} = await step.run(
      "handle-resume",
      async () => {
        const raw = await extractTextFromPDF(fileUrl);

        const clean = cleanResumeText(raw);

        const normalized = normalizeResumeText(clean);

        const text = await structuredResumeData(normalized);

        const makeResponseSafe = safeJson(text);

        const parsedResume = JSON.parse(makeResponseSafe);
        const resumeText = normalized;

        await prisma.resumeSkill.createMany({
          data: parsedResume.skills.map((s: string) => ({
            resumeId,
            name: s,
          })),
        });

        for (const exp of parsedResume.experience || []) {
          const created = await prisma.resumeExperience.create({
            data: {
              resumeId,
              title: exp.title,
              company: exp.company,
              years: exp.years,
            },
          });

          if (exp.bullets?.length) {
            await prisma.resumeExperienceBullet.createMany({
              data: exp.bullets.map((b: string) => ({
                experienceId: created.id,
                content: b,
              })),
            });
          }
        }

        for (const proj of parsedResume.projects || []) {
          const created = await prisma.resumeProject.create({
            data: {
              resumeId,
              name: proj.name,
            },
          });

          if (proj.bullets?.length) {
            await prisma.resumeProjectBullet.createMany({
              data: proj.bullets.map((b: string) => ({
                projectId: created.id,
                content: b,
              })),
            });
          }
        }

        await prisma.resumeEducation.createMany({
          data: (parsedResume.education || []).map(
            (e: {degree: string; institute: string; year: string}) => ({
              resumeId,
              degree: e.degree,
              institute: e.institute,
              year: e.year,
            }),
          ),
        });

        return {parsedResume, resumeText};
      },
    );

    const jd = await step.run("handle-jd", async () => {
      const clean = cleanJobDescription(jdText);

      const jd = await extractJDWithAI(clean);

      await prisma.jobDescription.update({
        where: {id: jdId},
        data: {seniority: jd.seniority},
      });

      await prisma.jDRequiredSkill.createMany({
        data: jd.required_skills.map((s: string) => ({
          jobId: jdId,
          name: s,
        })),
      });

      await prisma.jDPreferredSkill.createMany({
        data: jd.preferred_skills.map((s: string) => ({
          jobId: jdId,
          name: s,
        })),
      });

      await prisma.jDResponsibility.createMany({
        data: jd.responsibilities.map((r: string) => ({
          jobId: jdId,
          content: r,
        })),
      });

      return jd;
    });

    const result = await step.run("calculate-score", async () => {
      const resumeSkills = parsedResume.skills;
      const jdSkills = jd.required_skills;

      const exact = exactMatch(resumeSkills, jdSkills);

      const semantic = semanticMatch(resumeSkills, jdSkills);

      const skillScore = (exact + semantic) / 2;

      const projectScore = projectMatch(parsedResume.projects, jdSkills);

      const respScore = await responsibilityMatch(
        resumeText,
        jd.responsibilities,
      );

      const seniorityScore = seniorityMatch(parsedResume.years, jd.seniority);

      const finalScore = Math.round(
        0.4 * skillScore +
          0.2 * projectScore +
          0.2 * respScore +
          0.2 * seniorityScore,
      );

      const missingSkills = await findMissingSkills(resumeSkills, jdSkills);

      const suggestions = await generateAISuggestions({
        resumeText,
        jd,
        missingSkills,
      });

      return {
        finalScore,
        skillScore,
        projectScore,
        respScore,
        missingSkills,
        suggestions,
        seniorityScore,
      };
    });

    await step.run("save-analysis", async () => {
      const {
        finalScore,
        skillScore,
        projectScore,
        respScore,
        missingSkills,
        suggestions,
        seniorityScore,
      } = result;

      await prisma.analysisScore.create({
        data: {
          analysisId: analyseId,
          totalScore: finalScore,
          skillMatch: skillScore,
          projectMatch: projectScore,
          responsibilityMatch: respScore,
          seniorityMatch: seniorityScore,
        },
      });

      await prisma.missingSkill.createMany({
        data: missingSkills.map((s) => ({
          analysisId: analyseId,
          name: s,
        })),
      });

      await prisma.suggestion.createMany({
        data: [
          {
            analysisId: analyseId,
            type: "SUMMARY",
            content: suggestions.summary,
          },
          ...suggestions.skills.map((s: string) => ({
            analysisId: analyseId,
            type: "SKILLS",
            content: s,
          })),
          ...suggestions.experience.map((e: string) => ({
            analysisId: analyseId,
            type: "EXPERIENCE",
            content: e,
          })),
          ...suggestions.projects.map((p: string) => ({
            analysisId: analyseId,
            type: "PROJECT",
            content: JSON.stringify(p),
          })),
        ],
      });

      return {success: true};
    });

    await prisma.analysis.update({
      where: {id: analyseId},
      data: {status: "COMPLETED"},
    });

    return {success: true};
  },
);
