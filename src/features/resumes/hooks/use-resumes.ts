import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {toast} from "sonner";

import {useTRPC} from "@/trpc/client";

import {useResumesParams} from "./use-resumes-params";

export const useSuspenseResumes = () => {
  const trpc = useTRPC();

  const [params] = useResumesParams();

  return useSuspenseQuery(trpc.resumes.getMany.queryOptions(params));
};

export const useCreateResume = () => {
  const queryClient = useQueryClient();

  const trpc = useTRPC();

  return useMutation(
    trpc.resumes.create.mutationOptions({
      onSuccess: () => {
        toast.success("Resume analysis started");
        queryClient.invalidateQueries(trpc.resumes.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Failed to create resume: ${error.message}`);
      },
    }),
  );
};

export const useUpdateResumeName = () => {
  const queryClient = useQueryClient();

  const trpc = useTRPC();

  return useMutation(
    trpc.resumes.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Resume "${data.fileName}" updated`);
        queryClient.invalidateQueries(trpc.resumes.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.resume.getOne.queryOptions({id: data.id}),
        );
      },
      onError: (error) => {
        toast.error(`Failed to update resume: ${error.message}`);
      },
    }),
  );
};

export const useRemoveResume = () => {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  return useMutation(
    trpc.resumes.remove.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Resume "${data.fileName}" removed`);
        queryClient.invalidateQueries(trpc.resumes.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.resume.getOne.queryFilter({id: data.id}),
        );
      },
    }),
  );
};
