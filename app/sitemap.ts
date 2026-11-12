import type { MetadataRoute } from "next";

import { articles } from "@/content/journal";
import { projects } from "@/content/projects";
import { residences } from "@/content/residences";

import { absoluteUrl } from "./_seo/site-url";

const pages = [
  "/",
  "/residences",
  "/projects",
  "/interiors",
  "/journal",
  "/studio",
  "/brief",
  "/colophon",
  "/system",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path) })),
    ...residences.map((residence) => ({
      url: absoluteUrl(`/residences/${residence.slug}`),
      lastModified: residence.listedOn,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/journal/${article.slug}`),
      lastModified: article.publishedOn,
    })),
  ];
}
