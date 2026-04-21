import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {toast} from "sonner";

import {useTRPC} from "@/trpc/client";

export const useSuspenseATS = (resumeId: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.ats.getOne.queryOptions({resumeId}));
};

export const useCreateATS = () => {
  const queryClient = useQueryClient();

  const trpc = useTRPC();

  return useMutation(
    trpc.ats.create.mutationOptions({
      onSuccess: () => {
        toast.success("Resume ats simulation started");
        queryClient.invalidateQueries(trpc.resumes.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Failed to create ats: ${error.message}`);
      },
    }),
  );
};
