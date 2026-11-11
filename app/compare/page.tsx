import type { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import { findResidences } from "@/content/residences";
import { compareListFromParam } from "@/lib/compare";

import { Comparison } from "./_sections/comparison";

export const metadata: Metadata = {
  title: "Compare homes",
  description: "Up to three homes side by side, with a link you can share.",
};

export default function ComparePage({ searchParams }: PageProps<"/compare">) {
  return (
    <Container className="pt-16 md:pt-24">
      <Label as="p">Compare</Label>
      <Grid className="mt-6 gap-y-8">
        <h1 className="col-span-12 font-display text-display-xl lg:col-span-8">
          Compare homes
        </h1>
        <p className="col-span-12 text-lead md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          Up to three homes side by side, in your units and currency. The
          address of this page holds the homes, so the link shows anyone the
          same table.
        </p>
      </Grid>
      <Suspense fallback={<div className="min-h-[50svh]" />}>
        {searchParams.then(({ homes }) => (
          <Comparison
            residences={findResidences(compareListFromParam(homes))}
          />
        ))}
      </Suspense>
    </Container>
  );
}
