import pdf from "pdf-parse";

export const runtime = "nodejs";

export async function extractTextFromPDF(resumeUrl: string): Promise<string> {
  try {
    const res = await fetch(resumeUrl);

    const arrayBuffer = await res.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const parser = await pdf(buffer);

    return parser.text;
  } catch {
    throw new Error("Failed to extract text from PDF");
  }
}

export function cleanResumeText(rawText: string): string {
  if (!rawText) return "";

  let text = rawText;

  text = text.replace(/\r\n/g, "\n");

  text = text.replace(/\n{3,}/g, "\n\n");

  text = text.replace(/[^\x00-\x7F]/g, " ");

  text = text.replace(/-\n/g, "");

  text = text.replace(/[ \t]+/g, " ");

  text = text
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  text = text.replace(/\n{2,}/g, "\n\n");

  text = text.replace(/[_\-]{3,}/g, "");

  return text.trim();
}

export function normalizeResumeText(text: string): string {
  let normalized = text;

  normalized = normalized
    .replace(/work experience/gi, "EXPERIENCE")
    .replace(/professional experience/gi, "EXPERIENCE")
    .replace(/projects?/gi, "PROJECTS")
    .replace(/skills?/gi, "SKILLS")
    .replace(/education/gi, "EDUCATION");

  return normalized;
}

export function safeJson(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}
