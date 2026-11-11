import { residenceGallery, residencePalettes } from "./images";
import type { ResidenceInput } from "../schemas/residence";

const slug = "harbor-room";

export const harborRoom = {
  slug,
  name: "Harbor Room",
  market: "copenhagen",
  locality: "Nordhavn",
  location: { lat: 55.709, lng: 12.596 },
  listedOn: "2026-08-25",
  status: "available",
  bedrooms: 2,
  bathrooms: 1,
  areaM2: 101,
  price: { amount: 7_950_000, currency: "DKK" },
  energyLabel: { system: "Energimærke", rating: "A2020" },
  story:
    "An apartment on the water in Nordhavn. The kitchen and living room look west over the harbor toward the evening sun, and both bedrooms take the morning light from the east.",
  gallery: residenceGallery(slug, {
    exterior: "The building on the harbor edge in Nordhavn",
    interior: "The living room facing west over the water",
    detail: "A floor-to-ceiling window frame",
  }),
  palettes: residencePalettes(slug, [
    { room: "living", label: "The living room and kitchen" },
    { room: "main-bedroom", label: "The main bedroom" },
  ]),
  floorPlan: {
    northRotation: 22,
    rooms: [
      {
        id: "living",
        name: "Living and kitchen",
        kind: "living",
        polygon: [
          [0, 0],
          [6, 0],
          [6, 8],
          [0, 8],
        ],
        windows: [
          { start: [0, 1], end: [0, 3.5], sill: 0, head: 2.5 },
          { start: [0, 4.5], end: [0, 7], sill: 0, head: 2.5 },
          { start: [1.5, 8], end: [4.5, 8], sill: 0, head: 2.5 },
        ],
      },
      {
        id: "bathroom",
        name: "Bathroom",
        kind: "bathroom",
        polygon: [
          [6, 0],
          [8.5, 0],
          [8.5, 2.5],
          [6, 2.5],
        ],
      },
      {
        id: "hall",
        name: "Hall",
        kind: "hall",
        polygon: [
          [6, 2.5],
          [8.5, 2.5],
          [8.5, 4.5],
          [6, 4.5],
        ],
      },
      {
        id: "bedroom-2",
        name: "Bedroom 2",
        kind: "bedroom",
        polygon: [
          [8.5, 0],
          [12, 0],
          [12, 4.5],
          [8.5, 4.5],
        ],
        windows: [
          { start: [9, 0], end: [11, 0], sill: 0.8, head: 2.4 },
          { start: [12, 1], end: [12, 3], sill: 0.8, head: 2.4 },
        ],
      },
      {
        id: "main-bedroom",
        name: "Main bedroom",
        kind: "bedroom",
        polygon: [
          [6, 4.5],
          [12, 4.5],
          [12, 8],
          [6, 8],
        ],
        windows: [
          { start: [7, 8], end: [10, 8], sill: 0.8, head: 2.4 },
          { start: [12, 5.5], end: [12, 7.5], sill: 0.8, head: 2.4 },
        ],
      },
    ],
  },
} satisfies ResidenceInput;
