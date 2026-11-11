import { CompareSync } from "@/components/features/compare/compare-sync";
import { ComparisonTable } from "@/components/features/compare/comparison-table";
import { CopyLinkButton } from "@/components/features/compare/copy-link-button";
import { RatesNote } from "@/components/preferences/rates-note";
import { ButtonLink } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Residence } from "@/content/schemas/residence";
import { compareLimit } from "@/lib/compare";
import { formatCount } from "@/lib/format";

export function Comparison({
  residences,
}: {
  residences: readonly Residence[];
}) {
  if (residences.length === 0) {
    return (
      <div className="mt-24 max-w-xl border-t border-rule pt-5">
        <CompareSync hasHomes={false} />
        <p className="font-display text-display-sm">Nothing to compare yet.</p>
        <p className="mt-4 text-lead">
          Choose up to {compareLimit} homes from the residences, then come back
          here to see them side by side.
        </p>
        <ButtonLink href="/residences" className="mt-10">
          Browse residences
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mt-16 md:mt-24">
      <CompareSync hasHomes />
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 border-t border-rule pt-5">
        <Label as="p">
          {formatCount(residences.length, "home")} side by side
        </Label>
        <CopyLinkButton />
      </div>
      <ComparisonTable residences={residences} />
      <div className="mt-10 grid gap-x-gutter gap-y-4 border-t border-rule pt-6 md:grid-cols-2">
        <p className="text-small text-muted">
          Energy labels stay in each country&apos;s own system, so they are
          shown side by side but never ranked against each other. Sun hours
          count direct sun on an unobstructed site.
        </p>
        <RatesNote />
      </div>
      {residences.length < compareLimit && (
        <ButtonLink href="/residences" variant="text" className="mt-10">
          Add another home
        </ButtonLink>
      )}
    </div>
  );
}
