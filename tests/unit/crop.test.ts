import { describe, expect, it } from "vitest";

import { coverRegion, coverScale } from "@/lib/crop";

const landscape = { width: 3600, height: 2400 };
const portrait = { width: 1600, height: 2000 };

describe("coverRegion", () => {
  it("takes the full height of a landscape photo for a portrait crop", () => {
    expect(coverRegion(landscape, portrait, [0.5, 0.5])).toEqual({
      left: 840,
      top: 0,
      width: 1920,
      height: 2400,
    });
  });

  it("centers the crop on the focus point", () => {
    expect(coverRegion(landscape, portrait, [0.4, 0.5]).left).toBe(480);
  });

  it("keeps the crop inside the photo when the focus is near an edge", () => {
    expect(coverRegion(landscape, portrait, [0, 0.5]).left).toBe(0);
    expect(coverRegion(landscape, portrait, [1, 0.5]).left).toBe(1680);
  });

  it("takes the full width when the target is wider than the photo", () => {
    const wide = { width: 2400, height: 1350 };
    expect(coverRegion(landscape, wide, [0.5, 1])).toEqual({
      left: 0,
      top: 375,
      width: 3600,
      height: 2025,
    });
  });

  it("matches the target ratio", () => {
    const region = coverRegion(
      { width: 4000, height: 6000 },
      portrait,
      [0.5, 0.5],
    );
    expect(region.width / region.height).toBeCloseTo(0.8, 3);
  });
});

describe("coverScale", () => {
  it("is below 1 when the photo is too small for the target", () => {
    expect(coverScale({ width: 1200, height: 800 }, portrait)).toBe(0.4);
    expect(coverScale(landscape, portrait)).toBe(1.2);
  });
});
