"use client";

import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {useTRPC} from "@/trpc/client";
import {useSubscriptionState} from "@/features/subscriptions/hooks/use-subscription";

const Dashboard = () => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.resumes.getResumes.queryOptions());

  const testAi = useMutation(
    trpc.resumes.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI Job queued");
      },
    }),
  );

  const create = useMutation(
    trpc.resumes.createResume.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    }),
  );

  const testPremium = useMutation(
    trpc.resumes.testPremium.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    }),
  );

  const {hasAccess, getUsage} = useSubscriptionState();

  const usage = getUsage("resume_analyze");

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Dashboard Page
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
      <Button
        disabled={testPremium.isPending || !hasAccess("resume_analyze")}
        onClick={() => testPremium.mutate()}
      >
        Test Premium {usage?.used}/{usage?.total}
      </Button>
    </div>
  );
};

export default Dashboard;
