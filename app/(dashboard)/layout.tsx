import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardFilterProvider } from "@/context/DashboardFilterContext";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/70 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <DashboardFilterProvider>
        <Sidebar initialActiveNav="dashboard" />
        <main className="flex-1">{children}</main>
      </DashboardFilterProvider>
    </div>
  );
}