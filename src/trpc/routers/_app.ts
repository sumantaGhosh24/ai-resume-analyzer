import {resumesRouter} from "@/features/resumes/server/routers";
import {resumeRouter} from "@/features/resume/server/routers";
import {atsRouter} from "@/features/ats/server/routers";
import {coverLetterRouter} from "@/features/cover-letter/server/routers";
import {rewrittenRouter} from "@/features/rewrite/server/routers";
import {roadmapRouter} from "@/features/roadmap/server/routers";

import {createTRPCRouter} from "../init";

export const appRouter = createTRPCRouter({
  resumes: resumesRouter,
  resume: resumeRouter,
  ats: atsRouter,
  coverLetter: coverLetterRouter,
  rewritten: rewrittenRouter,
  roadmap: roadmapRouter,
});

export type AppRouter = typeof appRouter;
