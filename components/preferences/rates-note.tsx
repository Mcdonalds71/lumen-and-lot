import { rates } from "@/content/rates";
import { cx } from "@/lib/cx";

const asOf = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
}).format(new Date(`${rates.asOf}T00:00:00Z`));

export function RatesNote({ className }: { className?: string }) {
  return (
    <p className={cx("text-caption text-muted", className)}>
      Indicative prices. Conversions use the European Central Bank reference
      rates from {asOf}.
    </p>
  );
}
