import { type RefObject, useEffect, useEffectEvent } from "react";

export type DismissReason = "escape" | "outside";

export function useDismiss(
  active: boolean,
  container: RefObject<HTMLElement | null>,
  onDismiss: (reason: DismissReason) => void,
): void {
  const dismiss = useEffectEvent(onDismiss);

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss("escape");
    };
    const onPointerDown = (event: PointerEvent) => {
      const inside =
        event.target instanceof Node &&
        container.current?.contains(event.target);
      if (!inside) dismiss("outside");
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [active, container]);
}
