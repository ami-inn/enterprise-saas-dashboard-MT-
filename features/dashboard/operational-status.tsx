"use client";

import React from "react";
import { AlertTriangle, ArrowRight, ShieldAlert, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_OPERATIONAL_ALERTS } from "@/lib/constants/mock-data";
interface OperationalStatusProps {
  onTriageClick: () => void;
  onReassignClick: () => void;
  onWorkflowStageClick: (stageName: string) => void;
}

export const OperationalStatus: React.FC<OperationalStatusProps> = ({
  onTriageClick,
  onReassignClick,
  onWorkflowStageClick,
}) => {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-3.5 text-slate-100 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Left Side: Health Status Badge & Headline */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                System Operational Health
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.2 text-[10px] font-semibold text-amber-300 border border-amber-500/25 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Attention Required (87 Pending)
              </span>
            </div>
            <h2 className="text-xs font-semibold text-slate-100 mt-0.5">
              Reviewer bottleneck in Stage 2 &amp; 5 items awaiting assignment
            </h2>
          </div>
        </div>

        {/* Right Side Action Shortcut Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="xs"
            onClick={onTriageClick}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium border-0 shadow-2xs gap-1.5"
          >
            <Zap className="h-3 w-3" />
            Triage Review Queue (87)
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={onReassignClick}
            className="border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:text-white gap-1.5"
          >
            <ShieldAlert className="h-3 w-3 text-amber-400" />
            Reassign Workload
          </Button>
        </div>
      </div>

      {/* Exception Chips Ticker Row */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2.5 border-t border-slate-800/80 text-xs">
        {MOCK_OPERATIONAL_ALERTS.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between rounded bg-slate-800/60 p-2 border border-slate-800 hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                  alert.severity === "high"
                    ? "bg-rose-400"
                    : alert.severity === "medium"
                    ? "bg-amber-400"
                    : "bg-sky-400"
                }`}
              />
              <div className="truncate">
                <p className="font-medium text-slate-200 text-[11px] truncate">{alert.title}</p>
                <p className="text-[10px] text-slate-400 truncate">{alert.timestamp}</p>
              </div>
            </div>
            {alert.actionText && (
              <button
                onClick={() => {
                  if (alert.actionKey === "ready-for-review") {
                    onWorkflowStageClick("Ready for Review");
                  } else if (alert.actionKey?.includes("reassign")) {
                    onReassignClick();
                  } else {
                    onTriageClick();
                  }
                }}
                className="text-[10px] font-semibold text-indigo-300 hover:text-white ml-2 flex items-center shrink-0 cursor-pointer"
              >
                {alert.actionText} <ArrowRight className="h-2.5 w-2.5 ml-0.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
