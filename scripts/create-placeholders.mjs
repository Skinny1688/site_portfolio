import fs from "fs";
import path from "path";

function svgCover(title, subtitle, w = 1200, h = 750) {
  const esc = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#efefea"/>
      <stop offset="55%" stop-color="#d8d8d2"/>
      <stop offset="100%" stop-color="#1b4332"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="48" y="48" width="${w - 96}" height="${h - 96}" rx="12" fill="#ffffff" fill-opacity="0.88"/>
  <text x="80" y="${h / 2 - 20}" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#111111">${esc(title)}</text>
  <text x="80" y="${h / 2 + 30}" font-family="Arial, sans-serif" font-size="22" fill="#5c5c56">${esc(subtitle)}</text>
  <text x="80" y="${h - 80}" font-family="Arial, sans-serif" font-size="16" fill="#c94d00">Заглушка · заменить реальным скриншотом</text>
</svg>
`;
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

const works = [
  ["ai-education-platform", "Платформа курсов по ИИ", "Коммерческий проект"],
  ["dentline", "DentLine", "Авторский концепт"],
  ["kvadrat-renovation", "Kvadrat", "Авторский концепт"],
  ["vector-logistics", "Vector", "Авторский концепт"],
  ["formwood", "FormWood", "Авторский концепт"],
];

for (const [slug, title, badge] of works) {
  write(`public/works/${slug}/cover.svg`, svgCover(title, badge));
  write(`public/works/${slug}/desktop-01.svg`, svgCover(title, "Desktop 01", 1440, 900));
  write(`public/works/${slug}/desktop-02.svg`, svgCover(title, "Desktop 02", 1440, 900));
  write(`public/works/${slug}/mobile-01.svg`, svgCover(title, "Mobile 01", 750, 1334));
}

write(
  "public/og/nkt-studio-cover.svg",
  svgCover("NKT Studio", "Разработка сайтов в Беларуси", 1200, 630),
);

console.log("placeholders ok");
