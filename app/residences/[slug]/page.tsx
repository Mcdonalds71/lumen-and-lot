import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/app/_seo/json-ld";
import { pageMetadata } from "@/app/_seo/page-metadata";
import { absoluteUrl } from "@/app/_seo/site-url";
import { breadcrumbData } from "@/app/_seo/structured-data";
import { Container } from "@/components/ui/container";
import { findResidence, residences } from "@/content/residences";

import { DaylightSection } from "./_sections/daylight-section";
import { FinishesSection } from "./_sections/finishes-section";
import { NextResidence } from "./_sections/next-residence";
import { ResidenceGallery } from "./_sections/residence-gallery";
import { ResidenceIntro } from "./_sections/residence-intro";
import { SpecificationsSection } from "./_sections/specifications-section";

export const instant = false;

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return residences.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/residences/[slug]">): Promise<Metadata> {
  const residence = findResidence((await params).slug);
  return residence
    ? pageMetadata({
        title: residence.name,
        description: residence.story,
        path: `/residences/${residence.slug}`,
      })
    : {};
}

export default async function ResidencePage({
  params,
}: PageProps<"/residences/[slug]">) {
  const residence = findResidence((await params).slug);
  if (!residence) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbData([
          { name: "Residences", url: absoluteUrl("/residences") },
          {
            name: residence.name,
            url: absoluteUrl(`/residences/${residence.slug}`),
          },
        ])}
      />
      <ResidenceIntro residence={residence} />
      <ResidenceGallery residence={residence} />
      <Container className="flex flex-col gap-32 pt-32 md:gap-48 md:pt-40">
        <DaylightSection residence={residence} />
        <FinishesSection residence={residence} />
        <SpecificationsSection residence={residence} />
        <NextResidence residence={residence} />
      </Container>
    </>
  );
}
