import { site } from "@/content/site";

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col justify-end px-margin pb-margin">
      <h1 className="font-display text-display-xl">{site.name}</h1>
    </main>
  );
}
