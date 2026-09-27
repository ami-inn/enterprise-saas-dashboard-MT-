import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api, ApiFilterParams } from "@/lib/api/client";
import { queryKeys } from "@/lib/query/queryKeys";

export function useKpis(filters: ApiFilterParams) {
  return useQuery({
    queryKey: queryKeys.kpis({
      dateRange: filters.dateRange || "30d",
      department: filters.department || "all",
      simulateError: filters.simulateError,
    }),
    queryFn: () => api.getKpis(filters),
    staleTime: 60_000, // 60 seconds: executive KPIs remain valid for 1 min
    placeholderData: keepPreviousData,
  });
}

export function useWorkflow(filters: ApiFilterParams) {
  return useQuery({
    queryKey: queryKeys.workflow({
      dateRange: filters.dateRange || "30d",
      department: filters.department || "all",
      simulateError: filters.simulateError,
    }),
    queryFn: () => api.getWorkflow(filters),
    staleTime: 30_000, // 30 seconds: stage velocity needs frequent refresh
    placeholderData: keepPreviousData,
  });
}

export function useReviewers(filters: ApiFilterParams) {
  return useQuery({
    queryKey: queryKeys.reviewers({
      dateRange: filters.dateRange || "30d",
      department: filters.department || "all",
      simulateError: filters.simulateError,
    }),
    queryFn: () => api.getReviewers(filters),
    staleTime: 60_000, // 60 seconds: capacity balance updates periodically
    placeholderData: keepPreviousData,
  });
}

export function useReviews(
  filters: ApiFilterParams & { page?: number; pageSize?: number; status?: string }
) {
  return useQuery({
    queryKey: queryKeys.reviews({
      dateRange: filters.dateRange || "30d",
      department: filters.department || "all",
      page: filters.page || 1,
      pageSize: filters.pageSize || 5,
      status: filters.status,
      simulateError: filters.simulateError,
    }),
    queryFn: () => api.getReviews(filters),
    staleTime: 20_000, // 20 seconds: operational triage requires highest freshness
    placeholderData: keepPreviousData,
  });
}

export function usePayments(filters: ApiFilterParams) {
  return useQuery({
    queryKey: queryKeys.payments({
      dateRange: filters.dateRange || "30d",
      department: filters.department || "all",
      simulateError: filters.simulateError,
    }),
    queryFn: () => api.getPayments(filters),
    staleTime: 180_000, // 3 minutes: financial outflow trends update less frequently
    placeholderData: keepPreviousData,
  });
}

export function useContracts(filters: ApiFilterParams) {
  return useQuery({
    queryKey: queryKeys.contracts({
      dateRange: filters.dateRange || "30d",
      department: filters.department || "all",
      simulateError: filters.simulateError,
    }),
    queryFn: () => api.getContracts(filters),
    staleTime: 300_000, // 5 minutes: contract structure data is low-churn
    placeholderData: keepPreviousData,
  });
}
