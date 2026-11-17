import { residenceGallery, residencePalettes } from "./images";
import type { ResidenceInput } from "../schemas/residence";

const slug = "canal-house";

export const canalHouse = {
  slug,
  name: "Canal House",
  market: "london",
  locality: "De Beauvoir",
  location: { lat: 51.5405, lng: -0.079 },
  listedOn: "2026-11-04",
  status: "available",
  bedrooms: 2,
  bathrooms: 2,
  areaM2: 104,
  price: { amount: 1_195_000, currency: "GBP" },
  energyLabel: { system: "EPC", rating: "B", score: 85 },
  story:
    "A two-bedroom apartment above the Regent's Canal in De Beauvoir. The living room runs the full depth of the plan and opens south to the water, so the winter sun reaches the kitchen at the back.",
  gallery: residenceGallery(slug, {
    exterior: "The brick front of the building above the canal towpath",
    interior: "The living room, open to the canal on its south side",
    detail: "Morning sun on a brick reveal and an oak sill",
  }),
  palettes: residencePalettes(slug, [
    { room: "living", label: "The living room and kitchen" },
    { room: "main-bedroom", label: "The main bedroom" },
  ]),
  floorPlan: {
    northRotation: 12,
    rooms: [
      {
        id: "living",
        name: "Living and kitchen",
        kind: "living",
        polygon: [
          [0, 0],
          [7, 0],
          [7, 8],
          [0, 8],
        ],
        windows: [
          { start: [1, 8], end: [3.5, 8], sill: 0, head: 2.4 },
          { start: [4, 8], end: [6.5, 8], sill: 0, head: 2.4 },
          { start: [0, 2], end: [0, 5], sill: 0.9, head: 2.2 },
        ],
      },
      {
        id: "hall",
        name: "Hall",
        kind: "hall",
        polygon: [
          [7, 0],
          [9, 0],
          [9, 4],
          [7, 4],
        ],
        windows: [{ start: [7.5, 0], end: [8.5, 0], sill: 1.2, head: 2.1 }],
      },
      {
        id: "bathroom",
        name: "Bathroom",
        kind: "bathroom",
        polygon: [
          [9, 0],
          [11, 0],
          [11, 4],
          [9, 4],
        ],
        windows: [{ start: [9.5, 0], end: [10.5, 0], sill: 1.5, head: 2.1 }],
      },
      {
        id: "ensuite",
        name: "Ensuite",
        kind: "bathroom",
        polygon: [
          [11, 0],
          [13, 0],
          [13, 4],
          [11, 4],
        ],
        windows: [{ start: [13, 1], end: [13, 3], sill: 1.5, head: 2.1 }],
      },
      {
        id: "bedroom-2",
        name: "Bedroom 2",
        kind: "bedroom",
        polygon: [
          [7, 4],
          [10, 4],
          [10, 8],
          [7, 8],
        ],
        windows: [{ start: [7.75, 8], end: [9.25, 8], sill: 0.9, head: 2.2 }],
      },
      {
        id: "main-bedroom",
        name: "Main bedroom",
        kind: "bedroom",
        polygon: [
          [10, 4],
          [13, 4],
          [13, 8],
          [10, 8],
        ],
        windows: [
          { start: [10.75, 8], end: [12.25, 8], sill: 0, head: 2.4 },
          { start: [13, 5], end: [13, 7], sill: 0.9, head: 2.2 },
        ],
      },
    ],
  },
} satisfies ResidenceInput;
