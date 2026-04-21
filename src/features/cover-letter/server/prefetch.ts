import {prefetch, trpc} from "@/trpc/server";

export const prefetchCoverLetter = (resumeId: string) => {
  return prefetch(trpc.coverLetter.getOne.queryOptions({resumeId}));
};
