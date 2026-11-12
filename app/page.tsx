import type { Metadata } from "next";

import { JsonLd } from "@/app/_seo/json-ld";
import { pageMetadata } from "@/app/_seo/page-metadata";
import { absoluteUrl } from "@/app/_seo/site-url";
import { websiteData } from "@/app/_seo/structured-data";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

import { CityMarquee } from "./_home/city-marquee";
import { FeaturedResidence } from "./_home/featured-residence";
import { Hero } from "./_home/hero";
import { InteriorsTeaser } from "./_home/interiors-teaser";
import { JournalCards } from "./_home/journal-cards";
import { ProjectCollage } from "./_home/project-collage";
import { StudioStatement } from "./_home/studio-statement";

export const metadata: Metadata = pageMetadata({
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={websiteData({
          name: site.name,
          description: site.description,
          url: absoluteUrl("/"),
          author: site.author,
        })}
      />
      <Hero />
      <CityMarquee />
      <Container className="flex flex-col gap-32 pt-32 md:gap-48 md:pt-40">
        <FeaturedResidence />
        <ProjectCollage />
        <InteriorsTeaser />
        <JournalCards />
        <StudioStatement />
      </Container>
    </>
  );
}
