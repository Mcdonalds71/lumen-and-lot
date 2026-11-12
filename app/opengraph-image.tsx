import { marketList } from "@/content/markets";

import { ogContentType, ogImage, ogSize } from "./_seo/og-image";

export const alt =
  "Lumen & Lot, a concept studio for small homes in four cities.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    kicker: "Design · Build · Furnish",
    title: "Small homes, built for the light",
    detail: marketList.map((market) => market.name).join(" · "),
  });
}
