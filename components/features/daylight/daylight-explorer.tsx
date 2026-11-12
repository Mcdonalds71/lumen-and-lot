"use client";

import { useState } from "react";

import { Toggle } from "@/components/ui/toggle";
import type { FloorPlan } from "@/content/schemas/floor-plan";
import { usePlayback } from "@/hooks/use-playback";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  type Coordinates,
  isSunlit,
  solarDay,
  sunlightByRoom,
  sunPosition,
} from "@/lib/sun";
import { formatCalendarDate, formatClock } from "@/lib/time";

import { dateOf, dayById, type DayId, days, defaultDay } from "./days";
import type { DaylightOpening } from "./opening";
import { PlanDrawing } from "./plan-drawing";
import { SunHoursTable } from "./sun-hours-table";
import { SunReadout } from "./sun-readout";
import { TimeControls } from "./time-controls";

type DaylightExplorerProps = {
  name: string;
  plan: FloorPlan;
  coordinates: Coordinates;
  timeZone: string;
  zoneName: string;
  opening: DaylightOpening;
};

const dayDuration = 14_000;
const reducedMotionStep = 60;

const dayOptions = days.map((day) => ({
  value: day.id,
  label: (
    <>
      <span aria-hidden>{day.label}</span>
      <span className="sr-only">{day.name}</span>
    </>
  ),
}));

export function DaylightExplorer({
  name,
  plan,
  coordinates,
  timeZone,
  zoneName,
  opening,
}: DaylightExplorerProps) {
  const [selection, setSelection] = useState<{ dayId: DayId; date: string }>({
    dayId: defaultDay.id,
    date: defaultDay.date,
  });
  const [progress, setProgress] = useState(opening.progress);
  const reducedMotion = useReducedMotion();
  const day = solarDay(selection.date, coordinates);
  const dayMinutes = day
    ? (day.sunset.getTime() - day.sunrise.getTime()) / 60_000
    : 0;

  const inSteps = (next: number) =>
    next >= 1
      ? 1
      : (Math.floor((next * dayMinutes) / reducedMotionStep) *
          reducedMotionStep) /
        dayMinutes;
  const playback = usePlayback(
    progress,
    (next) => setProgress(reducedMotion ? inSteps(next) : next),
    dayDuration,
  );

  if (!day) {
    return (
      <p className="text-lead">
        The sun does not rise and set here on{" "}
        {formatCalendarDate(selection.date)}.
      </p>
    );
  }

  const dayName = dayById(selection.dayId).name;
  const date = formatCalendarDate(selection.date);
  const instant = day.sunrise.getTime() + progress * dayMinutes * 60_000;
  const clock = formatClock(instant, timeZone);
  const sun = sunPosition(instant, coordinates);
  const sunPath = {
    rise: sunPosition(day.sunrise, coordinates).azimuth,
    set: sunPosition(day.sunset, coordinates).azimuth,
  };
  const sunlitRooms = plan.rooms.filter((room) =>
    isSunlit(room, sun, plan.northRotation),
  );
  const sunlitNames = sunlitRooms.map((room) => room.name);
  const inSunSentence =
    sunlitNames.length > 0
      ? `Sun in ${sunlitNames.join(", ")}.`
      : "No direct sun.";

  return (
    <div className="grid grid-cols-12 gap-x-gutter gap-y-12">
      <figure className="col-span-12 lg:col-span-7">
        <PlanDrawing
          plan={plan}
          sun={sun}
          sunPath={sunPath}
          description={`Floor plan of ${name} at ${clock} on ${date}. ${inSunSentence}`}
        />
        <figcaption className="mt-4 max-w-xl text-caption text-muted">
          North is at the top. The plan shows direct sun on an unobstructed site
          through windows set in walls 30&nbsp;cm deep. Trees, neighboring
          buildings and weather are not included.
        </figcaption>
      </figure>

      <div className="col-span-12 flex flex-col gap-10 md:col-span-8 lg:col-span-4 lg:col-start-9">
        <SunReadout
          dayName={dayName}
          date={date}
          clock={clock}
          zoneName={zoneName}
          sun={sun}
          sunlitRooms={sunlitNames}
        />
        <Toggle
          label="Date"
          layout="stacked"
          options={dayOptions}
          value={selection.dayId}
          onChange={(dayId) =>
            setSelection({ dayId, date: dateOf(dayById(dayId), timeZone) })
          }
        />
        <TimeControls
          minutes={progress * dayMinutes}
          dayMinutes={dayMinutes}
          valueText={`${clock}. ${inSunSentence}`}
          sunrise={formatClock(day.sunrise, timeZone)}
          sunset={formatClock(day.sunset, timeZone)}
          playing={playback.playing}
          onMinutesChange={(minutes) => {
            playback.pause();
            setProgress(minutes / dayMinutes);
          }}
          onTogglePlay={playback.toggle}
        />
      </div>

      <div className="col-span-12">
        <SunHoursTable
          plan={plan}
          sunlight={
            selection.date === defaultDay.date
              ? opening.sunlight
              : sunlightByRoom(plan, coordinates, day)
          }
          sunlitNow={new Set(sunlitRooms.map((room) => room.id))}
          timeZone={timeZone}
          caption={`Direct sun by room on ${date}, sampled every 15 minutes`}
        />
      </div>
    </div>
  );
}
