import {prefetch, trpc} from "@/trpc/server";

export const prefetchATS = (resumeId: string) => {
  return prefetch(trpc.ats.getOne.queryOptions({resumeId}));
};
