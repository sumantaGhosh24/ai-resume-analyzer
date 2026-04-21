import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";

import {requireAuth} from "@/lib/auth-utils";
import {prefetchResumes} from "@/features/resumes/server/prefetch";
import {resumesParamsLoader} from "@/features/resumes/server/params-loader";
import {HydrateClient} from "@/trpc/server";
import ResumesContainer from "@/features/resumes/components/resumes-container";
import ResumesError from "@/features/resumes/components/resumes-error";
import ResumesLoading from "@/features/resumes/components/resumes-loading";
import ResumesList from "@/features/resumes/components/resumes-list";

export const metadata = {
  title: "Dashboard",
};

const Dashboard = async ({searchParams}: PageProps<"/dashboard">) => {
  await requireAuth();

  const params = await resumesParamsLoader(searchParams);

  prefetchResumes(params);

  return (
    <ResumesContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<ResumesError />}>
          <Suspense fallback={<ResumesLoading />}>
            <ResumesList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </ResumesContainer>
  );
};

export default Dashboard;
