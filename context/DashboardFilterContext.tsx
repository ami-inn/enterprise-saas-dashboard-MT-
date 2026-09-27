"use client";

import React, { createContext, useContext, useState } from "react";
import { ApiFilterParams } from "@/types";

interface DashboardFilterContextValue {
  filters: ApiFilterParams;
  setDateRange: (range: string) => void;
  setDepartment: (dept: string) => void;
  setSimulateError: (sim: boolean) => void;
  isRefreshing: boolean;
  lastSyncedTime: string;
  triggerRefresh: () => void;
  selectedWorkflowStage: string | null;
  setSelectedWorkflowStage: (stage: string | null) => void;
}

const DashboardFilterContext = createContext<DashboardFilterContextValue | undefined>(
  undefined
);

export function DashboardFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dateRange, setDateRange] = useState("30d");
  const [department, setDepartment] = useState("all");
  const [simulateError, setSimulateError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState("Synced 12s ago");
  const [selectedWorkflowStage, setSelectedWorkflowStage] = useState<string | null>(
    null
  );

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastSyncedTime("Synced just now");
    }, 400);
  };

  const filters: ApiFilterParams = {
    dateRange,
    department,
    simulateError,
  };

  return (
    <DashboardFilterContext.Provider
      value={{
        filters,
        setDateRange,
        setDepartment,
        setSimulateError,
        isRefreshing,
        lastSyncedTime,
        triggerRefresh,
        selectedWorkflowStage,
        setSelectedWorkflowStage,
      }}
    >
      {children}
    </DashboardFilterContext.Provider>
  );
}

export function useDashboardFilters() {
  const context = useContext(DashboardFilterContext);
  if (!context) {
    throw new Error(
      "useDashboardFilters must be used within a <DashboardFilterProvider>"
    );
  }
  return context;
}
