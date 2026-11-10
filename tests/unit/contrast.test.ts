import { describe, expect, it } from "vitest";

import { contrastRatio, relativeLuminance } from "@/lib/contrast";

describe("relativeLuminance", () => {
  it("runs from 0 for black to 1 for white", () => {
    expect(relativeLuminance("#000000")).toBe(0);
    expect(relativeLuminance("#ffffff")).toBeCloseTo(1, 10);
  });

  it("rejects anything that is not a six-digit hex color", () => {
    expect(() => relativeLuminance("#fff")).toThrow(RangeError);
    expect(() => relativeLuminance("tomato")).toThrow(RangeError);
  });
});

describe("contrastRatio", () => {
  it("spans 1:1 to 21:1", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 10);
    expect(contrastRatio("#6b675e", "#6b675e")).toBe(1);
  });

  it("does not depend on argument order", () => {
    expect(contrastRatio("#161513", "#f4f1ea")).toBe(
      contrastRatio("#f4f1ea", "#161513"),
    );
  });

  it("matches the published ratio for #767676 on white", () => {
    expect(contrastRatio("#767676", "#ffffff")).toBeCloseTo(4.54, 2);
  });
});
