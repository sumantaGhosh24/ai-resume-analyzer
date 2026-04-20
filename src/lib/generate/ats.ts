import {generateText} from "ai";
import {z} from "zod";

import {geminiModel} from "../ai";
import {safeJson} from "../analyze/resume";

export const ATS_SCHEMA = z.object({
  ats_score: z.number(),
  keyword_match: z.number(),
  formatting_score: z.number(),
  section_score: z.number(),
  issues: z.array(z.string()),
  suggestions: z.array(z.string()),
  pass_probability: z.number(),
});

export type ATSResult = z.infer<typeof ATS_SCHEMA>;

export async function runATSSimulation({
  resumeText,
  jd,
}: {
  resumeText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jd: any;
}) {
  const {text} = await generateText({
    model: geminiModel,
    prompt: `
      You are an Applicant Tracking System (ATS).
      
      Analyze the resume against the job description.
      
      Evaluate:
      1. Keyword match (0-100)
      2. Formatting quality (0-100)
      3. Section completeness (0-100)
      4. ATS pass probability (0-100)
      
      Also provide:
      - Issues (bullet points)
      - Suggestions (bullet points)
      
      Return ONLY JSON:
      
      {
        "ats_score": number,
        "keyword_match": number,
        "formatting_score": number,
        "section_score": number,
        "issues": [],
        "suggestions": [],
        "pass_probability": number
      }
      
      Resume:
      ${resumeText}
      
      Job Description:
      ${JSON.stringify(jd)}
      `,
  });

  const makeResponseSafe = safeJson(text);

  return ATS_SCHEMA.parse(JSON.parse(makeResponseSafe));
}
