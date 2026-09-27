import { NextRequest, NextResponse } from "next/server";
import { MOCK_WORKFLOW_CATEGORIES } from "@/lib/constants/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const simulateError = searchParams.get("simulateError") === "true";

  // Simulate network latency (300ms)
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (simulateError) {
    return NextResponse.json(
      { error: "Simulated 503 Service Unavailable for Workflow endpoint" },
      { status: 503 }
    );
  }

  return NextResponse.json(MOCK_WORKFLOW_CATEGORIES);
}
