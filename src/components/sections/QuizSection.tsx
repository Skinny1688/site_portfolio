"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { createLead } from "@/api/client";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  QUIZ_STEPS,
  type QuizAnswersState,
} from "@/content/site";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  phone: string;
  telegram: string;
};

const INITIAL_FORM: FormState = { name: "", phone: "", telegram: "" };

function quizSummary(answers: QuizAnswersState): string {
  const labels: string[] = [];
  const site = QUIZ_STEPS[0].options.find((o) => o.value === answers.siteType)?.label;
  const has = QUIZ_STEPS[1].options.find((o) => o.value === answers.hasSite)?.label;
  const goal = QUIZ_STEPS[2].options.find((o) => o.value === answers.goal)?.label;
  const time = QUIZ_STEPS[3].options.find((o) => o.value === answers.timeline)?.label;
  if (site) labels.push(`тип: ${site}`);
  if (has) labels.push(`сайт: ${has}`);
  if (goal) labels.push(`цель: ${goal}`);
  if (time) labels.push(`срок: ${time}`);
  return labels.join(" · ");
}

export function QuizSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswersState>({});
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const totalSteps = QUIZ_STEPS.length + 1;
  const isFormStep = step >= QUIZ_STEPS.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const summary = useMemo(() => quizSummary(answers), [answers]);

  function selectOption(key: keyof QuizAnswersState, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => Math.min(s + 1, QUIZ_STEPS.length));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await createLead({
        name: form.name,
        phone: form.phone,
        telegram: form.telegram,
        quizAnswers: {
          siteType: answers.siteType,
          hasSite: answers.hasSite,
          goal: answers.goal,
          timeline: answers.timeline,
        },
        source: "site",
      });
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Не удалось отправить заявку");
    }
  }

  return (
    <section id="quiz" className="scroll-mt-20 border-t border-border px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <BlurFade inView>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Заявка</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Квиз → короткий вывод → контакт
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            4 вопроса без цен. В конце — форма. Ответ в Telegram или по заявке.
          </p>
        </BlurFade>

        <div className="mt-10 max-w-2xl rounded-[var(--radius-lg)] border border-border bg-card p-6 shadow-[var(--shadow-sm)] md:p-8">
          <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!isFormStep ? (
              <motion.div
                key={QUIZ_STEPS[step].key}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Шаг {step + 1} / {QUIZ_STEPS.length}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                  {QUIZ_STEPS[step].question}
                </h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {QUIZ_STEPS[step].options.map((option) => {
                    const selected =
                      answers[QUIZ_STEPS[step].key] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => selectOption(QUIZ_STEPS[step].key, option.value)}
                        className={cn(
                          "rounded-[var(--radius-md)] border px-4 py-3 text-left text-sm font-semibold transition-colors cursor-pointer",
                          selected
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border bg-background text-foreground hover:border-foreground/40",
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
                {step > 0 ? (
                  <button
                    type="button"
                    className="mt-6 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline cursor-pointer"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                  >
                    Назад
                  </button>
                ) : null}
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
              >
                {status === "success" ? (
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">Заявка отправлена</h3>
                    <p className="mt-3 text-muted-foreground">
                      Спасибо! Свяжусь с вами в ближайшее время. Можно дублировать в Telegram.
                    </p>
                    <button
                      type="button"
                      className="mt-6 text-sm font-semibold text-accent hover:underline cursor-pointer"
                      onClick={() => {
                        setStatus("idle");
                        setStep(0);
                        setAnswers({});
                      }}
                    >
                      Пройти ещё раз
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Результат
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                      Ориентир готов — оставьте контакт
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {summary || "Ответы квиза будут приложены к заявке."} Цену обсудим индивидуально.
                    </p>

                    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">Имя</span>
                        <input
                          required
                          minLength={2}
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className="w-full rounded-[var(--radius-sm)] border border-border bg-background px-3 py-2.5 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
                          autoComplete="name"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">Телефон</span>
                        <input
                          required
                          value={form.phone}
                          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                          className="w-full rounded-[var(--radius-sm)] border border-border bg-background px-3 py-2.5 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="+375..."
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">Telegram</span>
                        <input
                          required
                          value={form.telegram}
                          onChange={(e) => setForm((f) => ({ ...f, telegram: e.target.value }))}
                          className="w-full rounded-[var(--radius-sm)] border border-border bg-background px-3 py-2.5 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
                          placeholder="@username"
                        />
                      </label>

                      {error ? (
                        <p className="text-sm text-destructive" role="alert">
                          {error}
                        </p>
                      ) : null}

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-[#d45303] disabled:opacity-60 cursor-pointer"
                        >
                          {status === "loading" ? "Отправка…" : "Отправить заявку"}
                        </button>
                        <button
                          type="button"
                          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline cursor-pointer"
                          onClick={() => setStep(QUIZ_STEPS.length - 1)}
                        >
                          Назад к вопросам
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
