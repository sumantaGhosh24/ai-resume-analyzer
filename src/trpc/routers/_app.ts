import {resumesRouter} from "@/features/resumes/server/routers";

import {createTRPCRouter} from "../init";

export const appRouter = createTRPCRouter({
  resumes: resumesRouter,
});

export type AppRouter = typeof appRouter;
