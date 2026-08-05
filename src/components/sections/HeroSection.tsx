"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TELEGRAM_URL } from "@/content/site";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden px-4 pb-20 pt-16 md:px-6 md:pb-28 md:pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(27,67,50,0.08), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 20%, rgba(232,93,4,0.10), transparent 50%), linear-gradient(180deg, #f7f7f5 0%, #efefea 100%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <BlurFade delay={0.05} inView>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
              Никита · SiteScan
            </p>
          </BlurFade>

          <BlurFade delay={0.12} inView>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              Сайты, которые продают — без лишнего шума
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="mt-6 max-w-xl">
              <TextGenerateEffect
                words="Под ключ и редизайн для малого бизнеса, ИП и самозанятых. Быстро, по делу, с рабочим результатом."
                className="text-lg font-normal text-muted-foreground md:text-xl"
                duration={0.35}
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.28} inView>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#quiz"
                className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-colors hover:bg-[#d45303] cursor-pointer"
              >
                Рассчитать проект
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[var(--radius-md)] border-[1.5px] border-foreground px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background cursor-pointer"
              >
                Написать в Telegram
              </a>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.22} inView direction="left">
          <div className="relative min-h-[280px] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-secondary text-secondary-foreground md:min-h-[360px]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(247,247,245,0.12) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(232,93,4,0.35), transparent 45%)",
              }}
            />
            <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                Фокус
              </p>
              <div>
                <p className="font-display text-3xl font-bold leading-tight md:text-4xl">
                  Скорость
                  <br />
                  и результат
                </p>
                <p className="mt-3 max-w-xs text-sm text-white/75">
                  Оффер → доверие → заявка. Без фиолетового SaaS-глянца.
                </p>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
