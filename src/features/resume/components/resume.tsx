"use client";

import {useSuspenseATS} from "@/features/ats/hooks/use-ats";
import {useSuspenseRewrittenResume} from "@/features/rewrite/hooks/use-rewritten";
import {useSuspenseCoverLetter} from "@/features/cover-letter/hooks/use-cover-letter";
import {useSuspenseRoadmap} from "@/features/roadmap/hooks/use-roadmap";
import ATSResults from "@/features/ats/components/ats-results";
import CreateATSForm from "@/features/ats/components/creae-ats";
import RewrittenResume from "@/features/rewrite/components/rewritten-resume";
import CreateRewrittenResume from "@/features/rewrite/components/create-rewritten-resume";
import CoverLetter from "@/features/cover-letter/components/cover-letter";
import CreateCoverLetter from "@/features/cover-letter/components/create-cover-letter";
import Roadmap from "@/features/roadmap/components/roadmap";
import CreateRoadmap from "@/features/roadmap/components/create-roadmap";

import {useSuspenseResume} from "../hooks/use-resume";
import ResumeHeader from "./resume-header";
import ResumePreview from "./resume-preview";
import JobDescription from "./job-description";
import FinalAnalysis from "./final-analysis";

const Resume = ({resumeId}: {resumeId: string}) => {
  const {data: resume} = useSuspenseResume(resumeId);

  const {data: ats} = useSuspenseATS(resumeId);

  const {data: rewritten} = useSuspenseRewrittenResume(resumeId);

  const {data: coverLetter} = useSuspenseCoverLetter(resumeId);

  const {data: roadmap} = useSuspenseRoadmap(resumeId);

  return (
    <div className="p-6 container mx-auto space-y-8">
      <ResumeHeader resumeId={resumeId} />
      <div className="grid md:grid-cols-2 gap-6">
        <ResumePreview resumeId={resumeId} />
        <JobDescription resumeId={resumeId} />
      </div>
      <FinalAnalysis resumeId={resumeId} />
      {ats ? (
        <ATSResults ats={ats} />
      ) : (
        <CreateATSForm
          resumeId={resumeId}
          jdId={resume?.analysis?.job?.id as string}
          analyseId={resume?.analysis?.id as string}
        />
      )}
      {rewritten ? (
        <RewrittenResume rewritten={rewritten} />
      ) : (
        <CreateRewrittenResume
          resumeId={resumeId}
          jdId={resume?.analysis?.job?.id as string}
          analyseId={resume?.analysis?.id as string}
        />
      )}
      {coverLetter ? (
        <CoverLetter coverLetter={coverLetter} />
      ) : (
        <CreateCoverLetter
          resumeId={resumeId}
          jdId={resume?.analysis?.job?.id as string}
          analyseId={resume?.analysis?.id as string}
        />
      )}
      {roadmap ? (
        <Roadmap roadmap={roadmap} />
      ) : (
        <CreateRoadmap
          resumeId={resumeId}
          jdId={resume?.analysis?.job?.id as string}
          analyseId={resume?.analysis?.id as string}
        />
      )}
    </div>
  );
};

export default Resume;
