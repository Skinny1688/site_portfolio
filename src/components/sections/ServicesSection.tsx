"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SERVICES } from "@/content/site";

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-border px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <BlurFade inView>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Услуги</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
            Что делаю для бизнеса
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            От лендинга до редизайна — с акцентом на заявки и понятный путь клиента.
          </p>
        </BlurFade>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <BlurFade delay={0.05} inView>
            <div className="border-b border-border pb-4">
              <p className="font-display text-4xl font-bold text-accent">
                <NumberTicker value={14} />
                <span className="text-foreground">+</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">дней типичный старт проекта</p>
            </div>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <div className="border-b border-border pb-4">
              <p className="font-display text-4xl font-bold text-accent">
                <NumberTicker value={1} />
                <span className="text-foreground">×1</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">контакт — вы и я, без менеджеров</p>
            </div>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <div className="border-b border-border pb-4">
              <p className="font-display text-4xl font-bold text-accent">
                <NumberTicker value={100} />
                <span className="text-foreground">%</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">внимание к вашему офферу</p>
            </div>
          </BlurFade>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <BlurFade key={service.title} delay={0.05 * index} inView>
              <li className="border-t border-border pt-5">
                <h3 className="font-display text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </li>
            </BlurFade>
          ))}
        </ul>
      </div>
    </section>
  );
}
