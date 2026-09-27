"use client";

import React from "react";
import { KpiCard } from "./kpi-card";
import { useKpis } from "@/hooks/useDashboardQueries";
import { Skeleton } from "@/components/ui/skeleton";
import { WidgetErrorState } from "@/components/ui/widget-error-state";
import { ApiFilterParams } from "@/lib/api/client";

interface KpiGridProps {
  filters: ApiFilterParams;
  onCardClick?: (id: string) => void;
}

export const KpiGrid: React.FC<KpiGridProps> = ({ filters, onCardClick }) => {
  const { data: kpis, isLoading, isError, error, refetch } = useKpis(filters);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <WidgetErrorState
        title="Failed to load KPI metrics"
        message={error?.message}
        onRetry={() => refetch()}
      />
    );
  }

  if (!kpis || kpis.length === 0) return null;

  return (
    <div className="rounded-lg border border-slate-200/80 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-zinc-800/80">
        {kpis.map((metric) => (
          <KpiCard
            key={metric.id}
            metric={metric}
            onClick={() => onCardClick?.(metric.id)}
          />
        ))}
      </div>
    </div>
  );
};
