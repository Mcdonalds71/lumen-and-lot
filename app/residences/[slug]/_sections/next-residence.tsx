import { NextUp } from "@/components/shell/next-up";
import { nextResidence } from "@/content/residences";
import type { Residence } from "@/content/schemas/residence";

export function NextResidence({ residence }: { residence: Residence }) {
  const next = nextResidence(residence.slug);
  if (!next || next.slug === residence.slug) return null;

  return (
    <NextUp
      label="Next residence"
      title={next.name}
      detail={`${next.locality}, ${next.market.name}`}
      href={`/residences/${next.slug}`}
      all={{ href: "/residences", label: "All residences" }}
    />
  );
}
