export function cleanJobDescription(rawText: string): string {
  if (!rawText) return "";

  let text = rawText;

  text = text.replace(/\r\n/g, "\n");

  text = text.replace(/[ \t]+/g, " ");

  text = text.replace(/\n{3,}/g, "\n\n");

  text = text
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  text = text.replace(/[^\x00-\x7F]/g, " ");

  return text.trim();
}
