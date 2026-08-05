# SiteScan (`sitescan.online`)

Портфолио Никиты: editorial landing + квиз → заявка в Postgres + админка.

## Стек

Next.js (App Router) · TypeScript · Tailwind · Motion · Drizzle · Postgres · Docker · Caddy

## Локальный запуск

```bash
cp .env.example .env.local
# заполните ADMIN_USER / ADMIN_PASSWORD (или ADMIN_PASSWORD_HASH) и SESSION_SECRET

docker compose up -d db
# применить схему:
Get-Content drizzle/0000_init_leads.sql | docker exec -i sitescan-db psql -U sitescan -d sitescan
# или: npm run db:push

npm install
npm run dev
```

- Сайт: http://localhost:3000  
- Админка: http://localhost:3000/admin  
- Telegram CTA: https://t.me/nikita_ai_pro  

## API

| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/api/leads` | Публичная заявка (+ rate limit) |
| POST | `/api/admin/login` | Логин (httpOnly cookie) |
| POST | `/api/admin/logout` | Выход |
| GET | `/api/admin/leads` | Список заявок |
| PATCH | `/api/admin/leads/:id` | Статус: `new` \| `in_progress` \| `closed` |

## Docker (продакшен)

```bash
docker compose --profile full up -d --build
```

Приложение слушает хост-порт `3001`. Caddy: см. `Caddyfile.snippet`.

## Дизайн

Токены и правила: `design-system/MASTER.md` (палитра и шрифты из `Plan.md`).
