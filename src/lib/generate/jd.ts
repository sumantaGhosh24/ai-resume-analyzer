import {generateText} from "ai";
import {z} from "zod";

import {geminiModel} from "../ai";
import {safeJson} from "../analyze/resume";

export const JD_SCHEMA = z.object({
  required_skills: z.array(z.string()),
  preferred_skills: z.array(z.string()),
  responsibilities: z.array(z.string()),
  seniority: z.enum(["junior", "mid", "senior"]),
});

export type JDParsed = z.infer<typeof JD_SCHEMA>;

export async function extractJDWithAI(cleanedText: string) {
  const {text} = await generateText({
    model: geminiModel,
    prompt: `
You are an expert job description analyzer.

Extract structured data from the job description.

Rules:
- Return ONLY valid JSON
- Do not add explanation
- Skills should be concise (React, Node.js, etc.)
- Detect seniority:
  - 0-2 years → junior
  - 3-5 years → mid
  - 5+ years → senior

Output format:
{
  "required_skills": [],
  "preferred_skills": [],
  "responsibilities": [],
  "seniority": "junior | mid | senior"
}

Job Description:
${cleanedText}
`,
    temperature: 0.2,
  });

  const makeResponseSafe = safeJson(text);

  return JD_SCHEMA.parse(JSON.parse(makeResponseSafe));
}
