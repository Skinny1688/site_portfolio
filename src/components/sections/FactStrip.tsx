import { FACTS } from "@/content/site";

export function FactStrip() {
  return (
    <section
      id="facts"
      aria-label="Факты и условия"
      className="border-y border-border bg-muted/50 px-4 py-10 md:px-6"
    >
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        {FACTS.map((fact) => (
          <div key={fact.title} className="border-l-2 border-accent pl-4">
            <p className="font-display text-xl font-bold text-foreground md:text-2xl">
              {fact.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
              {fact.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
