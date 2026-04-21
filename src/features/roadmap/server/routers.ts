import z from "zod";

import {useMeter} from "@/lib/polar-meter";
import prisma from "@/lib/db";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import {inngest} from "@/inngest/client";

export const roadmapRouter = createTRPCRouter({
  create: premiumProcedure
    .input(
      z.object({resumeId: z.string(), jdId: z.string(), analyseId: z.string()}),
    )
    .mutation(async ({input, ctx}) => {
      await useMeter({
        customerId: ctx.customer.id,
        externalCustomerId: ctx.auth.user.id,
        meterName: "roadmap_generator",
      });

      const {resumeId, analyseId, jdId} = input;

      await inngest.send({
        name: "resume/roadmap",
        data: {
          analyseId,
          resumeId,
          jdId,
        },
      });

      return resumeId;
    }),
  getOne: protectedProcedure
    .input(z.object({resumeId: z.string()}))
    .query(async ({ctx, input}) => {
      const analysis = await prisma.analysis.findUniqueOrThrow({
        where: {
          resumeId: input.resumeId,
          userId: ctx.auth.user.id,
        },
        include: {
          roadmap: {
            include: {
              phases: {
                include: {
                  tasks: true,
                },
              },
            },
          },
        },
      });

      return analysis.roadmap ?? null;
    }),
});
