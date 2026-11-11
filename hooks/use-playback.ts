import { useEffect, useEffectEvent, useState } from "react";

type Playback = {
  playing: boolean;
  toggle: () => void;
  pause: () => void;
};

export function usePlayback(
  progress: number,
  onProgress: (next: number) => void,
  duration: number,
): Playback {
  const [playing, setPlaying] = useState(false);
  const startingPoint = useEffectEvent(() => (progress >= 1 ? 0 : progress));
  const advance = useEffectEvent((next: number) => onProgress(next));

  useEffect(() => {
    if (!playing) return;
    const from = startingPoint();
    const startedAt = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const next = Math.min(1, from + (now - startedAt) / duration);
      advance(next);
      if (next < 1) frame = requestAnimationFrame(step);
      else setPlaying(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [playing, duration]);

  return {
    playing,
    toggle: () => setPlaying((current) => !current),
    pause: () => setPlaying(false),
  };
}
