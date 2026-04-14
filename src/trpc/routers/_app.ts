import prisma from "@/lib/db";
import {inngest} from "@/inngest/client";

import {createTRPCRouter, protectedProcedure} from "../init";

export const appRouter = createTRPCRouter({
  resumes: {
    testAi: protectedProcedure.mutation(async () => {
      await inngest.send({
        name: "execute/ai",
      });

      return {success: true, message: "Job queued"};
    }),
    getResumes: protectedProcedure.query(() => {
      return prisma.resume.findMany();
    }),
    createResume: protectedProcedure.mutation(async () => {
      await prisma.resume.create({
        data: {
          fileName: "test",
          fileUrl: "test.pdf",
          userId: "ZylvucYnTWnYgmCkT60mHyK3h5h1raCS",
        },
      });

      return {success: true, message: "Job queued"};
    }),
  },
});

export type AppRouter = typeof appRouter;
