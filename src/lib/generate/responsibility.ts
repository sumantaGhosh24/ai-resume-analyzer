import {generateText} from "ai";

import {geminiModel} from "../ai";

export async function responsibilityMatch(
  resumeText: string,
  responsibilities: string[],
) {
  const {text} = await generateText({
    model: geminiModel,
    temperature: 0,
    prompt: `
  Compare resume and responsibilities.
  Return a score from 0 to 100.
  
  Resume:
  ${resumeText}
  
  Responsibilities:
  ${responsibilities.join("\n")}`,
  });

  const score = Number(text.trim().match(/\d+/)?.[0]);

  if (isNaN(score)) return 50;

  return Math.min(Math.max(score, 0), 100);
}
