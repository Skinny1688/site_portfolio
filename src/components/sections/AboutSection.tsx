import { SPECIALIST, TRUST_CARDS } from "@/content/site";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
          О специалисте
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Проект веду лично
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Меня зовут {SPECIALIST}. Я отвечаю за структуру, дизайн, разработку и запуск сайта. Все
          этапы обсуждаем напрямую в Telegram, поэтому информация не теряется между менеджером и
          исполнителем.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {TRUST_CARDS.map((card) => (
            <li key={card.title} className="border border-border bg-card p-5 md:p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {card.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
