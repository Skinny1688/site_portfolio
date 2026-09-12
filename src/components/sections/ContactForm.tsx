"use client";

import { useRef, useState } from "react";
import { submitTelegramLead } from "@/api/client";
import { TELEGRAM_URL } from "@/content/site";
import Link from "next/link";

const TELEGRAM_RE = /^@?[a-zA-Z0-9_]{3,32}$/;

export function ContactForm() {
  const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
  const [telegram, setTelegram] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const submittingRef = useRef(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current || status === "loading") return;

    const value = telegram.trim();
    if (!TELEGRAM_RE.test(value)) {
      setError("Укажите корректный Telegram, например @username");
      return;
    }

    setError(null);
    setStatus("loading");
    submittingRef.current = true;

    try {
      await submitTelegramLead(value);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
          Расчёт проекта
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Получить персональную стоимость
        </h2>
        <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
          Оставьте Telegram. Я напишу, уточню задачу и подготовлю индивидуальный расчёт.
        </p>

        <div className="mt-10 max-w-xl rounded-[var(--radius-lg)] border border-border bg-card p-6 shadow-[var(--shadow-sm)] md:p-8">
          {isStaticExport ? (
            <div className="space-y-5">
              <p className="text-base font-medium text-foreground">
                Для расчёта проекта напишите мне напрямую в Telegram.
              </p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
              >
                Написать в Telegram
              </a>
            </div>
          ) : status === "success" ? (
            <div className="space-y-5" role="status">
              <p className="text-base font-medium text-foreground">
                Заявка отправлена. Я напишу вам в Telegram.
              </p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
              >
                Связаться в тг
              </a>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={onSubmit} noValidate>
              <div>
                <label htmlFor="telegram" className="mb-1.5 block text-sm font-medium text-foreground">
                  Telegram
                </label>
                <input
                  id="telegram"
                  name="telegram"
                  type="text"
                  autoComplete="off"
                  required
                  value={telegram}
                  onChange={(e) => {
                    setTelegram(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="@username"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "telegram-error" : undefined}
                  className="w-full rounded-[var(--radius-sm)] border border-border bg-background px-3 py-3 text-base outline-none transition focus:border-accent"
                />
                {error ? (
                  <p id="telegram-error" className="mt-2 text-sm text-destructive" role="alert">
                    {error}
                  </p>
                ) : null}
              </div>

              {status === "error" ? (
                <p className="text-sm text-destructive" role="alert">
                  Не удалось отправить заявку. Напишите мне напрямую в Telegram.
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-60 cursor-pointer"
                >
                  {status === "loading" ? "Отправляем…" : "Получить расчёт"}
                </button>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-foreground underline-offset-4 hover:underline cursor-pointer"
                >
                  Написать сразу в Telegram
                </a>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Отправляя форму, вы соглашаетесь с{" "}
                <Link href="/privacy" className="underline underline-offset-2 cursor-pointer">
                  обработкой персональных данных
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
