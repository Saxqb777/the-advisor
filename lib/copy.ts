/**
 * Every word on the site lives here. Nothing is written anywhere else,
 * so a wording change is a one file change.
 *
 * Anything still in [BRACKETS] is a placeholder waiting on your words.
 */
export const copy = {
  mark: "The Advisor",
  place: "Abu Dhabi",

  hero: {
    lines: ["Something in your business", "is taking too long."],
    // A phone is too narrow for that break, so it gets its own.
    linesPhone: ["Something in your", "business is taking", "too long."],
    under: "Tell me what it is. The first session is free.",
    typing: "One line is enough. The real conversation happens in the session.",
    cta: { before: "Book a ", stress: "free", after: " session" },
  },

  read: [
    {
      lead: "You came here because something is slow.",
      body: "Work done by hand can usually be done quicker. That is the whole job.",
    },
    {
      lead: "What is the one job that eats your week?",
      body: "Tell me what is slow or painful in your day. I listen properly, then I build the software or the website that fixes it.",
    },
    {
      lead: "I do not show my work. I talk it.",
      body: "Tell me what is slow and I will tell you how it gets fixed. What you want to see is your own problem solved, not someone else's.",
    },
  ],

  path: {
    steps: [
      "Book a session. We talk for forty five minutes. Free.",
      "I send you a short written diagnosis. What is slow, why, and what a fix looks like.",
      "Within six hours of sending it I call you and take you through it.",
      "Then you decide: it goes on, or it ends here.",
    ],
    close: "You are not left reading a document. You hear the fix from me.",
  },

  form: {
    intro: "One line is enough. The real conversation happens in the session.",
    problemLabel: "What is slow",
    reachLabel: "How should I reach you",
    phone: "Phone",
    email: "Email",
    numberLabel: "Your number",
    emailLabel: "Your email",
    preferenceLabel: "Then reach me on",
    whatsapp: "WhatsApp",
    call: "A call",
    nameLabel: "Your name",
    optional: "optional",
    // Functional microcopy, mine not yours. Change any of it.
    errorNumber: "Add a number so I can reach you.",
    errorEmail: "Add an email so I can reach you.",
    errorSend: "That did not send. Try again in a moment.",
    sending: "Sending",
    // Placeholder. This moment needs your words.
    confirmation: "[CONFIRMATION LINE TBD]",
  },
} as const;
