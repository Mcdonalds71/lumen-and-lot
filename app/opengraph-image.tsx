import { marketList } from "@/content/markets";

import { ogContentType, ogImage, ogSize } from "./_seo/og-image";

export const alt =
  "Lumen & Lot, a design-build studio for small homes in five cities.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    kicker: "Design-build studio",
    title: "Small homes, built for the light",
    detail: marketList.map((market) => market.name).join(" · "),
  });
}
