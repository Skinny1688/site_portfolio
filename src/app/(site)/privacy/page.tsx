import type { Metadata } from "next";
import { BRAND, EMAIL, SPECIALIST, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/content/site";

export const metadata: Metadata = {
  title: "Политика обработки данных",
  description: `Политика обработки персональных данных ${BRAND}.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-3xl prose-none">
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Политика обработки персональных данных
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Текст ниже — рабочая заготовка для публикации. Финальная юридическая редакция должна быть
          одобрена владельцем сайта.
        </p>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground">
          <p>
            Оператор: {SPECIALIST}, бренд {BRAND}. Контакты:{" "}
            <a href={TELEGRAM_URL} className="text-accent underline cursor-pointer">
              {TELEGRAM_HANDLE}
            </a>
            ,{" "}
            <a href={`mailto:${EMAIL}`} className="text-accent underline cursor-pointer">
              {EMAIL}
            </a>
            .
          </p>
          <p>
            Через форму на сайте собирается Telegram-контакт для связи по запросу расчёта стоимости
            сайта. Данные используются только для ответа на обращение и не передаются третьим лицам
            без законных оснований.
          </p>
          <p>
            Вы можете запросить удаление или уточнение своих данных, написав на указанные контакты.
          </p>
        </div>
      </div>
    </article>
  );
}
