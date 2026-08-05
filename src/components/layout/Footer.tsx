import Image from "next/image";
import Link from "next/link";
import {
  BRAND,
  EMAIL,
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_TEL,
  SPECIALIST,
  TELEGRAM_HANDLE,
  TELEGRAM_URL,
} from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-6">
        <div>
          <Image
            src="/brand/nkt-studio-logo.svg"
            alt="NKT Studio"
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Разработка лендингов, многостраничных сайтов и редизайн для бизнеса в Беларуси.
          </p>
          <p className="mt-3 text-sm font-medium text-foreground">{SPECIALIST}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Контакты</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Telegram: {TELEGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="break-all text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Email: {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Телефон: {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Навигация</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/privacy"
                className="text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Политика обработки данных
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground md:px-6">
          © 2026 {BRAND} · {SPECIALIST}
        </p>
      </div>
    </footer>
  );
}
