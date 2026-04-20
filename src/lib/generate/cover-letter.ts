/* eslint-disable @typescript-eslint/no-explicit-any */
import {generateText} from "ai";
import {z} from "zod";

import {geminiModel} from "../ai";
import {safeJson} from "../analyze/resume";

export const CoverLetterSchema = z.object({
  title: z.string(),
  greeting: z.string(),
  intro: z.string(),
  body: z.array(z.string()),
  closing: z.string(),
});

export type CoverLetter = z.infer<typeof CoverLetterSchema>;

export async function generateCoverLetter({
  resumeText,
  jd,
  suggestions,
}: {
  resumeText: string;
  jd: any;
  suggestions: any;
}) {
  const {text} = await generateText({
    model: geminiModel,
    prompt: `
      You are a professional career coach.
      
      Write a personalized cover letter based on resume and job description.
      
      Rules:
      - Keep it concise (250-350 words)
      - Make it human and confident
      - Highlight relevant skills & projects
      - Use achievements (numbers if possible)
      - Avoid generic phrases
      
      Return ONLY JSON:
      
      {
        "title": "",
        "greeting": "",
        "intro": "",
        "body": ["paragraph1", "paragraph2"],
        "closing": ""
      }
      
      Resume:
      ${resumeText}
      
      Job Description:
      ${JSON.stringify(jd)}
      
      Resume Improvements:
      ${JSON.stringify(suggestions)}
      `,
  });

  const makeResponseSafe = safeJson(text);

  return CoverLetterSchema.parse(JSON.parse(makeResponseSafe));
}
