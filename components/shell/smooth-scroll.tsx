"use client";

import type Lenis from "lenis";
import { useEffect } from "react";

import { smoothScrollQuery } from "@/lib/motion";

function driveOnDemand(lenis: Lenis): () => void {
  let frame = 0;
  const tick = (time: number) => {
    lenis.raf(time);
    frame = lenis.isScrolling === "smooth" ? requestAnimationFrame(tick) : 0;
  };
  const wake = () => {
    frame ||= requestAnimationFrame(tick);
  };
  const unsubscribe = lenis.on("virtual-scroll", wake);
  document.addEventListener("click", wake, { capture: true });

  return () => {
    cancelAnimationFrame(frame);
    unsubscribe();
    document.removeEventListener("click", wake, { capture: true });
    lenis.destroy();
  };
}

export function SmoothScroll() {
  useEffect(() => {
    const query = matchMedia(smoothScrollQuery);
    let stop: (() => void) | undefined;
    let unmounted = false;

    const sync = async () => {
      if (!query.matches) {
        stop?.();
        stop = undefined;
        return;
      }
      const { default: LenisScroll } = await import("lenis");
      if (unmounted || stop || !query.matches) return;
      stop = driveOnDemand(
        new LenisScroll({
          anchors: true,
          autoToggle: true,
          allowNestedScroll: true,
          stopInertiaOnNavigate: true,
        }),
      );
    };

    void sync();
    query.addEventListener("change", sync);
    return () => {
      unmounted = true;
      query.removeEventListener("change", sync);
      stop?.();
    };
  }, []);

  return null;
}
