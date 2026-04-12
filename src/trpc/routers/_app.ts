import {createTRPCRouter} from "../init";

export const appRouter = createTRPCRouter({
  resumes: {},
});

export type AppRouter = typeof appRouter;
