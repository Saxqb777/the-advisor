"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Confessions from "./Confessions";
import { copy } from "@/lib/copy";

/**
 * Landing screen. The headline says what this is, the right hand side
 * shows their own week being crossed out, and the line underneath is
 * blank and waiting for their sentence.
 */
function Headline({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span
          key={line}
          className="line-mask"
          style={{ "--delay": `${140 + i * 110}ms` } as CSSProperties}
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
      className={`flex min-h-[90svh] flex-col justify-center pt-12 pb-16 md:min-h-[92svh] md:pt-16 md:pb-16 ${
        entered ? "is-in" : ""
      }`}
    >
      {/* Headline runs the full width so it keeps its scale. */}
      <h1 className="font-display text-[clamp(1.875rem,6.6vw,5rem)] leading-[1.02] tracking-[-0.022em]">
        <span className="block md:hidden">
          <Headline lines={copy.hero.linesPhone} />
        </span>
        <span className="hidden md:block">
          <Headline lines={copy.hero.lines} />
        </span>
      </h1>

      {/* Their sentence on the left, their week being crossed out on the right. */}
      <div className="mt-9 flex flex-col gap-9 md:mt-16 md:grid md:grid-cols-12 md:gap-10">
        <div className="order-2 md:order-none md:col-span-7">
          <p
            className="rise max-w-[44ch] text-[clamp(1rem,2.1vw,1.1875rem)] leading-[1.5] text-ink-60"
            style={{ "--delay": "480ms" } as CSSProperties}
          >
            {copy.hero.under}
          </p>

          <div
            className="rise mt-9 md:mt-11"
            style={{ "--delay": "620ms" } as CSSProperties}
          >
            <div className="relative text-[clamp(1.25rem,3.2vw,1.875rem)]">
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
              className={`mt-4 max-w-[46ch] text-sm leading-[1.6] text-ink-40 transition-all duration-500 ${
                written ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
              }`}
            >
              {copy.hero.typing}
            </p>
          </div>

          <div
            className="rise mt-9 md:mt-11"
            style={{ "--delay": "760ms" } as CSSProperties}
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
        </div>

        {/* Anchored under its own rule so it reads as placed, not stranded. */}
        <div
          className="rise order-1 md:order-none md:col-span-5 md:col-start-8"
          style={{ "--delay": "900ms" } as CSSProperties}
        >
          <div className="h-px w-full bg-rule" />
          <div className="pt-6 md:pt-8">
            <Confessions />
          </div>
        </div>
      </div>
    </section>
  );
}
