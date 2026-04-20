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

export const useSuspenseResume = (id: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.resumes.getOne.queryOptions({id}));
};

export const useSuspenseATS = (resumeId: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.resumes.getATS.queryOptions({resumeId}));
};

export const useSuspenseRewrittenResume = (resumeId: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(
    trpc.resumes.getRewrittenResume.queryOptions({resumeId}),
  );
};

export const useSuspenseCoverLetter = (resumeId: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.resumes.getCoverLetter.queryOptions({resumeId}));
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

export const useCreateATS = () => {
  const queryClient = useQueryClient();

  const trpc = useTRPC();

  return useMutation(
    trpc.resumes.createATS.mutationOptions({
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

export const useCreateRewrittenResume = () => {
  const queryClient = useQueryClient();

  const trpc = useTRPC();

  return useMutation(
    trpc.resumes.rewriteResume.mutationOptions({
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

export const useCreateCoverLetter = () => {
  const queryClient = useQueryClient();

  const trpc = useTRPC();

  return useMutation(
    trpc.resumes.createCoverLetter.mutationOptions({
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

export const useUpdateResumeName = () => {
  const queryClient = useQueryClient();

  const trpc = useTRPC();

  return useMutation(
    trpc.resumes.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Resume "${data.fileName}" updated`);
        queryClient.invalidateQueries(trpc.resumes.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.resumes.getOne.queryOptions({id: data.id}),
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
          trpc.resumes.getOne.queryFilter({id: data.id}),
        );
      },
    }),
  );
};
