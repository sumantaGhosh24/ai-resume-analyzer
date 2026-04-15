import {requireAuth} from "@/lib/auth-utils";

const ResumePage = async ({params}: PageProps<"/resume/[resumeId]">) => {
  await requireAuth();

  const {resumeId} = await params;

  return <div>Resume Id: {resumeId}</div>;
};

export default ResumePage;
