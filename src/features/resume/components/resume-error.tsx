"use client";

import {AlertTriangleIcon} from "lucide-react";

export const ResumeError = () => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <AlertTriangleIcon className="size-6 text-primary" />
      <p className="text-sm text-muted-foreground">Error loading resume</p>
    </div>
  );
};

export default ResumeError;
