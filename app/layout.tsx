import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enterprise SaaS Operations Dashboard | MACHI",
  description:
    "Real-time operational command center for ingestion pipelines, reviewer workloads, compliance triage, and contract value analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
