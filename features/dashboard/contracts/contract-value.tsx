"use client";

import React from "react";
import { FileText, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { WidgetErrorState } from "@/components/ui/widget-error-state";
import { useContracts } from "@/hooks/useDashboardQueries";
import { TOTAL_CONTRACT_VALUE_FORMATTED } from "@/lib/constants/mock-data";
import { ApiFilterParams } from "@/lib/api/client";

interface ContractValueProps {
  filters: ApiFilterParams;
}

export const ContractValue: React.FC<ContractValueProps> = ({ filters }) => {
  const { data: categories, isLoading, isError, error, refetch } = useContracts(filters);

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-56 mt-1" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <WidgetErrorState
        title="Failed to load Contract Categories"
        message={error?.message}
        onRetry={() => refetch()}
      />
    );
  }

  if (!categories) return null;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            Contract Value &amp; Category Distribution
          </CardTitle>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Total portfolio breakdown across active agreement structures
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Pipeline Value
          </span>
          <div className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400">
            {TOTAL_CONTRACT_VALUE_FORMATTED}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2.5">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="font-medium text-slate-800 dark:text-zinc-200 text-xs">
                  {cat.name}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="font-semibold text-slate-900 dark:text-zinc-100 text-xs">
                  {cat.amountFormatted}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({cat.percentageOfTotal}%)
                </span>
              </div>
            </div>
            <Progress
              value={cat.percentageOfTotal}
              max={55}
              className="h-1.5"
            />
          </div>
        ))}

        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            100% Audit Coverage Verified
          </span>
          <span className="font-mono text-[10px] text-slate-600 dark:text-zinc-300">
            {categories.length} Categories Active
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
