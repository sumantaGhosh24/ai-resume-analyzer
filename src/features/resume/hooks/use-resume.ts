import {useSuspenseQuery} from "@tanstack/react-query";

import {useTRPC} from "@/trpc/client";

export const useSuspenseResume = (id: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.resume.getOne.queryOptions({id}));
};
