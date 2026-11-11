"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function CopyLinkButton() {
  const [status, setStatus] = useState("");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("Link copied.");
    } catch {
      setStatus("Copy the address from the address bar to share it.");
    }
  };

  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <Button variant="text" onClick={copy}>
        Copy link
      </Button>
      <p role="status" className="text-small text-muted">
        {status}
      </p>
    </div>
  );
}
