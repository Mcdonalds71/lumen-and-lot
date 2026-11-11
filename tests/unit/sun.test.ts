import { describe, expect, it } from "vitest";

import type { Point } from "@/lib/geometry";
import {
  angleBetween,
  bearingOf,
  bearingVector,
  compassPoint,
  facesSun,
  isSunlit,
  lightPatch,
  middleOfLongestPeriod,
  outwardNormal,
  type Plan,
  type PlanRoom,
  solarDay,
  sunlightByRoom,
  sunlitOpening,
  sunPosition,
  windowBearing,
  windowDirections,
} from "@/lib/sun";

function expectPoints(
  actual: readonly Point[] | undefined,
  expected: readonly Point[],
) {
  expect(actual).toHaveLength(expected.length);
  expected.forEach(([x, y], index) => {
    expect(actual?.[index]?.[0]).toBeCloseTo(x);
    expect(actual?.[index]?.[1]).toBeCloseTo(y);
  });
}

const toronto = { lat: 43.6532, lng: -79.3832 };
const copenhagen = { lat: 55.6761, lng: 12.5683 };

const hours = (from: Date, to: Date) =>
  (to.getTime() - from.getTime()) / 3_600_000;

const square: PlanRoom = {
  id: "square",
  polygon: [
    [0, 0],
    [4, 0],
    [4, 4],
    [0, 4],
  ],
  windows: [{ start: [1, 4], end: [3, 4], sill: 0, head: 2 }],
};

const plan: Plan = {
  northRotation: 0,
  rooms: [
    {
      id: "north-room",
      polygon: [
        [0, 0],
        [4, 0],
        [4, 3],
        [0, 3],
      ],
      windows: [{ start: [1, 0], end: [3, 0], sill: 0.8, head: 2.4 }],
    },
    {
      id: "south-room",
      polygon: [
        [0, 3],
        [4, 3],
        [4, 6],
        [0, 6],
      ],
      windows: [{ start: [1, 6], end: [3, 6], sill: 0.8, head: 2.4 }],
    },
    {
      id: "hall",
      polygon: [
        [4, 0],
        [6, 0],
        [6, 6],
        [4, 6],
      ],
      windows: [],
    },
  ],
};

describe("sun position", () => {
  it("stands about 70° high at solar noon in Toronto on the June solstice", () => {
    const day = solarDay("2026-06-21", toronto);
    if (!day) throw new Error("Toronto has a sunrise in June.");
    const { altitude, azimuth } = sunPosition(day.solarNoon, toronto);
    expect(Math.abs(altitude - 70)).toBeLessThan(1);
    expect(angleBetween(azimuth, 180)).toBeLessThan(1);
  });

  it("is below the horizon at midnight", () => {
    expect(
      sunPosition(Date.UTC(2026, 5, 21, 4), toronto).altitude,
    ).toBeLessThan(0);
  });
});

describe("solarDay", () => {
  it("gives a little over twelve hours of daylight at the equinox", () => {
    const day = solarDay("2026-03-20", toronto);
    if (!day) throw new Error("Toronto has a sunrise in March.");
    expect(hours(day.sunrise, day.sunset)).toBeGreaterThan(12);
    expect(hours(day.sunrise, day.sunset)).toBeLessThan(12.4);
    expect(
      angleBetween(sunPosition(day.sunrise, toronto).azimuth, 90),
    ).toBeLessThan(3);
  });

  it("gives about seven hours in Copenhagen at the winter solstice", () => {
    const day = solarDay("2026-12-21", copenhagen);
    if (!day) throw new Error("Copenhagen has a sunrise in December.");
    expect(hours(day.sunrise, day.sunset)).toBeCloseTo(7, 0);
  });

  it("covers the local day asked for, not the UTC one", () => {
    const day = solarDay("2026-03-20", toronto);
    expect(day?.solarNoon.toISOString().slice(0, 10)).toBe("2026-03-20");
  });
});

describe("bearings", () => {
  it("maps compass bearings onto the plan through the north rotation", () => {
    const [x, y] = bearingVector(0, 90);
    expect(x).toBeCloseTo(1);
    expect(y).toBeCloseTo(0);
    expect(bearingOf([0, -1], 0)).toBeCloseTo(0);
    expect(bearingOf([1, 0], 0)).toBeCloseTo(90);
    expect(bearingOf([0, 1], 22)).toBeCloseTo(158);
  });

  it("measures the smaller angle between two bearings", () => {
    expect(angleBetween(350, 10)).toBe(20);
    expect(angleBetween(90, 270)).toBe(180);
  });

  it("names the nearest of eight compass points", () => {
    expect(compassPoint(200)).toBe("south");
    expect(compassPoint(225)).toBe("southwest");
    expect(compassPoint(350)).toBe("north");
  });
});

describe("windows", () => {
  it("point their normal out of the room whatever the winding", () => {
    const [x, y] = outwardNormal(
      { start: [1, 0], end: [3, 0] },
      square.polygon,
    );
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(-1);
    const reversed = [...square.polygon].reverse();
    expect(
      outwardNormal({ start: [4, 1], end: [4, 3] }, reversed)[0],
    ).toBeCloseTo(1);
  });

  it("take their bearing from the plan's north rotation", () => {
    const [window] = square.windows;
    if (!window) throw new Error("The square room has a window.");
    expect(windowBearing(window, square, 0)).toBeCloseTo(180);
    expect(windowBearing(window, square, 22)).toBeCloseTo(158);
  });

  it("list each direction a room's windows face once", () => {
    const corner: PlanRoom = {
      ...square,
      windows: [
        { start: [1, 4], end: [2, 4], sill: 0, head: 2 },
        { start: [2.5, 4], end: [3.5, 4], sill: 0, head: 2 },
        { start: [4, 1], end: [4, 3], sill: 0, head: 2 },
      ],
    };
    expect(windowDirections(corner, 0)).toEqual(["south", "east"]);
    expect(windowDirections({ ...square, windows: [] }, 0)).toEqual([]);
  });

  it("face the sun only when it is up and less than 90° away", () => {
    expect(facesSun(180, { azimuth: 260, altitude: 20 })).toBe(true);
    expect(facesSun(180, { azimuth: 270, altitude: 20 })).toBe(false);
    expect(facesSun(180, { azimuth: 180, altitude: -2 })).toBe(false);
  });
});

describe("lightPatch", () => {
  const [window] = square.windows;
  if (!window) throw new Error("The square room has a window.");

  it("runs from sill ÷ tan(altitude) to head ÷ tan(altitude) along the sun", () => {
    expectPoints(
      lightPatch(window, square, { azimuth: 180, altitude: 45 }, 0),
      [
        [1, 4],
        [3, 4],
        [3, 2],
        [1, 2],
      ],
    );
  });

  it("slants with the sun's azimuth, narrowed by the window reveal", () => {
    const drift = Math.SQRT2;
    expectPoints(
      lightPatch(window, square, { azimuth: 225, altitude: 45 }, 0),
      [
        [1.3, 4],
        [3, 4],
        [3 + drift, 4 - drift],
        [1.3 + drift, 4 - drift],
      ],
    );
  });

  it("loses the strip nearest the sun to a 30 cm reveal", () => {
    expectPoints(
      sunlitOpening(window, square, { azimuth: 135, altitude: 30 }, 0),
      [
        [1, 4],
        [2.7, 4],
      ],
    );
  });

  it("lets no light through when the sun only grazes the window", () => {
    const grazing = { azimuth: 268, altitude: 20 };
    expect(facesSun(180, grazing)).toBe(true);
    expect(sunlitOpening(window, square, grazing, 0)).toBeUndefined();
    expect(isSunlit(square, grazing, 0)).toBe(false);
  });

  it("is absent when the sun is behind the window", () => {
    expect(
      lightPatch(window, square, { azimuth: 0, altitude: 30 }, 0),
    ).toBeUndefined();
  });
});

describe("sunlightByRoom", () => {
  const byId = (date: string) => {
    const day = solarDay(date, toronto);
    if (!day) throw new Error(`Toronto has a sunrise on ${date}.`);
    return new Map(
      sunlightByRoom(plan, toronto, day).map((room) => [room.id, room]),
    );
  };

  it("gives a south room most of the equinox day and a north room none", () => {
    const rooms = byId("2026-03-20");
    expect(rooms.get("south-room")?.minutes).toBeGreaterThan(10 * 60);
    expect(rooms.get("south-room")?.minutes).toBeLessThan(12 * 60);
    expect(rooms.get("south-room")?.periods).toHaveLength(1);
    expect(rooms.get("north-room")).toMatchObject({ minutes: 0, periods: [] });
  });

  it("splits a north room's June sun into a morning and an evening", () => {
    const day = solarDay("2026-06-21", toronto);
    const north = byId("2026-06-21").get("north-room");
    const [morning, evening] = north?.periods ?? [];
    if (!day || !morning || !evening) {
      throw new Error("The north room gets morning and evening sun in June.");
    }
    expect(north?.periods).toHaveLength(2);
    expect((north?.minutes ?? 1) % 15).toBe(0);
    expect(morning.end.getTime()).toBeLessThan(day.solarNoon.getTime());
    expect(evening.start.getTime()).toBeGreaterThan(day.solarNoon.getTime());
  });

  it("gives a room without windows no sun", () => {
    expect(byId("2026-06-21").get("hall")).toMatchObject({
      minutes: 0,
      periods: [],
    });
  });

  it("starts each period on a sunlit sample", () => {
    const [northRoom] = plan.rooms;
    const north = byId("2026-06-21").get("north-room");
    if (!northRoom || !north) throw new Error("The plan has a north room.");
    for (const { start, end } of north.periods) {
      expect(isSunlit(northRoom, sunPosition(start, toronto), 0)).toBe(true);
      expect(isSunlit(northRoom, sunPosition(end, toronto), 0)).toBe(true);
    }
  });
});

describe("middleOfLongestPeriod", () => {
  const at = (hour: number) => new Date(Date.UTC(2026, 2, 20, hour));

  it("finds the middle of the longest sunny stretch", () => {
    expect(
      middleOfLongestPeriod([
        { start: at(7), end: at(9) },
        { start: at(13), end: at(19) },
      ]),
    ).toEqual(at(16));
  });

  it("has nothing to say about a room without sun", () => {
    expect(middleOfLongestPeriod([])).toBeUndefined();
  });
});
