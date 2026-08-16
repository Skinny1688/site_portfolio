import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkBySlug, PORTFOLIO } from "@/content/portfolio";
import { SITE_URL } from "@/content/site";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PORTFOLIO.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return {};
  return {
    title: work.seoTitle,
    description: work.seoDescription,
    alternates: { canonical: `${SITE_URL}/works/${work.slug}` },
    openGraph: {
      title: work.seoTitle,
      description: work.seoDescription,
      url: `${SITE_URL}/works/${work.slug}`,
      images: [{ url: work.cover, width: 1200, height: 750, alt: work.title }],
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <article className="px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#works"
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline cursor-pointer"
        >
          ← К портфолио
        </Link>

        <div className="mt-6">
          <span
            className={cn(
              "inline-flex rounded-sm px-2 py-1 text-xs font-semibold",
              work.kind === "commercial"
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-foreground",
            )}
          >
            {work.badge}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {work.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {work.description}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{work.meta}</p>
          {work.liveUrl ? (
            <div className="mt-6">
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
              >
                {work.liveLabel ?? "Открыть сайт"}
              </a>
            </div>
          ) : null}
        </div>

        <div
          className="relative mt-8 w-full overflow-hidden border border-border bg-[#efefea]"
          style={{ aspectRatio: `${work.coverWidth} / ${work.coverHeight}` }}
        >
          <Image
            src={work.cover}
            alt={`Обложка: ${work.title}`}
            fill
            priority
            quality={95}
            className="object-contain object-center"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Задача</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{work.task}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Решение</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{work.solution}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Что сделано</h2>
          <ul className="mt-3 space-y-2">
            {work.done.map((item) => (
              <li key={item} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Экраны</h2>
          <div className="mt-6 grid gap-6">
            {work.gallery.map((shot) => (
              <div
                key={shot.src}
                className="relative w-full overflow-hidden border border-border bg-[#efefea]"
                style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  quality={95}
                  className="object-contain object-center"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          {work.liveUrl ? (
            <a
              href={work.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
            >
              {work.liveLabel ?? "Открыть сайт"}
            </a>
          ) : (
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
            >
              Обсудить похожий проект
            </Link>
          )}
          {work.liveUrl ? (
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-[var(--radius-md)] border border-foreground px-5 py-3 text-sm font-semibold text-foreground cursor-pointer"
            >
              Обсудить похожий проект
            </Link>
          ) : null}
          <Link
            href="/#works"
            className="inline-flex items-center rounded-[var(--radius-md)] border border-foreground px-5 py-3 text-sm font-semibold text-foreground cursor-pointer"
          >
            Смотреть все работы
          </Link>
        </div>
      </div>
    </article>
  );
}
