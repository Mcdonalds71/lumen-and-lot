import type { Metadata } from "next";

import { site } from "@/content/site";

type PageMetadataInput = {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ?? site.name,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type,
    },
    twitter: { card: "summary_large_image" },
  };
}
