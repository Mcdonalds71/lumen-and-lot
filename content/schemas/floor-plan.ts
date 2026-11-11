import { z } from "zod";

import {
  edgeContaining,
  isOnBoundary,
  midpoint,
  polygonArea,
  segmentLength,
} from "@/lib/geometry";

import { slugSchema, uniqueBy } from "./common";

export const roomKinds = [
  "living",
  "kitchen",
  "dining",
  "bedroom",
  "bathroom",
  "study",
  "hall",
  "utility",
] as const;

export type RoomKind = (typeof roomKinds)[number];

const pointSchema = z.tuple([
  z.number().nonnegative(),
  z.number().nonnegative(),
]);

const windowSchema = z
  .object({
    start: pointSchema,
    end: pointSchema,
    sill: z.number().nonnegative(),
    head: z.number().positive().max(4),
  })
  .refine(
    ({ sill, head }) => sill < head,
    "A window's sill sits below its head.",
  )
  .refine(
    ({ start, end }) => segmentLength([start, end]) >= 0.4,
    "A window is at least 0.4 m wide.",
  );

const roomSchema = z.object({
  id: slugSchema,
  name: z.string().min(1),
  kind: z.enum(roomKinds),
  polygon: z
    .array(pointSchema)
    .min(3)
    .refine((polygon) => polygonArea(polygon) > 0, "A room needs an area."),
  windows: z.array(windowSchema).default([]),
});

export const floorPlanSchema = z
  .object({
    northRotation: z.number().min(0).lt(360),
    rooms: z
      .array(roomSchema)
      .min(1)
      .check(uniqueBy("room id", (room) => room.id)),
  })
  .superRefine(({ rooms }, ctx) => {
    const livingRooms = rooms.filter((room) => room.kind === "living").length;
    if (livingRooms !== 1) {
      ctx.addIssue({
        code: "custom",
        message: `A plan has exactly one living room, not ${livingRooms}.`,
        path: ["rooms"],
      });
    }

    rooms.forEach((room, roomIndex) => {
      room.windows.forEach((window, windowIndex) => {
        const path = ["rooms", roomIndex, "windows", windowIndex];
        const label = `Window ${windowIndex + 1} in ${room.name}`;
        const segment = [window.start, window.end] as const;

        if (!edgeContaining(segment, room.polygon)) {
          ctx.addIssue({
            code: "custom",
            message: `${label} is not on one of its walls.`,
            path,
          });
        }

        const center = midpoint(segment);
        const neighbor = rooms.find(
          (other) => other !== room && isOnBoundary(center, other.polygon),
        );
        if (neighbor) {
          ctx.addIssue({
            code: "custom",
            message: `${label} is on the wall shared with ${neighbor.name}.`,
            path,
          });
        }
      });
    });
  });

export type FloorPlan = z.infer<typeof floorPlanSchema>;

export type Room = FloorPlan["rooms"][number];

export type RoomWindow = Room["windows"][number];
