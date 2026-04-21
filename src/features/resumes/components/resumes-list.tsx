"use client";

import {useSuspenseResumes} from "../hooks/use-resumes";
import ResumeItem from "./resume-item";
import ResumesEmpty from "./resumes-empty";

const ResumesList = () => {
  const resumes = useSuspenseResumes();

  if (resumes.data.items.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-sm mx-auto">
          <ResumesEmpty />
        </div>
      </div>
    );
  }

  return (
    <div className={"flex flex-col gap-y-4"}>
      {resumes.data.items.map((item) => (
        <div key={item.id}>
          <ResumeItem data={item} />
        </div>
      ))}
    </div>
  );
};

export default ResumesList;
