"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Timeline } from "@/components/ui/timeline";
import { PROCESS_EXTRA, PROCESS_STEPS } from "@/content/site";

export function ProcessSection() {
  const data = PROCESS_STEPS.map((step) => ({
    title: step.title,
    content: <p className="text-muted-foreground">{step.content}</p>,
  }));

  return (
    <section id="process" className="scroll-mt-20 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <BlurFade inView>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Процесс</p>
        </BlurFade>
      </div>

      <Timeline
        data={data}
        heading="Как работаю"
        subheading="Прозрачные шаги от брифа до запуска. Без сюрпризов в середине."
        className="pt-4"
      />

      <div className="mx-auto mt-8 grid max-w-6xl gap-6 px-4 md:grid-cols-3 md:px-6">
        {PROCESS_EXTRA.map((item, index) => (
          <BlurFade key={item.label} delay={0.05 * index} inView>
            <div className="border-t border-border pt-4">
              <p className="font-display text-lg font-semibold text-foreground">{item.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
