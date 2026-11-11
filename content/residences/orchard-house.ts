import { residenceGallery, residencePalettes } from "./images";
import type { ResidenceInput } from "../schemas/residence";

const slug = "orchard-house";

export const orchardHouse = {
  slug,
  name: "Orchard House",
  market: "hudson-valley",
  locality: "Hudson",
  location: { lat: 42.2529, lng: -73.791 },
  listedOn: "2026-03-09",
  status: "sold",
  bedrooms: 3,
  bathrooms: 2,
  areaM2: 176,
  price: { amount: 1_150_000, currency: "USD" },
  energyLabel: { system: "HERS Index", score: 38 },
  story:
    "A single-story house set among old apple trees outside Hudson. Every bedroom faces south, and the long living room opens to the orchard on three sides.",
  gallery: residenceGallery(slug, {
    exterior: "The long south side of the house among the apple trees",
    interior: "The living room, open to the orchard on three sides",
    detail: "A timber column against a tall window",
  }),
  palettes: residencePalettes(slug, [
    { room: "living", label: "The living room, kitchen and dining room" },
    { room: "main-bedroom", label: "The main bedroom" },
  ]),
  floorPlan: {
    northRotation: 8,
    rooms: [
      {
        id: "living",
        name: "Living, kitchen and dining",
        kind: "living",
        polygon: [
          [0, 0],
          [9, 0],
          [9, 8],
          [0, 8],
        ],
        windows: [
          { start: [1, 8], end: [4, 8], sill: 0, head: 2.6 },
          { start: [5, 8], end: [8, 8], sill: 0, head: 2.6 },
          { start: [0, 2], end: [0, 6], sill: 0, head: 2.6 },
          { start: [3, 0], end: [6, 0], sill: 0.9, head: 2.2 },
        ],
      },
      {
        id: "hall",
        name: "Hall",
        kind: "hall",
        polygon: [
          [9, 0],
          [14, 0],
          [14, 3],
          [9, 3],
        ],
        windows: [{ start: [10, 0], end: [13, 0], sill: 0.6, head: 2.2 }],
      },
      {
        id: "bathroom",
        name: "Bathroom",
        kind: "bathroom",
        polygon: [
          [14, 0],
          [16.5, 0],
          [16.5, 3],
          [14, 3],
        ],
        windows: [{ start: [14.5, 0], end: [16, 0], sill: 1.5, head: 2.1 }],
      },
      {
        id: "ensuite",
        name: "Ensuite",
        kind: "bathroom",
        polygon: [
          [16.5, 0],
          [19.5, 0],
          [19.5, 3],
          [16.5, 3],
        ],
        windows: [{ start: [17, 0], end: [19, 0], sill: 1.5, head: 2.1 }],
      },
      {
        id: "laundry",
        name: "Laundry",
        kind: "utility",
        polygon: [
          [19.5, 0],
          [21, 0],
          [21, 3],
          [19.5, 3],
        ],
        windows: [{ start: [21, 0.75], end: [21, 2.25], sill: 1.2, head: 2.1 }],
      },
      {
        id: "bedroom-2",
        name: "Bedroom 2",
        kind: "bedroom",
        polygon: [
          [9, 3],
          [12.5, 3],
          [12.5, 8],
          [9, 8],
        ],
        windows: [{ start: [10, 8], end: [11.5, 8], sill: 0.9, head: 2.2 }],
      },
      {
        id: "bedroom-3",
        name: "Bedroom 3",
        kind: "bedroom",
        polygon: [
          [12.5, 3],
          [16, 3],
          [16, 8],
          [12.5, 8],
        ],
        windows: [{ start: [13.5, 8], end: [15, 8], sill: 0.9, head: 2.2 }],
      },
      {
        id: "main-bedroom",
        name: "Main bedroom",
        kind: "bedroom",
        polygon: [
          [16, 3],
          [21, 3],
          [21, 8],
          [16, 8],
        ],
        windows: [
          { start: [17, 8], end: [20, 8], sill: 0, head: 2.4 },
          { start: [21, 4], end: [21, 7], sill: 0.9, head: 2.2 },
        ],
      },
    ],
  },
} satisfies ResidenceInput;
