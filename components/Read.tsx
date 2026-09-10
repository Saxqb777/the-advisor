"use client";

import { useScrollProgress } from "@/lib/hooks";
import Reveal from "./Reveal";
import Words, { countWords } from "./Words";
import { copy } from "@/lib/copy";

/** Words sit faded until the block passes the middle of the screen. */
function Block({ lead, body }: { lead: string; body: string }) {
  const track = useScrollProgress<HTMLDivElement>("--reveal", 0.88, 0.45);
  const leadCount = countWords(lead);
  const total = leadCount + countWords(body);

  return (
    <Reveal className="pt-9 md:pt-14" threshold={0.1}>
      <div className="draw-rule" />
      <div
        ref={track}
        className="read-block mt-8 grid gap-5 md:mt-12 md:grid-cols-12 md:gap-10"
      >
        <div className="md:col-span-4 lg:col-span-3">
          <div className="h-px w-8 bg-accent" />
        </div>
        <div className="md:col-span-8 lg:col-span-9">
          <p className="font-display text-[clamp(1.75rem,4.6vw,3.25rem)] leading-[1.06] tracking-[-0.015em]">
            <Words text={lead} total={total} />
          </p>
          <p className="mt-5 max-w-[54ch] text-[clamp(1rem,1.9vw,1.1875rem)] leading-[1.62] md:mt-7">
            <Words text={body} offset={leadCount} total={total} />
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Read() {
  return (
    <section className="pb-6 md:pb-16">
      {copy.read.map((block) => (
        <Block key={block.lead} lead={block.lead} body={block.body} />
      ))}
    </section>
  );
}
