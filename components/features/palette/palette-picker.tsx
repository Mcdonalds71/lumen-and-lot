import { useId } from "react";

import { Label } from "@/components/ui/label";
import type { Palette, PaletteId } from "@/content/schemas/palette";

type PalettePickerProps = {
  palettes: readonly Palette[];
  value: PaletteId;
  onChange: (palette: PaletteId) => void;
};

export function PalettePicker({
  palettes,
  value,
  onChange,
}: PalettePickerProps) {
  const id = useId();

  return (
    <div role="radiogroup" aria-labelledby={id}>
      <Label id={id} as="p">
        Palette
      </Label>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {palettes.map((palette) => (
          <label
            key={palette.id}
            className="cursor-pointer border p-2 transition-colors duration-fast not-has-checked:border-transparent not-has-checked:hover:border-muted has-checked:border-ink has-focus-visible:focus-ring"
          >
            <input
              type="radio"
              name={id}
              value={palette.id}
              checked={palette.id === value}
              onChange={() => onChange(palette.id)}
              className="sr-only"
            />
            <span aria-hidden className="flex h-12 border border-ink/10">
              {palette.swatches.map((swatch) => (
                <span
                  key={swatch.role}
                  className="flex-1"
                  style={{ backgroundColor: swatch.color }}
                />
              ))}
            </span>
            <span className="mt-2 block text-small">{palette.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
