import {generateText} from "ai";
import {z} from "zod";

import {geminiModel} from "../ai";
import {safeJson} from "../analyze/resume";

export const ResumeRewriteSchema = z.object({
  summary: z.string(),
  skills: z.array(z.string()),
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      bullets: z.array(z.string()),
    }),
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      bullets: z.array(z.string()),
    }),
  ),
});

export type ResumeRewrite = z.infer<typeof ResumeRewriteSchema>;

export async function rewriteResumeAI({
  resumeText,
  jd,
  missingSkills,
}: {
  resumeText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jd: any;
  missingSkills: string[];
}) {
  const {text} = await generateText({
    model: geminiModel,
    prompt: `
      You are an expert ATS resume optimizer.
      
      Rewrite the resume for the given job description.
      
      Rules:
      - Do NOT add fake experience
      - Improve clarity and impact
      - Add measurable results (%, numbers)
      - Naturally include missing skills
      - Optimize for ATS keyword scanning
      
      Return ONLY JSON:
      
      {
        "summary": "",
        "skills": [],
        "experience": [
          {
            "title": "",
            "company": "",
            "bullets": []
          }
        ],
        "projects": [
          {
            "name": "",
            "bullets": []
          }
        ]
      }
      
      Resume:
      ${resumeText}
      
      Job Description:
      ${JSON.stringify(jd)}
      
      Missing Skills:
      ${missingSkills.join(", ")}
      `,
  });

  const makeResponseSafe = safeJson(text);

  return ResumeRewriteSchema.parse(JSON.parse(makeResponseSafe));
}
