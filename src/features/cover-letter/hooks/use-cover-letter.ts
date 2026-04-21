import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {toast} from "sonner";

import {useTRPC} from "@/trpc/client";

export const useSuspenseCoverLetter = (resumeId: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.coverLetter.getOne.queryOptions({resumeId}));
};

export const useCreateCoverLetter = () => {
  const queryClient = useQueryClient();

  const trpc = useTRPC();

  return useMutation(
    trpc.coverLetter.create.mutationOptions({
      onSuccess: () => {
        toast.success("Create cover letter started");
        queryClient.invalidateQueries(trpc.resumes.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Failed to create cover letter: ${error.message}`);
      },
    }),
  );
};
