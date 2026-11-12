import { findResidence, residences } from "@/content/residences";
import { formatCount } from "@/lib/format";

import { ogContentType, ogImage, ogSize } from "../../_seo/og-image";

export const alt = "A residence by Lumen & Lot.";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return residences.map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const residence = findResidence((await params).slug);
  return ogImage({
    kicker: residence ? `Residence · ${residence.market.name}` : "Residence",
    title: residence?.name ?? "Residences",
    detail: residence
      ? `${residence.locality} · ${formatCount(residence.bedrooms, "bedroom")}`
      : "Homes in four cities",
  });
}
