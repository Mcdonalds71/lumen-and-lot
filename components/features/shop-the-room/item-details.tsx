import { Dimensions } from "@/components/preferences/dimensions";
import { Price } from "@/components/preferences/price";
import type { Hotspot } from "@/content/schemas/lookbook";

export function ItemDetails({ item }: { item: Hotspot }) {
  const rows = [
    { term: "Maker", detail: item.maker },
    { term: "Material", detail: item.material },
    { term: "Size", detail: <Dimensions size={item.dimensionsCm} /> },
    { term: "Indicative price", detail: <Price price={item.price} /> },
  ];

  return (
    <>
      <p className="font-display text-title">{item.item}</p>
      <dl className="mt-4 border-t border-rule text-small">
        {rows.map(({ term, detail }) => (
          <div
            key={term}
            className="flex items-baseline justify-between gap-6 border-b border-rule py-2"
          >
            <dt className="shrink-0 text-muted">{term}</dt>
            <dd className="text-right">{detail}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
