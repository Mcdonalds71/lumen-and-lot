"use client";

import { useState } from "react";

import { Toggle } from "@/components/ui/toggle";

const areas = [
  { value: "metric", label: "m²" },
  { value: "imperial", label: "ft²" },
] as const;

const currencies = [
  { value: "local", label: "Local" },
  { value: "USD", label: "USD" },
  { value: "CAD", label: "CAD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
] as const;

type Area = (typeof areas)[number]["value"];
type Currency = (typeof currencies)[number]["value"];

export function ToggleDemo() {
  const [area, setArea] = useState<Area>("metric");
  const [currency, setCurrency] = useState<Currency>("local");

  return (
    <div className="flex flex-wrap gap-x-12 gap-y-6">
      <Toggle label="Area" options={areas} value={area} onChange={setArea} />
      <Toggle
        label="Currency"
        options={currencies}
        value={currency}
        onChange={setCurrency}
      />
    </div>
  );
}
