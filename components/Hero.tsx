"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { copy } from "@/lib/copy";

/**
 * The first screen is a blank line waiting for their sentence.
 * No list, no categories, no placeholder telling them what to think.
 */
function Headline({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span
          key={line}
          className="line-mask"
          style={{ "--delay": `${140 + i * 120}ms` } as CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </>
  );
}

export default function Hero({
  problem,
  setProblem,
}: {
  problem: string;
  setProblem: (value: string) => void;
}) {
  const [entered, setEntered] = useState(false);
  const [focused, setFocused] = useState(false);
  const field = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = field.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [problem]);

  const written = problem.trim().length > 0;
  const live = focused || written;

  return (
    <section
      className={`flex min-h-[90svh] flex-col justify-center pt-14 pb-16 md:min-h-[94svh] md:pt-24 md:pb-20 ${
        entered ? "is-in" : ""
      }`}
    >
      <h1 className="font-display text-[clamp(2.25rem,8.6vw,6.5rem)] leading-[1] tracking-[-0.02em]">
        <span className="block md:hidden">
          <Headline lines={copy.hero.linesPhone} />
        </span>
        <span className="hidden md:block">
          <Headline lines={copy.hero.lines} />
        </span>
      </h1>

      <p
        className="rise mt-6 max-w-[34ch] text-[clamp(1rem,2.1vw,1.25rem)] leading-[1.5] text-ink-60 md:mt-7"
        style={{ "--delay": "560ms" } as CSSProperties}
      >
        {copy.hero.under}
      </p>

      <div
        className="rise mt-12 max-w-[46rem] md:mt-20"
        style={{ "--delay": "700ms" } as CSSProperties}
      >
        <div className="relative text-[clamp(1.25rem,4.2vw,2.375rem)]">
          <label htmlFor="hero-problem" className="sr-only">
            {copy.form.problemLabel}
          </label>

          <textarea
            id="hero-problem"
            ref={field}
            rows={1}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            spellCheck={false}
            className="block w-full resize-none overflow-hidden bg-transparent pb-3 font-display text-[1em] leading-[1.3] text-ink caret-accent outline-none"
          />

          {!live && (
            <>
              <span
                aria-hidden="true"
                className="caret pointer-events-none absolute top-[0.2em] left-0 block h-[1em] w-[2px] bg-accent"
              />
              {/* Start of the line marked in accent. The only invitation there is. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 block h-[2px] w-14 bg-accent"
              />
            </>
          )}

          <div
            className={`h-px w-full transition-colors duration-500 ${
              live ? "bg-accent" : "bg-rule"
            }`}
          />
        </div>

        <p
          className={`mt-4 max-w-[46ch] text-sm leading-[1.6] text-ink-40 transition-all duration-500 md:text-[0.9375rem] ${
            written ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          {copy.hero.typing}
        </p>
      </div>

      <div
        className="rise mt-10 md:mt-12"
        style={{ "--delay": "840ms" } as CSSProperties}
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
    </section>
  );
}
