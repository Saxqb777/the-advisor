"use client";

import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import { copy } from "@/lib/copy";

/** The turn. Ends on the name, in red, as the reason it has not happened. */
export default function Payoff() {
  return (
    <section className="pt-10 md:pt-16">
      <Reveal>
        <div className="draw-rule" />
      </Reveal>

      <Reveal className="mt-16 md:mt-24" threshold={0.2}>
        {copy.payoff.lines.map((line, i) => (
          <p
            key={line}
            className="rise font-display text-[clamp(1.625rem,4vw,2.875rem)] leading-[1.22]"
            style={{ "--delay": `${i * 110}ms` } as CSSProperties}
          >
            {line}
          </p>
        ))}

        <p
          className="rise mt-12 font-display text-[clamp(1.5rem,3.4vw,2.375rem)] leading-[1.15] text-ink-40 md:mt-16"
          style={{ "--delay": "360ms" } as CSSProperties}
        >
          {copy.payoff.why}
        </p>

        <p
          className="rise mt-6 max-w-[22ch] font-display text-[clamp(2rem,6vw,4rem)] leading-[1.06] md:mt-8"
          style={{ "--delay": "520ms" } as CSSProperties}
        >
          {copy.payoff.because}{" "}
          <span className="text-accent">{copy.payoff.name}</span>.
        </p>

        <div
          className="rise mt-12 md:mt-16"
          style={{ "--delay": "660ms" } as CSSProperties}
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
