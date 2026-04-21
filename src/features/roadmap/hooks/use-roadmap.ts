import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {toast} from "sonner";

import {useTRPC} from "@/trpc/client";

export const useSuspenseRoadmap = (resumeId: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.roadmap.getOne.queryOptions({resumeId}));
};

export const useCreateRoadmap = () => {
  const queryClient = useQueryClient();

  const trpc = useTRPC();

  return useMutation(
    trpc.roadmap.create.mutationOptions({
      onSuccess: () => {
        toast.success("Create roadmap started");
        queryClient.invalidateQueries(trpc.resumes.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Failed to create roadmap: ${error.message}`);
      },
    }),
  );
};
