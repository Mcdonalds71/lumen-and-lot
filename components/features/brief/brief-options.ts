import type { BriefStep } from "@/lib/brief";
import type { Currency } from "@/lib/currency";

export type CityChoice = {
  value: string;
  label: string;
  detail: string;
  currency: Currency;
};

export const questions: Record<
  BriefStep["id"],
  { heading: string; intro: string }
> = {
  project: {
    heading: "What kind of project is it?",
    intro: "Start with the broad shape of it. You can change any answer later.",
  },
  city: {
    heading: "Where would you like to live?",
    intro:
      "The studio builds in four cities. If you are still deciding, say so.",
  },
  size: {
    heading: "How much room do you need?",
    intro: "Bedrooms first, then the overall size of the home.",
  },
  budget: {
    heading: "What budget do you have in mind?",
    intro: "A range is enough. It stays on this page with everything else.",
  },
  timeline: {
    heading: "When would you like to move in?",
    intro: "There is no wrong answer, including no date at all.",
  },
  palette: {
    heading: "Which palette feels like home?",
    intro: "Each palette sets the walls, floors, stone and metal of a home.",
  },
};

export const projectDetails = {
  residence: "One of the homes on this site, or the next one we build.",
  "new-build": "We design and build a small home on a site you own.",
  renovation: "We redesign and rebuild a home you already have.",
  interiors: "Finishes, joinery and furniture for an existing home.",
} as const;
