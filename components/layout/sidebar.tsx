"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileCheck2,
  GitMerge,
  CreditCard,
  FileText,
  Settings,
  ShieldCheck,
  Menu,
  Activity,
} from "lucide-react";
import { cn } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Sheet } from "@/components/ui/sheet";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: "emerald" | "amber" | "rose" | "indigo" | "secondary";
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: FileCheck2,
    badge: "87",
    badgeVariant: "rose",
  },
  {
    id: "workflows",
    label: "Workflows",
    icon: GitMerge,
    badge: "Stage 2 ⚠️",
    badgeVariant: "amber",
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
  },
  {
    id: "contracts",
    label: "Contracts",
    icon: FileText,
    badge: "$3.67M",
    badgeVariant: "indigo",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

interface SidebarContentProps {
  activeNav: string;
  setActiveNav: (id: string) => void;
  onItemClick?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  activeNav,
  setActiveNav,
  onItemClick,
}) => {
  return (
    <div className="flex h-full flex-col justify-between p-3.5 bg-white/80 backdrop-blur-md dark:bg-zinc-950/80">
      {/* Product Identity */}
      <div>
        <div className="flex items-center gap-2.5 px-2.5 py-3 mb-4 border-b border-slate-200/60 dark:border-zinc-800/60">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                MACHI
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40">
                OPS
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
              Enterprise Control v2.4
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  onItemClick?.();
                }}
                className={cn(
                  "group relative flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 select-none",
                  isActive
                    ? "bg-indigo-50/80 text-indigo-700 shadow-2xs dark:bg-indigo-950/50 dark:text-indigo-300 font-semibold border border-indigo-200/60 dark:border-indigo-800/40"
                    : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-indigo-600 dark:bg-indigo-400" />
                )}
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-400 group-hover:text-slate-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant={item.badgeVariant || "amber"}>
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status Card */}
      <div className="mt-auto space-y-3 pt-3 border-t border-slate-200/60 dark:border-zinc-800/60">
        <div className="rounded-lg border border-slate-200/70 bg-slate-50/60 p-2.5 backdrop-blur-xs dark:border-zinc-800/60 dark:bg-zinc-900/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
              Engine Health
            </span>
            <span className="text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-200/60 dark:border-emerald-800/40">
              99.98%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1">
            All ingestion pipelines active
          </p>
        </div>
      </div>
    </div>
  );
};

export interface SidebarProps {
  initialActiveNav?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ initialActiveNav = "dashboard" }) => {
  const [activeNav, setActiveNav] = useState(initialActiveNav);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Persistent Glassmorphic Light Sidebar */}
      <aside className="hidden lg:flex w-60 flex-col border-r border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80 shrink-0 h-screen sticky top-0 z-30">
        <SidebarContent activeNav={activeNav} setActiveNav={setActiveNav} />
      </aside>

      {/* Mobile Drawer Navigation Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sheet Navigation */}
      <Sheet
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        side="left"
        title="Navigation"
      >
        <SidebarContent
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onItemClick={() => setIsMobileOpen(false)}
        />
      </Sheet>
    </>
  );
};
