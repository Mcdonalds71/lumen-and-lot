import { Label } from "@/components/ui/label";
import {
  certificadoRatings,
  type EnergyLabel,
  energimaerkeRatings,
} from "@/content/schemas/energy-label";
import { cx } from "@/lib/cx";

type Reading = {
  value: string;
  scale?: { ratings: readonly string[]; current: string };
  explanation: string;
};

function reading(label: EnergyLabel): Reading {
  switch (label.system) {
    case "EnerGuide":
      return {
        value: `${label.gigajoulesPerYear} GJ a year`,
        explanation:
          "Canada's EnerGuide rating estimates a home's yearly energy use in gigajoules under standard conditions. A lower number means a more efficient home.",
      };
    case "HERS Index":
      return {
        value: String(label.score),
        explanation:
          "The HERS Index compares a home with a reference new home that scores 100. Each point lower means about one percent less energy, and 0 is a net zero home.",
      };
    case "Energimærke":
      return {
        value: label.rating,
        scale: { ratings: energimaerkeRatings, current: label.rating },
        explanation:
          "Denmark's energy label rates a home from A2020, the most efficient, down to G.",
      };
    case "Certificado Energético":
      return {
        value: label.rating,
        scale: { ratings: certificadoRatings, current: label.rating },
        explanation:
          "Portugal's energy certificate rates a home from A+, the most efficient, down to F.",
      };
  }
}

export function EnergyCard({ label }: { label: EnergyLabel }) {
  const { value, scale, explanation } = reading(label);

  return (
    <div className="border border-ink p-6 md:p-8">
      <Label as="p">{label.system}</Label>
      <p className="mt-4 font-display text-display-md">{value}</p>
      {scale && (
        <ol
          aria-label={`${label.system} scale, most efficient first`}
          className="mt-6 space-y-1"
        >
          {scale.ratings.map((rating, index) => {
            const current = rating === scale.current;
            const share = 40 + (60 * index) / (scale.ratings.length - 1);
            return (
              <li
                key={rating}
                aria-current={current || undefined}
                className="flex items-center gap-3"
              >
                <span
                  className={cx(
                    "border px-2 py-0.5 font-mono text-label",
                    current
                      ? "border-ink bg-ink text-paper"
                      : "border-muted text-muted",
                  )}
                  style={{ width: `${share}%` }}
                >
                  {rating}
                </span>
                {current && <Label tone="ink">This home</Label>}
              </li>
            );
          })}
        </ol>
      )}
      <p className="mt-6 text-small text-muted">{explanation}</p>
    </div>
  );
}
