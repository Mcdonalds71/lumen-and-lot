import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageFallback } from "@/components/shell/page-fallback";
import { Container } from "@/components/ui/container";
import { findResidence, residences } from "@/content/residences";

import { DaylightSection } from "./_sections/daylight-section";
import { NextResidence } from "./_sections/next-residence";
import { ResidenceGallery } from "./_sections/residence-gallery";
import { ResidenceIntro } from "./_sections/residence-intro";
import { SpecificationsSection } from "./_sections/specifications-section";

type Params = PageProps<"/residences/[slug]">["params"];

export function generateStaticParams() {
  return residences.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/residences/[slug]">): Promise<Metadata> {
  const residence = findResidence((await params).slug);
  return residence
    ? { title: residence.name, description: residence.story }
    : {};
}

export default function ResidencePage({
  params,
}: PageProps<"/residences/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <ResidenceContent params={params} />
    </Suspense>
  );
}

async function ResidenceContent({ params }: { params: Params }) {
  const residence = findResidence((await params).slug);
  if (!residence) notFound();

  return (
    <>
      <ResidenceIntro residence={residence} />
      <ResidenceGallery residence={residence} />
      <Container className="flex flex-col gap-32 pt-32 md:gap-48 md:pt-40">
        <DaylightSection residence={residence} />
        <SpecificationsSection residence={residence} />
        <NextResidence residence={residence} />
      </Container>
    </>
  );
}
