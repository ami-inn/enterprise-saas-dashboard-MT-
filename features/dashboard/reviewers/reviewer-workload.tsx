"use client";

import React, { useState } from "react";
import { Users, UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { WidgetErrorState } from "@/components/ui/widget-error-state";
import { useReviewers } from "@/hooks/useDashboardQueries";
import { ReassignModal } from "./reassign-modal";
import { ApiFilterParams } from "@/lib/api/client";
import { cn } from "@/utils";

interface ReviewerWorkloadProps {
  filters: ApiFilterParams;
}

export const ReviewerWorkload: React.FC<ReviewerWorkloadProps> = ({ filters }) => {
  const { data: reviewersData, isLoading, isError, error, refetch } = useReviewers(filters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overrideReviewers, setOverrideReviewers] = useState<typeof reviewersData | null>(null);

  const activeReviewers = overrideReviewers || reviewersData || [];

  const unassignedCount =
    activeReviewers.find((r) => r.id === "rev-unassigned")?.assignedCount || 0;

  const handleConfirmReassign = (targetReviewerId: string) => {
    setOverrideReviewers(
      activeReviewers.map((r) => {
        if (r.id === targetReviewerId) {
          return { ...r, assignedCount: r.assignedCount + 1 };
        }
        if (r.id === "rev-unassigned" && r.assignedCount > 0) {
          return { ...r, assignedCount: r.assignedCount - 1 };
        }
        return r;
      })
    );
  };

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-56 mt-1" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <WidgetErrorState
        title="Failed to load Reviewer Workload"
        message={error?.message}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            Reviewer Workload &amp; Capacity
          </CardTitle>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Real-time allocation across active auditors + unassigned queue
          </p>
        </div>

        {unassignedCount > 0 && (
          <Button
            size="xs"
            variant="amber"
            onClick={() => setIsModalOpen(true)}
            className="gap-1 font-semibold"
          >
            <UserPlus className="h-3 w-3" />
            Clear Unassigned ({unassignedCount})
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {activeReviewers.map((reviewer) => {
          const isUnassigned = reviewer.id === "rev-unassigned";
          const isOverloaded = reviewer.status === "overloaded";
          const isHigh = reviewer.status === "high";

          const percent = isUnassigned
            ? 100
            : Math.min(Math.round((reviewer.assignedCount / reviewer.capacityLimit) * 100), 100);

          return (
            <div
              key={reviewer.id}
              className={cn(
                "rounded-lg border p-2.5 transition-all",
                isUnassigned
                  ? "border-amber-300 bg-amber-50/50 dark:border-amber-900/60 dark:bg-amber-950/20"
                  : isOverloaded
                  ? "border-rose-200 bg-rose-50/30 dark:border-rose-900/40 dark:bg-rose-950/10"
                  : "border-slate-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar
                    initials={reviewer.avatar}
                    name={reviewer.name}
                    size="sm"
                    statusColor={
                      isUnassigned
                        ? "bg-amber-500"
                        : isOverloaded
                        ? "bg-rose-500"
                        : isHigh
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }
                  />
                  <div className="truncate">
                    <p
                      className={cn(
                        "text-xs font-semibold truncate",
                        isUnassigned
                          ? "text-amber-800 dark:text-amber-300 font-bold"
                          : "text-slate-800 dark:text-zinc-200"
                      )}
                    >
                      {reviewer.name}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                      {reviewer.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-zinc-100">
                    {reviewer.assignedCount}{" "}
                    {!isUnassigned && (
                      <span className="text-slate-400 font-normal">
                        / {reviewer.capacityLimit}
                      </span>
                    )}
                  </span>
                  <Badge
                    variant={
                      isUnassigned
                        ? "amber"
                        : isOverloaded
                        ? "rose"
                        : isHigh
                        ? "amber"
                        : "emerald"
                    }
                  >
                    {isUnassigned
                      ? "Action Req."
                      : isOverloaded
                      ? "100% Full"
                      : `${percent}%`}
                  </Badge>
                </div>
              </div>

              {!isUnassigned && (
                <div className="mt-2">
                  <Progress
                    value={percent}
                    indicatorClassName={
                      isOverloaded
                        ? "bg-rose-500"
                        : isHigh
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }
                    className="h-1.5"
                  />
                </div>
              )}
            </div>
          );
        })}
      </CardContent>

      <ReassignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirmReassign={handleConfirmReassign}
      />
    </Card>
  );
};
