import { z } from "zod";

import { image } from "./media";
import { uniqueBy } from "./schemas/common";
import { type Lookbook, lookbookSchema } from "./schemas/lookbook";

export const lookbooks: readonly Lookbook[] = z
  .array(lookbookSchema)
  .check(uniqueBy("lookbook", (lookbook) => lookbook.slug))
  .check(uniqueBy("lookbook palette", (lookbook) => lookbook.palette))
  .parse([
    {
      slug: "limewash-living-room",
      palette: "limewash",
      title: "Limewash",
      room: "Living room",
      intro:
        "Pale plaster walls, white oak and linen. A quiet room that takes in the light and gives it back.",
      image: image(
        "/images/lookbooks/limewash-living-room.webp",
        "A living room in the Limewash palette, with a linen sofa, an oak table and a paper floor lamp",
        "landscape",
      ),
      hotspots: [
        {
          id: "sofa",
          x: 30,
          y: 66,
          item: "Three-seat sofa",
          maker: "Lowfield Upholstery",
          material: "Undyed linen over an oak frame",
          dimensionsCm: { width: 228, depth: 95, height: 74 },
          price: { amount: 6800, currency: "CAD" },
        },
        {
          id: "low-table",
          x: 52,
          y: 82,
          item: "Low table",
          maker: "Northbank Joinery",
          material: "Solid white oak",
          dimensionsCm: { width: 120, depth: 60, height: 34 },
          price: { amount: 2450, currency: "CAD" },
        },
        {
          id: "floor-lamp",
          x: 74,
          y: 46,
          item: "Floor lamp",
          maker: "Two Rivers Lighting",
          material: "Brushed steel with a paper shade",
          dimensionsCm: { width: 45, depth: 45, height: 165 },
          price: { amount: 890, currency: "USD" },
        },
        {
          id: "lounge-chair",
          x: 86,
          y: 70,
          item: "Lounge chair",
          maker: "Saltvand Studio",
          material: "Ash and boiled wool",
          dimensionsCm: { width: 72, depth: 80, height: 70 },
          price: { amount: 14_500, currency: "DKK" },
        },
        {
          id: "rug",
          x: 14,
          y: 88,
          item: "Wool rug",
          maker: "Hvid Textiles",
          material: "Hand-tufted undyed wool",
          dimensionsCm: { width: 240, depth: 170, height: 1.5 },
          price: { amount: 9800, currency: "DKK" },
        },
      ],
    },
    {
      slug: "umber-kitchen",
      palette: "umber",
      title: "Umber",
      room: "Kitchen and dining room",
      intro:
        "Warm clay plaster, smoked oak and travertine. A room for long dinners in late light.",
      image: image(
        "/images/lookbooks/umber-kitchen.webp",
        "A kitchen and dining room in the Umber palette, with a smoked oak table under a brass pendant",
        "landscape",
      ),
      hotspots: [
        {
          id: "dining-table",
          x: 46,
          y: 70,
          item: "Dining table",
          maker: "Northbank Joinery",
          material: "Smoked oak",
          dimensionsCm: { width: 220, depth: 95, height: 74 },
          price: { amount: 7400, currency: "CAD" },
        },
        {
          id: "dining-chair",
          x: 22,
          y: 74,
          item: "Dining chair",
          maker: "Orchard Turned Wood",
          material: "Walnut and paper cord",
          dimensionsCm: { width: 48, depth: 52, height: 78 },
          price: { amount: 780, currency: "USD" },
        },
        {
          id: "pendant",
          x: 46,
          y: 22,
          item: "Pendant light",
          maker: "Two Rivers Lighting",
          material: "Aged brass",
          dimensionsCm: { width: 60, depth: 60, height: 28 },
          price: { amount: 1450, currency: "USD" },
        },
        {
          id: "counter-stool",
          x: 80,
          y: 76,
          item: "Counter stool",
          maker: "Ferro Works",
          material: "Blackened steel and leather",
          dimensionsCm: { width: 40, depth: 40, height: 65 },
          price: { amount: 540, currency: "EUR" },
        },
        {
          id: "serving-bowls",
          x: 66,
          y: 50,
          item: "Serving bowls",
          maker: "Kiln & Quay",
          material: "Glazed stoneware",
          dimensionsCm: { width: 32, depth: 32, height: 12 },
          price: { amount: 180, currency: "EUR" },
        },
      ],
    },
    {
      slug: "slate-bedroom",
      palette: "slate",
      title: "Slate",
      room: "Bedroom",
      intro:
        "Mineral gray walls, ash and slate, with wool and blackened steel. A calm room for short winter days.",
      image: image(
        "/images/lookbooks/slate-bedroom.webp",
        "A bedroom in the Slate palette, with an ash bed, a wool throw and a steel wall light",
        "landscape",
      ),
      hotspots: [
        {
          id: "bed",
          x: 46,
          y: 70,
          item: "Bed",
          maker: "Northbank Joinery",
          material: "Ash with a wool headboard",
          dimensionsCm: { width: 170, depth: 215, height: 95 },
          price: { amount: 5900, currency: "CAD" },
        },
        {
          id: "bedside-table",
          x: 72,
          y: 76,
          item: "Bedside table",
          maker: "Orchard Turned Wood",
          material: "Ebonized ash",
          dimensionsCm: { width: 45, depth: 40, height: 50 },
          price: { amount: 640, currency: "USD" },
        },
        {
          id: "wall-light",
          x: 72,
          y: 40,
          item: "Wall light",
          maker: "Ferro Works",
          material: "Blackened steel",
          dimensionsCm: { width: 18, depth: 22, height: 30 },
          price: { amount: 320, currency: "EUR" },
        },
        {
          id: "throw",
          x: 22,
          y: 84,
          item: "Wool throw",
          maker: "Hvid Textiles",
          material: "Boiled wool",
          dimensionsCm: { width: 130, depth: 180, height: 1 },
          price: { amount: 1900, currency: "DKK" },
        },
        {
          id: "reading-chair",
          x: 90,
          y: 60,
          item: "Reading chair",
          maker: "Saltvand Studio",
          material: "Ash and slate-gray wool",
          dimensionsCm: { width: 70, depth: 78, height: 76 },
          price: { amount: 12_800, currency: "DKK" },
        },
      ],
    },
  ]);

export function findLookbook(slug: string): Lookbook | undefined {
  return lookbooks.find((lookbook) => lookbook.slug === slug);
}
