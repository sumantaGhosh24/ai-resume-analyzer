"use client";

import Link from "next/link";
import {AlertTriangleIcon} from "lucide-react";

import {usePrimaryColor} from "@/components/primary-provider";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Spinner} from "@/components/ui/spinner";

import {useSuspenseResume} from "../hooks/use-resume";

interface ResumeHeaderProps {
  resumeId: string;
}

const ResumeHeader = ({resumeId}: ResumeHeaderProps) => {
  const {data: resume} = useSuspenseResume(resumeId);

  const {primaryColor} = usePrimaryColor();

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Resume Analysis</h1>
          <div className="text-muted-foreground font-mono text-xs mt-1">
            Resume ID: <span className="font-medium">{resume.id}</span>
          </div>
          <div className="text-muted-foreground font-mono text-xs">
            Job Description ID:{" "}
            <span className="font-medium">{resume?.analysis?.job?.id}</span>
          </div>
          <div className="text-muted-foreground font-mono text-xs">
            Analysis ID:{" "}
            <span className="font-medium">{resume?.analysis?.id}</span>
          </div>
        </div>
        {resume.fileUrl && (
          <Button
            asChild
            className={`bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`}
          >
            <Link
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume PDF
            </Link>
          </Button>
        )}
      </div>
      {(resume?.analysis?.status === "PENDING" ||
        resume?.analysis?.status === "PROCESSING") && (
        <Alert>
          <Spinner />
          <AlertTitle>Processing!</AlertTitle>
          <AlertDescription>
            This Resume Analyse is under processing, values might changed after
            processing!
          </AlertDescription>
        </Alert>
      )}
      {resume?.analysis?.status === "FAILED" && (
        <Alert>
          <AlertTriangleIcon />
          <AlertTitle>Failed!</AlertTitle>
          <AlertDescription>
            This Resume Analyse is failed, try again later!
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ResumeHeader;
