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
