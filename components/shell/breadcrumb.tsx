import type { Route } from "next";
import Link from "next/link";

type BreadcrumbProps<T extends string> = {
  parent: { href: Route<T>; label: string };
  current: string;
};

export function Breadcrumb<T extends string>({
  parent,
  current,
}: BreadcrumbProps<T>) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-x-2 font-mono text-label text-muted uppercase">
        <li className="after:ml-2 after:content-['/'_/_'']">
          <Link href={parent.href} className="link-reveal">
            {parent.label}
          </Link>
        </li>
        <li aria-current="page" className="text-ink">
          {current}
        </li>
      </ol>
    </nav>
  );
}
