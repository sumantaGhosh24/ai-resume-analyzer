import type {Metadata} from "next";
import {Geist, Geist_Mono, Inter} from "next/font/google";
import {NuqsAdapter} from "nuqs/adapters/next/app";

import {cn} from "@/lib/utils";
import Navbar from "@/components/navbar";
import {ThemeProvider} from "@/components/theme-provider";
import PrimaryColorProvider from "@/components/primary-provider";
import {Toaster} from "@/components/ui/sonner";
import {TRPCReactProvider} from "@/trpc/client";

import "./globals.css";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | AI Resume Analyzer",
    default: "AI Resume Analyzer",
  },
  description: "AI Resume Analyzer website using nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          inter.variable,
          "min-h-screen bg-background text-foreground antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PrimaryColorProvider>
            <TRPCReactProvider>
              <NuqsAdapter>
                <Navbar />
                <main>{children}</main>
                <Toaster position="top-right" closeButton={true} />
              </NuqsAdapter>
            </TRPCReactProvider>
          </PrimaryColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
