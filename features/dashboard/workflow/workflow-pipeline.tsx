"use client";

import React from "react";
import { GitMerge, AlertTriangle, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { WidgetErrorState } from "@/components/ui/widget-error-state";
import { useWorkflow } from "@/hooks/useDashboardQueries";
import { ApiFilterParams } from "@/lib/api/client";
import { cn } from "@/utils";

interface WorkflowPipelineProps {
  filters: ApiFilterParams;
  onStageSelect?: (stageName: string) => void;
  selectedStage?: string | null;
}

export const WorkflowPipeline: React.FC<WorkflowPipelineProps> = ({
  filters,
  onStageSelect,
  selectedStage,
}) => {
  const { data: categories, isLoading, isError, error, refetch } = useWorkflow(filters);

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3 w-64 mt-1" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <WidgetErrorState
        title="Failed to load Workflow Pipeline"
        message={error?.message}
        onRetry={() => refetch()}
      />
    );
  }

  if (!categories) return null;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            <GitMerge className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            Workflow Lifecycle &amp; Stage Bottlenecks
          </CardTitle>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            End-to-end processing pipeline across 4 key operational phases
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="amber" className="gap-1">
            <AlertTriangle className="h-3 w-3" />
            1 Stage Bottleneck
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-lg border border-slate-200/80 bg-slate-50/50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            {/* Category Subheader */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wide">
                  {category.categoryName}
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 font-medium">
                  ({category.totalCount} items)
                </span>
              </div>
            </div>

            {/* Stage Grid / Pipeline Sequence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {category.stages.map((stage) => {
                const isSelected = selectedStage === stage.name;
                const isBottleneck = stage.status === "bottleneck";
                const isWarning = stage.status === "warning";

                return (
                  <div
                    key={stage.id}
                    onClick={() => onStageSelect?.(stage.name)}
                    className={cn(
                      "group relative flex flex-col justify-between rounded-md border p-2.5 transition-all cursor-pointer select-none",
                      isSelected
                        ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-500"
                        : isBottleneck
                        ? "border-amber-300 bg-amber-50/60 dark:border-amber-900/60 dark:bg-amber-950/30 hover:border-amber-400"
                        : isWarning
                        ? "border-amber-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                        : "border-slate-200/80 bg-white hover:border-slate-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                    )}
                  >
                    {/* Top row: Name & Count */}
                    <div className="flex items-start justify-between gap-1.5">
                      <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {stage.name}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-bold font-mono",
                          isBottleneck
                            ? "bg-amber-500 text-white"
                            : isWarning
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300"
                        )}
                      >
                        {stage.count}
                      </span>
                    </div>

                    {/* Bottom row: SLA / Velocity */}
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800/60 text-[11px]">
                      <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {stage.avgTimeHours}h avg
                      </span>
                      {isBottleneck ? (
                        <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-0.5">
                          ⚠️ Bottleneck
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                          On Track
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
