import z from "zod";

import prisma from "@/lib/db";
import {createTRPCRouter, protectedProcedure} from "@/trpc/init";

export const resumeRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(({ctx, input}) => {
      return prisma.resume.findUniqueOrThrow({
        where: {id: input.id, userId: ctx.auth.user.id},
        include: {
          skills: true,
          experiences: {
            include: {
              bullets: true,
            },
          },
          projects: {
            include: {
              bullets: true,
            },
          },
          education: true,
          analysis: {
            select: {
              id: true,
              status: true,
              score: true,
              missingSkills: true,
              suggestions: true,
              job: {
                select: {
                  id: true,
                  content: true,
                  seniority: true,
                  requiredSkills: true,
                  preferredSkills: true,
                  responsibilities: true,
                },
              },
            },
          },
        },
      });
    }),
});
