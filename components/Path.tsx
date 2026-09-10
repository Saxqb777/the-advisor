"use client";

import type { CSSProperties } from "react";
import { useScrollProgress } from "@/lib/hooks";
import Reveal from "./Reveal";
import { copy } from "@/lib/copy";

/**
 * A hairline runs down beside the four lines and fills as you scroll.
 * Once a session is booked the first line carries an accent segment.
 * No ticks, no circles, no icons.
 */
export default function Path({ booked }: { booked: boolean }) {
  const track = useScrollProgress<HTMLDivElement>("--fill", 0.86, 0.42);

  return (
    <section className="pt-10 md:pt-16">
      <Reveal>
        <div className="draw-rule" />
      </Reveal>

      <Reveal className="mt-12 grid gap-5 md:mt-16 md:grid-cols-12 md:gap-10">
        <div className="hidden md:col-span-4 md:block lg:col-span-3" />

        <div className="md:col-span-8 lg:col-span-9">
          <div ref={track} className="path-track relative pl-7 md:pl-10">
            <div className="absolute top-1 bottom-1 left-0 w-px bg-rule" />
            <div className="path-fill absolute top-1 bottom-1 left-0 w-px bg-ink" />

            <ol>
              {copy.path.steps.map((step, i) => (
                <li
                  key={step}
                  className="rise relative py-4 md:py-6"
                  style={{ "--delay": `${i * 90}ms` } as CSSProperties}
                >
                  {booked && i === 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-0 bottom-0 -left-7 w-[3px] bg-accent md:-left-10"
                    />
                  )}
                  <p className="max-w-[46ch] font-display text-[clamp(1.125rem,2.6vw,1.625rem)] leading-[1.3]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <p
            className="rise mt-10 max-w-[46ch] text-[clamp(1rem,1.9vw,1.125rem)] leading-[1.6] text-ink-60 md:mt-14"
            style={{ "--delay": "420ms" } as CSSProperties}
          >
            {copy.path.close}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
