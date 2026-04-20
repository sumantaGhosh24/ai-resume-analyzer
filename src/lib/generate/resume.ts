import {generateText} from "ai";

import {geminiModel} from "../ai";

export async function structuredResumeData(normalized: string) {
  const {text} = await generateText({
    model: geminiModel,
    prompt: `
      Extract structured resume JSON:

      {
        "skills": ["React"],
        "projects": [
          { "name": "", "bullets": [""] }
        ],
        "experience": [
          {
            "title": "",
            "company": "",
            "years": number,
            "bullets": [""]
          }
        ],
        "education": [
          {
            "degree": "",
            "institute": "",
            "year": ""
          }
        ],
        "years": number
      }

      ${normalized}
      `,
  });

  return text;
}
