"use client";

import * as React from "react";
import { cn } from "@/utils";
import { X } from "lucide-react";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  side = "right",
  children,
  title,
  description,
  className,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div
        className={cn(
          "fixed top-0 bottom-0 z-50 flex flex-col bg-white p-6 shadow-xl transition ease-in-out dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 w-full sm:max-w-md",
          side === "right" ? "right-0 border-l animate-in slide-in-from-right" : "left-0 border-r animate-in slide-in-from-left",
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
          <div>
            {title && <h2 className="text-sm font-semibold text-slate-900 dark:text-zinc-100">{title}</h2>}
            {description && <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">{children}</div>
      </div>
    </div>
  );
};
