import { Marquee } from "@/components/ui/marquee";
import { marketList } from "@/content/markets";

export function CityMarquee() {
  return (
    <Marquee
      label="cities"
      repeat={2}
      className="border-b border-rule py-8 motion-reduce:px-margin"
      controlsClassName="mr-margin"
    >
      {marketList.map((market) => (
        <span
          key={market.id}
          className="flex items-center gap-12 pr-12 font-display text-display-lg"
        >
          {market.name}
          <span aria-hidden className="size-3 bg-clay motion-reduce:hidden" />
        </span>
      ))}
    </Marquee>
  );
}
