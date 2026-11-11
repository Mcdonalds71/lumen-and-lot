import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { home } from "@/content/home";

export function StudioStatement() {
  return (
    <Section index={5} label="Studio">
      <p className="mt-10 max-w-5xl font-display text-display-md">
        {home.statement}
      </p>
      <ButtonLink href="/studio" variant="text" className="mt-10">
        About the studio
      </ButtonLink>
    </Section>
  );
}
