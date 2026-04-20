import {generateSlug} from "random-word-slugs";
import z from "zod";

import {useMeter} from "@/lib/polar-meter";
import prisma from "@/lib/db";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import {PAGINATION} from "@/constants/pagination";
import {inngest} from "@/inngest/client";

export const resumesRouter = createTRPCRouter({
  create: premiumProcedure
    .input(z.object({resumeUrl: z.string(), content: z.string()}))
    .mutation(async ({input, ctx}) => {
      await useMeter({
        customerId: ctx.customer.id,
        externalCustomerId: ctx.auth.user.id,
        meterName: "resume_analyze",
      });

      const resume = await prisma.resume.create({
        data: {
          userId: ctx.auth.user.id,
          fileName: generateSlug(3),
          fileUrl: input.resumeUrl,
        },
      });

      const jobDescription = await prisma.jobDescription.create({
        data: {
          userId: ctx.auth.user.id,
          content: input.content,
        },
      });

      const analysis = await prisma.analysis.create({
        data: {
          userId: ctx.auth.user.id,
          resumeId: resume.id,
          jobId: jobDescription.id,
          status: "PENDING",
        },
      });

      await inngest.send({
        name: "resume/uploaded",
        data: {
          fileUrl: input.resumeUrl,
          resumeId: resume.id,
          jdText: input.content,
          jdId: jobDescription.id,
          analyseId: analysis.id,
        },
      });

      return resume;
    }),
  createATS: premiumProcedure
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
  rewriteResume: premiumProcedure
    .input(
      z.object({resumeId: z.string(), jdId: z.string(), analyseId: z.string()}),
    )
    .mutation(async ({input, ctx}) => {
      await useMeter({
        customerId: ctx.customer.id,
        externalCustomerId: ctx.auth.user.id,
        meterName: "resume_rewrite",
      });

      const {resumeId, jdId, analyseId} = input;

      await inngest.send({
        name: "resume/rewrite",
        data: {
          resumeId,
          jdId,
          analyseId,
        },
      });

      return resumeId;
    }),
  remove: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(({ctx, input}) => {
      return prisma.resume.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
  updateName: protectedProcedure
    .input(z.object({id: z.string(), name: z.string().min(1)}))
    .mutation(({ctx, input}) => {
      return prisma.resume.update({
        where: {id: input.id, userId: ctx.auth.user.id},
        data: {fileName: input.name},
      });
    }),
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
  getATS: protectedProcedure
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
  getRewrittenResume: protectedProcedure
    .input(z.object({resumeId: z.string()}))
    .query(async ({ctx, input}) => {
      const analysis = await prisma.analysis.findUniqueOrThrow({
        where: {
          resumeId: input.resumeId,
          userId: ctx.auth.user.id,
        },
        include: {
          rewrittenResume: {
            include: {
              experiences: {include: {bullets: true}},
              projects: {include: {bullets: true}},
              skills: true,
            },
          },
        },
      });

      return analysis.rewrittenResume ?? null;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      }),
    )
    .query(async ({ctx, input}) => {
      const {page, pageSize, search} = input;

      const [items, totalCount] = await Promise.all([
        prisma.resume.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            userId: ctx.auth.user.id,
            fileName: {
              contains: search,
              mode: "insensitive",
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        }),
        prisma.resume.count({
          where: {
            userId: ctx.auth.user.id,
            fileName: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      ]);

      const itemsWithAnalysis = await Promise.all(
        items.map(async (item) => {
          const analysis = await prisma.analysis.findFirst({
            where: {resumeId: item.id, userId: ctx.auth.user.id},
          });

          return {...item, analysis};
        }),
      );

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items: itemsWithAnalysis,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),
});
