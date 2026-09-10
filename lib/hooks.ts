"use client";

import { useEffect, useRef, useState } from "react";

/** Adds a one way "it has arrived" flag once an element scrolls into view. */
export function useInView<T extends HTMLElement>(
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

/**
 * Writes a 0 to 1 scroll progress value onto a CSS custom property.
 * One property write per frame, so the reading highlight and the path
 * fill cost almost nothing.
 */
export function useScrollProgress<T extends HTMLElement>(
  property: string,
  startAt = 0.9,
  endAt = 0.35,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty(property, "1");
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * startAt;
      const end = vh * endAt;
      const distance = rect.height + (start - end);
      const travelled = start - rect.top;
      const progress = Math.min(1, Math.max(0, travelled / distance));
      el.style.setProperty(property, progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [property, startAt, endAt]);

  return ref;
}
