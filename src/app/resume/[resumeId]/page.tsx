import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";

import {requireAuth} from "@/lib/auth-utils";
import {
  prefetchATS,
  prefetchResume,
  prefetchRewrittenResume,
} from "@/features/resumes/server/prefetch";
import {HydrateClient} from "@/trpc/server";
import {
  Resume,
  ResumeError,
  ResumeLoading,
} from "@/features/resumes/components/resume";

export const metadata = {
  title: "Resume",
};

const ResumePage = async ({params}: PageProps<"/resume/[resumeId]">) => {
  await requireAuth();

  const {resumeId} = await params;

  prefetchResume(resumeId);

  prefetchATS(resumeId);

  prefetchRewrittenResume(resumeId);

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
