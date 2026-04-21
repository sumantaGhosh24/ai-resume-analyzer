import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {toast} from "sonner";

import {useTRPC} from "@/trpc/client";

export const useSuspenseRewrittenResume = (resumeId: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.rewritten.getOne.queryOptions({resumeId}));
};

export const useCreateRewrittenResume = () => {
  const queryClient = useQueryClient();

  const trpc = useTRPC();

  return useMutation(
    trpc.rewritten.create.mutationOptions({
      onSuccess: () => {
        toast.success("Resume rewritten started");
        queryClient.invalidateQueries(trpc.resumes.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Failed to create rewritten: ${error.message}`);
      },
    }),
  );
};
