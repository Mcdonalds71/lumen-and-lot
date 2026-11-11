import { residenceGallery, residencePalettes } from "./images";
import type { ResidenceInput } from "../schemas/residence";

const slug = "high-terrace";

export const highTerrace = {
  slug,
  name: "High Terrace",
  market: "lisbon",
  locality: "Príncipe Real",
  location: { lat: 38.7166, lng: -9.1485 },
  listedOn: "2026-10-20",
  status: "available",
  bedrooms: 2,
  bathrooms: 2,
  areaM2: 109,
  price: { amount: 1_250_000, currency: "EUR" },
  energyLabel: { system: "Certificado Energético", rating: "A" },
  story:
    "A top-floor apartment in Príncipe Real with a long terrace to the south. The living room and the main bedroom open onto it through tall glass doors, and the city falls away toward the river.",
  gallery: residenceGallery(slug, {
    exterior: "The terrace on the top floor in Príncipe Real",
    interior: "The living room opening onto the terrace",
    detail: "Glazed tiles beside a tall glass door",
  }),
  palettes: residencePalettes(slug, [
    { room: "living", label: "The living room and kitchen" },
    { room: "main-bedroom", label: "The main bedroom" },
  ]),
  floorPlan: {
    northRotation: 10,
    rooms: [
      {
        id: "bedroom-2",
        name: "Bedroom 2",
        kind: "bedroom",
        polygon: [
          [0, 0],
          [4, 0],
          [4, 3.5],
          [0, 3.5],
        ],
        windows: [
          { start: [1, 0], end: [3, 0], sill: 0.9, head: 2.4 },
          { start: [0, 0.75], end: [0, 2.75], sill: 0.9, head: 2.4 },
        ],
      },
      {
        id: "bathroom",
        name: "Bathroom",
        kind: "bathroom",
        polygon: [
          [4, 0],
          [6.5, 0],
          [6.5, 3.5],
          [4, 3.5],
        ],
        windows: [{ start: [4.5, 0], end: [6, 0], sill: 1.5, head: 2.2 }],
      },
      {
        id: "hall",
        name: "Hall",
        kind: "hall",
        polygon: [
          [6.5, 0],
          [9.5, 0],
          [9.5, 3.5],
          [6.5, 3.5],
        ],
      },
      {
        id: "ensuite",
        name: "Ensuite",
        kind: "bathroom",
        polygon: [
          [9.5, 0],
          [13, 0],
          [13, 3.5],
          [9.5, 3.5],
        ],
        windows: [{ start: [10, 0], end: [12, 0], sill: 1.5, head: 2.2 }],
      },
      {
        id: "living",
        name: "Living and kitchen",
        kind: "living",
        polygon: [
          [0, 3.5],
          [7.5, 3.5],
          [7.5, 8],
          [0, 8],
        ],
        windows: [
          { start: [1, 8], end: [3.25, 8], sill: 0, head: 2.7 },
          { start: [4.25, 8], end: [6.5, 8], sill: 0, head: 2.7 },
          { start: [0, 4.5], end: [0, 7], sill: 0.9, head: 2.4 },
        ],
      },
      {
        id: "main-bedroom",
        name: "Main bedroom",
        kind: "bedroom",
        polygon: [
          [7.5, 3.5],
          [13, 3.5],
          [13, 8],
          [7.5, 8],
        ],
        windows: [
          { start: [8.5, 8], end: [11.5, 8], sill: 0, head: 2.7 },
          { start: [13, 4.5], end: [13, 7], sill: 0.9, head: 2.4 },
        ],
      },
    ],
  },
} satisfies ResidenceInput;
