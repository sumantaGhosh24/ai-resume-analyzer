import {prefetch, trpc} from "@/trpc/server";

export const prefetchRoadmap = (resumeId: string) => {
  return prefetch(trpc.roadmap.getOne.queryOptions({resumeId}));
};
