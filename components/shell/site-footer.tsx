import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule px-margin py-10">
      <p className="text-small text-muted">
        {site.name} is a concept studio, designed and built by{" "}
        <a href={site.author.url} className="link-underline text-ink">
          {site.author.name}
        </a>
        .
      </p>
    </footer>
  );
}
