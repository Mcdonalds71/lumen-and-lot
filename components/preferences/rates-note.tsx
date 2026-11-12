import { rates } from "@/content/rates";
import { cx } from "@/lib/cx";
import { formatLongDate } from "@/lib/time";

const asOf = formatLongDate(rates.asOf);

export function RatesNote({ className }: { className?: string }) {
  return (
    <p className={cx("text-caption text-muted", className)}>
      Indicative prices. Conversions use the European Central Bank reference
      rates from {asOf}.
    </p>
  );
}
