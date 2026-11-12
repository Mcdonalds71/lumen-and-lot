import { DaylightExplorer } from "@/components/features/daylight/daylight-explorer";
import { daylightOpening } from "@/components/features/daylight/opening";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import type { Residence } from "@/content/schemas/residence";

export function DaylightSection({ residence }: { residence: Residence }) {
  return (
    <Section index={1} label="Daylight">
      <Grid className="mt-10 gap-y-6">
        <h2 className="col-span-12 font-display text-display-lg lg:col-span-7">
          Where the light falls
        </h2>
        <p className="col-span-12 text-lead md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          Choose a day and move through it. The sun is placed for{" "}
          {residence.locality} from the home&apos;s own coordinates, and each
          patch of light comes in through a real window on the plan.
        </p>
      </Grid>
      <div className="mt-16">
        <DaylightExplorer
          name={residence.name}
          plan={residence.floorPlan}
          coordinates={residence.location}
          timeZone={residence.market.timeZone}
          zoneName={residence.market.name}
          opening={daylightOpening(residence.floorPlan, residence.location)}
        />
      </div>
    </Section>
  );
}
