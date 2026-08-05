"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { REVIEWS } from "@/content/site";

export function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-20 border-t border-border px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <BlurFade inView>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Отзывы</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Что говорят заказчики
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Шаблонные карточки для v1 — заменим на реальные отзывы после сбора.
          </p>
        </BlurFade>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <BlurFade key={review.name} delay={0.04 * index} inView>
              <li className="flex h-full flex-col border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-md)]">
                <p className="flex-1 text-sm leading-relaxed text-foreground">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="font-display text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </li>
            </BlurFade>
          ))}
        </ul>
      </div>
    </section>
  );
}
