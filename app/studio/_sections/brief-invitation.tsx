import { useId } from "react";

import { ButtonLink } from "@/components/ui/button";

export function BriefInvitation() {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="flex flex-col gap-8 border-t border-rule pt-10 md:flex-row md:items-end md:justify-between"
    >
      <h2 id={headingId} className="max-w-3xl font-display text-display-md">
        Have a site, or a home in mind? Start with a brief.
      </h2>
      <ButtonLink href="/brief" className="shrink-0 self-start md:self-auto">
        Start a brief
      </ButtonLink>
    </section>
  );
}
