import { Label, type LabelTone } from "@/components/ui/label";
import { marketList } from "@/content/markets";
import { cx } from "@/lib/cx";

type CityListProps = {
  tone?: LabelTone;
  className?: string;
};

export function CityList({ tone, className }: CityListProps) {
  return (
    <Label
      as="ul"
      tone={tone}
      className={cx("flex flex-wrap gap-y-1", className)}
    >
      {marketList.map((market, index) => (
        <li key={market.id} className="whitespace-nowrap">
          {market.name}
          {index < marketList.length - 1 && (
            <span aria-hidden>&nbsp;·&nbsp;</span>
          )}
        </li>
      ))}
    </Label>
  );
}
