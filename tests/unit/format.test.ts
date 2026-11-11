import { describe, expect, it } from "vitest";

import { cx } from "@/lib/cx";
import { formatCount, formatIndex } from "@/lib/format";

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
