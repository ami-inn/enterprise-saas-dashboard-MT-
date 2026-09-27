import { NextRequest, NextResponse } from "next/server";
import { MOCK_KPIS } from "@/lib/constants/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const simulateError = searchParams.get("simulateError") === "true";
  const dateRange = searchParams.get("dateRange") || "30d";

  // Simulate network latency (250ms)
  await new Promise((resolve) => setTimeout(resolve, 250));

  if (simulateError) {
    return NextResponse.json(
      { error: "Simulated 500 Internal Server Error for KPIs endpoint" },
      { status: 500 }
    );
  }

  // Multiply or adjust metrics slightly based on date range to show real dynamic response
  const factor = dateRange === "7d" ? 0.35 : dateRange === "90d" ? 2.8 : 1.0;

  const dynamicKpis = MOCK_KPIS.map((kpi) => {
    if (kpi.id === "kpi-pay-elements") {
      const num = Math.round(1284 * factor);
      return { ...kpi, value: num.toLocaleString() };
    }
    return kpi;
  });

  return NextResponse.json(dynamicKpis);
}
