import { Section } from "@/components/ui/section";
import { rates } from "@/content/rates";
import { site } from "@/content/site";
import { formatLongDate } from "@/lib/time";

export function WebsiteSection({ index }: { index: number }) {
  return (
    <Section index={index} label="Website">
      <h2 className="mt-10 max-w-5xl font-display text-display-md text-pretty">
        Designed and built by {site.author.name}.
      </h2>
      <div className="mt-10 grid gap-x-gutter gap-y-6 text-lead md:grid-cols-2 lg:w-3/4">
        <p>
          Every page was designed and built by hand, from the daylight model to
          the brief that becomes a PDF in your browser. The sun positions come
          from each home&rsquo;s own neighborhood, and prices convert at the
          euro reference rates the European Central Bank published on{" "}
          {formatLongDate(rates.asOf)}.
        </p>
        <p>
          The homes, prices and people shown are sample content. Nothing you
          enter here is sent anywhere. Want a website like this one? Visit{" "}
          <a href={site.author.url} className="link-underline">
            emmanuelonugwu.com
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
