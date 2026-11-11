import type { Metadata } from "next";

import { PageInProgress } from "@/components/shell/page-in-progress";

export const metadata: Metadata = {
  title: "Interiors",
  description:
    "Lookbooks for the Limewash, Umber and Slate palettes, with every piece listed.",
};

export default function InteriorsPage() {
  return (
    <PageInProgress
      label="Interiors"
      title="Three palettes, every piece listed"
      summary="Lookbooks for the Limewash, Umber and Slate palettes, with the maker and an indicative price for each piece."
    />
  );
}
