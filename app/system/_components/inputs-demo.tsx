"use client";

import { useId, useState } from "react";

import { ChoiceCards } from "@/components/ui/choice-cards";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { TextField } from "@/components/ui/text-field";

const cities = [
  { value: "toronto", label: "Toronto" },
  { value: "hudson-valley", label: "Hudson Valley" },
  { value: "copenhagen", label: "Copenhagen" },
  { value: "lisbon", label: "Lisbon" },
] as const;

const timelines = [
  { value: "soon", label: "Within six months", detail: "Ready to start." },
  { value: "later", label: "In a year or two", detail: "Still planning." },
] as const;

type City = (typeof cities)[number]["value"];

function clockHour(hour: number): string {
  return `${((hour + 11) % 12) + 1}:00 ${hour < 12 ? "AM" : "PM"}`;
}

export function InputsDemo() {
  const sliderId = useId();
  const [city, setCity] = useState<City>("copenhagen");
  const [hour, setHour] = useState(14);
  const [amount, setAmount] = useState("");
  const [timeline, setTimeline] = useState("");
  const unreadable = amount !== "" && !/^[\d,\s]+$/.test(amount);

  return (
    <div className="grid gap-x-gutter gap-y-10 md:grid-cols-2">
      <Select label="City" options={cities} value={city} onChange={setCity} />
      <div>
        <Label as="label" htmlFor={sliderId} className="block">
          Time of day
        </Label>
        <Slider
          id={sliderId}
          min={6}
          max={20}
          value={hour}
          aria-valuetext={clockHour(hour)}
          onChange={(event) => setHour(event.currentTarget.valueAsNumber)}
          className="mt-3"
        />
        <p className="mt-1 text-caption text-muted tabular-nums">
          {clockHour(hour)}
        </p>
      </div>
      <TextField
        label="Budget from"
        name="demo-amount"
        inputMode="numeric"
        hint="Type a letter to see an error."
        value={amount}
        error={unreadable ? "Write the amount in numbers." : undefined}
        onChange={setAmount}
      />
      <ChoiceCards
        legend="Timeline"
        name="demo-timeline"
        choices={timelines}
        value={timeline}
        onChange={setTimeline}
      />
    </div>
  );
}
