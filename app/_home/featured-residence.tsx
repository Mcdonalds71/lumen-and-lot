import { Area } from "@/components/preferences/area";
import { Price } from "@/components/preferences/price";
import { RatesNote } from "@/components/preferences/rates-note";
import { ButtonLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import { RevealImage } from "@/components/ui/reveal-image";
import { Section } from "@/components/ui/section";
import { home } from "@/content/home";
import { coverImage } from "@/content/residences";

export function FeaturedResidence() {
  const residence = home.featuredResidence;
  const image =
    residence.gallery.find((candidate) => candidate.height > candidate.width) ??
    coverImage(residence);
  const facts = [
    { term: "Bedrooms", detail: residence.bedrooms },
    { term: "Bathrooms", detail: residence.bathrooms },
    { term: "Area", detail: <Area squareMeters={residence.areaM2} /> },
    { term: "Indicative price", detail: <Price price={residence.price} /> },
  ];

  return (
    <Section index={1} label="Featured residence">
      <Grid className="mt-10 gap-y-12 lg:items-end">
        <RevealImage
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes="(min-width: 64rem) 50vw, (min-width: 48rem) 67vw, 100vw"
          className="col-span-12 md:col-span-8 lg:col-span-6"
        />
        <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-5 lg:col-start-8">
          <Label as="p">
            {residence.locality}, {residence.market.name}
          </Label>
          <h2 className="mt-4 font-display text-display-lg">
            {residence.name}
          </h2>
          <p className="mt-6 text-lead">{residence.story}</p>
          <dl className="mt-10 grid grid-cols-2 border-t border-rule">
            {facts.map(({ term, detail }) => (
              <div key={term} className="border-b border-rule py-4">
                <dt className="text-caption text-muted">{term}</dt>
                <dd className="mt-1 text-body">{detail}</dd>
              </div>
            ))}
          </dl>
          <RatesNote className="mt-4" />
          <ButtonLink href={`/residences/${residence.slug}`} className="mt-10">
            View the residence
          </ButtonLink>
        </div>
      </Grid>
    </Section>
  );
}
