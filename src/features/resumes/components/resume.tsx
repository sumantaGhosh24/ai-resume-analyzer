"use client";

import {ErrorView, LoadingView} from "@/components/entity-components";

import {useSuspenseResume} from "../hooks/use-resumes";

export const ResumeLoading = () => {
  return <LoadingView message="Loading resume..." />;
};

export const ResumeError = () => {
  return <ErrorView message="Error loading resume" />;
};

export const Resume = ({resumeId}: {resumeId: string}) => {
  const {data: resume} = useSuspenseResume(resumeId);

  return (
    <div className="container mx-auto">
      <p>{JSON.stringify(resume, null, 2)}</p>
    </div>
  );
};
