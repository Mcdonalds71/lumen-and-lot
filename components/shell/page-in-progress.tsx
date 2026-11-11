import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";

type PageInProgressProps = { label: string; title: string; summary?: string };

export function PageInProgress({ label, title, summary }: PageInProgressProps) {
  return (
    <Container className="pt-20 pb-16 md:pt-32">
      <Label as="p">{label}</Label>
      <h1 className="mt-6 max-w-4xl font-display text-display-lg">{title}</h1>
      {summary && <p className="mt-8 max-w-2xl text-lead">{summary}</p>}
      <p className="mt-10 max-w-xl text-small text-muted">
        This page is still being built and will be ready soon.
      </p>
      <ButtonLink href="/" variant="text" className="mt-8">
        Back to the home page
      </ButtonLink>
    </Container>
  );
}
