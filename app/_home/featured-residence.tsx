import { RatesNote } from "@/components/preferences/rates-note";
import { ResidenceFacts } from "@/components/residences/residence-facts";
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
          <ResidenceFacts residence={residence} className="mt-10" />
          <RatesNote className="mt-4" />
          <ButtonLink href={`/residences/${residence.slug}`} className="mt-10">
            View the residence
          </ButtonLink>
        </div>
      </Grid>
    </Section>
  );
}
