import { findProject, projects } from "@/content/projects";

import { ogContentType, ogImage, ogSize } from "../../_seo/og-image";

export const alt = "A project by Lumen & Lot.";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = findProject((await params).slug);
  return ogImage({
    kicker: project ? `Project · ${project.type}` : "Project",
    title: project?.name ?? "Selected work",
    detail: project
      ? `${project.locality}, ${project.market.name} · ${project.year}`
      : "Case studies",
  });
}
