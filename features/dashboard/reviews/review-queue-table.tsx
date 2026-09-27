"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { WidgetErrorState } from "@/components/ui/widget-error-state";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReviews } from "@/hooks/useDashboardQueries";
import { ReviewItem } from "@/lib/types";
import { formatCurrency } from "@/utils/helper/func";
import { queryKeys } from "@/lib/query/queryKeys";
import { api, ApiFilterParams } from "@/lib/api/client";
import { ReviewDetailDrawer } from "./review-detail-drawer";
import {
  Search,
  FileCheck2,
  Eye,
  UserPlus,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ReviewQueueTableProps {
  filters: ApiFilterParams;
  onReassignRequest: (item: ReviewItem) => void;
  selectedFilterStage?: string | null;
}

export const ReviewQueueTable: React.FC<ReviewQueueTableProps> = ({
  filters,
  onReassignRequest,
  selectedFilterStage,
}) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTabOverride, setActiveTabOverride] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Derive active tab cleanly
  const activeTab = useMemo(() => {
    if (activeTabOverride !== null) return activeTabOverride;
    if (selectedFilterStage === "Ready for Review") return "ready";
    if (selectedFilterStage === "In Review") return "in_review";
    if (selectedFilterStage === "Reviewed") return "reviewed";
    return "all";
  }, [activeTabOverride, selectedFilterStage]);

  const {
    data: reviewsResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useReviews({
    ...filters,
    page,
    pageSize,
    status: activeTab === "all" ? undefined : activeTab,
  });

  // Prefetch Next Page for instant pagination navigation
  useEffect(() => {
    if (reviewsResponse && page < reviewsResponse.totalPages) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: queryKeys.reviews({
          dateRange: filters.dateRange || "30d",
          department: filters.department || "all",
          page: nextPage,
          pageSize,
          status: activeTab === "all" ? undefined : activeTab,
          simulateError: filters.simulateError,
        }),
        queryFn: () =>
          api.getReviews({
            ...filters,
            page: nextPage,
            pageSize,
            status: activeTab === "all" ? undefined : activeTab,
          }),
      });
    }
  }, [reviewsResponse, page, filters, activeTab, pageSize, queryClient]);

  const total = reviewsResponse?.total || 0;
  const totalPages = reviewsResponse?.totalPages || 1;

  const filteredItems = useMemo(() => {
    const rawItems = reviewsResponse?.data || [];
    return rawItems.filter((item) => {
      // Tab filter
      if (activeTab === "ready" && item.status !== "Ready for Review") return false;
      if (activeTab === "in_review" && item.status !== "In Review") return false;
      if (activeTab === "unassigned" && item.assignedReviewerId !== "rev-unassigned")
        return false;
      if (activeTab === "urgent" && item.priority !== "High") return false;

      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        return (
          item.applicationId.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.vendorName.toLowerCase().includes(q) ||
          item.assignedReviewerName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [reviewsResponse, activeTab, searchQuery]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-3 w-80 mt-1" />
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <WidgetErrorState
        title="Failed to load Review Queue"
        message={error?.message}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2.5">
        <div>
          <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            <FileCheck2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            Operational Review Queue &amp; Compliance Triage
          </CardTitle>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Active applications awaiting compliance verification ({total} total items)
          </p>
        </div>

        {/* Search Input & Status Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-52">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search app, vendor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-7 text-[11px]"
            />
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={(val) => {
              setActiveTabOverride(val);
              setPage(1);
            }}
          >
            <TabsList>
              <TabsTrigger value="all">All ({total})</TabsTrigger>
              <TabsTrigger value="urgent" className="text-rose-600 dark:text-rose-400">
                Urgent (14)
              </TabsTrigger>
              <TabsTrigger value="ready">Ready (58)</TabsTrigger>
              <TabsTrigger value="unassigned" className="text-amber-600 dark:text-amber-400">
                Unassigned (5)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200/80 bg-slate-50/70 dark:border-zinc-800 dark:bg-zinc-900/60">
              <TableHead className="w-[110px]">App ID</TableHead>
              <TableHead>Title &amp; Vendor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned Reviewer</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Age / SLA</TableHead>
              <TableHead className="text-right">Contract Value</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-20 text-center text-xs text-slate-500">
                  No review items matching the selected filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => {
                const isUnassigned = item.assignedReviewerId === "rev-unassigned";
                const isUrgent = item.priority === "High";

                return (
                  <TableRow
                    key={item.id}
                    className={`transition-colors ${
                      isUnassigned
                        ? "bg-amber-50/30 hover:bg-amber-50/60 dark:bg-amber-950/15"
                        : isUrgent
                        ? "bg-rose-50/20 hover:bg-rose-50/50 dark:bg-rose-950/10"
                        : "hover:bg-slate-50/80 dark:hover:bg-zinc-800/40"
                    }`}
                  >
                    <TableCell className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                      {item.applicationId}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-xs text-slate-900 dark:text-zinc-100 truncate max-w-[210px]">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                          {item.vendorName} • {item.department}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "Ready for Review"
                            ? "rose"
                            : item.status === "In Review"
                            ? "amber"
                            : "emerald"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar
                          initials={item.assignedReviewerName.slice(0, 2)}
                          name={item.assignedReviewerName}
                          size="sm"
                        />
                        <span
                          className={`text-xs font-medium truncate max-w-[110px] ${
                            isUnassigned
                              ? "text-rose-600 dark:text-rose-400 font-semibold"
                              : "text-slate-700 dark:text-zinc-300"
                          }`}
                        >
                          {item.assignedReviewerName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.priority === "High"
                            ? "rose"
                            : item.priority === "Medium"
                            ? "amber"
                            : "secondary"
                        }
                      >
                        {item.priority === "High" && "🔥 "}
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-slate-700 dark:text-zinc-300 text-[11px]">
                        {item.ageDays}d active
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-slate-900 dark:text-zinc-100 text-xs">
                      {formatCurrency(item.contractValue)}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsDrawerOpen(true);
                        }}
                        title="View detail drawer"
                      >
                        <Eye className="h-3.5 w-3.5 text-slate-500" />
                      </Button>

                      {isUnassigned ? (
                        <Button
                          size="xs"
                          variant="amber"
                          onClick={() => onReassignRequest(item)}
                          className="gap-1 font-medium"
                        >
                          <UserPlus className="h-3 w-3" />
                          Assign
                        </Button>
                      ) : item.status !== "Reviewed" ? (
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => {
                            // Local optimistic approve
                          }}
                          className="gap-1 text-emerald-700 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100"
                        >
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                          Approve
                        </Button>
                      ) : (
                        <Badge variant="emerald">Approved</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-slate-200/70 dark:border-zinc-800 text-xs">
          <span className="text-slate-500 dark:text-zinc-400 font-medium">
            Page <span className="font-semibold text-slate-900 dark:text-zinc-100">{page}</span> of{" "}
            <span className="font-semibold text-slate-900 dark:text-zinc-100">{totalPages}</span> ({total} items total)
          </span>

          <div className="flex items-center gap-1.5">
            <Button
              size="xs"
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="gap-1"
            >
              <ChevronLeft className="h-3 w-3" />
              Previous
            </Button>
            <Button
              size="xs"
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>

      <ReviewDetailDrawer
        item={selectedItem}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onReassign={(item) => {
          setIsDrawerOpen(false);
          onReassignRequest(item);
        }}
        onApprove={() => {}}
      />
    </Card>
  );
};
