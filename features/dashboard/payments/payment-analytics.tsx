"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { CreditCard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { WidgetErrorState } from "@/components/ui/widget-error-state";
import { usePayments } from "@/hooks/useDashboardQueries";
import { ApiFilterParams } from "@/lib/api/client";

interface PaymentAnalyticsProps {
  filters: ApiFilterParams;
}

export const PaymentAnalytics: React.FC<PaymentAnalyticsProps> = ({ filters }) => {
  const { data: paymentsData, isLoading, isError, error, refetch } = usePayments(filters);

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-3 w-60 mt-1" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-12 w-full mb-3" />
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <WidgetErrorState
        title="Failed to load Payment Activity"
        message={error?.message}
        onRetry={() => refetch()}
      />
    );
  }

  if (!paymentsData) return null;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            <CreditCard className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            Payments Out Activity &amp; Aging
          </CardTitle>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Disbursement volume across approval states &amp; aging windows
          </p>
        </div>
        <Badge variant="indigo">$4.2M Peak</Badge>
      </CardHeader>

      <CardContent>
        {/* KPI Summary Strip */}
        <div className="grid grid-cols-3 gap-2 mb-3 p-2 rounded-md bg-slate-50/80 border border-slate-200/70 dark:bg-zinc-900/60 dark:border-zinc-800/80 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Approved Settled
            </span>
            <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs mt-0.5">
              $4.2M
            </p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Pending Approval
            </span>
            <p className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs mt-0.5">
              $2.1M
            </p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Settlement Rate
            </span>
            <p className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs mt-0.5">
              94.2%
            </p>
          </div>
        </div>

        {/* Recharts Bar Chart */}
        <div className="h-52 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={paymentsData}
              margin={{ top: 8, right: 8, left: -24, bottom: -4 }}
              barGap={3}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="period"
                stroke="#94A3B8"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val / 1000000}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#1E293B",
                  borderRadius: "6px",
                  color: "#F8FAFC",
                  fontSize: "11px",
                  padding: "6px 10px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: unknown) => [
                  `$${(Number(value || 0) / 1000000).toFixed(2)}M`,
                ]}
              />
              <Legend
                wrapperStyle={{ fontSize: "10px", paddingTop: "4px" }}
                iconType="circle"
                iconSize={8}
              />
              <Bar
                dataKey="approved"
                name="Approved Outflow"
                fill="#059669"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="pending"
                name="Pending Review"
                fill="#D97706"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
