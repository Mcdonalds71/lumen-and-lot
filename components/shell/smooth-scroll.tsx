"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { reducedMotionQuery } from "@/lib/motion";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = matchMedia(reducedMotionQuery);
    let lenis: Lenis | undefined;

    const sync = () => {
      if (reducedMotion.matches) {
        lenis?.destroy();
        lenis = undefined;
        return;
      }
      lenis ??= new Lenis({
        autoRaf: true,
        anchors: true,
        autoToggle: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      });
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    return () => {
      reducedMotion.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, []);

  return null;
}
