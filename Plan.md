# Plan.md — SiteScan Portfolio (`sitescan.online`)

## Выбранная концепция

**Гибрид: база A «Editorial Impact» + квиз/скролл из C «Kinetic Pitch».**

| Слой | Решение |
|------|---------|
| Визуал | Светлая editorial-база: крупная типографика, воздух, дорогой минимализм с характером |
| Палитра | Фон `#F7F7F5`, текст `#111111`, CTA `#E85D04`, вторичный `#1B4332` |
| Шрифты | Syne (заголовки) + Manrope (текст) |
| Motion | Заметный 2D: text reveal, scroll-chapters, marquee кейсов, number ticker, progressive blur |
| Интерактив | Квиз-питч → форма заявки |
| Стек | Next.js (App Router) + TypeScript + Tailwind + Framer Motion + Postgres + Docker + Caddy |
| Домен | `sitescan.online` → VPS `82.114.230.83` (рядом с `lovepostera.online`, `vibelogic.bond`) |

### Зафиксированные продуктовые решения

- Бренд: **Никита** / SiteScan, логотипа нет (текстовый wordmark).
- Аудитория: малый бизнес, ИП, самозанятые, физлица (РБ), только RU.
- Оффер: сайты под ключ + редизайн; акцент на скорость и рабочий бизнес-результат.
- Цены: индивидуально; в квизе — ориентир без прайса.
- Лиды: форма → БД + админка; кнопка Telegram → `@nikita_ai_pro`; TG-бот уведомлений — позже.
- Кейсы: сейчас плейсхолдеры + marquee; 5 кейсов добавим отдельным этапом.
- Отзывы: 5–7 шаблонных карточек с именами.
- Юр. страницы и аналитика: не нужны в v1.

### Структура страницы (якоря)

1. Hero  
2. Услуги  
3. Работы (marquee-плейсхолдеры)  
4. Как работаю (timeline + сроки / гарантия / поддержка)  
5. Отзывы  
6. Квиз → Заявка  
7. Footer (FAQ + CTA + дубль Telegram)

Админка: `/admin` (только авторизованный доступ).

---

## Порядок этапов

Работаем **строго по этапам**. Каждый этап — атомарный результат. После этапа — краткий отчёт и переход дальше (по `change-protocol`: не смешивать несвязанные слои без необходимости).

| # | Этап |
|---|------|
| 0 | Bootstrap проекта и design tokens |
| 1 | Подготовка логики бэкенда |
| 2 | Связь бэкенда и настройка БД |
| 3 | Реализация фронтенда |
| 4 | Добавление финального UI/UX дизайна |
| 5 | Настройка интерактивных блоков |
| 6 | Проверка и финальные правки |
| 7 | Коммит и деплой на сервер, затем проверка |

---

## Этап 0. Bootstrap проекта и design tokens

### Цель
Создать каркас Next.js-приложения, CSS-переменные гибрида A+C, базовый layout (Header/Footer skeleton), Docker-заготовки без деплоя.

### Ограничения
- Не писать бизнес-логику заявок и админки на этом этапе.
- Не ставить визуальные эффекты «ради красоты» до этапа 4–5.
- Не ломать соседние сайты на VPS (деплой только на этапе 7).
- Не коммитить секреты (пароли, `.env` с прод-ключами).

### Skills и инструменты
- `change-protocol` — атомарность, список файлов до правок.
- `context-guard` — минимальный набор файлов.
- `ui-ux-pro-max` — зафиксировать design system (`--design-system --persist`) в `design-system/MASTER.md`.
- CLI: `create-next-app`, Tailwind, TypeScript.

### Результат этапа
- Репозиторий запускается локально (`npm run dev`).
- Есть `design-system/MASTER.md` и CSS variables.
- Пустые секции с `id` под якоря.

---

## Этап 1. Подготовка логики бэкенда

### Цель
Описать и реализовать серверные контракты без UI:

- `POST /api/leads` — создание заявки (имя, телефон, telegram, ответы квиза).
- `POST /api/admin/login` + session/cookie auth.
- `GET /api/admin/leads` — список заявок (только авторизованный).
- `PATCH /api/admin/leads/:id` — смена статуса (новое / в работе / закрыто) — опционально в v1.
- Валидация Zod, rate-limit на публичную форму, санитизация ввода.

### Ограничения
- Слои: controller → service → repository (`backend-layering`).
- Без прямого SQL в route-handlers.
- Telegram-бот **не** подключаем в этом этапе (только точка расширения / TODO в service).
- Админ — один пользователь из env (`ADMIN_USER` / `ADMIN_PASSWORD_HASH`).
- Не отдавать лишние поля и stack traces клиенту.

### Skills и инструменты
- `backend-layering`
- `backend-db-schema` (проектирование схемы до миграций)
- `change-protocol`
- `debug` — при ошибках контрактов
- Инструменты: Next.js Route Handlers, Zod, `jose`/`iron-session` (или аналог cookie-session)

### Результат этапа
- API описано типами + handlers с мок/in-memory или готовностью к репозиторию.
- Контракт DTO зафиксирован для фронта.

---

## Этап 2. Связь бэкенда и настройка БД

### Цель
Поднять Postgres, миграции, репозитории, связать API с реальной БД.

### Схема (черновик)

```text
leads
  id            uuid pk
  name          text not null
  phone         text not null
  telegram      text not null
  quiz_answers  jsonb not null default '{}'
  status        text not null default 'new'  -- new | in_progress | closed
  source        text not null default 'site'
  created_at    timestamptz not null default now()
  updated_at    timestamptz not null default now()

admin_sessions (если не JWT-only)
  ...
```

### Ограничения
- Одна БД/схема для SiteScan, изолированная от других проектов на VPS.
- Миграции воспроизводимы (SQL файлы или Drizzle/Prisma migrate).
- Локально и в Docker — одинаковый `DATABASE_URL`.
- Индексы: `created_at DESC`, `status`.
- Секреты только в `.env` / Docker secrets, не в git.

### Skills и инструменты
- `backend-db-schema`
- `backend-layering`
- `change-protocol`
- Инструменты: PostgreSQL, Docker Compose (`app` + `db`), Drizzle или Prisma (выбор при старте этапа; предпочтение — **Drizzle** за простоту в Next.js)

### Результат этапа
- `docker compose up` поднимает БД.
- Заявка через API реально пишется и читается в админ API.
- Smoke-тест: curl create → admin list.

---

## Этап 3. Реализация фронтенда

### Цель
Собрать рабочую структуру публичной страницы и админки: секции, навигация-скролл, формы, квиз (логика), API-клиент. Визуал — каркас в токенах A, без финальной «полировки motion».

### Состав UI

| Зона | Содержание |
|------|------------|
| Header | Wordmark, якоря, sticky CTA Telegram |
| Hero | Оффер + 2 CTA |
| Services | 4–6 услуг (черновик копирайта) |
| Works | Marquee-слоты плейсхолдеров (без реальных кейсов) |
| Process | 6 шагов |
| Reviews | 5–7 шаблонных отзывов |
| Quiz + Lead form | Интерактив → POST `/api/leads` |
| Footer | FAQ + CTA |
| Admin | Логин + таблица заявок |

### Ограничения
- `frontend` skill: UI не содержит сырых URL бэкенда вразброс; API-клиент в одном модуле.
- Копирайт на русском, тон: дерзкий креатив без токсичности.
- Кейсы не заполнять реальными данными.
- Светлая тема only.
- Mobile-first: 375 / 768 / 1024 / 1440.
- Не использовать запрещённые паттерны: фиолетовые AI-градиенты, неон, шаблонный SaaS-glow, нейрослоп.

### Skills и инструменты
- `frontend`
- `change-protocol`
- `context-guard`
- `ui-ux-pro-max` — UX-чеклист секций и CTA
- MCP **Magic UI** и **Aceternity UI** — см. блок ниже (на этапе 3: поиск + установка кандидатов, базовая врезка)

### Как извлекать и использовать данные из MCP (этап 3)

#### Magic UI (`user-@magicuidesign/mcp`)
1. `searchRegistryItems` / `listRegistryItems` — найти кандидатов под секции.
2. `getRegistryItem` — получить код, зависимости, способ установки.
3. Установка в проект через официальный registry/CLI Magic UI (или копирование адаптированного компонента в `components/magicui/`).
4. Обёртка в feature-компоненты (`components/sections/...`), чтобы библиотечный код не протекал в бизнес-логику.

**Плановый набор Magic UI для этапа 3–5:**

| Компонент | Назначение |
|-----------|------------|
| `marquee` | Бегущая лента кейсов |
| `blur-fade` | Появление блоков при скролле |
| `number-ticker` | Цифры/акценты результата |
| `text-reveal` / `dia-text-reveal` | Editorial-заголовки |
| `scroll-progress` | Индикатор прогресса страницы (из C) |
| `progressive-blur` | Края marquee |
| `interactive-hover-button` | CTA (адаптировать под палитру A) |

**Не брать без адаптации:** `aurora-text`, `rainbow-button`, `animated-gradient-text` — высокий риск AI-gradient / нейрослопа.

#### Aceternity UI (`user-aceternityui`)
1. `list_categories` / `search_components` / `get_all_components` — карта компонентов.
2. `get_component_info` — описание, категория, ограничения.
3. `get_installation_info` — команда установки (`npx shadcn@latest add https://ui.aceternity.com/registry/...`).
4. Установка → рестайлинг под токены A (цвета, радиусы, тени).

**Плановый набор Aceternity для этапа 3–5:**

| Компонент | Назначение |
|-----------|------------|
| `timeline` | Блок «Как работаю» (sticky + scroll beam) |
| `text-generate-effect` или `typewriter-effect` | Hero/chapter intro из C |
| `resizable-navbar` | Header с ужатием при скролле (если не конфликтует с кастомным) |
| `focus-cards` | Опционально для отзывов/услуг |
| `animated-tabs` | Шаги квиза (UI переключения) |

**Не брать в v1:** `background-beams`, `world-map`, `floating-dock` — лишняя сложность / не тот tone для editorial light.

### Результат этапа
- Все секции на месте, якоря скроллятся.
- Квиз + форма отправляют лид в API.
- Админка показывает заявки.
- Компоненты из MCP установлены и обёрнуты, но motion ещё не доведён до финала.

---

## Этап 4. Добавление финального UI/UX дизайна

### Цель
Довести визуал до продакшен-уровня гибрида A+C: типографика, сетка, spacing, состояния hover/focus, копирайт, FAQ, пустые состояния кейсов.

### Ограничения
- База — Editorial A; кинетика C только усиливает narrative, не ломает спокойный светлый фон.
- Один визуальный язык: CSS variables из `design-system/MASTER.md`.
- Карточки только там, где есть взаимодействие (квиз, отзывы при необходимости) — не «карточки ради карточек» в hero.
- Hero = один composition: бренд/имя, headline, supporting line, CTA group, visual plane.
- Контраст текста ≥ 4.5:1; `prefers-reduced-motion` учитывается.

### Skills и инструменты
- `ui-ux-pro-max` (обязательно): повторный прогон `--design-system`, UX guidelines, anti-patterns checklist.
- `frontend`
- User frontend design rules (brand-first, no purple SaaS clichés, expressive fonts).
- MCP Magic UI / Aceternity — точечный рестайлинг уже установленных компонентов.

### Как использовать MCP на этапе 4
1. Для каждого установленного компонента: `getRegistryItem` / `get_component_info` → сверить default-стили с MASTER.
2. Перекрасить accent → `#E85D04`, убрать чужие градиенты/glow.
3. Если компонент визуально «кричит» — заменить на более спокойный аналог из того же MCP-поиска.
4. Aceternity `timeline` / text-effects подогнать под Syne/Manrope и light background.
5. Magic UI `marquee` + `progressive-blur` — выровнять ритм карточек-плейсхолдеров под editorial сетку.

### Результат этапа
- Страница выглядит как единый дорогой лендинг, а не набор демо-виджетов.
- FAQ, копирайт, микротексты формы/квиза готовы.

---

## Этап 5. Настройка интерактивных блоков

### Цель
Собрать hero→CTA воронку через motion и интерактив:

1. Scroll progress + chapter reveals (из C).  
2. Marquee кейсов с паузой на hover.  
3. Number ticker в social-proof/услугах.  
4. Timeline процесса со sticky-прогрессом.  
5. Квиз 4–5 шагов с анимацией переходов → форма.  
6. CTA Telegram + форма с success/error states.

### Сценарий квиза (черновик)

1. Тип сайта: лендинг / многостраничный / магазин / редизайн / не уверен  
2. Есть ли текущий сайт: да / нет  
3. Цель: заявки / имидж / магазин / другое  
4. Срок: ASAP / 2–4 недели / гибко  
5. Результат: короткий вывод + форма (имя, телефон, telegram)

### Ограничения
- Motion не блокирует LCP: тяжёлые эффекты — client-only, lazy.
- На мобиле упростить (меньше parallax, сохранить marquee + quiz).
- Квиз не показывает фейковые цены.
- Интерактив не ломает доступность клавиатуры.

### Skills и инструменты
- `ui-ux-pro-max` — motion dials / UX checklist
- `frontend`
- `debug` — если глюки гидрации/скролла
- MCP Magic UI: `scroll-progress`, `blur-fade`, `marquee`, `number-ticker`, `text-reveal`
- MCP Aceternity: `timeline`, `text-generate-effect` / `typewriter-effect`, `animated-tabs`

### Как использовать MCP на этапе 5
1. Ещё раз `searchRegistryItems("scroll progress marquee ticker")` и `search_components` — подтвердить актуальные имена.
2. `getRegistryItem` / `get_installation_info` — проверить peer-deps (`motion`, `framer-motion`).
3. Встраивать по одному блоку → визуальная проверка → следующий (`change-protocol`).
4. Для квиза: Aceternity `animated-tabs` или кастом на Framer Motion, если tabs слишком «saas».
5. Логировать в `quiz_answers` JSON ровно те ключи, что ожидает backend DTO.

### Результат этапа
- Сайт ощущается как лид-магнит с шоурилом, а не визитка.
- Все интерактивы работают на desktop и mobile.

---

## Этап 6. Проверка и финальные правки

### Цель
Прогнать чеклист качества, исправить баги, подготовить к деплою.

### Чеклист
- [ ] Якоря Header скроллят к секциям (desktop + mobile menu)
- [ ] Telegram CTA ведёт на `https://t.me/nikita_ai_pro`
- [ ] Форма валидирует поля и пишет в БД
- [ ] Админ: логин / логаут / список заявок / защита роутов
- [ ] Квиз передаёт ответы в `quiz_answers`
- [ ] Marquee не ломает layout; есть reduced-motion fallback
- [ ] Нет фиолетовых AI-градиентов / неона / emoji-иконок
- [ ] Контраст, focus states, `cursor-pointer` на кликабельном
- [ ] 375 / 768 / 1024 / 1440 без горизонтального скролла страницы
- [ ] Lighthouse sanity (Performance не критично убит motion)
- [ ] `.env.example` без секретов; README с запуском

### Ограничения
- Не добавлять новые фичи на этом этапе.
- Правки только багфиксы и полировка.
- Не деплоить до зелёного чеклиста.

### Skills и инструменты
- `debug` / `debug-workflow`
- `ui-ux-pro-max` pre-delivery checklist
- `frontend`
- Опционально: Bugbot/security review skill — если попросите перед деплоем

### Результат этапа
- Локально стабильный продакшен-билд (`npm run build`).

---

## Этап 7. Коммит и деплой на сервер, затем проверка

### Цель
Закоммитить код, выкатить на VPS рядом с существующими сайтами, проверить `https://sitescan.online`.

### Деплой-стратегия (черновик)
1. Git commit (по вашей команде) + push при необходимости.
2. SSH на VPS, каталог проекта изолирован (например `/var/www/sitescan` или docker stack `sitescan`).
3. `docker compose` для `app` + `postgres` (своя сеть/volume).
4. Caddy: новый site block для `sitescan.online` → reverse_proxy на контейнер/порт приложения **без изменения** конфигов `lovepostera.online` и `vibelogic.bond`.
5. SSL: проверить/выпустить через Caddy automatic HTTPS.
6. Прогон smoke: главная, форма, админка, Telegram-ссылка.
7. Сменить пароль root на VPS (пароль светился в чате) — отдельным действием после доступа.

### Ограничения
- Не трогать контейнеры/volumes чужих сайтов.
- Не делать `docker compose down` глобально на всём хосте.
- Не пушить секреты.
- Не force-push.
- Коммит — только по явной просьбе (уже входит в этот этап, когда до него дойдём).
- Деплой от `root` — минимальные команды, бэкап Caddyfile перед правкой.

### Skills и инструменты
- `change-protocol`
- `create-pull-request` — не обязателен, если деплой напрямую; git commit protocol из user rules
- `debug` — если 502/SSL/CORS
- Инструменты: SSH, Docker, Caddy, `curl`, браузерная проверка

### Результат этапа
- `https://sitescan.online` отдаёт сайт.
- Тестовая заявка видна в админке.
- Соседние сайты живы.

---

## Карта зависимостей этапов

```text
0 Bootstrap + tokens
        ↓
1 Backend logic (contracts)
        ↓
2 DB + repositories
        ↓
3 Frontend structure (+ MCP install)
        ↓
4 Final UI/UX polish (MCP restyle)
        ↓
5 Interactive blocks (MCP motion wiring)
        ↓
6 QA / fixes
        ↓
7 Commit + Deploy + Verify
```

---

## Вне скоупа v1 (сознательно позже)

- Реальные 5 кейсов и скриншоты  
- Финальные 5–7 отзывов (замена шаблонов)  
- Telegram-бот уведомлений  
- Аналитика (Метрика/GA)  
- Мультиязычность  
- CMS для кейсов  
- Юридические страницы  

---

## Критерий «готово»

Сайт на `sitescan.online` в едином стиле Editorial A с кинетикой C: услуги, marquee-плейсхолдеры работ, процесс, шаблон отзывов, квиз→заявка в БД, админка только для вас, Telegram CTA, FAQ в footer. Соседние сайты на VPS не задеты.

---

## Следующий шаг

После вашего подтверждения плана начинаем **Этап 0** (bootstrap + design tokens) и далее строго по таблице этапов.
