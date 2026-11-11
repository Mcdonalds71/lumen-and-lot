import { Area } from "@/components/preferences/area";
import { Price } from "@/components/preferences/price";
import type { Residence } from "@/content/schemas/residence";
import { cx } from "@/lib/cx";

type ResidenceFactsProps = { residence: Residence; className?: string };

export function ResidenceFacts({ residence, className }: ResidenceFactsProps) {
  const facts = [
    { term: "Bedrooms", detail: residence.bedrooms },
    { term: "Bathrooms", detail: residence.bathrooms },
    { term: "Area", detail: <Area squareMeters={residence.areaM2} /> },
    { term: "Indicative price", detail: <Price price={residence.price} /> },
  ];

  return (
    <dl className={cx("grid grid-cols-2 border-t border-rule", className)}>
      {facts.map(({ term, detail }) => (
        <div key={term} className="border-b border-rule py-4">
          <dt className="text-caption text-muted">{term}</dt>
          <dd className="mt-1 text-body">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
