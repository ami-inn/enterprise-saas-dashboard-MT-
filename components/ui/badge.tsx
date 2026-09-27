import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-slate-900 text-slate-50 hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900",
        secondary:
          "border border-slate-200/80 bg-slate-100/80 text-slate-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
        outline: "border border-slate-200 text-slate-700 dark:border-zinc-800 dark:text-zinc-300",
        emerald:
          "border border-emerald-200/70 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400",
        amber:
          "border border-amber-200/70 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400",
        rose:
          "border border-rose-200/70 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400",
        sky:
          "border border-sky-200/70 bg-sky-50 text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-400",
        indigo:
          "border border-indigo-200/70 bg-indigo-50 text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
