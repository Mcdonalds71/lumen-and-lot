import { residenceGallery, residencePalettes } from "./images";
import type { ResidenceInput } from "../schemas/residence";

const slug = "north-light";

export const northLight = {
  slug,
  name: "North Light",
  market: "toronto",
  locality: "Roncesvalles",
  location: { lat: 43.6487, lng: -79.4498 },
  listedOn: "2026-06-02",
  status: "reserved",
  bedrooms: 1,
  bathrooms: 1,
  areaM2: 88,
  price: { amount: 989_000, currency: "CAD" },
  energyLabel: { system: "EnerGuide", gigajoulesPerYear: 41 },
  story:
    "A top-floor apartment with tall north windows and a study that catches the morning sun. The light in the main room stays soft and even all day, which suits a desk, a piano or a wall of books.",
  gallery: residenceGallery(slug, {
    exterior: "The top floor of the building in Roncesvalles",
    interior: "The main room under its tall north windows",
    detail: "A deep window reveal in soft north light",
  }),
  palettes: residencePalettes(slug, [
    { room: "living", label: "The living room and kitchen" },
    { room: "bedroom", label: "The bedroom" },
  ]),
  floorPlan: {
    northRotation: 16,
    rooms: [
      {
        id: "living",
        name: "Living and kitchen",
        kind: "living",
        polygon: [
          [0, 0],
          [8, 0],
          [8, 4],
          [0, 4],
        ],
        windows: [
          { start: [1, 0], end: [3.5, 0], sill: 0.5, head: 2.6 },
          { start: [4.5, 0], end: [7, 0], sill: 0.5, head: 2.6 },
          { start: [0, 1], end: [0, 3], sill: 0.9, head: 2.4 },
        ],
      },
      {
        id: "study",
        name: "Study",
        kind: "study",
        polygon: [
          [8, 0],
          [12, 0],
          [12, 4],
          [8, 4],
        ],
        windows: [
          { start: [9, 0], end: [11, 0], sill: 0.8, head: 2.4 },
          { start: [12, 1], end: [12, 3], sill: 0.9, head: 2.2 },
        ],
      },
      {
        id: "bedroom",
        name: "Bedroom",
        kind: "bedroom",
        polygon: [
          [0, 4],
          [4.5, 4],
          [4.5, 7],
          [0, 7],
        ],
        windows: [
          { start: [1, 7], end: [3.5, 7], sill: 0.9, head: 2.2 },
          { start: [0, 4.5], end: [0, 6.5], sill: 0.9, head: 2.2 },
        ],
      },
      {
        id: "bathroom",
        name: "Bathroom",
        kind: "bathroom",
        polygon: [
          [4.5, 4],
          [7.5, 4],
          [7.5, 7],
          [4.5, 7],
        ],
        windows: [{ start: [5.25, 7], end: [6.75, 7], sill: 1.6, head: 2.2 }],
      },
      {
        id: "hall",
        name: "Hall",
        kind: "hall",
        polygon: [
          [7.5, 4],
          [12, 4],
          [12, 7],
          [7.5, 7],
        ],
        windows: [{ start: [12, 4.75], end: [12, 6.25], sill: 0.9, head: 2.2 }],
      },
    ],
  },
} satisfies ResidenceInput;
