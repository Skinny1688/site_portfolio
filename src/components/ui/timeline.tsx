"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export function Timeline({
  data,
  className,
  heading,
  subheading,
}: {
  data: TimelineEntry[];
  className?: string;
  heading?: string;
  subheading?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => setHeight(el.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", () => {});

  return (
    <div className={cn("w-full bg-background font-sans", className)} ref={containerRef}>
      {(heading || subheading) && (
        <div className="mx-auto max-w-6xl px-4 pb-6 md:px-6">
          {heading ? (
            <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {heading}
            </h2>
          ) : null}
          {subheading ? (
            <p className="mt-4 max-w-xl text-muted-foreground">{subheading}</p>
          ) : null}
        </div>
      )}

      <div ref={ref} className="relative mx-auto max-w-6xl pb-8">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-16">
            <div className="sticky top-28 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-background md:left-3">
                <div className="h-3 w-3 rounded-full border border-border bg-accent" />
              </div>
              <h3 className="hidden font-display text-xl font-bold text-muted-foreground md:block md:pl-20 md:text-3xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-3 block font-display text-xl font-bold text-muted-foreground md:hidden">
                {item.title}
              </h3>
              <div className="text-sm leading-relaxed text-foreground md:text-base">
                {item.content}
              </div>
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,transparent,var(--border)_10%,var(--border)_90%,transparent)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-accent via-secondary to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
