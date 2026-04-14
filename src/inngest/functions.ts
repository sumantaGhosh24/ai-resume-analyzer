import {createGoogleGenerativeAI} from "@ai-sdk/google";
import {generateText} from "ai";
import * as Sentry from "@sentry/nextjs";

import {inngest} from "./client";

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  {id: "execute-ai", triggers: {event: "execute/ai"}},
  async ({event, step}) => {
    await step.sleep("pretend", "5s");

    Sentry.logger.info("User triggered test log", {log_source: "sentry_test"});

    const {steps: geminiSteps} = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant.",
        prompt: "What is 2 + 2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );

    return {
      geminiSteps,
    };
  },
);
