import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule px-margin py-10">
      <p className="text-small text-muted">
        {site.name} is a concept studio, designed and built by{" "}
        <a
          href={site.author.url}
          className="text-ink underline decoration-muted underline-offset-4 transition-colors hover:decoration-clay"
        >
          {site.author.name}
        </a>
        .
      </p>
    </footer>
  );
}
