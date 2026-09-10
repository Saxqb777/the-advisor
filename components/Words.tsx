import type { CSSProperties } from "react";

/**
 * Splits copy into words carrying their own index, so the reading
 * highlight is driven entirely by one CSS variable on the parent.
 */
export default function Words({
  text,
  offset = 0,
  total,
}: {
  text: string;
  offset?: number;
  total: number;
}) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <span
          key={`${i}-${word}`}
          className="w"
          style={{ "--i": offset + i, "--n": total } as CSSProperties}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export const countWords = (text: string) => text.split(" ").length;
