"use state";

import {ChangeEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "sonner";
import {SendIcon, UploadIcon} from "lucide-react";

import {useUpgradeModal} from "@/hooks/use-upgrade-modal";
import {useUploadThing} from "@/lib/uploadthing";
import {useSubscriptionState} from "@/features/subscriptions/hooks/use-subscription";
import {usePrimaryColor} from "@/components/primary-provider";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoadingSwap} from "@/components/loading-swap";
import {Textarea} from "@/components/ui/textarea";

import {useCreateResume} from "../hooks/use-resumes";

const createResumeSchema = z.object({
  resumeUrl: z.string(),
  content: z.string().min(1).max(5000),
});

type CreateResumeFormType = z.infer<typeof createResumeSchema>;

const CreateResumeForm = () => {
  const [files, setFiles] = useState<File[]>([]);

  const {startUpload, isUploading} = useUploadThing("imageUploader");

  const form = useForm<CreateResumeFormType>({
    resolver: zodResolver(createResumeSchema),
    defaultValues: {
      resumeUrl: "",
      content: "",
    },
  });

  const router = useRouter();

  const createResume = useCreateResume();

  const {handleError, modal} = useUpgradeModal();

  const {getUsage, hasAccess} = useSubscriptionState();

  const uses = getUsage("resume_analyze");

  const {primaryColor} = usePrimaryColor();

  const onSubmit = async (values: CreateResumeFormType) => {
    if (!files) return toast.error("Please select your resume first.");

    const imgRes = await startUpload(files);
    if (imgRes && imgRes[0].ufsUrl) {
      values.resumeUrl = imgRes[0].ufsUrl;
    }

    createResume.mutate(
      {
        ...values,
      },
      {
        onSuccess: (data) => {
          form.reset();
          setFiles([]);
          router.push(`/resume/${data.id}`);
        },
        onError: (error) => {
          handleError(error);
        },
      },
    );
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto my-10">
      {modal}
      <div className="rounded-2xl shadow-md p-8 dark:shadow-gray-400">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-6 text-primary tracking-tight">
            Analyze my resume
          </h2>
          <FieldGroup className="flex flex-col gap-6">
            <Controller
              control={form.control}
              name="resumeUrl"
              render={({field, fieldState}) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className={`border-2 border-dashed border-accent/60 bg-muted/40 hover:bg-muted/60 dark:bg-[#18181b] dark:border-gray-700 dark:hover:bg-[#232329] transition shadow-inner h-40 w-full rounded-xl grid place-items-center relative overflow-hidden`}
                >
                  <FieldLabel
                    htmlFor={field.name}
                    className="flex flex-col items-center justify-center h-full w-full cursor-pointer gap-2"
                  >
                    {files.length > 0 ? (
                      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                        <embed
                          src={URL.createObjectURL(files[0])}
                          type="application/pdf"
                          width="100%"
                          height="100%"
                          className="rounded-lg border bg-background dark:bg-[#222226] shadow-md transition-all w-full h-full"
                        />
                        <span className="text-xs text-muted-foreground truncate dark:text-gray-400">
                          Resume Preview
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-black">
                        <UploadIcon size={38} className="dark:text-gray-400" />
                        <span className="text-sm font-medium text-muted-foreground dark:text-gray-300">
                          Click or drop PDF here
                        </span>
                        <span className="text-xs dark:text-gray-500">
                          PDF, max 5MB
                        </span>
                      </div>
                    )}
                  </FieldLabel>
                  <Input
                    type="file"
                    accept="application/pdf"
                    placeholder="Upload your resume"
                    onChange={(e) => handleImage(e, field.onChange)}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {fieldState.invalid && (
                    <div className="absolute bottom-2 w-full flex justify-center">
                      <FieldError errors={[fieldState.error]} />
                    </div>
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="content"
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <span className="font-medium text-muted-foreground mb-1 block">
                    Job Description
                  </span>
                  <Textarea
                    placeholder="Paste your job description here…"
                    rows={7}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="rounded-lg border border-input focus:border-primary/60 bg-background shadow-sm transition min-h-[120px] resize-y"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <div className="mt-1">
                      <FieldError errors={[fieldState.error]} />
                    </div>
                  )}
                </Field>
              )}
            />
            <Button
              type="submit"
              disabled={
                createResume.isPending ||
                isUploading ||
                !hasAccess("resume_analyze") ||
                Number(uses?.used) >= Number(uses?.total)
              }
              size="lg"
              className={`w-full bg-${primaryColor}-700 hover:bg-${primaryColor}-800 text-white`}
            >
              <LoadingSwap
                isLoading={createResume.isPending || isUploading}
                className="flex items-center"
              >
                <SendIcon className="mr-2" /> Analyze Resume
                <span className="text-xs opacity-80 ml-2">
                  {" "}
                  ({uses?.used}/{uses?.total})
                </span>
              </LoadingSwap>
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default CreateResumeForm;
