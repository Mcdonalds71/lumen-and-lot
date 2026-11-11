import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { RevealImage } from "@/components/ui/reveal-image";
import type { Residence } from "@/content/schemas/residence";
import { cx } from "@/lib/cx";

const placements = [
  "md:col-span-5",
  "md:col-span-6 md:col-start-7 md:self-end",
];

export function ResidenceGallery({ residence }: { residence: Residence }) {
  const [lead, ...rest] = residence.gallery;
  if (!lead) return null;

  return (
    <Container className="mt-16 md:mt-24">
      <Image
        src={lead.src}
        width={lead.width}
        height={lead.height}
        alt={lead.alt}
        sizes="100vw"
        preload
        className="h-auto w-full"
      />
      <Grid className="mt-gutter gap-y-gutter">
        {rest.map((image, index) => (
          <RevealImage
            key={image.src}
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            sizes="(min-width: 48rem) 45vw, 100vw"
            className={cx("col-span-12", placements[index])}
          />
        ))}
      </Grid>
    </Container>
  );
}
