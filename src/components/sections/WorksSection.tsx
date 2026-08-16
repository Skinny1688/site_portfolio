import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function WorksSection() {
  return (
    <section id="works" className="scroll-mt-20 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Работы</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Проекты и концепты
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Коммерческие проекты и авторские концепты. В каждой работе — задача, структура и итоговый
          интерфейс. У live-кейсов можно открыть сайт и пройти сценарий целиком.
        </p>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {PORTFOLIO.map((work, index) => (
            <li key={work.slug} className={cn(index === 0 && "md:col-span-2")}>
              <Link
                href={`/works/${work.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-shadow hover:shadow-[var(--shadow-md)] cursor-pointer"
              >
                <div
                  className="relative w-full overflow-hidden bg-[#efefea]"
                  style={{
                    aspectRatio: `${work.coverWidth} / ${work.coverHeight}`,
                  }}
                >
                  <Image
                    src={work.cover}
                    alt={`Обложка проекта ${work.title}`}
                    fill
                    quality={95}
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 100vw, 1152px"
                        : "(max-width: 768px) 100vw, 560px"
                    }
                    className="object-contain object-center transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5 md:p-6">
                  <span
                    className={cn(
                      "inline-flex w-fit rounded-sm px-2 py-1 text-xs font-semibold",
                      work.kind === "commercial"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-foreground",
                    )}
                  >
                    {work.badge}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                    {work.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {work.description}
                  </p>
                  <p className="mt-auto pt-2 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    {work.meta}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
