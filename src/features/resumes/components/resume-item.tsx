"use client";

import {useState} from "react";
import Link from "next/link";
import {formatDistanceToNow} from "date-fns";
import {toast} from "sonner";
import {
  EyeIcon,
  FileIcon,
  MoreVerticalIcon,
  PenIcon,
  SendIcon,
  TrashIcon,
} from "lucide-react";

import {cn} from "@/lib/utils";
import {usePrimaryColor} from "@/components/primary-provider";
import {LoadingSwap} from "@/components/loading-swap";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {AnalysisStatus} from "@/generated/prisma/client";

import {useRemoveResume, useUpdateResumeName} from "../hooks/use-resumes";

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

const ResumeItem = ({data}: {data: ResumeItemsProps}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState(data.fileName!);

  const {primaryColor} = usePrimaryColor();

  const removeResume = useRemoveResume();

  const updateResume = useUpdateResumeName();

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (removeResume.isPending || updateResume.isPending) {
      return;
    }

    removeResume.mutate({id: data.id});
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleUpdate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (removeResume.isPending || updateResume.isPending) {
      return;
    }

    if (fileName.length < 0) {
      toast.error("File name is required");
    }

    if (fileName.length > 50) {
      toast.error("File name length not be greater than 50");
    }

    updateResume.mutate({id: data.id, name: fileName});

    setIsEditing(false);
  };

  return (
    <Card
      className={cn(
        "p-4 shadow-none hover:shadow transition-all",
        removeResume.isPending && "opacity-50 cursor-not-allowed",
        updateResume.isPending && "opacity-50 cursor-not-allowed",
      )}
    >
      <CardContent className="flex flex-row items-center justify-between p-0">
        <div className="flex items-center gap-3 w-full">
          <div className="size-8 flex items-center justify-center">
            <FileIcon className="size-5 text-muted-foreground" />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              {isEditing ? (
                <div className="flex items-center gap-3 mb-3 w-full">
                  <Input
                    type="text"
                    placeholder="Enter file name"
                    id="fileName"
                    name="fileName"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full"
                  />
                  <Button
                    type="button"
                    disabled={updateResume.isPending}
                    className={`bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`}
                    onClick={handleUpdate}
                  >
                    <LoadingSwap
                      isLoading={Boolean(updateResume.isPending)}
                      className="flex items-center"
                    >
                      <SendIcon className="mr-2" /> Update
                    </LoadingSwap>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <CardTitle className="text-base font-medium">
                    {data.fileName}
                  </CardTitle>
                  {data?.analysis?.status && (
                    <Badge
                      className={cn(
                        "ml-2 uppercase",
                        data?.analysis?.status === "PENDING" &&
                          "bg-yellow-100 text-yellow-800",
                        data?.analysis?.status === "PROCESSING" &&
                          "bg-blue-100 text-blue-800",
                        data?.analysis?.status === "COMPLETED" &&
                          "bg-green-100 text-green-800",
                        data?.analysis?.status === "FAILED" &&
                          "bg-red-100 text-red-800",
                      )}
                    >
                      {data?.analysis?.status}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <CardDescription className="text-xs">
              <>
                Updated {formatDistanceToNow(data.updatedAt, {addSuffix: true})}{" "}
                &bull; Created{" "}
                {formatDistanceToNow(data.createdAt, {addSuffix: true})}
              </>
            </CardDescription>
          </div>
        </div>
        <div className="flex gap-x-4 items-center">
          <Button size="icon" variant="ghost" asChild>
            <Link href={`/resume/${data.id}`}>
              <EyeIcon className="size-4" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem
                onClick={handleRemove}
                className="cursor-pointer"
              >
                <TrashIcon className="size-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                <PenIcon className="size-4" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeItem;
