export const queryKeys = {
  all: ["dashboard"] as const,
  kpis: (filters: { dateRange: string; department: string; simulateError?: boolean }) =>
    ["kpis", filters] as const,
  workflow: (filters: { dateRange: string; department: string; simulateError?: boolean }) =>
    ["workflow", filters] as const,
  reviewers: (filters: { dateRange: string; department: string; simulateError?: boolean }) =>
    ["reviewers", filters] as const,
  reviews: (filters: {
    dateRange: string;
    department: string;
    page: number;
    pageSize: number;
    status?: string;
    simulateError?: boolean;
  }) => ["reviews", filters] as const,
  payments: (filters: { dateRange: string; department: string; simulateError?: boolean }) =>
    ["payments", filters] as const,
  contracts: (filters: { dateRange: string; department: string; simulateError?: boolean }) =>
    ["contracts", filters] as const,
};
