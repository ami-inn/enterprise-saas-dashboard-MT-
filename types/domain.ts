export type SystemHealthStatus = "healthy" | "attention" | "critical";

export interface OperationalAlert {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "info";
  category: "workflow" | "review" | "payment" | "system";
  timestamp: string;
  actionText?: string;
  actionKey?: string;
}

export interface KpiMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  subtitle: string;
  status: "emerald" | "amber" | "rose" | "sky" | "slate";
  sparklineData: number[];
  targetFormatted?: string;
}

export interface WorkflowStage {
  id: string;
  name: string;
  count: number;
  avgTimeHours: number;
  status: "normal" | "bottleneck" | "warning";
}

export interface WorkflowCategory {
  id: string;
  categoryName: string;
  stages: WorkflowStage[];
  totalCount: number;
}

export interface Reviewer {
  id: string;
  name: string;
  role: string;
  avatar: string;
  assignedCount: number;
  capacityLimit: number;
  status: "optimal" | "high" | "overloaded" | "unassigned";
}

export interface ReviewItem {
  id: string;
  applicationId: string;
  title: string;
  vendorName: string;
  department: string;
  stage: string;
  status: "Ready for Review" | "In Review" | "Reviewed" | "Blocked";
  priority: "High" | "Medium" | "Low";
  assignedReviewerId: string;
  assignedReviewerName: string;
  ageDays: number;
  dueDate: string;
  contractValue: number;
}

export interface PaymentWindowData {
  period: string;
  approved: number;
  pending: number;
  failed: number;
  approvedFormatted: string;
  pendingFormatted: string;
}

export interface ContractCategoryItem {
  id: string;
  name: string;
  amount: number;
  amountFormatted: string;
  percentageOfTotal: number;
  color: string;
  status: "active" | "review" | "pending";
}

export interface GlobalFilterState {
  dateRange: "7d" | "30d" | "90d" | "ytd";
  department: string;
  searchQuery: string;
}
