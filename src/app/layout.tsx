import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";

import Navbar from "@/components/navbar";
import {ThemeProvider} from "@/components/theme-provider";
import PrimaryColorProvider from "@/components/primary-provider";
import {Toaster} from "@/components/ui/sonner";
import {TRPCReactProvider} from "@/trpc/client";

import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PrimaryColorProvider>
            <TRPCReactProvider>
              <Navbar />
              <main>{children}</main>
              <Toaster position="top-right" closeButton={true} />
            </TRPCReactProvider>
          </PrimaryColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
