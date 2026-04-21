import {serve} from "inngest/next";

import {inngest} from "@/inngest/client";
import {
  atsSimulation,
  coverLetterJob,
  processResume,
  rewriteResume,
  roadmapJob,
} from "@/inngest/functions";

export const {GET, POST, PUT} = serve({
  client: inngest,
  functions: [
    processResume,
    atsSimulation,
    rewriteResume,
    coverLetterJob,
    roadmapJob,
  ],
});
