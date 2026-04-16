"use client";

import {formatDistanceToNow} from "date-fns";
import {FileIcon} from "lucide-react";

import {useEntitySearch} from "@/hooks/use-entity-search";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import {AnalysisStatus} from "@/generated/prisma/client";

import {useResumesParams} from "../hooks/use-resumes-params";
import {
  useRemoveResume,
  useSuspenseResumes,
  useUpdateResumeName,
} from "../hooks/use-resumes";
import CreateResumeForm from "./create-resume-form";

export const ResumesSearch = () => {
  const [params, setParams] = useResumesParams();

  const {searchValue, onSearchChange} = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search resumes"
    />
  );
};

export const ResumesPagination = () => {
  const resumes = useSuspenseResumes();

  const [params, setParams] = useResumesParams();

  return (
    <EntityPagination
      disabled={resumes.isFetching}
      totalPages={resumes.data.totalPages}
      page={resumes.data.page}
      onPageChange={(page) => setParams({...params, page})}
    />
  );
};

export const ResumesHeader = () => {
  return (
    <>
      <EntityHeader
        title="Resumes"
        description="Create and manage your resumes"
      />
    </>
  );
};

export const ResumesContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <CreateResumeForm />
      <EntityContainer
        header={<ResumesHeader />}
        search={<ResumesSearch />}
        pagination={<ResumesPagination />}
      >
        {children}
      </EntityContainer>
    </>
  );
};

export const ResumesLoading = () => {
  return <LoadingView message="Loading resumes..." />;
};

export const ResumesError = () => {
  return <ErrorView message="Error loading resumes" />;
};

export const ResumesEmpty = () => {
  return (
    <EmptyView message="You haven't created any resumes yet. Get started by creating your first resume" />
  );
};

export const ResumesList = () => {
  const resumes = useSuspenseResumes();

  return (
    <EntityList
      items={resumes.data.items}
      getKey={(resume) => resume.id}
      renderItem={(resume) => <ResumeItem data={resume} />}
      emptyView={<ResumesEmpty />}
    />
  );
};

interface ResumeItemsProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fileName: string | null;
  analysis: {
    id: string;
    status: AnalysisStatus;
  } | null;
}

export const ResumeItem = ({data}: {data: ResumeItemsProps}) => {
  const removeResume = useRemoveResume();

  const handleRemove = () => {
    removeResume.mutate({id: data.id});
  };

  const updateResume = useUpdateResumeName();

  const handleUpdate = (name: string) => {
    updateResume.mutate({id: data.id, name});
  };

  return (
    <EntityItem
      href={`/resume/${data.id}`}
      title={data.fileName!}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, {addSuffix: true})}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(data.createdAt, {addSuffix: true})}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <FileIcon className="size-5 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeResume.isPending}
      onUpdate={handleUpdate}
      isUpdating={updateResume.isPending}
      status={data?.analysis?.status || "PENDING"}
    />
  );
};
