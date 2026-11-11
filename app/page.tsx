import { Container } from "@/components/ui/container";

import { CityMarquee } from "./_home/city-marquee";
import { FeaturedResidence } from "./_home/featured-residence";
import { Hero } from "./_home/hero";
import { InteriorsTeaser } from "./_home/interiors-teaser";
import { JournalCards } from "./_home/journal-cards";
import { ProjectCollage } from "./_home/project-collage";
import { StudioStatement } from "./_home/studio-statement";

export default function HomePage() {
  return (
    <>
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
