import Image from "next/image";
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

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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

        <Link
          href="/works/ai-education-platform"
          className="group block overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)] cursor-pointer"
        >
          <div className="relative w-full overflow-hidden bg-[#efefea]" style={{ aspectRatio: "2000 / 904" }}>
            <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center gap-1.5 border-b border-border bg-[#efefea] px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d8d8d2]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d8d8d2]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d8d8d2]" />
            </div>
            <Image
              src="/works/ai-education-platform/cover.webp"
              alt="Обложка коммерческого проекта — платформа курсов по ИИ"
              fill
              priority
              quality={95}
              className="object-contain object-center pt-8"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
          <div className="space-y-2 p-5">
            <span className="inline-flex rounded-sm bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
              Коммерческий проект
            </span>
            <p className="text-sm text-muted-foreground">
              Образовательная платформа · полный цикл · 10 дней
            </p>
            <p className="text-sm font-semibold text-accent group-hover:underline">Смотреть кейс</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
