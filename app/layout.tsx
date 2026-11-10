import type { Metadata } from "next";

import { SiteFooter } from "@/components/shell/site-footer";
import { site } from "@/content/site";

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
    <html lang="en" className={fontVariables}>
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
