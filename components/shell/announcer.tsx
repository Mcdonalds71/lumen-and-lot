"use client";

import { useAnnouncement } from "@/hooks/use-announcement";

export function Announcer() {
  const message = useAnnouncement();

  return (
    <p role="status" className="sr-only">
      {message}
    </p>
  );
}
