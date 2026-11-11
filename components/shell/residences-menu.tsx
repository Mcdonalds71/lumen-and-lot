import Image from "next/image";
import Link from "next/link";

import { Price } from "@/components/preferences/price";
import { ResidenceStatus } from "@/components/residences/residence-status";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { marketList } from "@/content/markets";
import { coverImage, newestResidence, residences } from "@/content/residences";

export function ResidencesMenu() {
  const featured = newestResidence();
  const cover = coverImage(featured);

  return (
    <Container className="grid grid-cols-12 gap-x-gutter py-12">
      <div className="col-span-7 flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-x-gutter gap-y-8">
          {marketList.map((market) => (
            <div key={market.id}>
              <Label as="p">{market.name}</Label>
              <ul className="mt-3 space-y-1">
                {residences
                  .filter((residence) => residence.market.id === market.id)
                  .map((residence) => (
                    <li key={residence.slug}>
                      <Link
                        href={`/residences/${residence.slug}`}
                        className="link-reveal font-display text-display-sm"
                      >
                        {residence.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <ButtonLink href="/residences" variant="text" className="self-start">
          All residences
        </ButtonLink>
      </div>
      <Link
        href={`/residences/${featured.slug}`}
        className="group col-span-5 grid grid-cols-5 items-end gap-x-gutter"
      >
        <span className="col-span-3 overflow-hidden">
          <Image
            src={cover.src}
            width={cover.width}
            height={cover.height}
            alt=""
            sizes="24vw"
            className="h-auto w-full transition-transform duration-slow ease-out motion-safe:group-hover:scale-104"
          />
        </span>
        <span className="col-span-2 flex flex-col gap-2">
          <Label>Newest listing</Label>
          <span className="font-display text-display-sm">{featured.name}</span>
          <span className="text-small text-muted">
            {featured.locality}, {featured.market.name}
          </span>
          <span className="mt-2 text-small">
            <Price price={featured.price} />
          </span>
          <ResidenceStatus status={featured.status} />
        </span>
      </Link>
    </Container>
  );
}
