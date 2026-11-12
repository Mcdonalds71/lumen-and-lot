import { Section } from "@/components/ui/section";
import { rates } from "@/content/rates";
import { site } from "@/content/site";
import { formatLongDate } from "@/lib/time";

export function ConceptSection({ index }: { index: number }) {
  return (
    <Section index={index} label="Concept">
      <h2 className="mt-10 max-w-5xl font-display text-display-md text-pretty">
        Lumen & Lot is a concept studio, designed and built by{" "}
        {site.author.name} as a portfolio piece.
      </h2>
      <div className="mt-10 grid gap-x-gutter gap-y-6 text-lead md:grid-cols-2 lg:w-3/4">
        <p>
          The studio, its people, homes, projects, prices, makers and awards are
          invented. Some things are real. The Daylight Explorer uses real sun
          positions for each residence&rsquo;s neighborhood, and prices convert
          at the euro reference rates the European Central Bank published on{" "}
          {formatLongDate(rates.asOf)}.
        </p>
        <p>
          Nothing you enter here is sent anywhere. The brief becomes a PDF in
          your browser, and the newsletter form says so instead of signing you
          up. To see more of {site.author.name}&rsquo;s work, visit{" "}
          <a href={site.author.url} className="link-underline">
            emmanuelonugwu.com
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
