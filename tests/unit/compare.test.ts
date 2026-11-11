import { describe, expect, it } from "vitest";

import {
  addToCompare,
  compareHref,
  compareLimit,
  compareListFromParam,
  isCompareFull,
  parseCompareList,
  removeFromCompare,
  serializeCompareList,
} from "@/lib/compare";

describe("parseCompareList", () => {
  it("reads slugs in order", () => {
    expect(parseCompareList("harbor-room,north-light")).toEqual([
      "harbor-room",
      "north-light",
    ]);
  });

  it("drops duplicates, malformed entries and anything past the limit", () => {
    expect(parseCompareList("a,a,Bad Slug,,b,c,d")).toEqual(["a", "b", "c"]);
  });

  it("treats missing storage as an empty list", () => {
    expect(parseCompareList(null)).toEqual([]);
    expect(parseCompareList("")).toEqual([]);
  });

  it("round-trips through serializeCompareList", () => {
    const slugs = ["garden-floor", "high-terrace"];
    expect(parseCompareList(serializeCompareList(slugs))).toEqual(slugs);
  });
});

describe("addToCompare", () => {
  it("appends a new home", () => {
    expect(addToCompare(["a"], "b")).toEqual(["a", "b"]);
  });

  it("ignores a home already in the list", () => {
    expect(addToCompare(["a", "b"], "a")).toEqual(["a", "b"]);
  });

  it(`stops at ${compareLimit} homes`, () => {
    const full = ["a", "b", "c"];
    expect(isCompareFull(full)).toBe(true);
    expect(addToCompare(full, "d")).toEqual(full);
  });
});

describe("removeFromCompare", () => {
  it("removes only the given home", () => {
    expect(removeFromCompare(["a", "b", "c"], "b")).toEqual(["a", "c"]);
  });
});

describe("compareListFromParam", () => {
  it("reads one or repeated homes parameters", () => {
    expect(compareListFromParam("a,b")).toEqual(["a", "b"]);
    expect(compareListFromParam(["a", "b,c"])).toEqual(["a", "b", "c"]);
    expect(compareListFromParam(undefined)).toEqual([]);
  });
});

describe("compareHref", () => {
  it("puts the homes in a shareable address", () => {
    expect(compareHref(["harbor-room", "high-terrace"])).toBe(
      "/compare?homes=harbor-room,high-terrace",
    );
  });
});
