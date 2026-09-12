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
  /** Live interactive site URL — shown as “Открыть сайт” when set */
  liveUrl?: string;
  liveLabel?: string;
};

const RAW_PORTFOLIO: PortfolioWork[] = [
  {
    slug: "sova-cafe",
    kind: "commercial",
    badge: "Коммерческий проект · Live",
    title: "Сова — сайт панорамного кафе",
    description:
      "Сайт кафе в парке Мазурино: меню, бронирование стола, пицца из печи и заявки на мероприятия. Можно открыть и пройти сценарий целиком.",
    meta: "HoReCa · лендинг · live",
    cover: "/works/sova-cafe/cover.webp",
    coverWidth: 2000,
    coverHeight: 991,
    gallery: [
      {
        src: "/works/sova-cafe/desktop-01.webp",
        alt: "Главный экран сайта кафе Сова — оффер и бронь",
        width: 1440,
        height: 900,
      },
      {
        src: "/works/sova-cafe/desktop-02.webp",
        alt: "Блок пиццы из печи на сайте кафе Сова",
        width: 1440,
        height: 900,
      },
    ],
    task:
      "Сделать сайт панорамного кафе: показать атмосферу места, меню и вести гостя к брони стола или обсуждению мероприятия.",
    solution:
      "Собрал спокойный hospitality-визуал, блоки меню и пиццы из печи, сценарии бронирования и форму заявки на событие.",
    done: [
      "Структура лендинга и навигация",
      "Меню и акценты заведения",
      "Бронь стола и заявки на мероприятия",
      "Адаптивная вёрстка и запуск",
    ],
    seoTitle: "Сова — сайт панорамного кафе | кейс NKT Studio",
    seoDescription:
      "Коммерческий live-сайт кафе «Сова»: меню, бронирование, пицца из печи и заявки на мероприятия в Витебске.",
    liveUrl: "https://sova.lovepostera.online/",
    liveLabel: "Открыть сайт",
  },
  {
    slug: "ug-hub",
    kind: "commercial",
    badge: "Коммерческий проект · Live",
    title: "UG_HUB — сайт компьютерного клуба",
    description:
      "Сайт киберклуба UG_HUB: зоны и тарифы, калькулятор времени, железо, библиотека игр и запись. Интерактивный сценарий доступен онлайн.",
    meta: "Развлечения · многоблочный лендинг · live",
    cover: "/works/ug-hub/cover.webp",
    coverWidth: 1440,
    coverHeight: 900,
    gallery: [
      {
        src: "/works/ug-hub/desktop-01.webp",
        alt: "Раздел зон UG_HUB — выбор формата посадки",
        width: 1440,
        height: 900,
      },
      {
        src: "/works/ug-hub/desktop-02.webp",
        alt: "Калькулятор тарифов UG_HUB",
        width: 1440,
        height: 900,
      },
    ],
    task:
      "Собрать сайт компьютерного клуба, где гость быстро выбирает зону, считает стоимость катки и понимает, что внутри — железо, игры и доп. развлечения.",
    solution:
      "Сделал тёмный gaming-интерфейс: карточки зон, калькулятор тарифов, блоки железа и лаунчер игр с фильтрами, плюс понятный путь к бронированию.",
    done: [
      "Зоны и тарифная сетка",
      "Калькулятор длительности",
      "Железо и библиотека игр",
      "CTA на бронь и контакты",
    ],
    seoTitle: "UG_HUB — сайт компьютерного клуба | кейс NKT Studio",
    seoDescription:
      "Коммерческий live-сайт UG_HUB: зоны ПК, тарифы, калькулятор, железо, игры и бронирование в Витебске.",
    liveUrl: "https://coachspace.site",
    liveLabel: "Открыть сайт",
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
        src: "/works/dentline/desktop-02.webp",
        alt: "Блок стоимости услуг DentLine",
        width: 2000,
        height: 1326,
      },
      {
        src: "/works/dentline/desktop-03.webp",
        alt: "Блок «Когда необходима имплантация» DentLine",
        width: 2000,
        height: 1315,
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
        src: "/works/kvadrat-renovation/desktop-02.webp",
        alt: "Блок услуг Kvadrat — ремонт и дизайн-проект",
        width: 2000,
        height: 1262,
      },
      {
        src: "/works/kvadrat-renovation/desktop-03.webp",
        alt: "Этапы реализации ремонта Kvadrat",
        width: 2000,
        height: 1010,
      },
      {
        src: "/works/kvadrat-renovation/desktop-04.webp",
        alt: "Блок «Почему выбирают нас» Kvadrat",
        width: 2000,
        height: 997,
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
        src: "/works/vector-logistics/desktop-02.webp",
        alt: "Главный экран Vector с формой быстрого расчёта",
        width: 2000,
        height: 1054,
      },
      {
        src: "/works/vector-logistics/desktop-03.webp",
        alt: "Блок услуг Vector — FTL, LTL и проектная логистика",
        width: 2000,
        height: 911,
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

export const PORTFOLIO = RAW_PORTFOLIO.map((work) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return {
    ...work,
    cover: `${basePath}${work.cover}`,
    gallery: work.gallery.map((shot) => ({
      ...shot,
      src: `${basePath}${shot.src}`,
    })),
  };
});

export function getWorkBySlug(slug: string): PortfolioWork | undefined {
  return PORTFOLIO.find((work) => work.slug === slug);
}
