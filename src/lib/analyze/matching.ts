import Fuse from "fuse.js";

export function semanticMatch(resumeSkills: string[], jdSkills: string[]) {
  const fuse = new Fuse(resumeSkills, {
    threshold: 0.3,
  });

  let score = 0;

  for (const skill of jdSkills) {
    const result = fuse.search(skill);
    if (result.length > 0) score++;
  }

  return (score / jdSkills.length) * 100;
}

export const normalize = (arr: string[]) =>
  arr.map((s) => s.toLowerCase().trim());

export function exactMatch(resumeSkills: string[], jdSkills: string[]) {
  const r = normalize(resumeSkills);
  const j = normalize(jdSkills);

  const matched = j.filter((skill) => r.includes(skill));

  return (matched.length / j.length) * 100;
}

export function projectMatch(
  projects: {
    name: string;
    bullets: {
      content: string;
    }[];
  }[],
  jdSkills: string[],
) {
  if (!projects?.length || !jdSkills?.length) return 0;

  const text = projects
    .map((p) => {
      const bulletsText = Array.isArray(p.bullets)
        ? p.bullets.map((b) => b?.content || "").join(" ")
        : "";
      return `${p.name} ${bulletsText}`;
    })
    .join(" ")
    .toLowerCase();

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

  const normalizedText = normalize(text);

  const matches = jdSkills.filter((skill) =>
    normalizedText.includes(normalize(skill)),
  );

  return (matches.length / jdSkills.length) * 100;
}

const skillMap: Record<string, string[]> = {
  react: ["react.js", "reactjs"],
  node: ["node.js", "nodejs"],
  javascript: ["js", "ecmascript"],
};

function expandSkill(skill: string): string[] {
  const base = skill.toLowerCase().trim();
  return [base, ...(skillMap[base] || [])];
}

export async function findMissingSkills(
  resumeSkills: string[],
  jdSkills: string[],
) {
  const rSkills = resumeSkills.map((s) => s.toLowerCase().trim());

  const fuse = new Fuse(rSkills, {
    threshold: 0.3,
  });

  const missing: string[] = [];

  for (const jdSkill of jdSkills) {
    const variants = expandSkill(jdSkill);

    let matched = false;

    for (const variant of variants) {
      if (rSkills.includes(variant)) {
        matched = true;
        break;
      }

      if (rSkills.some((r) => r.includes(variant))) {
        matched = true;
        break;
      }

      const result = fuse.search(variant);
      if (result.length > 0) {
        matched = true;
        break;
      }
    }

    if (!matched) {
      missing.push(jdSkill);
    }
  }

  return missing;
}

export function seniorityMatch(
  resumeYears: number,
  jdSeniority: "junior" | "mid" | "senior",
) {
  const ranges = {
    junior: {min: 0, ideal: 1, max: 2},
    mid: {min: 2, ideal: 4, max: 6},
    senior: {min: 5, ideal: 7, max: 12},
  };

  const range = ranges[jdSeniority];

  if (resumeYears < range.min) {
    return Math.max((resumeYears / range.min) * 60, 10);
  }

  if (resumeYears >= range.min && resumeYears <= range.max) {
    const diff = Math.abs(resumeYears - range.ideal);
    const maxDiff = range.max - range.min;

    return 100 - (diff / maxDiff) * 20;
  }

  if (resumeYears > range.max) {
    const extra = resumeYears - range.max;
    return Math.max(100 - extra * 5, 70);
  }

  return 50;
}
