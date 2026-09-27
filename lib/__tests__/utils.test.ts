import { cn } from "@/utils";
import { formatCurrency, formatNumber } from "@/utils/helper/func";

describe("Utility Formatters", () => {
  it("formats currency figures into millions ($M) correctly", () => {
    expect(formatCurrency(4_200_000)).toBe("$4.2M");
    expect(formatCurrency(1_840_000)).toBe("$1.8M");
  });

  it("formats currency figures into thousands ($K) correctly", () => {
    expect(formatCurrency(412_000)).toBe("$412K");
    expect(formatCurrency(634_000)).toBe("$634K");
  });

  it("formats standard numbers with commas", () => {
    expect(formatNumber(1284)).toBe("1,284");
    expect(formatNumber(1197)).toBe("1,197");
  });

  it("merges Tailwind classes with cn() utility", () => {
    expect(cn("px-2 py-1", "bg-red-500", "px-4")).toBe("py-1 bg-red-500 px-4");
  });
});