import Link from "next/link";

import { Area } from "@/components/preferences/area";
import { Price } from "@/components/preferences/price";
import { Label } from "@/components/ui/label";
import { RevealImage } from "@/components/ui/reveal-image";
import { coverImage } from "@/content/residences";
import type { Residence } from "@/content/schemas/residence";
import { formatCount } from "@/lib/format";

import { ResidenceStatus } from "./residence-status";

export function ResidenceCard({ residence }: { residence: Residence }) {
  const image = coverImage(residence);

  return (
    <article className="relative">
      <RevealImage
        src={image.src}
        width={image.width}
        height={image.height}
        alt=""
        sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 100vw"
      />
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-display-sm">
          <Link
            href={`/residences/${residence.slug}`}
            className="link-reveal after:absolute after:inset-0"
          >
            {residence.name}
          </Link>
        </h2>
        <ResidenceStatus status={residence.status} />
      </div>
      <Label as="p" className="mt-2">
        {residence.locality}, {residence.market.name}
      </Label>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-rule pt-4 text-small">
        <span>{formatCount(residence.bedrooms, "bedroom")}</span>
        <Area squareMeters={residence.areaM2} />
        <span className="ml-auto">
          <Price price={residence.price} />
        </span>
      </p>
    </article>
  );
}
