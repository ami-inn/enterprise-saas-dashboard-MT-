import { queryKeys } from "../query/queryKeys";

describe("Query Keys Factory", () => {
  it("generates deterministic query keys for KPIs with filters", () => {
    const filters = { dateRange: "30d", department: "Clinical" };
    const key = queryKeys.kpis(filters);
    expect(key).toEqual(["kpis", filters]);
  });

  it("generates deterministic query keys for Reviews with pagination and status", () => {
    const filters = {
      dateRange: "7d",
      department: "Legal",
      page: 2,
      pageSize: 5,
      status: "ready",
    };
    const key = queryKeys.reviews(filters);
    expect(key).toEqual(["reviews", filters]);
  });
});
