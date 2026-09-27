import React from "react";
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertCircle, Clock, DollarSign, Layers } from "lucide-react";
import { Sparkline } from "./sparkline";
import { KpiMetric } from "@/lib/types";
import { cn } from "@/utils";

interface KpiCardProps {
  metric: KpiMetric;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({ metric, onClick }) => {
  const getIcon = () => {
    switch (metric.status) {
      case "emerald":
        return <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "rose":
        return <AlertCircle className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />;
      case "amber":
        return <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />;
      case "sky":
        return <Layers className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />;
      default:
        return <DollarSign className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  const getSparklineColor = () => {
    switch (metric.status) {
      case "emerald":
        return "#059669";
      case "rose":
        return "#DC2626";
      case "amber":
        return "#D97706";
      default:
        return "#4F46E5";
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative p-3.5 transition-all duration-150 cursor-pointer hover:bg-slate-50/90 dark:hover:bg-zinc-800/40 select-none flex flex-col justify-between",
        metric.status === "rose" && "bg-rose-50/20 dark:bg-rose-950/10"
      )}
    >
      {/* Top Label & Status Indicator */}
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 truncate">
          {getIcon()}
          {metric.title}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 text-[10px] font-semibold font-mono px-1.5 py-0.2 rounded-full",
            metric.changeType === "positive"
              ? "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/60"
              : metric.changeType === "negative"
              ? "text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/60"
              : "text-slate-600 bg-slate-100 dark:text-zinc-400 dark:bg-zinc-800"
          )}
        >
          {metric.changeType === "positive" ? (
            <TrendingUp className="h-2.5 w-2.5" />
          ) : metric.changeType === "negative" ? (
            <TrendingDown className="h-2.5 w-2.5" />
          ) : (
            <Minus className="h-2.5 w-2.5" />
          )}
          {metric.change}
        </span>
      </div>

      {/* Metric Value & Sparkline */}
      <div className="flex items-baseline justify-between gap-2 mt-1">
        <div>
          <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-100 font-mono leading-none">
            {metric.value}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1 font-medium truncate">
            {metric.subtitle}
          </p>
        </div>

        {metric.sparklineData && (
          <div className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
            <Sparkline data={metric.sparklineData} color={getSparklineColor()} height={20} width={52} />
          </div>
        )}
      </div>
    </div>
  );
};
