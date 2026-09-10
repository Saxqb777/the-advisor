"use client";

import { useState } from "react";
import Hero from "./Hero";
import Confession from "./Confession";
import Read from "./Read";
import Path from "./Path";
import Booking from "./Booking";
import { copy } from "@/lib/copy";

export default function Site() {
  // Whatever they write at the top is already in the form when they reach it.
  const [problem, setProblem] = useState("");
  const [booked, setBooked] = useState(false);

  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-16">
      <header className="pt-8 text-label font-medium uppercase text-ink-40">
        {copy.mark}
      </header>

      <Hero problem={problem} setProblem={setProblem} />
      <Confession />
      <Read />
      <Path booked={booked} />
      <Booking
        problem={problem}
        setProblem={setProblem}
        booked={booked}
        setBooked={setBooked}
      />

      <footer className="mt-28 md:mt-40">
        <div className="h-px w-full bg-rule" />
        <div className="flex items-baseline justify-between py-9 text-label font-medium uppercase text-ink-40">
          <span>{copy.mark}</span>
          <a
            href={`tel:${copy.phone}`}
            className="transition-colors duration-300 hover:text-accent"
          >
            {copy.phone}
          </a>
        </div>
      </footer>
    </main>
  );
}
