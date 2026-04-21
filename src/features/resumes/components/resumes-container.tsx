"use client";

import CreateResumeForm from "./create-resume-form";
import ResumesHeader from "./resumes-header";
import ResumesSearch from "./resumes-search";
import ResumesPagination from "./resumes-pagination";

export const ResumesContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <CreateResumeForm />
      <div className="p-4 md:px-10 md:py-6 h-full">
        <div className="mx-auto container w-full flex flex-col gap-y-8 h-full">
          <ResumesHeader />
          <div className="flex flex-col gap-y-4 h-full">
            <ResumesSearch />
            {children}
          </div>
          <ResumesPagination />
        </div>
      </div>
    </>
  );
};

export default ResumesContainer;
