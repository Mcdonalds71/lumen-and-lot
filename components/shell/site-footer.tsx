import Link from "next/link";

import { CityList } from "@/components/markets/city-list";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { site } from "@/content/site";

import { footerNavigation } from "./navigation";
import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-rule">
      <Container className="grid grid-cols-12 gap-x-gutter gap-y-16 py-20">
        <div className="col-span-12 lg:col-span-5">
          <h2 className="font-display text-display-sm">
            Letters from the studio
          </h2>
          <p className="mt-4 max-w-md text-small text-muted">
            A short note when a new home is listed. Four a year at most.
          </p>
          <NewsletterForm className="mt-8 max-w-md" />
        </div>
        <nav
          aria-label="Footer"
          className="col-span-12 grid grid-cols-2 gap-x-gutter gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7"
        >
          {footerNavigation.map((group) => (
            <div key={group.title}>
              <Label as="p">{group.title}</Label>
              <ul className="mt-4 space-y-2 text-small">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-reveal">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
      <Container>
        <p aria-hidden className="font-display text-display-xl">
          {site.name}
        </p>
      </Container>
      <Container className="mt-10 flex flex-col gap-4 border-t border-rule py-8 md:flex-row md:items-baseline md:justify-between">
        <p className="text-small text-muted">
          {site.name} is a concept studio, designed and built by{" "}
          <a href={site.author.url} className="link-underline text-ink">
            {site.author.name}
          </a>
          .
        </p>
        <CityList />
      </Container>
    </footer>
  );
}
