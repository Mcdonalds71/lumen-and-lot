import { describe, expect, it } from "vitest";

import { svgNumber, svgPoints } from "@/lib/svg";

describe("svgNumber", () => {
  it("rounds to the millimeter so server and browser draw the same digits", () => {
    expect(svgNumber(-0.9943977582062065)).toBe(-0.994);
    expect(svgNumber(-0.9943977582062056)).toBe(-0.994);
    expect(svgNumber(2)).toBe(2);
  });
});

describe("svgPoints", () => {
  it("writes a polygon's points attribute", () => {
    expect(
      svgPoints([
        [0, 1],
        [1.3854546752951045, 0.10131749511150812],
      ]),
    ).toBe("0,1 1.385,0.101");
  });
});
