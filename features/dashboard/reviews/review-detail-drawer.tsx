"use client";

import React from "react";
import { Sheet } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ReviewItem } from "@/lib/types";
import { formatCurrency } from "@/utils/helper/func";
import { Calendar, Building, FileText, CheckCircle2 } from "lucide-react";

interface ReviewDetailDrawerProps {
  item: ReviewItem | null;
  isOpen: boolean;
  onClose: () => void;
  onReassign: (item: ReviewItem) => void;
  onApprove: (item: ReviewItem) => void;
}

export const ReviewDetailDrawer: React.FC<ReviewDetailDrawerProps> = ({
  item,
  isOpen,
  onClose,
  onReassign,
  onApprove,
}) => {
  if (!item) return null;

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={`Application Details: ${item.applicationId}`}
      description={item.title}
    >
      <div className="space-y-5">
        {/* Status & Priority Header */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center gap-2">
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
            <Badge
              variant={
                item.priority === "High"
                  ? "rose"
                  : item.priority === "Medium"
                  ? "amber"
                  : "secondary"
              }
            >
              {item.priority} Priority
            </Badge>
          </div>
          <span className="text-xs font-mono font-bold text-slate-900 dark:text-zinc-100">
            {formatCurrency(item.contractValue)}
          </span>
        </div>

        {/* Vendor & Department */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400">
            <Building className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-slate-900 dark:text-zinc-200">Vendor:</span>
            <span>{item.vendorName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400">
            <FileText className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-slate-900 dark:text-zinc-200">Department:</span>
            <span>{item.department}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-slate-900 dark:text-zinc-200">Age / Due SLA:</span>
            <span>{item.ageDays} days active (Due: {item.dueDate})</span>
          </div>
        </div>

        {/* Assigned Reviewer Section */}
        <div className="p-3 rounded-lg border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Current Reviewer
          </span>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar
                initials={item.assignedReviewerName.slice(0, 2)}
                name={item.assignedReviewerName}
                size="md"
              />
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-zinc-100">
                  {item.assignedReviewerName}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                  {item.assignedReviewerId === "rev-unassigned"
                    ? "⚠️ Awaiting assignment"
                    : "Assigned reviewer"}
                </p>
              </div>
            </div>
            <Button
              size="xs"
              variant="outline"
              onClick={() => onReassign(item)}
            >
              Reassign
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col gap-2">
          <Button
            onClick={() => {
              onApprove(item);
              onClose();
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Approve &amp; Complete Review
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full">
            Close Panel
          </Button>
        </div>
      </div>
    </Sheet>
  );
};
