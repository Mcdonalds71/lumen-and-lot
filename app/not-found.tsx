import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";

import { MissingRoom } from "./_not-found/missing-room";

export const metadata: Metadata = {
  title: "Page not found",
};

const ways = [
  { href: "/", label: "Home" },
  { href: "/residences", label: "Residences" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
] as const;

export default function NotFound() {
  return (
    <Container className="pt-16 md:pt-24">
      <Grid className="items-center gap-y-16">
        <div className="col-span-12 lg:col-span-6">
          <Label as="p">404 — Not found</Label>
          <h1 className="mt-6 font-display text-display-lg text-balance">
            This room is not on the plan
          </h1>
          <p className="mt-8 max-w-xl text-lead">
            The page may have moved, or the address may have a typo. Every other
            room is where we left it.
          </p>
          <nav aria-label="Ways back" className="mt-10">
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {ways.map((way) => (
                <li key={way.href}>
                  <ButtonLink href={way.href} variant="text">
                    {way.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <MissingRoom className="col-span-12 max-w-2xl lg:col-span-5 lg:col-start-8" />
      </Grid>
    </Container>
  );
}
