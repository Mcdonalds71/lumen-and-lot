import { AddToCompare } from "@/components/features/compare/add-to-compare";
import { RatesNote } from "@/components/preferences/rates-note";
import { ResidenceFacts } from "@/components/residences/residence-facts";
import { ResidenceStatus } from "@/components/residences/residence-status";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import type { Residence } from "@/content/schemas/residence";

export function ResidenceIntro({ residence }: { residence: Residence }) {
  return (
    <Container className="pt-16 md:pt-24">
      <Breadcrumb
        parent={{ href: "/residences", label: "Residences" }}
        current={residence.name}
      />
      <Grid className="mt-10 gap-y-12 md:mt-16">
        <div className="col-span-12 lg:col-span-7">
          <Label as="p">
            {residence.locality}, {residence.market.name}
          </Label>
          <h1 className="mt-4 font-display text-display-xl">
            {residence.name}
          </h1>
          <p className="mt-8 max-w-2xl text-lead">{residence.story}</p>
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <ResidenceStatus status={residence.status} />
          <ResidenceFacts residence={residence} className="mt-4" />
          <RatesNote className="mt-4" />
          <div className="mt-8">
            <AddToCompare slug={residence.slug} name={residence.name} />
          </div>
        </div>
      </Grid>
    </Container>
  );
}
