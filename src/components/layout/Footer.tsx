import { FAQ_ITEMS, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold text-foreground">SiteScan</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Сайты под ключ и редизайн для малого бизнеса. Никита — дизайн и разработка без
              нейрослопа и лишней сложности.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#quiz"
                className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-[#d45303] cursor-pointer"
              >
                Оставить заявку
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[var(--radius-md)] border border-foreground px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background cursor-pointer"
              >
                {TELEGRAM_HANDLE}
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-4">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q}>
                  <dt className="text-sm font-semibold text-foreground">{item.q}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground md:px-6">
          © {new Date().getFullYear()} SiteScan · sitescan.online · Никита
        </p>
      </div>
    </footer>
  );
}
