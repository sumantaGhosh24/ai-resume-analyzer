"use client";

import {Loader2Icon} from "lucide-react";

export const ResumeLoading = () => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <Loader2Icon className="size-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading resume...</p>
    </div>
  );
};

export default ResumeLoading;
