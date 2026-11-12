import { type RefObject, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TextField } from "@/components/ui/text-field";
import { usePreference } from "@/hooks/use-preference";
import {
  briefDetailsSchema,
  type BriefDraft,
  type BriefField,
  type BriefPalette,
  briefSchema,
  describeBrief,
  type FieldErrors,
  fieldErrors,
} from "@/lib/brief";
import { areaPreference } from "@/lib/preferences";

import type { BriefCredit } from "./brief-document";
import type { CityChoice } from "./brief-options";
import { downloadBrief } from "./download-brief";

type DownloadState = "idle" | "working" | "done" | "failed";

const statusText: Record<DownloadState, string> = {
  idle: "",
  working: "Preparing the PDF.",
  done: "Your brief is downloaded. Nothing was sent anywhere.",
  failed: "The PDF could not be made. Please try again.",
};

type BriefReviewProps = {
  draft: BriefDraft;
  errors: FieldErrors;
  cities: readonly CityChoice[];
  palettes: readonly BriefPalette[];
  credit: BriefCredit;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onChange: (field: BriefField, value: string) => void;
  onErrors: (errors: FieldErrors) => void;
  onEdit: (step: number) => void;
  onRestart: () => void;
};

export function BriefReview({
  draft,
  errors,
  cities,
  palettes,
  credit,
  headingRef,
  onChange,
  onErrors,
  onEdit,
  onRestart,
}: BriefReviewProps) {
  const [areaUnit] = usePreference(areaPreference);
  const [state, setState] = useState<DownloadState>("idle");
  const parsed = briefSchema.safeParse(draft);

  if (!parsed.success) {
    return (
      <div className="mt-12">
        <p className="text-lead">Some answers are missing.</p>
        <Button onClick={() => onEdit(0)} className="mt-6">
          Go back to the first step
        </Button>
      </div>
    );
  }

  const sheet = describeBrief(parsed.data, {
    cities: Object.fromEntries(cities.map((city) => [city.value, city.label])),
    palettes,
    areaUnit,
  });

  const download = async () => {
    const found = fieldErrors(briefDetailsSchema, draft);
    if (Object.keys(found).length > 0) {
      onErrors(found);
      return;
    }
    setState("working");
    try {
      const date = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date());
      await downloadBrief(sheet, date, credit);
      setState("done");
    } catch {
      setState("failed");
    }
  };

  return (
    <div className="mt-12 transition-opacity duration-base starting:opacity-0">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-display-md outline-none"
      >
        <span className="sr-only">Review: </span>
        {sheet.title}
      </h2>
      <p className="mt-4 max-w-xl text-lead">
        Check your answers, add a name if you like, then download the brief.
      </p>

      <dl className="mt-10 border-t border-rule">
        {sheet.items.map((item, index) => (
          <div
            key={item.label}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-gutter gap-y-1 border-b border-rule py-4 md:grid-cols-12"
          >
            <dt className="col-span-2 md:col-span-3">
              <Label>{item.label}</Label>
            </dt>
            <dd className="md:col-span-7">{item.value}</dd>
            <dd className="text-right md:col-span-2">
              <Button variant="text" onClick={() => onEdit(index)}>
                Change<span className="sr-only"> {item.label}</span>
              </Button>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-x-gutter gap-y-8 md:grid-cols-2">
        <TextField
          label="Name on the brief"
          hint="Optional."
          name="name"
          autoComplete="name"
          value={draft.name}
          error={errors.name}
          onChange={(value) => onChange("name", value)}
        />
        <TextField
          label="Notes"
          hint="Optional. Anything else worth writing down."
          name="notes"
          multiline
          value={draft.notes}
          error={errors.notes}
          onChange={(value) => onChange("notes", value)}
        />
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule pt-6">
        <Button onClick={download} disabled={state === "working"}>
          Download the brief
        </Button>
        <Button variant="text" onClick={onRestart}>
          Start again
        </Button>
        <p role="status" className="text-small">
          {statusText[state]}
        </p>
      </div>
      <p className="mt-6 max-w-xl text-small text-muted">
        Nothing is sent anywhere. The PDF is made in your browser and saved to
        your device.
      </p>
    </div>
  );
}
