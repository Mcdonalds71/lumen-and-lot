import { residenceGallery, residencePalettes } from "./images";
import type { ResidenceInput } from "../schemas/residence";

const slug = "garden-floor";

export const gardenFloor = {
  slug,
  name: "Garden Floor",
  market: "toronto",
  locality: "Leslieville",
  location: { lat: 43.6627, lng: -79.3329 },
  listedOn: "2026-04-14",
  status: "available",
  bedrooms: 2,
  bathrooms: 2,
  areaM2: 118,
  price: { amount: 1_395_000, currency: "CAD" },
  energyLabel: { system: "EnerGuide", gigajoulesPerYear: 52 },
  story:
    "A ground-floor home that opens onto a shared garden. The living room and the main bedroom both face south, so low winter sun reaches deep into the kitchen. The second bedroom sits on the quiet north side.",
  gallery: residenceGallery(slug, {
    exterior: "The garden side of the building in Leslieville",
    interior: "The living room, open to the garden",
    detail: "Oak floor meeting a plaster wall",
  }),
  palettes: residencePalettes(slug, [
    { room: "living", label: "The living room and kitchen" },
    { room: "main-bedroom", label: "The main bedroom" },
  ]),
  floorPlan: {
    northRotation: 16,
    rooms: [
      {
        id: "bedroom-2",
        name: "Bedroom 2",
        kind: "bedroom",
        polygon: [
          [0, 0],
          [4.5, 0],
          [4.5, 3.5],
          [0, 3.5],
        ],
        windows: [
          { start: [1, 0], end: [3.5, 0], sill: 0.9, head: 2.2 },
          { start: [0, 1], end: [0, 2.5], sill: 0.9, head: 2.2 },
        ],
      },
      {
        id: "hall",
        name: "Hall",
        kind: "hall",
        polygon: [
          [4.5, 0],
          [7.5, 0],
          [7.5, 3.5],
          [4.5, 3.5],
        ],
      },
      {
        id: "bathroom",
        name: "Bathroom",
        kind: "bathroom",
        polygon: [
          [7.5, 0],
          [10, 0],
          [10, 3.5],
          [7.5, 3.5],
        ],
        windows: [{ start: [8, 0], end: [9.5, 0], sill: 1.6, head: 2.2 }],
      },
      {
        id: "ensuite",
        name: "Ensuite",
        kind: "bathroom",
        polygon: [
          [10, 0],
          [12.5, 0],
          [12.5, 3.5],
          [10, 3.5],
        ],
        windows: [{ start: [10.5, 0], end: [12, 0], sill: 1.6, head: 2.2 }],
      },
      {
        id: "laundry",
        name: "Laundry",
        kind: "utility",
        polygon: [
          [12.5, 0],
          [14, 0],
          [14, 3.5],
          [12.5, 3.5],
        ],
      },
      {
        id: "living",
        name: "Living and kitchen",
        kind: "living",
        polygon: [
          [0, 3.5],
          [8.5, 3.5],
          [8.5, 8],
          [0, 8],
        ],
        windows: [
          { start: [1, 8], end: [3.5, 8], sill: 0, head: 2.4 },
          { start: [4.5, 8], end: [7.5, 8], sill: 0, head: 2.4 },
          { start: [0, 4.5], end: [0, 6.5], sill: 0.9, head: 2.2 },
        ],
      },
      {
        id: "main-bedroom",
        name: "Main bedroom",
        kind: "bedroom",
        polygon: [
          [8.5, 3.5],
          [14, 3.5],
          [14, 8],
          [8.5, 8],
        ],
        windows: [
          { start: [9.5, 8], end: [12.5, 8], sill: 0, head: 2.4 },
          { start: [14, 5], end: [14, 7], sill: 0.9, head: 2.2 },
        ],
      },
    ],
  },
} satisfies ResidenceInput;
