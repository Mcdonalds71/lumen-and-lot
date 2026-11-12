import { getPosition, getTimes } from "suncalc";

import {
  containsPoint,
  midpoint,
  type Point,
  type Segment,
  segmentLength,
} from "./geometry";

export type Coordinates = { lat: number; lng: number };

export type SunPosition = { azimuth: number; altitude: number };

export type SolarDay = { sunrise: Date; sunset: Date; solarNoon: Date };

export type Vector = readonly [x: number, y: number];

export type PlanWindow = {
  start: Point;
  end: Point;
  sill: number;
  head: number;
};

export type PlanRoom = {
  id: string;
  polygon: readonly Point[];
  windows: readonly PlanWindow[];
};

export type Plan = { northRotation: number; rooms: readonly PlanRoom[] };

export type SunPeriod = { start: Date; end: Date };

export type RoomSunlight = {
  id: string;
  minutes: number;
  periods: SunPeriod[];
};

const compassPoints = [
  "north",
  "northeast",
  "east",
  "southeast",
  "south",
  "southwest",
  "west",
  "northwest",
] as const;

export type CompassPoint = (typeof compassPoints)[number];

const minute = 60_000;
const hour = 60 * minute;
const longestReach = 50;
const wallDepth = 0.3;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function normalizeBearing(degrees: number): number {
  return ((degrees % 360) + 360) % 360;
}

export function angleBetween(a: number, b: number): number {
  const difference = normalizeBearing(a - b);
  return Math.min(difference, 360 - difference);
}

export function compassPoint(bearing: number): CompassPoint {
  const index =
    Math.round(normalizeBearing(bearing) / 45) % compassPoints.length;
  return compassPoints[index] ?? "north";
}

export function sunPosition(
  instant: Date | number,
  { lat, lng }: Coordinates,
): SunPosition {
  const { azimuth, altitude } = getPosition(new Date(instant), lat, lng);
  return { azimuth, altitude };
}

export function solarDay(
  date: string,
  { lat, lng }: Coordinates,
): SolarDay | undefined {
  const [year = 0, month = 1, day = 1] = date.split("-").map(Number);
  const nearSolarNoon = Date.UTC(year, month - 1, day, 12) - (lng / 15) * hour;
  const { sunrise, sunset, solarNoon } = getTimes(
    new Date(nearSolarNoon),
    lat,
    lng,
  );
  return sunrise && sunset ? { sunrise, sunset, solarNoon } : undefined;
}

export function bearingVector(bearing: number, northRotation: number): Vector {
  const radians = toRadians(northRotation + bearing);
  return [Math.sin(radians), -Math.cos(radians)];
}

export function bearingOf([x, y]: Vector, northRotation: number): number {
  return normalizeBearing(toDegrees(Math.atan2(x, -y)) - northRotation);
}

export function outwardNormal(
  { start, end }: Pick<PlanWindow, "start" | "end">,
  polygon: readonly Point[],
): Vector {
  const [[x1, y1], [x2, y2]] = [start, end];
  const length = Math.hypot(x2 - x1, y2 - y1);
  const normal: Vector = [(y2 - y1) / length, (x1 - x2) / length];
  const [mx, my] = midpoint([start, end]);
  const probe: Point = [mx + normal[0] / 100, my + normal[1] / 100];
  return containsPoint(probe, polygon) ? [-normal[0], -normal[1]] : normal;
}

export function windowBearing(
  window: PlanWindow,
  room: PlanRoom,
  northRotation: number,
): number {
  return bearingOf(outwardNormal(window, room.polygon), northRotation);
}

export function windowDirections(
  room: PlanRoom,
  northRotation: number,
): CompassPoint[] {
  return [
    ...new Set(
      room.windows.map((window) =>
        compassPoint(windowBearing(window, room, northRotation)),
      ),
    ),
  ];
}

export function facesSun(bearing: number, sun: SunPosition): boolean {
  return sun.altitude > 0 && angleBetween(bearing, sun.azimuth) < 90;
}

export function sunlitOpening(
  window: PlanWindow,
  room: PlanRoom,
  sun: SunPosition,
  northRotation: number,
): Segment | undefined {
  if (!facesSun(windowBearing(window, room, northRotation), sun)) {
    return undefined;
  }
  const { start, end } = window;
  const width = segmentLength([start, end]);
  const along: Vector = [
    (end[0] - start[0]) / width,
    (end[1] - start[1]) / width,
  ];
  const [normalX, normalY] = outwardNormal(window, room.polygon);
  const [towardX, towardY] = bearingVector(sun.azimuth, northRotation);
  const facing = normalX * towardX + normalY * towardY;
  const sideways = along[0] * towardX + along[1] * towardY;
  const shade = (wallDepth * Math.abs(sideways)) / facing;
  if (shade >= width) return undefined;
  const at = (distance: number): Point => [
    start[0] + along[0] * distance,
    start[1] + along[1] * distance,
  ];
  return sideways > 0 ? [start, at(width - shade)] : [at(shade), end];
}

export function isSunlit(
  room: PlanRoom,
  sun: SunPosition,
  northRotation: number,
): boolean {
  return room.windows.some(
    (window) => sunlitOpening(window, room, sun, northRotation) !== undefined,
  );
}

export function lightPatch(
  window: PlanWindow,
  room: PlanRoom,
  sun: SunPosition,
  northRotation: number,
): Point[] | undefined {
  const opening = sunlitOpening(window, room, sun, northRotation);
  if (!opening) return undefined;
  const [towardX, towardY] = bearingVector(sun.azimuth, northRotation);
  const slope = Math.tan(toRadians(sun.altitude));
  const reach = (height: number) => Math.min(height / slope, longestReach);
  const shift = ([x, y]: Point, distance: number): Point => [
    x - towardX * distance,
    y - towardY * distance,
  ];
  const [from, to] = opening;
  const [near, far] = [reach(window.sill), reach(window.head)];
  return [shift(from, near), shift(to, near), shift(to, far), shift(from, far)];
}

export function sunlightByRoom(
  plan: Plan,
  coordinates: Coordinates,
  day: SolarDay,
  stepMinutes = 15,
): RoomSunlight[] {
  const step = stepMinutes * minute;
  const samples = Array.from(
    {
      length:
        Math.floor((day.sunset.getTime() - day.sunrise.getTime()) / step) + 1,
    },
    (_, index) => {
      const instant = new Date(day.sunrise.getTime() + index * step);
      return { instant, sun: sunPosition(instant, coordinates) };
    },
  );

  return plan.rooms.map((room) => {
    const periods: SunPeriod[] = [];
    let litSamples = 0;
    let previousLit = false;
    for (const { instant, sun } of samples) {
      const lit = isSunlit(room, sun, plan.northRotation);
      if (lit) {
        litSamples += 1;
        const current = periods.at(-1);
        if (previousLit && current) current.end = instant;
        else periods.push({ start: instant, end: instant });
      }
      previousLit = lit;
    }
    return { id: room.id, minutes: litSamples * stepMinutes, periods };
  });
}

export function middleOfLongestPeriod(
  periods: readonly SunPeriod[],
): Date | undefined {
  const length = ({ start, end }: SunPeriod) => end.getTime() - start.getTime();
  const longest = periods.reduce<SunPeriod | undefined>(
    (best, period) => (!best || length(period) > length(best) ? period : best),
    undefined,
  );
  return longest && new Date(longest.start.getTime() + length(longest) / 2);
}

export function openingProgress(
  day: SolarDay,
  periods: readonly SunPeriod[],
): number {
  const moment = middleOfLongestPeriod(periods);
  if (!moment) return 0.5;
  return (
    (moment.getTime() - day.sunrise.getTime()) /
    (day.sunset.getTime() - day.sunrise.getTime())
  );
}

export function roomSunlight(
  plan: Plan,
  roomId: string,
  coordinates: Coordinates,
  day: SolarDay,
): RoomSunlight | undefined {
  const room = plan.rooms.find((candidate) => candidate.id === roomId);
  if (!room) return undefined;
  const [sunlight] = sunlightByRoom(
    { northRotation: plan.northRotation, rooms: [room] },
    coordinates,
    day,
  );
  return sunlight;
}
