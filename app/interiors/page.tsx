import type { Metadata } from "next";

import { pageMetadata } from "@/app/_seo/page-metadata";
import { RatesNote } from "@/components/preferences/rates-note";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import { lookbooks } from "@/content/lookbooks";

import { LookbookSection } from "./_sections/lookbook-section";

export const metadata: Metadata = pageMetadata({
  title: "Interiors",
  description:
    "Lookbooks for the Limewash, Umber and Slate palettes, with every piece listed.",
  path: "/interiors",
});

export default function InteriorsPage() {
  return (
    <Container className="pt-16 md:pt-24">
      <Label as="p">Interiors</Label>
      <Grid className="mt-6 gap-y-8">
        <h1 className="col-span-12 font-display text-display-xl lg:col-span-8">
          Three palettes, every piece listed
        </h1>
        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="text-lead">
            Each palette has a room of its own. Open a marker on the photograph,
            or read the list below it, for the maker, the material and an
            indicative price.
          </p>
          <p className="mt-4 text-small text-muted">
            This is a concept studio, so the makers and prices are invented.
          </p>
        </div>
      </Grid>
      <div className="mt-24 flex flex-col gap-32 md:mt-32 md:gap-48">
        {lookbooks.map((lookbook, index) => (
          <LookbookSection
            key={lookbook.slug}
            index={index + 1}
            lookbook={lookbook}
          />
        ))}
      </div>
      <RatesNote className="mt-16 max-w-xl" />
    </Container>
  );
}
