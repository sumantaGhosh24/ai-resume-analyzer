"use client";

const ResumesHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">Resumes</h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Create and manage your resumes
        </p>
      </div>
    </div>
  );
};

export default ResumesHeader;
