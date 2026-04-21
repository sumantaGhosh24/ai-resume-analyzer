import {generateText} from "ai";
import {z} from "zod";

import {geminiModel} from "../ai";
import {safeJson} from "../analyze/resume";

export const RoadmapSchema = z.object({
  title: z.string(),
  duration: z.string(),

  phases: z.array(
    z.object({
      title: z.string(),
      duration: z.string(),
      tasks: z.array(
        z.object({
          task: z.string(),
          resource: z.string().optional(),
        }),
      ),
    }),
  ),

  expectedOutcome: z.string(),
});

export type Roadmap = z.infer<typeof RoadmapSchema>;

export async function generateRoadmap({
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
      You are a career coach.

      Create a structured improvement roadmap.

      Based on:
      - Missing skills

      Rules:
      - Keep it realistic
      - Include phases (learning → practice → apply)
      - Add actionable tasks
      - Mention useful resources (optional)
      - Duration should be 2–4 weeks

      Return ONLY JSON:

      {
        "title": "roadmap name",
        "duration": "roadmap duration",
        "phases": [
          {
            "title": "phase title",
            "duration": "phase duration",
            "tasks": [
              { "task": "task name", "resource": "task resource" }
            ]
          }
        ],
        "expectedOutcome": ""
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
