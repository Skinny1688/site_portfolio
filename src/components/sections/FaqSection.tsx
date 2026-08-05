import { FAQ_ITEMS } from "@/content/site";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">FAQ</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Частые вопросы
        </h2>

        <div className="mt-10 max-w-3xl space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.q}
              className="group border border-border bg-card px-4 py-3 open:pb-4"
            >
              <summary className="cursor-pointer list-none font-display text-base font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="mt-0.5 text-muted-foreground transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
