"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { OperationalStatus } from "./operational-status";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardFilters } from "@/context/DashboardFilterContext";
import { KpiGrid } from "./kpis/kpi-grid";
import { WorkflowPipeline } from "./workflow/workflow-pipeline";
import { ReviewerWorkload } from "./reviewers/reviewer-workload";
import { ReviewQueueTable } from "./reviews/review-queue-table";
// Lazy-load heavy chart analytics components
const PaymentAnalytics = dynamic(
  () =>
    import("@/features/dashboard/payments/payment-analytics").then(
      (mod) => mod.PaymentAnalytics
    ),
  {
    loading: () => (
      <div className="h-64 rounded-lg border border-slate-200/80 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-48 w-full mt-3" />
      </div>
    ),
  }
);

const ContractValue = dynamic(
  () =>
    import("@/features/dashboard/contracts/contract-value").then(
      (mod) => mod.ContractValue
    ),
  {
    loading: () => (
      <div className="h-64 rounded-lg border border-slate-200/80 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-48 w-full mt-3" />
      </div>
    ),
  }
);

export function DashboardContent() {
  const { filters, selectedWorkflowStage, setSelectedWorkflowStage } =
    useDashboardFilters();

  const scrollToReviewQueue = () => {
    const el = document.getElementById("review-queue-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-1 flex-col min-w-0">
      {/* Top Header */}
      <Header />

      {/* Dashboard Content Container */}
      <main className="flex-1 space-y-5 p-4 sm:p-6 max-w-[1600px] w-full mx-auto">
        {/* Layer 1: Operational Health Status & Attention Hub */}
        <OperationalStatus
          onTriageClick={scrollToReviewQueue}
          onReassignClick={scrollToReviewQueue}
          onWorkflowStageClick={(stage) => {
            setSelectedWorkflowStage(stage);
            scrollToReviewQueue();
          }}
        />

        {/* Layer 2: Core KPI Metrics Grid */}
        <KpiGrid
          filters={filters}
          onCardClick={(id) => {
            if (id === "kpi-review-needed") scrollToReviewQueue();
          }}
        />

        {/* Layer 3: Workflow Pipeline (2/3) + Reviewer Workload (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <WorkflowPipeline
              filters={filters}
              selectedStage={selectedWorkflowStage}
              onStageSelect={(stage) => {
                setSelectedWorkflowStage(stage);
                scrollToReviewQueue();
              }}
            />
          </div>
          <div className="lg:col-span-1">
            <ReviewerWorkload filters={filters} />
          </div>
        </div>

        {/* Layer 4: Interactive Review Queue & Triage Table */}
        <div id="review-queue-section" className="scroll-mt-20">
          <ReviewQueueTable
            filters={filters}
            selectedFilterStage={selectedWorkflowStage}
            onReassignRequest={() => {
              scrollToReviewQueue();
            }}
          />
        </div>

        {/* Layer 5: Lazy-loaded Financial Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1">
          <PaymentAnalytics filters={filters} />
          <ContractValue filters={filters} />
        </div>
      </main>
    </div>
  );
}
