"use client";

import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ReviewItem } from "@/lib/types";
import { MOCK_REVIEWERS } from "@/lib/constants/mock-data";

interface ReassignModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetItem?: ReviewItem | null;
  onConfirmReassign: (targetReviewerId: string) => void;
}

export const ReassignModal: React.FC<ReassignModalProps> = ({
  isOpen,
  onClose,
  targetItem,
  onConfirmReassign,
}) => {
  const [selectedReviewerId, setSelectedReviewerId] = useState<string>("");

  const eligibleReviewers = MOCK_REVIEWERS.filter(
    (rev) => rev.id !== "rev-unassigned"
  );

  const handleSave = () => {
    if (selectedReviewerId) {
      onConfirmReassign(selectedReviewerId);
      onClose();
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Reassign Review Workload"
      description={
        targetItem
          ? `Reassign ${targetItem.applicationId} (${targetItem.title}) to an available reviewer`
          : "Select a reviewer with available capacity to balance workload"
      }
    >
      <div className="space-y-4">
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {eligibleReviewers.map((reviewer) => {
            const isSelected = selectedReviewerId === reviewer.id;
            const isOverloaded = reviewer.status === "overloaded";
            const percent = Math.round((reviewer.assignedCount / reviewer.capacityLimit) * 100);

            return (
              <div
                key={reviewer.id}
                onClick={() => setSelectedReviewerId(reviewer.id)}
                className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/60 ring-1 ring-indigo-500"
                    : isOverloaded
                    ? "border-rose-200 bg-rose-50/30 opacity-60 dark:border-rose-900/40"
                    : "border-slate-200 bg-white hover:border-slate-300 dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Avatar initials={reviewer.avatar} name={reviewer.name} size="md" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-zinc-100">
                      {reviewer.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                      {reviewer.role}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isOverloaded ? "text-rose-600" : "text-slate-800 dark:text-zinc-200"
                    }`}
                  >
                    {reviewer.assignedCount} / {reviewer.capacityLimit} ({percent}%)
                  </span>
                  <p className="text-[10px] text-slate-500">
                    {isOverloaded ? "At Capacity" : "Available"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={!selectedReviewerId}
            onClick={handleSave}
            className="bg-indigo-600 text-white"
          >
            Confirm Reassignment
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
