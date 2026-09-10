import { NextResponse } from "next/server";

export const runtime = "nodejs";

const cap = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const channel = body.channel === "email" ? "email" : "phone";
  const contact = cap(body.contact, 200);
  const problem = cap(body.problem, 2000);
  const name = cap(body.name, 120);
  const preference = body.preference === "call" ? "a call" : "WhatsApp";

  if (!contact) {
    return NextResponse.json({ error: "contact required" }, { status: 400 });
  }

  const lines = [
    `Name: ${name || "not given"}`,
    `Reach on: ${channel === "phone" ? `${contact} (${preference})` : contact}`,
    "",
    "What is slow:",
    problem || "not given",
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL;
  const from = process.env.LEAD_FROM ?? "The Advisor <onboarding@resend.dev>";

  // No key yet means the site still works. The request lands in the logs.
  if (!key || !to) {
    console.log("[the advisor] session request\n" + lines);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: channel === "email" ? contact : undefined,
      subject: `Session request${name ? ` from ${name}` : ""}`,
      text: lines,
    }),
  });

  if (!sent.ok) {
    console.error("[the advisor] resend failed", sent.status);
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
