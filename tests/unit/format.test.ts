import { describe, expect, it } from "vitest";

import { cx } from "@/lib/cx";
import { formatIndex } from "@/lib/format";

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

describe("cx", () => {
  it("joins the class names that are set", () => {
    expect(cx("grid", false, null, undefined, "", "gap-x-gutter")).toBe(
      "grid gap-x-gutter",
    );
  });
});
