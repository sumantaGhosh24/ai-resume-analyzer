"use client";

import {SearchIcon} from "lucide-react";

import {useEntitySearch} from "@/hooks/use-entity-search";
import {Input} from "@/components/ui/input";

import {useResumesParams} from "../hooks/use-resumes-params";

export const ResumesSearch = () => {
  const [params, setParams] = useResumesParams();

  const {searchValue, onSearchChange} = useEntitySearch({
    params,
    setParams,
  });

  return (
    <div className="relative">
      <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="w-full bg-background shadow-none border-border pl-8"
        placeholder="Search resumes"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default ResumesSearch;
