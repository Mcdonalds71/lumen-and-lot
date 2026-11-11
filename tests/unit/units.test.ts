import { describe, expect, it } from "vitest";

import { formatArea, toSquareFeet } from "@/lib/units";

describe("toSquareFeet", () => {
  it("uses 10.7639 square feet per square meter", () => {
    expect(toSquareFeet(1)).toBeCloseTo(10.7639, 4);
    expect(toSquareFeet(100)).toBeCloseTo(1076.39, 2);
  });
});

describe("formatArea", () => {
  it("shows whole square meters", () => {
    expect(formatArea(112, "m2")).toBe("112 m²");
    expect(formatArea(84.4, "m2")).toBe("84 m²");
  });

  it("converts to whole square feet with a thousands separator", () => {
    expect(formatArea(112, "ft2")).toBe("1,206 ft²");
  });
});
