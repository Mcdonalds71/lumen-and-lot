import { useId } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type TimeControlsProps = {
  minutes: number;
  dayMinutes: number;
  valueText: string;
  sunrise: string;
  sunset: string;
  playing: boolean;
  onMinutesChange: (minutes: number) => void;
  onTogglePlay: () => void;
};

const step = 5;

export function TimeControls({
  minutes,
  dayMinutes,
  valueText,
  sunrise,
  sunset,
  playing,
  onMinutesChange,
  onTogglePlay,
}: TimeControlsProps) {
  const id = useId();

  return (
    <div>
      <Label as="label" htmlFor={id} className="block">
        Time of day
      </Label>
      <Slider
        id={id}
        min={0}
        max={dayMinutes - (dayMinutes % step)}
        step={step}
        value={minutes - (minutes % step)}
        aria-valuetext={valueText}
        onChange={(event) => onMinutesChange(event.currentTarget.valueAsNumber)}
        className="mt-3"
      />
      <div className="mt-1 flex justify-between text-caption text-muted tabular-nums">
        <span>Sunrise {sunrise}</span>
        <span>Sunset {sunset}</span>
      </div>
      <Button variant="outline" onClick={onTogglePlay} className="mt-6">
        <svg aria-hidden viewBox="0 0 10 10" className="size-2.5 fill-current">
          {playing ? (
            <path d="M1 0h3v10H1zM6 0h3v10H6z" />
          ) : (
            <path d="M1 0l9 5-9 5z" />
          )}
        </svg>
        {playing ? "Pause" : "Play the day"}
      </Button>
    </div>
  );
}
