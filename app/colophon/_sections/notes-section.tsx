import { Section } from "@/components/ui/section";

const notes = [
  {
    title: "Images",
    body: "There are no photographs here. Every image is a flat-tone placeholder drawn by a script in the studio palettes, so no image needs a credit. The drawings are generated the same way.",
  },
  {
    title: "Accessibility",
    body: "The site aims for WCAG 2.2 AA. It works with a keyboard, every floor plan has a table of its rooms, and it stays still when your device asks for reduced motion.",
  },
  {
    title: "Privacy",
    body: "No cookies and no analytics. Your choices of unit, currency and view, and the homes you compare, are kept in your own browser.",
  },
] as const;

export function NotesSection({ index }: { index: number }) {
  return (
    <Section index={index} label="Notes">
      <ul className="mt-10 grid gap-x-gutter gap-y-12 md:grid-cols-3">
        {notes.map((note) => (
          <li key={note.title} className="border-t border-ink pt-5">
            <h2 className="font-display text-display-sm">{note.title}</h2>
            <p className="mt-4 max-w-sm">{note.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
