"use client";

import {
  Toggle,
  type ToggleLayout,
  type ToggleTone,
} from "@/components/ui/toggle";
import { usePreference } from "@/hooks/use-preference";
import { cx } from "@/lib/cx";
import { areaPreference, currencyPreference } from "@/lib/preferences";

const areaOptions = [
  { value: "m2", label: "m²" },
  { value: "ft2", label: "ft²" },
] as const;

const currencyOptions = currencyPreference.values.map((value) => ({
  value,
  label: value === "local" ? "Local" : value,
}));

type PreferenceTogglesProps = {
  hideLabels?: boolean;
  tone?: ToggleTone;
  layout?: ToggleLayout;
  className?: string;
};

export function PreferenceToggles({
  hideLabels = false,
  tone = "ink",
  layout = "inline",
  className,
}: PreferenceTogglesProps) {
  const [area, setArea] = usePreference(areaPreference);
  const [currency, setCurrency] = usePreference(currencyPreference);

  return (
    <div
      className={cx("flex flex-wrap items-center gap-x-6 gap-y-4", className)}
    >
      <Toggle
        label="Area"
        hideLabel={hideLabels}
        tone={tone}
        layout={layout}
        options={areaOptions}
        value={area}
        onChange={setArea}
      />
      <Toggle
        label="Currency"
        hideLabel={hideLabels}
        tone={tone}
        layout={layout}
        options={currencyOptions}
        value={currency}
        onChange={setCurrency}
      />
    </div>
  );
}
