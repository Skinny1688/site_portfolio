"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
        <Link
          href="/#hero"
          className="inline-flex shrink-0 items-center cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/nkt-studio-logo.svg"
            alt="NKT Studio"
            width={40}
            height={40}
            priority
            className="h-10 w-10"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-3 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-[var(--accent-hover)] cursor-pointer md:px-4"
          >
            Обсудить проект
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-border md:hidden cursor-pointer"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn("border-t border-border bg-background md:hidden", open ? "block" : "hidden")}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Мобильная навигация">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted cursor-pointer"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-semibold text-accent cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Обсудить проект
          </Link>
        </nav>
      </div>
    </header>
  );
}
