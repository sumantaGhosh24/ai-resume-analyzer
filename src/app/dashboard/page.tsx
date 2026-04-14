"use client";

import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {useTRPC} from "@/trpc/client";

const Dashboard = () => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.resumes.getResumes.queryOptions());

  const create = useMutation(
    trpc.resumes.createResume.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    }),
  );

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Dashboard Page
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
    </div>
  );
};

export default Dashboard;
