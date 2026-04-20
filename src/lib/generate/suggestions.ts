import {generateText} from "ai";
import {z} from "zod";

import {geminiModel} from "../ai";
import {safeJson} from "../analyze/resume";

export const SuggestionSchema = z.object({
  summary: z.string(),
  skills: z.array(z.string()),
  experience: z.array(z.string()),
  projects: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      details: z.array(z.string()),
      url: z.string().optional(),
    }),
  ),
});

export type SuggestionType = z.infer<typeof SuggestionSchema>;

export async function generateAISuggestions({
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
  You are an expert ATS resume evaluator.
  
  Improve the resume based on job description.
  
  Focus on:
  - Add measurable impact (numbers, metrics)
  - Add missing skills naturally
  - Improve clarity and ATS keywords
  
  Return ONLY JSON:
  
  {
    "summary": "improved summary",
    "skills": ["optimized skill list"],
    "experience": ["improved bullet points"],
    "projects": ["improved project descriptions"]
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

  return JSON.parse(makeResponseSafe);
}
