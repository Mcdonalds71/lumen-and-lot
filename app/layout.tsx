import type { Metadata } from "next";

import { CompareTray } from "@/components/features/compare/compare-tray";
import { PreferenceHead } from "@/components/preferences/preference-head";
import { ResidencesMenu } from "@/components/shell/residences-menu";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { SkipLink } from "@/components/shell/skip-link";
import { SmoothScroll } from "@/components/shell/smooth-scroll";
import { coverImage, residences } from "@/content/residences";
import { site } from "@/content/site";
import { preferenceDefaults, preferences } from "@/lib/preferences";

import { fontVariables } from "./styles/fonts";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={fontVariables}
      {...preferenceDefaults(preferences)}
      suppressHydrationWarning
    >
      <head>
        <PreferenceHead />
      </head>
      <body>
        <SkipLink />
        <SmoothScroll />
        <SiteHeader residencesMenu={<ResidencesMenu />} />
        <main id="main" tabIndex={-1} className="pt-header outline-none">
          {children}
        </main>
        <SiteFooter />
        <CompareTray
          homes={residences.map((residence) => ({
            slug: residence.slug,
            name: residence.name,
            image: coverImage(residence),
          }))}
        />
      </body>
    </html>
  );
}
