import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import { studio } from "@/content/studio";

import { AwardsSection } from "./_sections/awards-section";
import { BriefInvitation } from "./_sections/brief-invitation";
import { PhilosophySection } from "./_sections/philosophy-section";
import { ProcessSection } from "./_sections/process-section";
import { TeamSection } from "./_sections/team-section";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "How Lumen & Lot works, from the first sketch to the last shelf.",
};

export default function StudioPage() {
  return (
    <Container className="pt-16 md:pt-24">
      <Label as="p">Studio</Label>
      <Grid className="mt-6 gap-y-8">
        <h1 className="col-span-12 font-display text-display-xl lg:col-span-8">
          A small studio in four cities
        </h1>
        <p className="col-span-12 text-lead md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          Lumen & Lot designs, builds and furnishes small residential buildings
          in Toronto, the Hudson Valley, Copenhagen and Lisbon.
        </p>
      </Grid>

      <div className="mt-24 flex flex-col gap-32 md:mt-40 md:gap-48">
        <PhilosophySection
          index={1}
          statement={studio.statement}
          principles={studio.principles}
        />
        <ProcessSection index={2} steps={studio.process} />
        <TeamSection index={3} team={studio.team} />
        <AwardsSection index={4} awards={studio.awards} />
        <BriefInvitation />
      </div>
    </Container>
  );
}
