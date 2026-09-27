import { NextRequest, NextResponse } from "next/server";
import { MOCK_REVIEWERS } from "@/lib/constants/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const simulateError = searchParams.get("simulateError") === "true";

  // Simulate network latency (200ms)
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (simulateError) {
    return NextResponse.json(
      { error: "Simulated 500 Error for Reviewer Workload endpoint" },
      { status: 500 }
    );
  }

  return NextResponse.json(MOCK_REVIEWERS);
}
