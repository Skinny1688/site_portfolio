# Design System Master File — SiteScan

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.
>
> Source of truth for brand tokens: `Plan.md` (гибрид Editorial Impact A + Kinetic Pitch C).

---

**Project:** SiteScan (`sitescan.online`)  
**Brand:** Никита / SiteScan (текстовый wordmark, без логотипа)  
**Generated:** 2026-08-05  
**Category:** Portfolio / Web Design Agency (RU, РБ)  
**Design Dials:** Motion 7/10 (Standard+) | Density 3/10 (Spacious)

---

## Concept

**Гибрид A+C:** светлая editorial-база (крупная типографика, воздух, дорогой минимализм) + кинетика скролла (text reveal, scroll-chapters, marquee, number ticker, progressive blur, квиз-питч).

---

## Global Rules

### Color Palette (fixed)

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Background | `#F7F7F5` | `--color-background` |
| Foreground / Text | `#111111` | `--color-foreground` |
| Accent / CTA | `#E85D04` | `--color-accent` |
| Secondary | `#1B4332` | `--color-secondary` |
| On Accent | `#FFFFFF` | `--color-on-accent` |
| Muted surface | `#EFEFEA` | `--color-muted` |
| Muted text | `#5C5C56` | `--color-muted-foreground` |
| Border | `#D9D9D2` | `--color-border` |
| Destructive | `#B42318` | `--color-destructive` |
| Ring / Focus | `#E85D04` | `--color-ring` |

**Notes:** Light theme only. No purple gradients, neon glow, or warm-cream terracotta clichés.

### Typography (fixed)

- **Heading Font:** Syne (display / editorial)
- **Body Font:** Manrope (UI / reading)
- **Mood:** bold editorial, modern agency, confident without toxicity
- **Google Fonts:** [Syne + Manrope](https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap)

### Spacing Variables

*Density: 3/10 — Spacious*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `24px` / `1.5rem` | Standard padding |
| `--space-lg` | `32px` / `2rem` | Section padding |
| `--space-xl` | `48px` / `3rem` | Large gaps |
| `--space-2xl` | `64px` / `4rem` | Section margins |
| `--space-3xl` | `96px` / `6rem` | Hero padding |

### Radius & Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `4px` | Inputs, chips |
| `--radius-md` | `8px` | Interactive cards, buttons |
| `--radius-lg` | `16px` | Quiz panels only |
| `--shadow-sm` | `0 1px 2px rgba(17,17,17,0.06)` | Subtle lift |
| `--shadow-md` | `0 8px 24px rgba(17,17,17,0.08)` | Interactive surfaces |

Cards: only where there is interaction (quiz, optional reviews). No cards in hero.

---

## Page Structure (anchors)

1. `#hero` — Brand, headline, supporting line, CTA group, visual plane  
2. `#services` — 4–6 services  
3. `#works` — Marquee placeholders  
4. `#process` — Timeline (6 steps) + terms / guarantee / support  
5. `#reviews` — 5–7 template reviews  
6. `#quiz` — Quiz → lead form  
7. Footer — FAQ + CTA + Telegram `@nikita_ai_pro`

Admin: `/admin` (auth only).

---

## Component Specs

### Buttons

```css
.btn-primary {
  background: var(--color-accent);
  color: var(--color-on-accent);
  padding: 14px 28px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-family: var(--font-body);
  transition: background 200ms ease, transform 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: #d45303;
}

.btn-secondary {
  background: transparent;
  color: var(--color-foreground);
  border: 1.5px solid var(--color-foreground);
  padding: 14px 28px;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: background 200ms ease, color 200ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: var(--color-foreground);
  color: var(--color-background);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 16px;
  background: #fff;
  color: var(--color-foreground);
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.input:focus {
  border-color: var(--color-accent);
  outline: none;
  box-shadow: 0 0 0 3px rgba(232, 93, 4, 0.25);
}
```

---

## Style Guidelines

**Style:** Editorial Impact (base) + Kinetic Pitch (motion layer)

**Keywords:** editorial, spacious, oversized type, marquee, scroll-chapters, text-reveal, number ticker, progressive blur, light minimal, orange CTA, forest secondary

**Key Effects (stages 4–5):** text reveal, scroll progress, marquee with progressive blur edges, number ticker, timeline sticky beam, quiz step transitions

### Page Pattern

**Pattern Name:** Agency Portfolio Pitch

- **Conversion Strategy:** Hero offer → social proof / works → process trust → quiz → form  
- **CTA Placement:** Hero dual CTA + sticky Telegram + quiz form + footer  
- **Telegram:** `https://t.me/nikita_ai_pro`

---

## Motion

**Scroll Reveal** (Standard+) — Trigger: viewport enter | Duration: 400–600ms | Easing: ease-out

- Prefer Framer Motion / Magic UI wrappers (client-only, lazy where heavy)
- Respect `prefers-reduced-motion`
- Mobile: simplify parallax; keep marquee + quiz

---

## Anti-Patterns (Do NOT Use)

- ❌ Purple-on-white / indigo AI gradients
- ❌ Neon glow / SaaS glow stacks
- ❌ Warm cream + terracotta serif cliché
- ❌ Cards in hero / card grids without interaction
- ❌ Fake prices in quiz
- ❌ Emojis as icons
- ❌ Dark mode (v1 is light-only)
- ❌ Low contrast text (< 4.5:1)
- ❌ Missing `cursor-pointer` on clickable elements
- ❌ Invisible focus states

---

## Pre-Delivery Checklist

- [ ] No emojis as icons (SVG: Lucide/Heroicons)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover 150–300ms; focus visible
- [ ] Contrast ≥ 4.5:1
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375 / 768 / 1024 / 1440
- [ ] No horizontal page scroll
- [ ] Brand (Никита / SiteScan) is hero-level signal
