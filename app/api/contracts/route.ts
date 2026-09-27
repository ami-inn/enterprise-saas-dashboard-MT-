import { NextRequest, NextResponse } from "next/server";
import { MOCK_CONTRACT_CATEGORIES } from "@/lib/constants/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const simulateError = searchParams.get("simulateError") === "true";

  // Simulate network latency (250ms)
  await new Promise((resolve) => setTimeout(resolve, 250));

  if (simulateError) {
    return NextResponse.json(
      { error: "Simulated 500 Internal Server Error for Contracts endpoint" },
      { status: 500 }
    );
  }

  return NextResponse.json(MOCK_CONTRACT_CATEGORIES);
}
