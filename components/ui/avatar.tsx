import * as React from "react";
import { cn } from "@/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  statusColor?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, initials, name, size = "md", statusColor, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-6 w-6 text-[10px]",
      md: "h-7 w-7 text-xs",
      lg: "h-9 w-9 text-sm",
    }[size];

    return (
      <div className="relative inline-block" ref={ref} {...props}>
        <div
          title={name}
          className={cn(
            "flex items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40 select-none",
            sizeClasses,
            className
          )}
        >
          {initials}
        </div>
        {statusColor && (
          <span
            className={cn(
              "absolute bottom-0 right-0 h-2 w-2 rounded-full ring-2 ring-white dark:ring-zinc-900",
              statusColor
            )}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
