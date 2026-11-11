import { AreaRange } from "@/components/preferences/area-range";
import { ChoiceCards } from "@/components/ui/choice-cards";
import { Select } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";
import {
  areaBandIds,
  areaBands,
  bedroomCounts,
  bedroomLabels,
  type BriefDraft,
  type BriefField,
  type BriefPalette,
  type BriefStep,
  currencyLabels,
  type FieldErrors,
  projectTypeLabels,
  projectTypes,
  timelineLabels,
  timelines,
  undecided,
} from "@/lib/brief";
import { currencies } from "@/lib/currency";

import { type CityChoice, projectDetails } from "./brief-options";

type BriefStepFieldsProps = {
  step: BriefStep["id"];
  draft: BriefDraft;
  errors: FieldErrors;
  cities: readonly CityChoice[];
  palettes: readonly BriefPalette[];
  onChange: (field: BriefField, value: string) => void;
};

const notSure = { value: undecided, label: "Not sure yet" };

export function BriefStepFields({
  step,
  draft,
  errors,
  cities,
  palettes,
  onChange,
}: BriefStepFieldsProps) {
  switch (step) {
    case "project":
      return (
        <ChoiceCards
          legend="Project"
          name="projectType"
          choices={projectTypes.map((type) => ({
            value: type,
            label: projectTypeLabels[type].label,
            detail: projectDetails[type],
          }))}
          value={draft.projectType}
          error={errors.projectType}
          onChange={(value) => onChange("projectType", value)}
        />
      );
    case "city":
      return (
        <ChoiceCards
          legend="City"
          name="city"
          choices={[...cities, notSure]}
          value={draft.city}
          error={errors.city}
          onChange={(value) => onChange("city", value)}
        />
      );
    case "size":
      return (
        <div className="flex flex-col gap-10">
          <ChoiceCards
            legend="Bedrooms"
            name="bedrooms"
            layout="four"
            choices={bedroomCounts.map((count) => ({
              value: count,
              label: bedroomLabels[count],
            }))}
            value={draft.bedrooms}
            error={errors.bedrooms}
            onChange={(value) => onChange("bedrooms", value)}
          />
          <ChoiceCards
            legend="Size of the home"
            name="area"
            layout="four"
            choices={areaBandIds.map((band) => ({
              value: band,
              label: (
                <AreaRange
                  min={areaBands[band].min}
                  max={areaBands[band].max}
                />
              ),
            }))}
            value={draft.area}
            error={errors.area}
            onChange={(value) => onChange("area", value)}
          />
        </div>
      );
    case "budget":
      return (
        <div className="grid gap-x-gutter gap-y-8 md:grid-cols-3">
          <Select
            label="Currency"
            name="currency"
            error={errors.currency}
            options={[
              { value: "", label: "Choose a currency" },
              ...currencies.map((currency) => ({
                value: currency,
                label: `${currencyLabels[currency]} (${currency})`,
              })),
            ]}
            value={draft.currency}
            onChange={(value) => onChange("currency", value)}
          />
          <TextField
            label="From"
            name="budgetFrom"
            inputMode="numeric"
            value={draft.budgetFrom}
            error={errors.budgetFrom}
            onChange={(value) => onChange("budgetFrom", value)}
          />
          <TextField
            label="To"
            name="budgetTo"
            inputMode="numeric"
            value={draft.budgetTo}
            error={errors.budgetTo}
            onChange={(value) => onChange("budgetTo", value)}
          />
        </div>
      );
    case "timeline":
      return (
        <ChoiceCards
          legend="Timeline"
          name="timeline"
          choices={timelines.map((timeline) => ({
            value: timeline,
            label: timelineLabels[timeline],
          }))}
          value={draft.timeline}
          error={errors.timeline}
          onChange={(value) => onChange("timeline", value)}
        />
      );
    case "palette":
      return (
        <ChoiceCards
          legend="Palette"
          name="palette"
          choices={[
            ...palettes.map((palette) => ({
              value: palette.id,
              label: (
                <>
                  <span
                    aria-hidden
                    className="mb-3 flex h-8 border border-ink/10"
                  >
                    {palette.colors.map((color) => (
                      <span
                        key={color}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </span>
                  {palette.name}
                </>
              ),
              detail: palette.summary,
            })),
            notSure,
          ]}
          value={draft.palette}
          error={errors.palette}
          onChange={(value) => onChange("palette", value)}
        />
      );
  }
}
