import prisma from "@/lib/db";

import {inngest} from "./client";

export const helloWorld = inngest.createFunction(
  {id: "hello-world", triggers: {event: "test/hello.world"}},
  async ({event, step}) => {
    await step.sleep("upload-resume", "10s");

    await step.sleep("parse", "10s");

    await step.sleep("sending-to-ai", "10s");

    await step.run("create-workflow", () => {
      return prisma.resume.create({
        data: {
          fileName: "resume-from-inngest",
          fileUrl: "resume.pdf",
          userId: "ZylvucYnTWnYgmCkT60mHyK3h5h1raCS",
        },
      });
    });
  },
);
