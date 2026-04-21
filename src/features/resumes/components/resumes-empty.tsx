"use client";

import {PackageOpenIcon} from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const ResumesEmpty = () => {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>No items</EmptyTitle>
      <EmptyDescription>
        You haven&apos;t created any resumes yet. Get started by creating your
        first resume
      </EmptyDescription>
    </Empty>
  );
};

export default ResumesEmpty;
