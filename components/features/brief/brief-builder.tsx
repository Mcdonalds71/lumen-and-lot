"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  type BriefDraft,
  type BriefField,
  type BriefPalette,
  briefSteps,
  emptyDraft,
  type FieldErrors,
  fieldErrors,
} from "@/lib/brief";

import type { BriefCredit } from "./brief-document";
import { type CityChoice, questions } from "./brief-options";
import { BriefProgress } from "./brief-progress";
import { BriefReview } from "./brief-review";
import { BriefStepFields } from "./brief-step-fields";

type BriefBuilderProps = {
  cities: readonly CityChoice[];
  palettes: readonly BriefPalette[];
  credit: BriefCredit;
};

const stepTitles = briefSteps.map((step) => step.title);
const reviewStep = briefSteps.length;

export function BriefBuilder({ cities, palettes, credit }: BriefBuilderProps) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<BriefDraft>(emptyDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [fromReview, setFromReview] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const current = briefSteps[step];

  useEffect(() => {
    if (moved.current) headingRef.current?.focus();
  }, [step]);

  const change = (field: BriefField, value: string) => {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
      ...(field === "city" &&
        !previous.currency && {
          currency: cities.find((city) => city.value === value)?.currency ?? "",
        }),
    }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const go = (target: number) => {
    moved.current = true;
    setErrors({});
    setStep(target);
    if (target === reviewStep) setFromReview(false);
  };

  const next = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!current) return;
    const found = fieldErrors(current.schema, draft);
    const [first] = Object.keys(found);
    if (first) {
      setErrors(found);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    go(fromReview ? reviewStep : step + 1);
  };

  const submitLabel = fromReview
    ? "Back to the review"
    : step === reviewStep - 1
      ? "Review the brief"
      : "Next";

  return (
    <div>
      <BriefProgress step={step} titles={stepTitles} />
      {current ? (
        <form
          key={current.id}
          ref={formRef}
          noValidate
          onSubmit={next}
          className="mt-12 transition-opacity duration-base starting:opacity-0"
        >
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-display-md outline-none"
          >
            <span className="sr-only">{`Step ${step + 1} of ${reviewStep}: `}</span>
            {questions[current.id].heading}
          </h2>
          <p className="mt-4 max-w-xl text-lead">
            {questions[current.id].intro}
          </p>
          <div className="mt-10">
            <BriefStepFields
              step={current.id}
              draft={draft}
              errors={errors}
              cities={cities}
              palettes={palettes}
              onChange={change}
            />
          </div>
          <div className="mt-12 flex items-center justify-between gap-6 border-t border-rule pt-6">
            {step > 0 && !fromReview ? (
              <Button variant="text" onClick={() => go(step - 1)}>
                Back
              </Button>
            ) : (
              <span />
            )}
            <Button type="submit">{submitLabel}</Button>
          </div>
        </form>
      ) : (
        <BriefReview
          draft={draft}
          errors={errors}
          cities={cities}
          palettes={palettes}
          credit={credit}
          headingRef={headingRef}
          onChange={change}
          onErrors={setErrors}
          onEdit={(target) => {
            setFromReview(true);
            go(target);
          }}
          onRestart={() => {
            setDraft(emptyDraft);
            go(0);
          }}
        />
      )}
    </div>
  );
}
