import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden px-4 pb-16 pt-14 md:px-6 md:pb-24 md:pt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 8% 0%, rgba(201,77,0,0.08), transparent 55%), linear-gradient(180deg, #f7f7f5 0%, #efefea 100%)",
        }}
      />

      <div className="mx-auto max-w-3xl">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            NKT Studio · Никита Семенов
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.4rem]">
            Разрабатываю сайты для бизнеса — от структуры до запуска
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Лендинги, многостраничные сайты и редизайн для бизнеса в Беларуси. Типовые проекты
            запускаю за 3–5 дней, сложные задачи оцениваю отдельно.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-5 py-3.5 text-sm font-semibold text-on-accent transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
            >
              Обсудить проект и получить расчёт
            </Link>
            <Link
              href="/#works"
              className="inline-flex items-center rounded-[var(--radius-md)] border-[1.5px] border-foreground px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background cursor-pointer"
            >
              Смотреть работы
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Стоимость рассчитываю индивидуально после короткого обсуждения задачи.
          </p>
        </div>
      </div>
    </section>
  );
}
