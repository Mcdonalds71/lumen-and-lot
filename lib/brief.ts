import * as z from "zod/mini";

import { marketIds, paletteIds } from "@/content/ids";

import { type Currency, currencies, formatMoney } from "./currency";
import { type AreaUnit, formatAreaRange } from "./units";

export const undecided = "undecided";

export const projectTypes = [
  "residence",
  "new-build",
  "renovation",
  "interiors",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export const projectTypeLabels: Record<
  ProjectType,
  { label: string; title: string }
> = {
  residence: { label: "A home in one of our residences", title: "A residence" },
  "new-build": { label: "A new home on your own land", title: "A new home" },
  renovation: {
    label: "A renovation of a home you own",
    title: "A renovation",
  },
  interiors: {
    label: "Interiors and furniture",
    title: "A furnished interior",
  },
};

export const bedroomCounts = ["1", "2", "3", "4"] as const;

export type BedroomCount = (typeof bedroomCounts)[number];

export const bedroomLabels: Record<BedroomCount, string> = {
  "1": "1 bedroom",
  "2": "2 bedrooms",
  "3": "3 bedrooms",
  "4": "4 or more bedrooms",
};

export const areaBandIds = ["compact", "medium", "generous", "large"] as const;

export type AreaBand = (typeof areaBandIds)[number];

export const areaBands: Record<AreaBand, { min: number; max?: number }> = {
  compact: { min: 0, max: 75 },
  medium: { min: 75, max: 110 },
  generous: { min: 110, max: 150 },
  large: { min: 150 },
};

export const timelines = [
  "soon",
  "this-year",
  "next-year",
  "exploring",
] as const;

export type Timeline = (typeof timelines)[number];

export const timelineLabels: Record<Timeline, string> = {
  soon: "Within six months",
  "this-year": "Within a year",
  "next-year": "In one to two years",
  exploring: "No date yet, just looking",
};

export const currencyLabels: Record<Currency, string> = {
  CAD: "Canadian dollars",
  DKK: "Danish kroner",
  EUR: "Euros",
  GBP: "British pounds",
  USD: "US dollars",
};

const choose = (message: string) => ({ error: message });

const amount = z.pipe(
  z.pipe(
    z.string().check(z.trim(), z.minLength(1, "Enter an amount.")),
    z.transform((value: string) => Number(value.replace(/[\s,]/g, ""))),
  ),
  z
    .number({ error: "Write the amount in numbers." })
    .check(z.positive("Enter an amount above zero.")),
);

const shapes = {
  project: {
    projectType: z.enum(projectTypes, choose("Choose the kind of project.")),
  },
  city: {
    city: z.enum(
      [...marketIds, undecided] as const,
      choose("Choose a city, or Not sure yet."),
    ),
  },
  size: {
    bedrooms: z.enum(bedroomCounts, choose("Choose how many bedrooms.")),
    area: z.enum(areaBandIds, choose("Choose a size.")),
  },
  budget: {
    currency: z.enum(currencies, choose("Choose a currency.")),
    budgetFrom: amount,
    budgetTo: amount,
  },
  timeline: {
    timeline: z.enum(timelines, choose("Choose a timeline.")),
  },
  palette: {
    palette: z.enum(
      [...paletteIds, undecided] as const,
      choose("Choose a palette, or Not sure yet."),
    ),
  },
  details: {
    name: z
      .string()
      .check(z.trim(), z.maxLength(80, "Keep the name under 80 characters.")),
    notes: z
      .string()
      .check(
        z.trim(),
        z.maxLength(600, "Keep the notes under 600 characters."),
      ),
  },
};

type BudgetRange = { budgetFrom: number; budgetTo: number };

const budgetInOrderCheck = z.refine<BudgetRange>(
  (budget) => budget.budgetTo >= budget.budgetFrom,
  {
    error: "The upper amount should be at least the lower one.",
    path: ["budgetTo"],
  },
);

export const briefSteps = [
  { id: "project", title: "Project", schema: z.object(shapes.project) },
  { id: "city", title: "City", schema: z.object(shapes.city) },
  { id: "size", title: "Size", schema: z.object(shapes.size) },
  {
    id: "budget",
    title: "Budget",
    schema: z.object(shapes.budget).check(budgetInOrderCheck),
  },
  { id: "timeline", title: "Timeline", schema: z.object(shapes.timeline) },
  { id: "palette", title: "Palette", schema: z.object(shapes.palette) },
] as const;

export type BriefStep = (typeof briefSteps)[number];

export const briefDetailsSchema = z.object(shapes.details);

export const briefSchema = z
  .object({
    ...shapes.project,
    ...shapes.city,
    ...shapes.size,
    ...shapes.budget,
    ...shapes.timeline,
    ...shapes.palette,
    ...shapes.details,
  })
  .check(budgetInOrderCheck);

export type Brief = z.output<typeof briefSchema>;

export type BriefField = keyof z.input<typeof briefSchema>;

export type BriefDraft = Record<BriefField, string>;

export type FieldErrors = Partial<Record<BriefField, string>>;

export const emptyDraft: BriefDraft = {
  projectType: "",
  city: "",
  bedrooms: "",
  area: "",
  currency: "",
  budgetFrom: "",
  budgetTo: "",
  timeline: "",
  palette: "",
  name: "",
  notes: "",
};

function isBriefField(value: unknown): value is BriefField {
  return typeof value === "string" && Object.hasOwn(emptyDraft, value);
}

export function fieldErrors(
  schema: z.ZodMiniType,
  draft: BriefDraft,
): FieldErrors {
  const result = schema.safeParse(draft);
  if (result.success) return {};
  const errors: FieldErrors = {};
  for (const { path, message } of result.error.issues) {
    const [field] = path;
    if (isBriefField(field)) errors[field] ??= message;
  }
  return errors;
}

export type BriefPalette = {
  id: string;
  name: string;
  summary: string;
  colors: readonly string[];
};

export type BriefSheet = {
  title: string;
  preparedFor: string | undefined;
  items: { label: string; value: string }[];
  palette: BriefPalette | undefined;
  notes: string | undefined;
};

type BriefContext = {
  cities: Readonly<Record<string, string>>;
  palettes: readonly BriefPalette[];
  areaUnit: AreaUnit;
};

export function describeBrief(
  brief: Brief,
  { cities, palettes, areaUnit }: BriefContext,
): BriefSheet {
  const project = projectTypeLabels[brief.projectType];
  const city = cities[brief.city];
  const palette = palettes.find((candidate) => candidate.id === brief.palette);
  const band = areaBands[brief.area];
  const money = (amount: number) =>
    formatMoney({ amount, currency: brief.currency });

  return {
    title: city ? `${project.title} in ${city}` : project.title,
    preparedFor: brief.name || undefined,
    items: [
      { label: "Project", value: project.label },
      { label: "City", value: city ?? "Not decided yet" },
      {
        label: "Size",
        value: `${bedroomLabels[brief.bedrooms]}, ${formatAreaRange(band.min, band.max, areaUnit)}`,
      },
      {
        label: "Budget",
        value: `${money(brief.budgetFrom)} to ${money(brief.budgetTo)}`,
      },
      { label: "Timeline", value: timelineLabels[brief.timeline] },
      { label: "Palette", value: palette?.name ?? "Not decided yet" },
    ],
    palette,
    notes: brief.notes || undefined,
  };
}
