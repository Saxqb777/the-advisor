"use client";

import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";

const READ = 2600; // long enough to take it in
const KILL = 1150; // the rule draws through
const CLEAR = 550; // it gets out of the way

/**
 * One confession at a time, struck out in red and replaced. It runs
 * without being asked, which is the one exception on this page, and it
 * earns it: this is the pitch, delivered before anyone scrolls.
 */
export default function Confessions() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"live" | "struck" | "gone">("live");
  const [holdStill, setHoldStill] = useState(false);

  useEffect(() => {
    setHoldStill(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    if (holdStill) return;
    const a = setTimeout(() => setPhase("struck"), READ);
    const b = setTimeout(() => setPhase("gone"), READ + KILL);
    const c = setTimeout(() => {
      setIndex((v) => (v + 1) % copy.confessions.length);
      setPhase("live");
    }, READ + KILL + CLEAR);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, [index, holdStill]);

  // Nothing moves, so the whole list is simply shown.
  if (holdStill) {
    return (
      <div>
        <span className="mb-3 block text-label font-medium uppercase text-ink-40">
          {copy.still}
        </span>
        <ul className="font-display text-[clamp(1.0625rem,2vw,1.375rem)] leading-[1.5]">
          {copy.confessions.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={phase === "live" ? "" : "is-struck"}>
      <span className="mb-3 block text-label font-medium uppercase text-ink-40">
        {copy.still}
      </span>
      <p
        className={`min-h-[2.9em] font-display text-[clamp(1.125rem,2.3vw,1.75rem)] leading-[1.35] transition-opacity duration-500 ${
          phase === "gone" ? "opacity-0" : "opacity-100"
        }`}
      >
        <span key={index} className="confession">
          {copy.confessions[index]}
        </span>
      </p>
    </div>
  );
}
