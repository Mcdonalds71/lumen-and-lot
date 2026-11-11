import { z } from "zod";

import { type RoomSunlight, roomSunlight, solarDay } from "@/lib/sun";

import { courtyardRooms } from "./courtyard-rooms";
import { gardenFloor } from "./garden-floor";
import { harborRoom } from "./harbor-room";
import { highTerrace } from "./high-terrace";
import { northLight } from "./north-light";
import { orchardHouse } from "./orchard-house";
import { type ImageAsset, uniqueBy } from "../schemas/common";
import type { PaletteId } from "../schemas/palette";
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

export function nextResidence(slug: string): Residence | undefined {
  const index = residences.findIndex((residence) => residence.slug === slug);
  if (index === -1) return undefined;
  return residences[(index + 1) % residences.length];
}

export function coverImage(residence: Residence): ImageAsset {
  const [cover] = residence.gallery;
  if (!cover) throw new Error(`${residence.name} has no gallery images.`);
  return cover;
}

export function newestResidence(): Residence {
  const [newest] = residences.toSorted((a, b) =>
    b.listedOn.localeCompare(a.listedOn),
  );
  if (!newest) throw new Error("There are no residences.");
  return newest;
}

export type PaletteRoom = {
  id: string;
  name: string;
  images: { palette: PaletteId; image: ImageAsset }[];
};

export function paletteRooms(residence: Residence): PaletteRoom[] {
  const names = new Map(
    residence.floorPlan.rooms.map((room) => [room.id, room.name]),
  );
  const [first] = residence.palettes;
  return (first?.rooms ?? []).map(({ room }, index) => ({
    id: room,
    name: names.get(room) ?? room,
    images: residence.palettes.flatMap(({ palette, rooms }) => {
      const image = rooms[index]?.image;
      return image ? [{ palette, image }] : [];
    }),
  }));
}

export function findResidences(slugs: readonly string[]): Residence[] {
  return slugs.flatMap((slug) => {
    const residence = findResidence(slug);
    return residence ? [residence] : [];
  });
}

export function livingRoomSunlight(
  residence: Residence,
  date: string,
): RoomSunlight | undefined {
  const day = solarDay(date, residence.location);
  const living = residence.floorPlan.rooms.find(
    (room) => room.kind === "living",
  );
  if (!day || !living) return undefined;
  return roomSunlight(residence.floorPlan, living.id, residence.location, day);
}
