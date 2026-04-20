import type {inferInput} from "@trpc/tanstack-react-query";

import {prefetch, trpc} from "@/trpc/server";

type Input = inferInput<typeof trpc.resumes.getMany>;

export const prefetchResumes = (params: Input) => {
  return prefetch(trpc.resumes.getMany.queryOptions(params));
};

export const prefetchResume = (id: string) => {
  return prefetch(trpc.resumes.getOne.queryOptions({id}));
};

export const prefetchATS = (resumeId: string) => {
  return prefetch(trpc.resumes.getATS.queryOptions({resumeId}));
};
