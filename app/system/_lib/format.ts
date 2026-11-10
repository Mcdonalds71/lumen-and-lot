import { type FluidSize, remToPx } from "@/lib/design-tokens";

export function formatPixelRange({ min, max }: FluidSize): string {
  return `${remToPx(min)}–${remToPx(max)}`;
}
