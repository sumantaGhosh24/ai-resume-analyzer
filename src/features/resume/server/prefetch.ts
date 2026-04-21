import {prefetch, trpc} from "@/trpc/server";

export const prefetchResume = (id: string) => {
  return prefetch(trpc.resume.getOne.queryOptions({id}));
};
