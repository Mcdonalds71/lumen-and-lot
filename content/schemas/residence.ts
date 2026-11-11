import { z } from "zod";

import { markets } from "../markets";
import { imageSchema, moneySchema, slugSchema, uniqueBy } from "./common";
import { energyLabelSchema } from "./energy-label";
import { floorPlanSchema, type RoomKind } from "./floor-plan";
import { marketIds } from "./market";
import { paletteIds } from "./palette";

export const statuses = ["available", "reserved", "sold"] as const;

export type Status = (typeof statuses)[number];

const paletteRoomsSchema = z.object({
  palette: z.enum(paletteIds),
  rooms: z
    .array(z.object({ room: slugSchema, image: imageSchema }))
    .min(1)
    .check(uniqueBy("palette room", (entry) => entry.room)),
});

export const residenceSchema = z
  .object({
    slug: slugSchema,
    name: z.string().min(1),
    market: z.enum(marketIds),
    locality: z.string().min(1),
    location: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }),
    listedOn: z.iso.date(),
    status: z.enum(statuses),
    bedrooms: z.number().int().nonnegative(),
    bathrooms: z.number().int().positive(),
    areaM2: z.number().positive(),
    price: moneySchema,
    energyLabel: energyLabelSchema,
    story: z.string().min(1),
    gallery: z.array(imageSchema).min(1),
    palettes: z
      .array(paletteRoomsSchema)
      .length(paletteIds.length)
      .check(uniqueBy("palette", (entry) => entry.palette)),
    floorPlan: floorPlanSchema,
  })
  .superRefine((residence, ctx) => {
    const issue = (message: string, path: (string | number)[]) =>
      ctx.addIssue({ code: "custom", message, path });
    const market = markets[residence.market];
    const { rooms } = residence.floorPlan;
    const count = (kind: RoomKind) =>
      rooms.filter((room) => room.kind === kind).length;

    if (residence.price.currency !== market.currency) {
      issue(`Prices in ${market.name} are in ${market.currency}.`, [
        "price",
        "currency",
      ]);
    }
    if (residence.energyLabel.system !== market.energySystem) {
      issue(
        `Homes in ${market.name} are labeled with ${market.energySystem}.`,
        ["energyLabel", "system"],
      );
    }
    if (count("bedroom") !== residence.bedrooms) {
      issue(`The plan has ${count("bedroom")} bedrooms.`, ["bedrooms"]);
    }
    if (count("bathroom") !== residence.bathrooms) {
      issue(`The plan has ${count("bathroom")} bathrooms.`, ["bathrooms"]);
    }

    const roomIds = new Set(rooms.map((room) => room.id));
    const roomsShown = (index: number) =>
      residence.palettes[index]?.rooms.map((entry) => entry.room).join() ?? "";

    residence.palettes.forEach((entry, paletteIndex) => {
      if (roomsShown(paletteIndex) !== roomsShown(0)) {
        issue("Every palette shows the same rooms in the same order.", [
          "palettes",
          paletteIndex,
          "rooms",
        ]);
      }
      entry.rooms.forEach(({ room }, roomIndex) => {
        if (!roomIds.has(room)) {
          issue(`Room "${room}" is not on the floor plan.`, [
            "palettes",
            paletteIndex,
            "rooms",
            roomIndex,
            "room",
          ]);
        }
      });
    });
  })
  .transform(({ market, ...residence }) => ({
    ...residence,
    market: { id: market, ...markets[market] },
  }));

export type ResidenceInput = z.input<typeof residenceSchema>;

export type Residence = z.output<typeof residenceSchema>;
