"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { WORK_PLACEHOLDERS } from "@/content/site";

function WorkCard({
  title,
  niche,
  note,
}: {
  title: string;
  niche: string;
  note: string;
}) {
  return (
    <div className="w-[240px] shrink-0 border border-border bg-card p-5 md:w-[280px]">
      <div
        className="mb-4 aspect-[4/3] w-full rounded-[var(--radius-sm)]"
        style={{
          background:
            "linear-gradient(145deg, #efefea 0%, #d9d9d2 45%, rgba(27,67,50,0.25) 100%)",
        }}
      />
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">{niche}</p>
      <p className="mt-1 font-display text-lg font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{note} — реальные кейсы добавим отдельно</p>
    </div>
  );
}

export function WorksSection() {
  return (
    <section id="works" className="scroll-mt-20 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <BlurFade inView>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Работы</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Примеры на подходе
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Сейчас — плейсхолдеры ленты. Пять реальных кейсов подключим отдельным этапом.
          </p>
        </BlurFade>
      </div>

      <div className="relative mt-10">
        <Marquee pauseOnHover className="[--duration:35s] [--gap:1.25rem]">
          {WORK_PLACEHOLDERS.map((item) => (
            <WorkCard key={item.title} {...item} />
          ))}
        </Marquee>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-24"
        />
      </div>
    </section>
  );
}
