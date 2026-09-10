import type { CSSProperties } from "react";

/**
 * One letter per mask, rising in sequence. Words stay unbroken.
 * The whole string is read out once, not letter by letter.
 */
export default function Letters({
  text,
  start = 0,
  step = 42,
}: {
  text: string;
  start?: number;
  step?: number;
}) {
  const words = text.split(" ");
  let index = 0;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.3em]">
        {words.map((word) => (
          <span key={word} className="inline-flex">
            {[...word].map((letter, i) => (
              <span
                key={`${word}-${i}`}
                className="line-mask inline"
                style={{ "--delay": `${start + index++ * step}ms` } as CSSProperties}
              >
                <span>{letter}</span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </>
  );
}
