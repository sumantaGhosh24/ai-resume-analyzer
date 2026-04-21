import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";

import {requireAuth} from "@/lib/auth-utils";
import {HydrateClient} from "@/trpc/server";
import {prefetchResume} from "@/features/resume/server/prefetch";
import {prefetchATS} from "@/features/ats/server/prefetch";
import {prefetchRewrittenResume} from "@/features/rewrite/server/prefetch";
import {prefetchCoverLetter} from "@/features/cover-letter/server/prefetch";
import {prefetchRoadmap} from "@/features/roadmap/server/prefetch";
import ResumeError from "@/features/resume/components/resume-error";
import ResumeLoading from "@/features/resume/components/resume-loading";
import Resume from "@/features/resume/components/resume";

export const metadata = {
  title: "Resume",
};

const ResumePage = async ({params}: PageProps<"/resume/[resumeId]">) => {
  await requireAuth();

  const {resumeId} = await params;

  prefetchResume(resumeId);

  prefetchATS(resumeId);

  prefetchRewrittenResume(resumeId);

  prefetchCoverLetter(resumeId);

  prefetchRoadmap(resumeId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ResumeError />}>
        <Suspense fallback={<ResumeLoading />}>
          <Resume resumeId={resumeId} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default ResumePage;
