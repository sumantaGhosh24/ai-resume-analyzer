import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {nextCookies} from "better-auth/next-js";
import {twoFactor} from "better-auth/plugins";
import {passkey} from "@better-auth/passkey";
import {createAuthMiddleware} from "better-auth/api";
import {checkout, polar, portal, usage, webhooks} from "@polar-sh/better-auth";

import prisma from "./db";
import {sendPasswordResetEmail} from "./email/password-reset-email";
import {sendEmailVerificationEmail} from "./email/email-verification";
import {sendDeleteAccountVerificationEmail} from "./email/delete-account-verification";
import {sendWelcomeEmail} from "./email/welcome-email";
import {polarClient} from "./polar";

export const auth = betterAuth({
  appName: "AI Resume Analyzer",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({user, url}) => {
      await sendPasswordResetEmail({user, url});
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({user, url}) => {
      await sendEmailVerificationEmail({user, url});
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({user, url, newEmail}) => {
        await sendEmailVerificationEmail({
          user: {...user, email: newEmail},
          url,
        });
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({user, url}) => {
        await sendDeleteAccountVerificationEmail({user, url});
      },
    },
    additionalFields: {
      favoriteNumber: {
        type: "number",
        required: true,
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      mapProfileToUser: (profile) => {
        return {
          favoriteNumber: Number(profile.public_repos) || 0,
        };
      },
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      mapProfileToUser: () => {
        return {
          favoriteNumber: 0,
        };
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60,
    },
  },
  plugins: [
    nextCookies(),
    twoFactor(),
    passkey(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "a66a278d-458a-4c6c-a69d-d5f919bf8892",
              slug: "basic",
            },
            {
              productId: "6bf09996-9f03-4fbf-baaf-9e158c5a8acb",
              slug: "pro",
            },
          ],
          successUrl: `${process.env.POLAR_SUCCESS_URL}/dashboard`,
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
          onCustomerCreated: async (payload) => {
            await polarClient.subscriptions.create({
              customerId: payload.data.id,
              productId: "a66a278d-458a-4c6c-a69d-d5f919bf8892",
            });
          },
        }),
      ],
    }),
  ],
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const user = ctx.context.newSession?.user ?? {
          name: ctx.body.name,
          email: ctx.body.email,
        };

        if (user != null) {
          await sendWelcomeEmail(user);
        }
      }
    }),
  },
});
