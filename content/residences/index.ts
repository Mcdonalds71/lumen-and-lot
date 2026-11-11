import { z } from "zod";

import { courtyardRooms } from "./courtyard-rooms";
import { gardenFloor } from "./garden-floor";
import { harborRoom } from "./harbor-room";
import { highTerrace } from "./high-terrace";
import { northLight } from "./north-light";
import { orchardHouse } from "./orchard-house";
import { uniqueBy } from "../schemas/common";
import { type Residence, residenceSchema } from "../schemas/residence";

export const residences: readonly Residence[] = z
  .array(residenceSchema)
  .check(uniqueBy("residence", (residence) => residence.slug))
  .parse([
    gardenFloor,
    northLight,
    orchardHouse,
    harborRoom,
    courtyardRooms,
    highTerrace,
  ]);

export function findResidence(slug: string): Residence | undefined {
  return residences.find((residence) => residence.slug === slug);
}

export function newestResidence(): Residence {
  const [newest] = residences.toSorted((a, b) =>
    b.listedOn.localeCompare(a.listedOn),
  );
  if (!newest) throw new Error("There are no residences.");
  return newest;
}
