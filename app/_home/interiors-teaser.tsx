import { ButtonLink } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import { RevealImage } from "@/components/ui/reveal-image";
import { Section } from "@/components/ui/section";
import { home } from "@/content/home";

export function InteriorsTeaser() {
  const { image, hotspots, title } = home.lookbook;

  return (
    <Section index={3} label="Interiors">
      <Grid className="mt-10 gap-y-10 lg:items-end">
        <div className="col-span-12 md:col-span-8 lg:col-span-4">
          <h2 className="font-display text-display-lg">Shop the room</h2>
          <p className="mt-6 text-lead">
            Every piece in our rooms is listed with its maker, its materials and
            an indicative price.
          </p>
          <ButtonLink
            href={`/interiors#${home.lookbook.palette}`}
            className="mt-10"
          >
            Explore the {title} room
          </ButtonLink>
        </div>
        <div className="relative col-span-12 lg:col-span-7 lg:col-start-6">
          <RevealImage
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            sizes="(min-width: 64rem) 58vw, 100vw"
          />
          {hotspots.map((hotspot) => (
            <span
              key={hotspot.id}
              aria-hidden
              className="absolute size-3 -translate-1/2 border border-ink bg-paper"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            />
          ))}
        </div>
      </Grid>
    </Section>
  );
}
