export type WorkKind = "commercial" | "concept";

export type PortfolioWork = {
  slug: string;
  kind: WorkKind;
  badge: string;
  title: string;
  description: string;
  meta: string;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  gallery: { src: string; alt: string; width: number; height: number }[];
  task: string;
  solution: string;
  done: string[];
  seoTitle: string;
  seoDescription: string;
};

export const PORTFOLIO: PortfolioWork[] = [
  {
    slug: "ai-education-platform",
    kind: "commercial",
    badge: "Коммерческий проект",
    title: "Платформа курсов по ИИ",
    description:
      "Образовательная платформа для обучения работе с искусственным интеллектом. Полный цикл: структура, дизайн, адаптивная разработка и запуск.",
    meta: "Образование · полный цикл · 10 дней",
    cover: "/works/ai-education-platform/cover.webp",
    coverWidth: 2000,
    coverHeight: 904,
    gallery: [
      {
        src: "/works/ai-education-platform/desktop-01.webp",
        alt: "Главный экран образовательной платформы курсов по ИИ",
        width: 2000,
        height: 904,
      },
      {
        src: "/works/ai-education-platform/cover.png",
        alt: "Обзор интерфейса платформы курсов по ИИ",
        width: 2000,
        height: 904,
      },
      {
        src: "/works/ai-education-platform/mobile-01.webp",
        alt: "Мобильный вид платформы курсов по ИИ",
        width: 900,
        height: 1200,
      },
    ],
    task:
      "Собрать образовательную платформу курсов по ИИ: понятную структуру, адаптивный интерфейс и запуск в срок 10 дней.",
    solution:
      "Спроектировал структуру, оформил ключевые экраны и реализовал адаптивную версию с полным циклом до публикации.",
    done: [
      "Структура и сценарии обучения",
      "Дизайн основных экранов",
      "Адаптивная разработка",
      "Запуск за 10 дней",
    ],
    seoTitle: "Платформа курсов по ИИ — кейс NKT Studio",
    seoDescription:
      "Коммерческий проект: образовательная платформа курсов по ИИ. Полный цикл — структура, дизайн, разработка и запуск за 10 дней.",
  },
  {
    slug: "dentline",
    kind: "concept",
    badge: "Авторский концепт",
    title: "DentLine — сайт стоматологии",
    description:
      "Многостраничный сайт частной стоматологии: услуги, врачи, цены, ответы на вопросы и запись на консультацию.",
    meta: "Медицина · многостраничный сайт",
    cover: "/works/dentline/cover.webp",
    coverWidth: 2000,
    coverHeight: 1410,
    gallery: [
      {
        src: "/works/dentline/desktop-01.webp",
        alt: "Главный экран концепта DentLine",
        width: 2000,
        height: 1410,
      },
      {
        src: "/works/dentline/cover.png",
        alt: "Обзор интерфейса DentLine",
        width: 2000,
        height: 1410,
      },
      {
        src: "/works/dentline/mobile-01.webp",
        alt: "Мобильный вид концепта DentLine",
        width: 900,
        height: 1200,
      },
    ],
    task:
      "Авторский бриф: спроектировать многостраничный сайт частной стоматологии с услугами, врачами, ценами и записью.",
    solution:
      "Собрал структуру разделов, спокойный медицинский визуальный язык и понятный путь к записи на консультацию.",
    done: ["Структура страниц", "Блоки услуг и врачей", "FAQ и запись", "Адаптивная сетка"],
    seoTitle: "DentLine — концепт сайта стоматологии | NKT Studio",
    seoDescription:
      "Авторский концепт многостраничного сайта стоматологии: услуги, врачи, цены и запись на консультацию.",
  },
  {
    slug: "kvadrat-renovation",
    kind: "concept",
    badge: "Авторский концепт",
    title: "Kvadrat — лендинг ремонта квартир",
    description:
      "Лендинг для компании по ремонту квартир с примерами работ, этапами, составом услуги и формой первичной заявки.",
    meta: "Строительство · лендинг",
    cover: "/works/kvadrat-renovation/cover.webp",
    coverWidth: 2000,
    coverHeight: 1372,
    gallery: [
      {
        src: "/works/kvadrat-renovation/desktop-01.webp",
        alt: "Главный экран концепта Kvadrat",
        width: 2000,
        height: 1372,
      },
      {
        src: "/works/kvadrat-renovation/cover.png",
        alt: "Обзор интерфейса Kvadrat",
        width: 2000,
        height: 1372,
      },
      {
        src: "/works/kvadrat-renovation/mobile-01.webp",
        alt: "Мобильный вид концепта Kvadrat",
        width: 900,
        height: 1200,
      },
    ],
    task:
      "Авторский бриф: лендинг для ремонта квартир с примерами работ, этапами и формой первичной заявки.",
    solution:
      "Выстроил одностраничный сценарий от оффера до заявки: портфолио работ, этапы и состав услуги.",
    done: ["Структура лендинга", "Блоки работ и этапов", "Форма заявки", "Мобильная версия"],
    seoTitle: "Kvadrat — концепт лендинга ремонта | NKT Studio",
    seoDescription:
      "Авторский концепт лендинга для ремонта квартир: примеры работ, этапы, состав услуги и форма заявки.",
  },
  {
    slug: "vector-logistics",
    kind: "concept",
    badge: "Авторский концепт",
    title: "Vector — редизайн сайта логистической компании",
    description:
      "Новая структура и визуальная система корпоративного сайта с направлениями перевозок, географией работы и запросом расчёта.",
    meta: "Логистика · редизайн",
    cover: "/works/vector-logistics/cover.webp",
    coverWidth: 2000,
    coverHeight: 982,
    gallery: [
      {
        src: "/works/vector-logistics/desktop-01.webp",
        alt: "Главный экран концепта Vector",
        width: 2000,
        height: 982,
      },
      {
        src: "/works/vector-logistics/cover.png",
        alt: "Обзор интерфейса Vector",
        width: 2000,
        height: 982,
      },
      {
        src: "/works/vector-logistics/mobile-01.webp",
        alt: "Мобильный вид концепта Vector",
        width: 900,
        height: 1200,
      },
    ],
    task:
      "Авторский бриф: редизайн корпоративного сайта логистики с направлениями, географией и запросом расчёта.",
    solution:
      "Обновил информационную архитектуру и визуальную систему, усилив блоки направлений и запроса расчёта.",
    done: [
      "Новая структура",
      "Визуальная система",
      "Направления и география",
      "Форма расчёта",
    ],
    seoTitle: "Vector — концепт редизайна логистики | NKT Studio",
    seoDescription:
      "Авторский концепт редизайна сайта логистической компании: структура, направления и запрос расчёта.",
  },
];

export function getWorkBySlug(slug: string): PortfolioWork | undefined {
  return PORTFOLIO.find((work) => work.slug === slug);
}
