import type { Route } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type NextUpProps<T extends string, A extends string> = {
  label: string;
  title: string;
  detail: string;
  href: Route<T>;
  all: { href: Route<A>; label: string };
};

export function NextUp<T extends string, A extends string>({
  label,
  title,
  detail,
  href,
  all,
}: NextUpProps<T, A>) {
  return (
    <nav
      aria-label={label}
      className="flex flex-col gap-10 border-t border-rule pt-5 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <Label as="p">{label}</Label>
        <Link href={href} className="mt-6 block font-display text-display-lg">
          <span className="link-reveal">{title}</span>
        </Link>
        <Label as="p" className="mt-4">
          {detail}
        </Label>
      </div>
      <ButtonLink
        href={all.href}
        variant="text"
        className="shrink-0 self-start md:self-auto"
      >
        {all.label}
      </ButtonLink>
    </nav>
  );
}
