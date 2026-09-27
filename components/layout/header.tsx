"use client";

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  RefreshCw,
  Bell,
  User,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { useDashboardFilters } from "@/context/DashboardFilterContext";

export const Header: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    filters,
    setDateRange,
    setDepartment,
    setSimulateError,
    isRefreshing,
    lastSyncedTime,
    triggerRefresh,
  } = useDashboardFilters();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleRefreshClick = async () => {
    triggerRefresh();
    await queryClient.invalidateQueries();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-950/95 px-4 lg:px-6 py-2.5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left Title & Subtitle */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
              Operations Command Center
            </h1>
            <Badge variant="emerald" className="hidden sm:inline-flex">
              Live Feed
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Real-time compliance monitoring, reviewer workload &amp; financial pipeline
          </p>
        </div>

        {/* Right Header Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Simulated Error Developer Toggle */}
          <Button
            size="xs"
            variant={filters.simulateError ? "destructive" : "outline"}
            onClick={() => setSimulateError(!filters.simulateError)}
            className="gap-1 font-mono text-[11px]"
            title="Toggle simulated API errors to demonstrate isolated widget retry states"
          >
            <AlertTriangle className="h-3 w-3" />
            {filters.simulateError ? "Error Sim: ON ⚠️" : "Test Error Sim"}
          </Button>

          {/* Department Filter Select */}
          <div className="relative">
            <select
              value={filters.department || "all"}
              onChange={(e) => setDepartment(e.target.value)}
              className="h-8 rounded-md border border-slate-200 bg-slate-50/70 px-2.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <option value="all">All Departments</option>
              <option value="Clinical">Clinical</option>
              <option value="Legal">Legal</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center rounded-md border border-slate-200 bg-slate-50/70 p-0.5 text-xs dark:border-zinc-800 dark:bg-zinc-900">
            <Calendar className="ml-2 h-3.5 w-3.5 text-slate-400" />
            {(["7d", "30d", "90d"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                  filters.dateRange === range
                    ? "bg-white text-slate-900 font-semibold shadow-2xs dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
              </button>
            ))}
          </div>

          {/* Refresh Control */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshClick}
            disabled={isRefreshing}
            className="h-8 gap-1.5 px-2.5"
            title="Force refresh API queries"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-slate-500 ${
                isRefreshing ? "animate-spin text-indigo-600" : ""
              }`}
            />
            <span className="hidden sm:inline text-xs text-slate-600 dark:text-zinc-300">
              {isRefreshing ? "Syncing..." : lastSyncedTime}
            </span>
          </Button>

          <div className="h-4 w-px bg-slate-200 dark:bg-zinc-800 mx-0.5 hidden sm:block" />

          {/* Notifications Button */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            aria-label="View Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-950" />
          </button>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-full p-0.5 hover:ring-2 hover:ring-indigo-500 transition-all cursor-pointer focus:outline-none"
            >
              <Avatar initials="NK" name="Nick K." size="sm" statusColor="bg-emerald-500" />
              <span className="hidden xl:inline text-xs font-semibold text-slate-700 dark:text-zinc-200">
                Nick K.
              </span>
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 z-50 text-xs">
                <div className="px-2 py-1.5 border-b border-slate-100 dark:border-zinc-800">
                  <p className="font-semibold text-slate-900 dark:text-zinc-100">Nick Kendall</p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">Head of Operations</p>
                </div>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-2 py-1.5 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded flex items-center gap-2"
                >
                  <User className="h-3.5 w-3.5" />
                  Profile Settings
                </button>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-2 py-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded flex items-center gap-2"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Dialog */}
      <Dialog
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        title="System Alerts & Notifications"
        description="4 active operational exceptions requiring review"
      >
        <div className="space-y-2.5">
          <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/70 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-200">
            <div className="flex items-start justify-between">
              <span className="font-semibold text-xs">Stage 2 Bottleneck Detected</span>
              <span className="text-[10px] text-amber-600">10m ago</span>
            </div>
            <p className="text-xs mt-1 text-amber-800 dark:text-amber-300">
              58 items currently awaiting review in stage &apos;Ready for Review&apos; exceed 12-hour SLA threshold.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-rose-200 bg-rose-50/70 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200">
            <div className="flex items-start justify-between">
              <span className="font-semibold text-xs">5 Unassigned Items</span>
              <span className="text-[10px] text-rose-600">25m ago</span>
            </div>
            <p className="text-xs mt-1 text-rose-800 dark:text-rose-300">
              High priority compliance additions are waiting in the unassigned queue.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setShowNotifications(false)}>
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </header>
  );
};
