/**
 * Every word on the site lives here. Nothing is written anywhere else,
 * so a wording change is a one file change.
 *
 * Anything still in [BRACKETS] is a placeholder waiting on your words.
 */
export const copy = {
  mark: "The Advisor",
  phone: "0545388662",

  hero: {
    lines: ["Something in your business", "is taking too long."],
    // A phone is too narrow for that break, so it gets its own.
    linesPhone: ["Something in your", "business is taking", "too long."],
    under: "Tell me what it is. The first session is free.",
    typing: "One line is enough. The real conversation happens in the session.",
    cta: { before: "Book a ", stress: "free", after: " session" },
  },

  // The confession. "I still" is set apart and repeats above every line.
  still: "I still",
  confessions: [
    "build the same spreadsheet every Monday.",
    "open three systems to answer one question.",
    "find out I lost money a month after I lost it.",
    "guess what I sold last week.",
    "work Sunday to be ready for Monday.",
    "take the laptop on holiday.",
  ],
  payoff: {
    lines: [
      "It can be done quicker.",
      "It can be done cheaper.",
      "I still do it the hard way.",
    ],
    why: "Why?",
    because: "Because I never asked",
    name: "The Advisor",
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
    problemLabel: "Slow, broken, missing",
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
    confirmation: "Your session is booked. You will be contacted.",
    rally: "LET'S SOLVE THIS",
  },
} as const;
