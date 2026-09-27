import { NextRequest, NextResponse } from "next/server";
import { MOCK_PAYMENTS_DATA } from "@/lib/constants/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const simulateError = searchParams.get("simulateError") === "true";

  // Simulate network latency (400ms)
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (simulateError) {
    return NextResponse.json(
      { error: "Simulated 504 Gateway Timeout for Payments endpoint" },
      { status: 504 }
    );
  }

  return NextResponse.json(MOCK_PAYMENTS_DATA);
}
