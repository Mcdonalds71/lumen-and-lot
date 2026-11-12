import { z } from "zod";

function configuredOrigin(): string {
  const { SITE_URL, VERCEL_PROJECT_PRODUCTION_URL } = process.env;
  if (SITE_URL) return SITE_URL;
  if (VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = new URL(z.url().parse(configuredOrigin()));

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
