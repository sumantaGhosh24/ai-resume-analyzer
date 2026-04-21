"use client";

import {useState} from "react";
import {SendIcon} from "lucide-react";

import {useUpgradeModal} from "@/hooks/use-upgrade-modal";
import {useSubscriptionState} from "@/features/subscriptions/hooks/use-subscription";
import {usePrimaryColor} from "@/components/primary-provider";
import {LoadingSwap} from "@/components/loading-swap";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {useCreateRoadmap} from "../hooks/use-roadmap";

interface CreateRoadmapProps {
  resumeId: string;
  jdId: string;
  analyseId: string;
}

const CreateRoadmap = ({resumeId, jdId, analyseId}: CreateRoadmapProps) => {
  const [pending, setPending] = useState(false);

  const createRoadmap = useCreateRoadmap();

  const {handleError, modal} = useUpgradeModal();

  const {getUsage, hasAccess} = useSubscriptionState();

  const uses = getUsage("roadmap_generator");

  const {primaryColor} = usePrimaryColor();

  const handleCreateRoadmap = async () => {
    setPending(true);

    createRoadmap.mutate(
      {
        resumeId,
        jdId,
        analyseId,
      },
      {
        onError: (error) => {
          handleError(error);
        },
      },
    );
  };

  return (
    <>
      {modal}
      <Card className="overflow-hidden flex flex-col h-full">
        <CardHeader>
          <CardTitle>Create Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto whitespace-pre-line leading-relaxed space-y-3 text-sm text-foreground/90">
          <Button
            type="button"
            disabled={
              createRoadmap.isPending ||
              pending ||
              !hasAccess("roadmap_generator") ||
              Number(uses?.used) >= Number(uses?.total)
            }
            size="lg"
            className={`w-full bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`}
            onClick={handleCreateRoadmap}
          >
            <LoadingSwap
              isLoading={createRoadmap.isPending}
              className="flex items-center"
            >
              <SendIcon className="mr-2" /> Create Roadmap
              <span className="text-xs opacity-80 ml-2">
                {" "}
                ({uses?.used}/{uses?.total})
              </span>
            </LoadingSwap>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateRoadmap;
