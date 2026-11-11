import { describe, expect, it } from "vitest";

import { lookbooks } from "@/content/lookbooks";
import { marketList } from "@/content/markets";
import { palettes } from "@/content/palettes";
import { findProject, nextProject, projects } from "@/content/projects";
import { rates } from "@/content/rates";
import {
  findResidence,
  newestResidence,
  nextResidence,
  residences,
} from "@/content/residences";
import type { MarketId } from "@/content/schemas/market";
import { paletteIds } from "@/content/schemas/palette";
import { polygonArea } from "@/lib/geometry";

const cityCenters: Record<MarketId, readonly [lat: number, lng: number]> = {
  toronto: [43.6532, -79.3832],
  "hudson-valley": [42.2529, -73.791],
  copenhagen: [55.6761, 12.5683],
  lisbon: [38.7223, -9.1393],
};

function kilometersBetween(
  [lat1, lng1]: readonly [number, number],
  [lat2, lng2]: readonly [number, number],
): number {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const a =
    Math.sin(radians(lat2 - lat1) / 2) ** 2 +
    Math.cos(radians(lat1)) *
      Math.cos(radians(lat2)) *
      Math.sin(radians(lng2 - lng1) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}

const byName = residences.map(
  (residence) => [residence.name, residence] as const,
);

describe("residences", () => {
  it("are two in Toronto, one in the Hudson Valley, two in Copenhagen and one in Lisbon", () => {
    const perMarket = Object.fromEntries(
      marketList.map((market) => [
        market.name,
        residences.filter((residence) => residence.market.id === market.id)
          .length,
      ]),
    );
    expect(perMarket).toEqual({
      Toronto: 2,
      "Hudson Valley": 1,
      Copenhagen: 2,
      Lisbon: 1,
    });
  });

  it.each(byName)(
    "%s has rooms that fill 85 to 100% of its area",
    (_, residence) => {
      const roomArea = residence.floorPlan.rooms.reduce(
        (sum, room) => sum + polygonArea(room.polygon),
        0,
      );
      const share = roomArea / residence.areaM2;
      expect(share).toBeGreaterThanOrEqual(0.85);
      expect(share).toBeLessThanOrEqual(1);
    },
  );

  it.each(byName)("%s lets daylight into its living room", (_, residence) => {
    const living = residence.floorPlan.rooms.find(
      (room) => room.kind === "living",
    );
    expect(living?.windows.length).toBeGreaterThan(0);
  });

  it.each(byName)("%s sits within 60 km of its city", (_, residence) => {
    const { lat, lng } = residence.location;
    expect(
      kilometersBetween([lat, lng], cityCenters[residence.market.id]),
    ).toBeLessThan(60);
  });

  it("finds a residence by slug", () => {
    expect(findResidence("harbor-room")?.name).toBe("Harbor Room");
    expect(findResidence("nowhere")).toBeUndefined();
  });

  it("knows the newest listing", () => {
    expect(newestResidence().slug).toBe("high-terrace");
  });

  it("wraps from the last residence back to the first", () => {
    expect(nextResidence("harbor-room")?.slug).toBe("courtyard-rooms");
    expect(nextResidence("high-terrace")?.slug).toBe("garden-floor");
    expect(nextResidence("missing")).toBeUndefined();
  });
});

describe("projects", () => {
  it("seeds four case studies", () => {
    expect(projects).toHaveLength(4);
    expect(findProject("stair-house")?.market.name).toBe("Lisbon");
  });

  it("wraps from the last project back to the first", () => {
    expect(nextProject("stair-house")?.slug).toBe("laneway-house");
    expect(nextProject("missing")).toBeUndefined();
  });
});

describe("palettes and lookbooks", () => {
  it("offers the three studio palettes", () => {
    expect(palettes.map((palette) => palette.id)).toEqual([...paletteIds]);
  });

  it("has one lookbook for each palette", () => {
    expect(lookbooks.map((lookbook) => lookbook.palette).toSorted()).toEqual(
      [...paletteIds].toSorted(),
    );
  });
});

describe("rates", () => {
  it("are the ECB euro reference rates for November 10, 2026", () => {
    expect(rates.base).toBe("EUR");
    expect(rates.perBase.EUR).toBe(1);
    expect(rates.asOf).toBe("2026-11-10");
  });
});
