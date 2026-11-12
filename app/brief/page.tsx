import type { Metadata } from "next";

import { pageMetadata } from "@/app/_seo/page-metadata";
import { BriefBuilder } from "@/components/features/brief/brief-builder";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import { marketList } from "@/content/markets";
import { palettes } from "@/content/palettes";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Start a brief",
  description:
    "Six short steps that end in a PDF you keep. Nothing is sent anywhere.",
  path: "/brief",
});

export default function BriefPage() {
  return (
    <Container className="pt-16 md:pt-24">
      <Label as="p">Brief</Label>
      <Grid className="mt-6 gap-y-8">
        <h1 className="col-span-12 font-display text-display-xl lg:col-span-8">
          Start a brief
        </h1>
        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="text-lead">
            Six short questions about the home you have in mind. At the end you
            get a one-page brief as a PDF to keep.
          </p>
          <p className="mt-4 text-small text-muted">
            Nothing is sent anywhere. Your answers stay on this page, and the
            PDF is made in your browser.
          </p>
        </div>
      </Grid>
      <div className="mt-16 max-w-4xl md:mt-24">
        <BriefBuilder
          cities={marketList.map((market) => ({
            value: market.id,
            label: market.name,
            detail: market.country,
            currency: market.currency,
          }))}
          palettes={palettes.map((palette) => ({
            id: palette.id,
            name: palette.name,
            summary: palette.summary,
            colors: palette.swatches.map((swatch) => swatch.color),
          }))}
          credit={{
            studio: site.name,
            author: site.author.name,
            url: new URL(site.author.url).host,
          }}
        />
      </div>
    </Container>
  );
}
