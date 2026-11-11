import { describe, expect, it } from "vitest";
import type { z } from "zod";

import { gardenFloor } from "@/content/residences/garden-floor";
import { floorPlanSchema } from "@/content/schemas/floor-plan";
import { residenceSchema } from "@/content/schemas/residence";

function messages(result: z.ZodSafeParseResult<unknown>): string[] {
  return result.error?.issues.map((issue) => issue.message) ?? [];
}

describe("residence schema", () => {
  it("accepts a seeded residence", () => {
    expect(residenceSchema.safeParse(gardenFloor).success).toBe(true);
  });

  it("rejects a price outside the market's currency", () => {
    const result = residenceSchema.safeParse({
      ...gardenFloor,
      price: { amount: 1_000_000, currency: "USD" },
    });
    expect(messages(result)).toContain("Prices in Toronto are in CAD.");
  });

  it("rejects an energy label from another country", () => {
    const result = residenceSchema.safeParse({
      ...gardenFloor,
      energyLabel: { system: "HERS Index", score: 40 },
    });
    expect(messages(result)).toContain(
      "Homes in Toronto are labeled with EnerGuide.",
    );
  });

  it("rejects a bedroom count that disagrees with the plan", () => {
    const result = residenceSchema.safeParse({ ...gardenFloor, bedrooms: 3 });
    expect(messages(result)).toContain("The plan has 2 bedrooms.");
  });
});

describe("floor plan schema", () => {
  const { floorPlan } = gardenFloor;

  function withLivingWindow(start: [number, number], end: [number, number]) {
    return {
      ...floorPlan,
      rooms: floorPlan.rooms.map((room) =>
        room.id === "living"
          ? { ...room, windows: [{ start, end, sill: 0.9, head: 2.2 }] }
          : room,
      ),
    };
  }

  it("rejects a window that is not on its room's walls", () => {
    const result = floorPlanSchema.safeParse(withLivingWindow([2, 5], [4, 5]));
    expect(messages(result)).toContain(
      "Window 1 in Living and kitchen is not on one of its walls.",
    );
  });

  it("rejects a window on a wall shared with another room", () => {
    const result = floorPlanSchema.safeParse(
      withLivingWindow([1, 3.5], [3, 3.5]),
    );
    expect(messages(result)).toContain(
      "Window 1 in Living and kitchen is on the wall shared with Bedroom 2.",
    );
  });

  it("rejects a plan with two living rooms", () => {
    const result = floorPlanSchema.safeParse({
      ...floorPlan,
      rooms: floorPlan.rooms.map((room) =>
        room.id === "hall" ? { ...room, kind: "living" } : room,
      ),
    });
    expect(messages(result)).toContain(
      "A plan has exactly one living room, not 2.",
    );
  });

  it("rejects a sill that sits above the head", () => {
    const result = floorPlanSchema.safeParse({
      ...floorPlan,
      rooms: floorPlan.rooms.map((room) =>
        room.id === "living"
          ? {
              ...room,
              windows: [{ start: [1, 8], end: [3, 8], sill: 2.5, head: 2 }],
            }
          : room,
      ),
    });
    expect(messages(result)).toContain("A window's sill sits below its head.");
  });
});
