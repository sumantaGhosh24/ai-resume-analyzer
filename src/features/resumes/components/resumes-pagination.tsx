"use client";

import {Button} from "@/components/ui/button";

import {useResumesParams} from "../hooks/use-resumes-params";
import {useSuspenseResumes} from "../hooks/use-resumes";

export const ResumesPagination = () => {
  const resumes = useSuspenseResumes();

  const [params, setParams] = useResumesParams();

  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {resumes.data.page} of {resumes.data.totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={resumes.data.page === 1 || resumes.isFetching}
          variant="outline"
          size="sm"
          onClick={() =>
            setParams({...params, page: Math.max(1, resumes.data.page - 1)})
          }
        >
          Previous
        </Button>
        <Button
          disabled={
            resumes.data.page === resumes.data.totalPages ||
            resumes.data.totalPages === 0 ||
            resumes.isFetching
          }
          variant="outline"
          size="sm"
          onClick={() =>
            setParams({
              ...params,
              page: Math.min(resumes.data.totalPages, resumes.data.page + 1),
            })
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ResumesPagination;
