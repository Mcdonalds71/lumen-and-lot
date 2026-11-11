import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageFallback } from "@/components/shell/page-fallback";
import { PageInProgress } from "@/components/shell/page-in-progress";
import { findResidence, residences } from "@/content/residences";

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
    <PageInProgress
      label={`${residence.locality}, ${residence.market.name}`}
      title={residence.name}
      summary={residence.story}
    />
  );
}
