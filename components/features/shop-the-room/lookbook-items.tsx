import { Dimensions } from "@/components/preferences/dimensions";
import { Price } from "@/components/preferences/price";
import { Label } from "@/components/ui/label";
import type { Hotspot } from "@/content/schemas/lookbook";

type LookbookItemsProps = { room: string; items: readonly Hotspot[] };

export function LookbookItems({ room, items }: LookbookItemsProps) {
  return (
    <div>
      <Label as="h3">Every piece in the {room.toLowerCase()}</Label>
      <ol className="mt-4 border-t border-rule">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-baseline gap-x-gutter gap-y-1 border-b border-rule py-4 md:grid md:grid-cols-12"
          >
            <p className="font-display text-title md:col-span-3">{item.item}</p>
            <p className="ml-auto text-small md:order-last md:col-span-2 md:ml-0 md:text-right">
              <Price price={item.price} />
            </p>
            <p className="w-full text-small text-muted md:col-span-3 md:w-auto">
              {item.maker}
            </p>
            <p className="w-full text-small md:col-span-4 md:w-auto">
              {item.material}
              <span className="block text-muted">
                <Dimensions size={item.dimensionsCm} />
              </span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
