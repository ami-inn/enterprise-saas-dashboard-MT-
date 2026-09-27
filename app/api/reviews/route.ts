import { NextRequest, NextResponse } from "next/server";
import { MOCK_REVIEW_ITEMS } from "@/lib/constants/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const simulateError = searchParams.get("simulateError") === "true";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "5", 10);
  const department = searchParams.get("department");

  // Simulate network latency (350ms)
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (simulateError) {
    return NextResponse.json(
      { error: "Simulated 500 Error for Review Queue endpoint" },
      { status: 500 }
    );
  }

  let items = [...MOCK_REVIEW_ITEMS];
  if (department && department !== "all") {
    items = items.filter((item) => item.department.toLowerCase() === department.toLowerCase());
  }

  const total = items.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const startIndex = (page - 1) * pageSize;
  const paginatedData = items.slice(startIndex, startIndex + pageSize);

  return NextResponse.json({
    data: paginatedData,
    total,
    page,
    pageSize,
    totalPages,
  });
}
