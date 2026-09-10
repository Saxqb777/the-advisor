"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/hooks";

/** Wraps a chunk of the page and flips it to "is-in" the first time it arrives. */
export default function Reveal({
  as: Tag = "div",
  className = "",
  children,
  threshold = 0.2,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  threshold?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);

  return (
    <Tag ref={ref} className={`${className} ${inView ? "is-in" : ""}`}>
      {children}
    </Tag>
  );
}
