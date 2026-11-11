import { describe, expect, it } from "vitest";

import { matchesFilters } from "@/lib/residence-filters";

const home = { market: "copenhagen", bedrooms: 2, status: "available" };

describe("matchesFilters", () => {
  it("lets every home through without filters", () => {
    expect(matchesFilters(home, {})).toBe(true);
  });

  it("filters by city", () => {
    expect(matchesFilters(home, { market: "copenhagen" })).toBe(true);
    expect(matchesFilters(home, { market: "lisbon" })).toBe(false);
  });

  it("treats bedrooms as a minimum", () => {
    expect(matchesFilters(home, { minBedrooms: 2 })).toBe(true);
    expect(matchesFilters(home, { minBedrooms: 3 })).toBe(false);
  });

  it("filters by status", () => {
    expect(matchesFilters(home, { status: "sold" })).toBe(false);
  });

  it("needs every filter to match", () => {
    expect(
      matchesFilters(home, {
        market: "copenhagen",
        minBedrooms: 1,
        status: "available",
      }),
    ).toBe(true);
    expect(
      matchesFilters(home, { market: "copenhagen", status: "reserved" }),
    ).toBe(false);
  });
});
