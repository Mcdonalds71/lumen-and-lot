import { residenceGallery, residencePalettes } from "./images";
import type { ResidenceInput } from "../schemas/residence";

const slug = "courtyard-rooms";

export const courtyardRooms = {
  slug,
  name: "Courtyard Rooms",
  market: "copenhagen",
  locality: "Frederiksberg",
  location: { lat: 55.6786, lng: 12.532 },
  listedOn: "2026-09-17",
  status: "reserved",
  bedrooms: 3,
  bathrooms: 2,
  areaM2: 135,
  price: { amount: 9_600_000, currency: "DKK" },
  energyLabel: { system: "Energimærke", rating: "A2015" },
  story:
    "A large apartment in a Frederiksberg block, with tall windows to the street on one side and a planted courtyard on the other. Mornings start in the street-side rooms. Afternoons belong to the kitchen and the courtyard bedroom.",
  gallery: residenceGallery(slug, {
    exterior: "The planted courtyard behind the block in Frederiksberg",
    interior: "The living room behind its tall street windows",
    detail: "A restored window and its old brass catch",
  }),
  palettes: residencePalettes(slug, [
    { room: "living", label: "The living room" },
    { room: "main-bedroom", label: "The main bedroom" },
  ]),
  floorPlan: {
    northRotation: 270,
    rooms: [
      {
        id: "living",
        name: "Living room",
        kind: "living",
        polygon: [
          [0, 0],
          [6, 0],
          [6, 4.5],
          [0, 4.5],
        ],
        windows: [
          { start: [1, 0], end: [2.5, 0], sill: 0.6, head: 2.6 },
          { start: [3.5, 0], end: [5, 0], sill: 0.6, head: 2.6 },
        ],
      },
      {
        id: "main-bedroom",
        name: "Main bedroom",
        kind: "bedroom",
        polygon: [
          [6, 0],
          [11, 0],
          [11, 4.5],
          [6, 4.5],
        ],
        windows: [
          { start: [6.75, 0], end: [8.25, 0], sill: 0.6, head: 2.6 },
          { start: [9, 0], end: [10.5, 0], sill: 0.6, head: 2.6 },
        ],
      },
      {
        id: "bedroom-2",
        name: "Bedroom 2",
        kind: "bedroom",
        polygon: [
          [11, 0],
          [16, 0],
          [16, 4.5],
          [11, 4.5],
        ],
        windows: [
          { start: [12, 0], end: [13.5, 0], sill: 0.6, head: 2.6 },
          { start: [14, 0], end: [15.5, 0], sill: 0.6, head: 2.6 },
        ],
      },
      {
        id: "kitchen",
        name: "Kitchen",
        kind: "kitchen",
        polygon: [
          [0, 4.5],
          [5, 4.5],
          [5, 8],
          [0, 8],
        ],
        windows: [{ start: [1, 8], end: [3, 8], sill: 0.9, head: 2.4 }],
      },
      {
        id: "bathroom",
        name: "Bathroom",
        kind: "bathroom",
        polygon: [
          [5, 4.5],
          [7.5, 4.5],
          [7.5, 8],
          [5, 8],
        ],
        windows: [{ start: [5.5, 8], end: [7, 8], sill: 1.4, head: 2.2 }],
      },
      {
        id: "ensuite",
        name: "Ensuite",
        kind: "bathroom",
        polygon: [
          [7.5, 4.5],
          [9.5, 4.5],
          [9.5, 8],
          [7.5, 8],
        ],
        windows: [{ start: [8, 8], end: [9, 8], sill: 1.4, head: 2.2 }],
      },
      {
        id: "hall",
        name: "Hall",
        kind: "hall",
        polygon: [
          [9.5, 4.5],
          [12, 4.5],
          [12, 8],
          [9.5, 8],
        ],
      },
      {
        id: "bedroom-3",
        name: "Bedroom 3",
        kind: "bedroom",
        polygon: [
          [12, 4.5],
          [16, 4.5],
          [16, 8],
          [12, 8],
        ],
        windows: [{ start: [13, 8], end: [15, 8], sill: 0.9, head: 2.4 }],
      },
    ],
  },
} satisfies ResidenceInput;
