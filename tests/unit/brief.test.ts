import { describe, expect, it } from "vitest";

import {
  briefSchema,
  briefSteps,
  type BriefDraft,
  describeBrief,
  emptyDraft,
  fieldErrors,
} from "@/lib/brief";

const [project, , size, budget] = briefSteps;

const complete: BriefDraft = {
  projectType: "new-build",
  city: "copenhagen",
  bedrooms: "2",
  area: "medium",
  currency: "DKK",
  budgetFrom: "6,000,000",
  budgetTo: "8 000 000",
  timeline: "this-year",
  palette: "umber",
  name: "  Ada Moreau ",
  notes: "",
};

describe("step validation", () => {
  it("asks for a choice on each step", () => {
    expect(fieldErrors(project.schema, emptyDraft)).toEqual({
      projectType: "Choose the kind of project.",
    });
    expect(Object.keys(fieldErrors(size.schema, emptyDraft))).toEqual([
      "bedrooms",
      "area",
    ]);
  });

  it("only looks at the step's own fields", () => {
    expect(
      fieldErrors(project.schema, { ...emptyDraft, projectType: "renovation" }),
    ).toEqual({});
  });

  it("reads amounts written with commas or spaces", () => {
    expect(fieldErrors(budget.schema, complete)).toEqual({});
  });

  it("explains a missing or unreadable amount", () => {
    expect(
      fieldErrors(budget.schema, {
        ...complete,
        budgetFrom: "",
        budgetTo: "lots",
      }),
    ).toEqual({
      budgetFrom: "Enter an amount.",
      budgetTo: "Write the amount in numbers.",
    });
  });

  it("keeps the upper amount at or above the lower one", () => {
    expect(
      fieldErrors(budget.schema, {
        ...complete,
        budgetFrom: "900000",
        budgetTo: "700000",
      }),
    ).toEqual({
      budgetTo: "The upper amount should be at least the lower one.",
    });
  });
});

describe("describeBrief", () => {
  const brief = briefSchema.parse(complete);
  const context = {
    cities: { copenhagen: "Copenhagen" },
    palettes: [
      { id: "umber", name: "Umber", summary: "Warm.", colors: ["#c9a88a"] },
    ],
  };

  it("titles the brief from the project and the city", () => {
    const sheet = describeBrief(brief, { ...context, areaUnit: "m2" });
    expect(sheet.title).toBe("A new home in Copenhagen");
    expect(sheet.preparedFor).toBe("Ada Moreau");
    expect(sheet.palette?.name).toBe("Umber");
  });

  it("writes each answer in the reader's units and the chosen currency", () => {
    const sheet = describeBrief(brief, { ...context, areaUnit: "ft2" });
    const value = (label: string) =>
      sheet.items.find((item) => item.label === label)?.value;
    expect(value("Size")).toBe("2 bedrooms, 807–1,184\u00a0ft²");
    expect(value("Budget")).toBe("DKK\u00a06,000,000 to DKK\u00a08,000,000");
  });

  it("says when the city or palette is not decided", () => {
    const open = briefSchema.parse({
      ...complete,
      city: "undecided",
      palette: "undecided",
    });
    const sheet = describeBrief(open, { ...context, areaUnit: "m2" });
    expect(sheet.title).toBe("A new home");
    expect(sheet.items.find((item) => item.label === "City")?.value).toBe(
      "Not decided yet",
    );
    expect(sheet.palette).toBeUndefined();
  });
});
