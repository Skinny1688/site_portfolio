# Этап 1 — Текущая сборка и форма

## Сборка

- Стек: Next.js 16 App Router + TypeScript + Tailwind 4 + Motion
- Dev: `npm run dev`
- Prod build: `npm run build` → `output: "standalone"`
- Deploy: Docker Compose (`app` + `postgres`), Caddy reverse proxy на `sitescan.online`
- Корень приложения: `src/app`, публичная страница: `src/app/(site)/page.tsx`

## Отправка формы (сейчас)

1. UI: `QuizSection` — 4 шага квиза + поля name/phone/telegram
2. Клиент: `src/api/client.ts` → `createLead()` → `POST /api/leads`
3. API: `src/app/api/leads/route.ts` — Zod-валидация, rate-limit 5/min/IP
4. Service → Repository → Postgres (`leads` table)
5. Admin: `/admin` читает заявки через cookie-session

Контракт `createLeadSchema` сейчас требует `name`, `phone`, `telegram` (+ optional `quizAnswers`).

## Ассеты (блокер)

В репозитории **нет**:

- `/public/brand/nkt-studio-logo.svg`
- `/public/brand/nkt-studio-mark.svg`
- `/public/brand/favicon.svg`
- `/public/og/nkt-studio-cover.png`
- скриншотов кейсов в `/public/works/...`

По ТЗ §5: не генерировать поддельные скриншоты. Реализация кода идёт дальше; реальные изображения нужно положить в указанные пути.
