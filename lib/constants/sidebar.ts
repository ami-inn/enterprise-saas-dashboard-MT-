import {
  LayoutDashboard,
  FileCheck2,
  GitMerge,
  CreditCard,
  FileText,
  Settings,
} from 'lucide-react'

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  href:string;
  badgeVariant?: "emerald" | "amber" | "rose" | "indigo" | "secondary";
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href:'/'
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: FileCheck2,
    badge: "87",
    badgeVariant: "rose",
    href:'/reviews'
  },
  {
    id: "workflows",
    label: "Workflows",
    icon: GitMerge,
    badge: "Stage 2 ⚠️",
    badgeVariant: "amber",
    href:'/workflows'

  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    href:'/payments'

  },
  {
    id: "contracts",
    label: "Contracts",
    icon: FileText,
    badge: "$3.67M",
    badgeVariant: "indigo",
    href:'/contracts'

  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href:'/contracts'

  },
];