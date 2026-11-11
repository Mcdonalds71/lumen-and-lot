import { describe, expect, it } from "vitest";

import {
  formatArea,
  formatAreaRange,
  formatDimensions,
  toSquareFeet,
} from "@/lib/units";

describe("toSquareFeet", () => {
  it("uses 10.7639 square feet per square meter", () => {
    expect(toSquareFeet(1)).toBeCloseTo(10.7639, 4);
    expect(toSquareFeet(100)).toBeCloseTo(1076.39, 2);
  });
});

describe("formatArea", () => {
  it("shows whole square meters", () => {
    expect(formatArea(112, "m2")).toBe("112\u00a0m²");
    expect(formatArea(84.4, "m2")).toBe("84\u00a0m²");
  });

  it("converts to whole square feet with a thousands separator", () => {
    expect(formatArea(112, "ft2")).toBe("1,206\u00a0ft²");
  });
});

describe("formatDimensions", () => {
  const sofa = { width: 228, depth: 95, height: 74 };

  it("lists width, depth and height in centimeters", () => {
    expect(formatDimensions(sofa, "m2")).toBe(
      "W\u00a0228 × D\u00a095 × H\u00a074\u00a0cm",
    );
  });

  it("switches to inches with the imperial preference", () => {
    expect(formatDimensions(sofa, "ft2")).toBe(
      "W\u00a089.8 × D\u00a037.4 × H\u00a029.1\u00a0in",
    );
  });

  it("keeps thin pieces to one decimal", () => {
    expect(
      formatDimensions({ width: 240, depth: 170, height: 1.5 }, "m2"),
    ).toBe("W\u00a0240 × D\u00a0170 × H\u00a01.5\u00a0cm");
  });
});

describe("formatAreaRange", () => {
  it("writes closed and open ranges in either unit", () => {
    expect(formatAreaRange(75, 110, "m2")).toBe("75–110\u00a0m²");
    expect(formatAreaRange(0, 75, "m2")).toBe("Up to 75\u00a0m²");
    expect(formatAreaRange(150, undefined, "ft2")).toBe("Over 1,615\u00a0ft²");
  });
});
