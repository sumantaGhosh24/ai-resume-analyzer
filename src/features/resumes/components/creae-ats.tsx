"use client";

import {useState} from "react";
import {SendIcon} from "lucide-react";

import {useUpgradeModal} from "@/hooks/use-upgrade-modal";
import {useSubscriptionState} from "@/features/subscriptions/hooks/use-subscription";
import {usePrimaryColor} from "@/components/primary-provider";
import {LoadingSwap} from "@/components/loading-swap";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {useCreateATS} from "../hooks/use-resumes";

interface CreateATSFormProps {
  resumeId: string;
  jdId: string;
  analyseId: string;
}

const CreateATSForm = ({resumeId, jdId, analyseId}: CreateATSFormProps) => {
  const [pending, setPending] = useState(false);

  const createATS = useCreateATS();

  const {handleError, modal} = useUpgradeModal();

  const {getUsage, hasAccess} = useSubscriptionState();

  const uses = getUsage("ats_simulation");

  const {primaryColor} = usePrimaryColor();

  const handleCreateATS = async () => {
    setPending(true);

    createATS.mutate(
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
          <CardTitle>Create ATS</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto whitespace-pre-line leading-relaxed space-y-3 text-sm text-foreground/90">
          <Button
            type="button"
            disabled={
              createATS.isPending ||
              pending ||
              !hasAccess("ats_simulation") ||
              Number(uses?.used) >= Number(uses?.total)
            }
            size="lg"
            className={`w-full bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`}
            onClick={handleCreateATS}
          >
            <LoadingSwap
              isLoading={createATS.isPending}
              className="flex items-center"
            >
              <SendIcon className="mr-2" /> Create ATS
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

export default CreateATSForm;
