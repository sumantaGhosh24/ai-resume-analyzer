import prisma from "@/lib/db";
import {inngest} from "@/inngest/client";

import {createTRPCRouter, protectedProcedure} from "../init";

export const appRouter = createTRPCRouter({
  resumes: {
    getResumes: protectedProcedure.query(() => {
      return prisma.resume.findMany();
    }),
    createResume: protectedProcedure.mutation(async () => {
      await inngest.send({
        name: "test/hello.world",
        data: {
          email: "test@mail.com",
        },
      });

      return {success: true, message: "Job queued"};
    }),
  },
});

export type AppRouter = typeof appRouter;
