import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { nextResidence } from "@/content/residences";
import type { Residence } from "@/content/schemas/residence";

export function NextResidence({ residence }: { residence: Residence }) {
  const next = nextResidence(residence.slug);
  if (!next || next.slug === residence.slug) return null;

  return (
    <nav
      aria-label="More residences"
      className="flex flex-col gap-10 border-t border-rule pt-5 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <Label as="p">Next residence</Label>
        <Link
          href={`/residences/${next.slug}`}
          className="mt-6 block font-display text-display-lg"
        >
          <span className="link-reveal">{next.name}</span>
        </Link>
        <Label as="p" className="mt-4">
          {next.locality}, {next.market.name}
        </Label>
      </div>
      <ButtonLink
        href="/residences"
        variant="text"
        className="self-start md:self-auto"
      >
        All residences
      </ButtonLink>
    </nav>
  );
}
