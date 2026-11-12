import type { FloorPlan } from "@/content/schemas/floor-plan";
import {
  type Coordinates,
  openingProgress,
  type RoomSunlight,
  solarDay,
  sunlightByRoom,
} from "@/lib/sun";

import { defaultDay } from "./days";

export type DaylightOpening = { progress: number; sunlight: RoomSunlight[] };

export function daylightOpening(
  plan: FloorPlan,
  coordinates: Coordinates,
): DaylightOpening {
  const day = solarDay(defaultDay.date, coordinates);
  if (!day) return { progress: 0.5, sunlight: [] };
  const sunlight = sunlightByRoom(plan, coordinates, day);
  const living = plan.rooms.find((room) => room.kind === "living");
  const periods =
    sunlight.find((room) => room.id === living?.id)?.periods ?? [];
  return { progress: openingProgress(day, periods), sunlight };
}
