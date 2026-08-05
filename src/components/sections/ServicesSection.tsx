import { PROJECT_INCLUDES, SERVICES } from "@/content/site";

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-border px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Услуги</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Какой сайт можно заказать
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Подбираю формат под задачу бизнеса, а не добавляю функции, которые не будут использоваться.
        </p>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <li key={service.title} className="border-t border-border pt-5">
              <h3 className="font-display text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {service.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-[var(--radius-lg)] border border-border bg-card p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
            В базовую разработку входят
          </h3>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {PROJECT_INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground md:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
