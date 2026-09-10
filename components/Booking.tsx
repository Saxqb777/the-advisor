"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Reveal from "./Reveal";
import { copy } from "@/lib/copy";

type Channel = "phone" | "email";
type Preference = "whatsapp" | "call";

const LABEL = "text-label font-medium uppercase text-ink-40";
const LINE =
  "peer block w-full bg-transparent pb-3 text-[clamp(1.0625rem,2.2vw,1.375rem)] leading-[1.4] text-ink caret-accent outline-none";

/** Two words with the live one underlined. No pills, no boxes. */
function Switch({
  options,
  value,
  onChange,
  label,
}: {
  options: { id: string; text: string }[];
  value: string;
  onChange: (id: string) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-7">
      {options.map((option) => {
        const live = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={live}
            onClick={() => onChange(option.id)}
            className={`-mb-px border-b-2 pb-2 text-[clamp(1.0625rem,2.2vw,1.375rem)] transition-colors duration-300 ${
              live
                ? "border-accent text-ink"
                : "border-transparent text-ink-40 hover:text-ink-60"
            }`}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );
}

export default function Booking({
  problem,
  setProblem,
  booked,
  setBooked,
}: {
  problem: string;
  setProblem: (value: string) => void;
  booked: boolean;
  setBooked: (value: boolean) => void;
}) {
  const [channel, setChannel] = useState<Channel>("phone");
  const [contact, setContact] = useState("");
  const [preference, setPreference] = useState<Preference>("whatsapp");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const note = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = note.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [problem]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const value = contact.trim();

    if (!value) {
      setError(
        channel === "phone" ? copy.form.errorNumber : copy.form.errorEmail,
      );
      return;
    }
    if (channel === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(copy.form.errorEmail);
      return;
    }

    setError("");
    setSending(true);

    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          problem: problem.trim(),
          channel,
          contact: value,
          preference: channel === "phone" ? preference : null,
          name: name.trim(),
        }),
      });
      if (!response.ok) throw new Error("send failed");
      setBooked(true);
    } catch {
      setError(copy.form.errorSend);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="book" className="scroll-mt-16 pt-10 md:pt-16">
      <Reveal>
        <div className="draw-rule" />
      </Reveal>

      <Reveal className="mt-12 grid gap-5 md:mt-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4 lg:col-span-3">
          <p className="rise max-w-[26ch] text-[clamp(1rem,1.9vw,1.125rem)] leading-[1.6] text-ink-60">
            {copy.form.intro}
          </p>
        </div>

        <div className="md:col-span-8 lg:col-span-9">
          {/* The form folds away rather than vanishing. */}
          <div
            className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              booked ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
            }`}
            aria-hidden={booked}
          >
            <div className="overflow-hidden">
              <form onSubmit={submit} noValidate className="max-w-[46rem]">
                <div className="rise">
                  <label htmlFor="problem" className={LABEL}>
                    {copy.form.problemLabel}{" "}
                    <span className="normal-case text-ink-20">
                      {copy.form.optional}
                    </span>
                  </label>
                  <textarea
                    id="problem"
                    ref={note}
                    rows={1}
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    className={`${LINE} mt-4 resize-none overflow-hidden font-display`}
                  />
                  <div className="h-px w-full bg-rule transition-colors duration-500 peer-focus:bg-accent" />
                </div>

                <div
                  className="rise mt-12"
                  style={{ ["--delay" as string]: "90ms" }}
                >
                  <p className={LABEL}>{copy.form.reachLabel}</p>
                  <div className="mt-4">
                    <Switch
                      label={copy.form.reachLabel}
                      value={channel}
                      onChange={(id) => {
                        setChannel(id as Channel);
                        setContact("");
                        setError("");
                      }}
                      options={[
                        { id: "phone", text: copy.form.phone },
                        { id: "email", text: copy.form.email },
                      ]}
                    />
                  </div>
                  <div className="h-px w-full bg-rule" />
                </div>

                {/* One field that changes what it wants. */}
                <div
                  className="rise mt-12"
                  style={{ ["--delay" as string]: "160ms" }}
                >
                  <label htmlFor="contact" className={LABEL}>
                    <span
                      key={channel}
                      className="inline-block animate-none opacity-100"
                    >
                      {channel === "phone"
                        ? copy.form.numberLabel
                        : copy.form.emailLabel}
                    </span>
                  </label>
                  <input
                    id="contact"
                    key={channel}
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      if (error) setError("");
                    }}
                    type={channel === "phone" ? "tel" : "email"}
                    inputMode={channel === "phone" ? "tel" : "email"}
                    autoComplete={channel === "phone" ? "tel" : "email"}
                    className={`${LINE} mt-4`}
                  />
                  <div
                    className={`h-px w-full transition-colors duration-500 ${
                      error ? "bg-accent" : "bg-rule peer-focus:bg-accent"
                    }`}
                  />
                  {error && (
                    <p className="mt-3 text-sm text-accent" role="alert">
                      {error}
                    </p>
                  )}
                </div>

                {/* Only asked once they have chosen the phone. */}
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    channel === "phone"
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                  aria-hidden={channel !== "phone"}
                >
                  <div className="overflow-hidden">
                    <div className="mt-12">
                      <p className={LABEL}>{copy.form.preferenceLabel}</p>
                      <div className="mt-4">
                        <Switch
                          label={copy.form.preferenceLabel}
                          value={preference}
                          onChange={(id) => setPreference(id as Preference)}
                          options={[
                            { id: "whatsapp", text: copy.form.whatsapp },
                            { id: "call", text: copy.form.call },
                          ]}
                        />
                      </div>
                      <div className="h-px w-full bg-rule" />
                    </div>
                  </div>
                </div>

                <div
                  className="rise mt-12"
                  style={{ ["--delay" as string]: "230ms" }}
                >
                  <label htmlFor="name" className={LABEL}>
                    {copy.form.nameLabel}{" "}
                    <span className="normal-case text-ink-20">
                      {copy.form.optional}
                    </span>
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className={`${LINE} mt-4`}
                  />
                  <div className="h-px w-full bg-rule transition-colors duration-500 peer-focus:bg-accent" />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="rise mt-14 inline-block bg-ink px-8 py-4 text-[0.9375rem] font-medium text-paper transition-colors duration-300 hover:bg-accent disabled:opacity-60"
                  style={{ ["--delay" as string]: "300ms" }}
                >
                  {sending ? (
                    copy.form.sending
                  ) : (
                    <>
                      {copy.hero.cta.before}
                      <span className="border-b-2 border-accent pb-[3px]">
                        {copy.hero.cta.stress}
                      </span>
                      {copy.hero.cta.after}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              booked
                ? "translate-y-0 opacity-100"
                : "pointer-events-none h-0 translate-y-3 opacity-0"
            }`}
            aria-live="polite"
          >
            <p className="font-display text-[clamp(1.75rem,4.2vw,2.75rem)] leading-[1.1]">
              {copy.form.confirmation}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
