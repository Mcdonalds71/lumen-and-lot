"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";

const finishes = [
  { material: "Limewashed plaster", place: "Walls" },
  { material: "Oiled white oak", place: "Floors" },
  { material: "Honed limestone", place: "Kitchen" },
  { material: "Tadelakt", place: "Bathrooms" },
  { material: "Brushed brass", place: "Hardware" },
] as const;

export function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        Open the finishes drawer
      </Button>
      <Drawer open={open} onOpenChange={setOpen} title="Finishes">
        <ul>
          {finishes.map(({ material, place }) => (
            <li
              key={material}
              className="flex items-baseline justify-between gap-6 border-b border-rule py-4 first:pt-0"
            >
              <span>{material}</span>
              <Label>{place}</Label>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-small text-muted">
          A sample list. Each residence offers three palettes, each with its own
          finishes.
        </p>
      </Drawer>
    </>
  );
}
