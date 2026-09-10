"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/lib/hooks";
import Reveal from "./Reveal";
import { copy } from "@/lib/copy";

/**
 * Six things that are true about them, each killed as it passes the
 * middle of the screen. No two lines share a size or a position, so it
 * reads as a composition rather than a list.
 */
const SHAPES = [
  { size: "text-[clamp(1.875rem,6.6vw,4.25rem)]", indent: "" },
  { size: "text-[clamp(1.375rem,4.2vw,2.375rem)]", indent: "md:pl-[22%]" },
  { size: "text-[clamp(1.625rem,5.6vw,3.5rem)]", indent: "md:pl-[6%]" },
  { size: "text-[clamp(1.25rem,3.8vw,2.125rem)]", indent: "md:pl-[38%]" },
  { size: "text-[clamp(1.75rem,6vw,3.875rem)]", indent: "" },
  { size: "text-[clamp(1.3125rem,3.6vw,2rem)]", indent: "md:pl-[28%]" },
];

function Line({ text, index }: { text: string; index: number }) {
  // Fires the moment the line crosses the middle of the screen.
  const { ref, inView } = useInView<HTMLDivElement>(0, "-50% 0px -50% 0px");
  const shape = SHAPES[index % SHAPES.length];

  return (
    <div
      ref={ref}
      className={`confession-row rise py-7 md:py-10 ${shape.indent} ${
        inView ? "is-struck" : ""
      }`}
      style={{ "--delay": "60ms" } as CSSProperties}
    >
      <span className="still-label mb-3 block text-label font-medium uppercase text-ink-40">
        {copy.still}
      </span>
      <p
        className={`font-display leading-[1.06] tracking-[-0.015em] ${shape.size}`}
      >
        <span className="confession">{text}</span>
      </p>
    </div>
  );
}

export default function Confession() {
  return (
    <section className="pt-4 pb-8 md:pt-10 md:pb-20">
      <Reveal>
        <div className="draw-rule" />
      </Reveal>

      <div className="mt-10 md:mt-16">
        {copy.confessions.map((text, i) => (
          <Reveal key={text} threshold={0.15}>
            <Line text={text} index={i} />
          </Reveal>
        ))}
      </div>

      {/* The room the dead lines left behind. */}
      <Reveal className="mt-20 md:mt-32" threshold={0.25}>
        {copy.payoff.lines.map((line, i) => (
          <p
            key={line}
            className="rise font-display text-[clamp(1.5rem,3.6vw,2.5rem)] leading-[1.24]"
            style={{ "--delay": `${i * 110}ms` } as CSSProperties}
          >
            {line}
          </p>
        ))}

        <p
          className="rise mt-12 font-display text-[clamp(1.5rem,3.4vw,2.375rem)] leading-[1.15] text-ink-40 md:mt-16"
          style={{ "--delay": "320ms" } as CSSProperties}
        >
          {copy.payoff.why}
        </p>

        <p
          className="rise mt-6 max-w-[22ch] font-display text-[clamp(1.875rem,5.6vw,3.5rem)] leading-[1.08] md:mt-8"
          style={{ "--delay": "480ms" } as CSSProperties}
        >
          {copy.payoff.because}{" "}
          <span className="text-accent">{copy.payoff.name}</span>.
        </p>

        <div
          className="rise mt-12 md:mt-14"
          style={{ "--delay": "620ms" } as CSSProperties}
        >
          <a
            href="#book"
            className="group inline-block bg-ink px-8 py-4 text-[0.9375rem] font-medium tracking-[0.01em] text-paper transition-colors duration-300 hover:bg-accent"
          >
            {copy.hero.cta.before}
            <span className="border-b-2 border-accent pb-[3px] transition-colors duration-300 group-hover:border-paper">
              {copy.hero.cta.stress}
            </span>
            {copy.hero.cta.after}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
