import {prefetch, trpc} from "@/trpc/server";

export const prefetchRewrittenResume = (resumeId: string) => {
  return prefetch(trpc.rewritten.getOne.queryOptions({resumeId}));
};
