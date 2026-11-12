import { describe, expect, it } from "vitest";

import { cx } from "@/lib/cx";
import { formatCount, formatIndex, initials, releaseLine } from "@/lib/format";

describe("formatIndex", () => {
  it.each([
    [1, "01"],
    [9, "09"],
    [12, "12"],
    [120, "120"],
  ])("formats %i as %s", (index, expected) => {
    expect(formatIndex(index)).toBe(expected);
  });
});

describe("formatCount", () => {
  it("adds an s for anything but one", () => {
    expect(formatCount(1, "bedroom")).toBe("1 bedroom");
    expect(formatCount(3, "bedroom")).toBe("3 bedrooms");
    expect(formatCount(0, "home")).toBe("0 homes");
  });
});

describe("cx", () => {
  it("joins the class names that are set", () => {
    expect(cx("grid", false, null, undefined, "", "gap-x-gutter")).toBe(
      "grid gap-x-gutter",
    );
  });
});

describe("initials", () => {
  it("takes the first letter of the first and last names", () => {
    expect(initials("Ingrid Holm")).toBe("IH");
    expect(initials("  Anna Maria de Souza ")).toBe("AS");
    expect(initials("Ólafur Arnalds")).toBe("ÓA");
    expect(initials("Madonna")).toBe("M");
  });
});

describe("releaseLine", () => {
  it("names the major version, or the minor one before 1.0", () => {
    expect(releaseLine("16.4.6")).toBe("16");
    expect(releaseLine("^19.3.0")).toBe("19");
    expect(releaseLine("^5")).toBe("5");
    expect(releaseLine("^0.35.5")).toBe("0.35");
  });

  it("refuses a range without a version", () => {
    expect(() => releaseLine("latest")).toThrow(/no version/);
  });
});
