import { PROCESS_STEPS } from "@/content/site";

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-20 border-t border-border px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Процесс</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          От первого сообщения до запуска
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Пять понятных этапов с согласованием результата перед следующим шагом.
        </p>

        <ol className="mt-12 space-y-8">
          {PROCESS_STEPS.map((step) => (
            <li key={step.title} className="grid gap-2 border-t border-border pt-6 md:grid-cols-[240px_1fr] md:gap-8">
              <h3 className="font-display text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {step.content}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Типовые проекты занимают 3–5 дней. Для многостраничных и нестандартных задач срок
          рассчитывается после обсуждения.
        </p>
      </div>
    </section>
  );
}
