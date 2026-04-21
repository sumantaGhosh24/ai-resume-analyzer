import {serve} from "inngest/next";

import {inngest} from "@/inngest/client";
import {processResume} from "@/inngest/functions/process-resume";
import {atsSimulation} from "@/inngest/functions/ats-simulation";
import {rewriteResume} from "@/inngest/functions/rewrite-resume";
import {coverLetterJob} from "@/inngest/functions/cover-letter-job";
import {roadmapJob} from "@/inngest/functions/roadmap-job";

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
