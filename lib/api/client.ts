import {
  KpiMetric,
  WorkflowCategory,
  Reviewer,
  ReviewItem,
  PaymentWindowData,
  ContractCategoryItem,
} from "@/lib/types";

export interface ApiFilterParams {
  dateRange?: string;
  department?: string;
  simulateError?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Client wrapper fetching from API routes
export const api = {
  getKpis: async (params?: ApiFilterParams): Promise<KpiMetric[]> => {
    const searchParams = new URLSearchParams();
    if (params?.dateRange) searchParams.set("dateRange", params.dateRange);
    if (params?.department) searchParams.set("department", params.department);
    if (params?.simulateError) searchParams.set("simulateError", "true");

    const res = await fetch(`/api/kpis?${searchParams.toString()}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to fetch KPI metrics");
    }
    return res.json();
  },

  getWorkflow: async (params?: ApiFilterParams): Promise<WorkflowCategory[]> => {
    const searchParams = new URLSearchParams();
    if (params?.dateRange) searchParams.set("dateRange", params.dateRange);
    if (params?.department) searchParams.set("department", params.department);
    if (params?.simulateError) searchParams.set("simulateError", "true");

    const res = await fetch(`/api/workflow?${searchParams.toString()}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to fetch workflow data");
    }
    return res.json();
  },

  getReviewers: async (params?: ApiFilterParams): Promise<Reviewer[]> => {
    const searchParams = new URLSearchParams();
    if (params?.dateRange) searchParams.set("dateRange", params.dateRange);
    if (params?.department) searchParams.set("department", params.department);
    if (params?.simulateError) searchParams.set("simulateError", "true");

    const res = await fetch(`/api/reviewers?${searchParams.toString()}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to fetch reviewers workload");
    }
    return res.json();
  },

  getReviews: async (
    params?: ApiFilterParams & { page?: number; pageSize?: number; status?: string }
  ): Promise<PaginatedResponse<ReviewItem>> => {
    const searchParams = new URLSearchParams();
    if (params?.dateRange) searchParams.set("dateRange", params.dateRange);
    if (params?.department) searchParams.set("department", params.department);
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.pageSize) searchParams.set("pageSize", params.pageSize.toString());
    if (params?.status) searchParams.set("status", params.status);
    if (params?.simulateError) searchParams.set("simulateError", "true");

    const res = await fetch(`/api/reviews?${searchParams.toString()}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to fetch review queue");
    }
    return res.json();
  },

  getPayments: async (params?: ApiFilterParams): Promise<PaymentWindowData[]> => {
    const searchParams = new URLSearchParams();
    if (params?.dateRange) searchParams.set("dateRange", params.dateRange);
    if (params?.department) searchParams.set("department", params.department);
    if (params?.simulateError) searchParams.set("simulateError", "true");

    const res = await fetch(`/api/payments?${searchParams.toString()}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to fetch payment activity");
    }
    return res.json();
  },

  getContracts: async (params?: ApiFilterParams): Promise<ContractCategoryItem[]> => {
    const searchParams = new URLSearchParams();
    if (params?.dateRange) searchParams.set("dateRange", params.dateRange);
    if (params?.department) searchParams.set("department", params.department);
    if (params?.simulateError) searchParams.set("simulateError", "true");

    const res = await fetch(`/api/contracts?${searchParams.toString()}`);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to fetch contract categories");
    }
    return res.json();
  },
};
