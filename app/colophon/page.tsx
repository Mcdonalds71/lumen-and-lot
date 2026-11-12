import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import { colophon } from "@/content/colophon";

import { ConceptSection } from "./_sections/concept-section";
import { NotesSection } from "./_sections/notes-section";
import { StackSection } from "./_sections/stack-section";
import { TypeSection } from "./_sections/type-section";

export const metadata: Metadata = {
  title: "Colophon",
  description: "The concept, type, tools and images behind this site.",
};

export default function ColophonPage() {
  return (
    <Container className="pt-16 md:pt-24">
      <Label as="p">Colophon</Label>
      <Grid className="mt-6 gap-y-8">
        <h1 className="col-span-12 font-display text-display-xl lg:col-span-8">
          How this site was made
        </h1>
        <p className="col-span-12 text-lead md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          The idea behind the studio, and the type, tools and images that make
          up its website.
        </p>
      </Grid>

      <div className="mt-24 flex flex-col gap-32 md:mt-40 md:gap-48">
        <ConceptSection index={1} />
        <TypeSection index={2} fonts={colophon.fonts} />
        <StackSection index={3} tools={colophon.tools} />
        <NotesSection index={4} />
      </div>
    </Container>
  );
}
