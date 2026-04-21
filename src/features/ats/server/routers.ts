import z from "zod";

import {useMeter} from "@/lib/polar-meter";
import prisma from "@/lib/db";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import {inngest} from "@/inngest/client";

export const atsRouter = createTRPCRouter({
  create: premiumProcedure
    .input(
      z.object({resumeId: z.string(), jdId: z.string(), analyseId: z.string()}),
    )
    .mutation(async ({input, ctx}) => {
      await useMeter({
        customerId: ctx.customer.id,
        externalCustomerId: ctx.auth.user.id,
        meterName: "ats_simulation",
      });

      const {resumeId, jdId, analyseId} = input;

      await inngest.send({
        name: "analysis/ats",
        data: {
          resumeId,
          jdId,
          analyseId,
        },
      });

      return resumeId;
    }),
  getOne: protectedProcedure
    .input(z.object({resumeId: z.string()}))
    .query(async ({ctx, input}) => {
      const analysis = await prisma.analysis.findFirstOrThrow({
        where: {
          resumeId: input.resumeId,
          userId: ctx.auth.user.id,
        },
        select: {id: true},
      });

      return prisma.aTSResult.findFirst({
        where: {analysisId: analysis.id},
        include: {
          suggestions: true,
          issues: true,
        },
      });
    }),
});
