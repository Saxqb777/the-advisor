# The Advisor — handoff

Everything another model or developer needs to pick this up. Read all of it
before changing anything.

---

## 1. The business

A product analyst based in Abu Dhabi runs this as side work. Small and mid
sized companies tell him what is slow or painful in their day. He listens,
then builds the software or the website that fixes it.

**How an engagement actually runs:**

1. Free 45 minute call, no charge, no obligation
2. A short written diagnosis: what is slow, why, what a fix would look like
3. A call within six hours of sending the diagnosis, to talk it through
4. Paid discovery and spec if the client wants to go ahead
5. Build, 50 percent up front
6. One month free pilot with real users and a fixed end date
7. Client either buys it outright or pays monthly for hosting, support and
   changes

**Steps 4 to 7 are deliberately NOT on the website.** No prices, no
percentages, no monthly, no "paid". Money gets discussed on the call. The
only money word anywhere on the site is **free**, and it is doing sales work.

Business name: **The Advisor**. Phone: **0545388662**. The place name is
deliberately not on the site.

---

## 2. What the site is for

One page. One action: **book a free session**.

A visitor arrives already carrying a problem. The page names their problem
back to them, kills it in front of them, then asks for a way to reach them.

**Deliberately absent:** portfolio, case studies, testimonials, client
names, logos, an about section, pricing, a blog, a nav bar, any second
route.

The pitch for the absent portfolio is stated on the page itself: "I do not
show my work. I talk it."

**The booking flow:**

- One optional sentence about what is slow
- Phone or email, they choose
- If phone: their number, then WhatsApp or a call
- Optional name
- Everything optional except the contact value itself

---

## 3. Hard rules

These came from the owner. They are not preferences, they are constraints.
Breaking them is the main way to get this wrong.

### The copy rule (most important)

**Do not write copy on your own.** Not headlines, not paragraphs, not
button labels, not the footer.

For every piece of text, ask the owner first, offer two or three directions,
and wait. Use his words. You may tighten grammar. You may not invent claims,
features, numbers, testimonials or client names.

If what he gives you is clumsy, say so and offer a cleaner version that
still means exactly what he meant.

Until real copy exists, use an obvious placeholder like `[HERO LINE TBD]` so
the layout is visible without fake text sitting in it.

### Tone

Plain, direct, human. Like talking to one business owner across a table.

- **Banned words:** transform, empower, unlock, leverage, seamless, cutting
  edge, revolutionise, elevate, "in today's fast paced world", anything that
  reads like a startup landing page template.
- No exclamation marks.
- **No em dashes and no hyphens in the copy.** Colons are fine.
- Short sentences. If a sentence can lose three words, lose them.

### Design

- Single page plus anchors. No other routes.
- Mobile first. It has to be excellent on a phone.
- A real type scale. Not everything at one size.
- Generous whitespace.
- One restrained palette. Mostly neutral, a single accent.
- Motion is subtle. Small fades and reveals. Nothing bounces or slides.
- No stock photos, no 3D blobs, no gradient mesh, no glassmorphism, no emoji
  icons.
- No hero that looks like every AI SaaS site.

Added by the owner during the build:

- **No cards, no pills, no badges, no rounded boxes, no icon circles.**
- **No icons at all.**
- Square corners.
- Space and hairline rules do all the dividing.
- Nothing moves on hover without a reason. No parallax, tilt, glow, blur
  panels, or counters ticking up.

### Working method

- One step at a time. Say what you are about to do and wait for a go ahead.
- Never make a big change or a refactor without confirming first.
- Do not add sections, pages or features that were not asked for.
- Less, done well, beats more.

---

## 4. The page, top to bottom

| Section | Component | What it does |
| --- | --- | --- |
| Header | `Site.tsx` | Just the wordmark, small and grey |
| Landing | `Hero.tsx` | Headline, the open writing line, the button, and the cycling confession beside it |
| Payoff | `Payoff.tsx` | Quicker, cheaper, I still do it the hard way. Why. Because I never asked The Advisor |
| The read | `Read.tsx` | Three blocks that light up word by word as you scroll |
| The path | `Path.tsx` | Four steps with a hairline that fills as you scroll |
| The form | `Booking.tsx` | Contact details, then the confirmation |
| Footer | `Site.tsx` | Wordmark and a tappable number |

### The landing

The headline states the trade plainly: "You have something slow. I build the
thing that fixes it."

Under it is a **blank line with a cursor**. No label, no placeholder text, no
dropdown, no list of suggestions. Just a rule, a blinking accent caret, and a
short accent mark at the start of the rule. They type their own sentence in
their own words. The moment they start typing, a quiet line appears telling
them one line is enough.

Whatever they type is held in state and is already in the form when they
reach it, so they never write it twice.

Beside it, under its own hairline, sits **one confession at a time**: "I
still build the same spreadsheet every Monday." It holds, a red rule draws
straight through it, it dies, and the next one takes its place. Six of them,
looping.

### Why the confession exists

It is the pitch. The visitor watches their own week get crossed out before
they have scrolled or decided anything. The payoff section then completes the
thought and ends on the name in red, as the reason it has not happened yet.

---

## 5. Stack

- **Next.js 15**, App Router, TypeScript
- **Tailwind CSS v4**, CSS first config (`@theme` inside `app/globals.css`,
  no `tailwind.config.ts`)
- **No animation library.** Framer Motion was considered and rejected. Every
  effect is CSS plus about sixty lines of plain JavaScript.
- **No UI kit, no icon library, no component library.**
- Fonts through `next/font/google`: Instrument Serif for display, Instrument
  Sans for text.

Runtime dependencies are `next`, `react`, `react-dom`. Nothing else. First
load is around 108 kB.

Keep it this way. Dependency light was an explicit requirement.

### Files

```
app/
  layout.tsx           fonts, metadata, the grain overlay
  page.tsx             server entry, renders <Site />
  globals.css          design tokens and every motion primitive
  api/session/route.ts the booking endpoint
components/
  Site.tsx             page shell, holds shared state, header and footer
  Hero.tsx             landing screen and the writing line
  Confessions.tsx      the cycling struck out line
  Payoff.tsx           the turn, ending on the name in red
  Read.tsx             three blocks with the reading highlight
  Path.tsx             four steps and the filling hairline
  Booking.tsx          the form, the fold away, the confirmation
  Reveal.tsx           adds "is-in" the first time something scrolls into view
  Words.tsx            splits copy into indexed words for the highlight
  Letters.tsx          splits a string into per letter masks
lib/
  copy.ts              EVERY WORD ON THE SITE
  hooks.ts             useInView and useScrollProgress
```

### `lib/copy.ts` is the single source of text

Nothing is written anywhere else. A wording change is a one file change,
and the owner can edit it without touching layout. Keep it that way. If you
add text to the site, it goes in `copy.ts` first.

Anything in `[BRACKETS]` is a placeholder waiting on the owner's words.

---

## 6. Design system

### Tokens, in `app/globals.css` under `@theme`

| Token | Value | Used for |
| --- | --- | --- |
| `--color-paper` | `#efebe2` | Background. Bone, not white |
| `--color-ink` | `#17150f` | Text. Warm near black, not pure black |
| `--color-ink-60/40/20` | ink at 60 / 40 / 20 percent | Secondary text, labels, hints |
| `--color-rule` | ink at 16 percent | Every hairline |
| `--color-accent` | `#be3a1d` | Printer's red. Deliberately not a SaaS blue |
| `--font-display` | Instrument Serif | Headlines, confessions, path steps, form inputs |
| `--font-sans` | Instrument Sans | Body, labels, buttons |
| `--text-label` | 11px, 0.14em tracking | The small uppercase labels |

The accent appears in a small number of places on purpose: the caret and
start mark on the writing line, the rule under an active field, the strike
through a confession, the name in the payoff, the underline under the word
"free" in the button, the marked first step once a session is booked, and
the text selection colour. Do not spread it further.

### Type

Everything is fluid with `clamp()`. There is no fixed breakpoint scale.
Headline runs from 1.875rem on a phone to 5rem on a wide screen. The serif
carries the weight, the sans carries the reading.

The headline has **two different line break sets**, `lines` and `linesPhone`
in `copy.ts`, because one break cannot serve both widths without leaving
orphan words. If you change the headline text, check both.

---

## 7. How each effect works

All of it lives in `app/globals.css` with a matching class. Every one has a
`prefers-reduced-motion` fallback at the bottom of that file.

| Class | Effect |
| --- | --- |
| `.line-mask` | A line rises from behind a clean edge. Used for the headline and, with `.inline`, per letter for LET'S SOLVE THIS |
| `.rise` | Small fade and lift. The general purpose reveal |
| `.draw-rule` | A hairline draws itself across the width. **Must sit inside something carrying `is-in`** |
| `.read-block .w` | The reading highlight |
| `.path-track` / `.path-fill` | The hairline beside the path steps, filling on scroll |
| `.caret` | The blinking cursor on the empty writing line |
| `.confession` | The red strike through |
| `.grain` | Fixed film grain over the whole page at 5.5 percent, multiply blend. This is what stops it looking flat and templated |

### The reading highlight

Words sit at 16 percent opacity and go to full ink as the block crosses the
middle of the screen. The whole thing is driven by **one CSS custom property
per block per frame**. `useScrollProgress` writes `--reveal` from 0 to 1;
each word carries its own `--i` index and the block length `--n`, and the
opacity is computed in CSS:

```css
opacity: clamp(0.16, calc(var(--reveal) * var(--n) - var(--i) + 0.4), 1);
```

No per word JavaScript writes. It costs almost nothing.

### The strike through

Not `text-decoration`, which cannot be animated. It is a `linear-gradient`
background sized from `0%` to `100%` with `box-decoration-break: clone`, so
a line that wraps onto two rows gets struck on **both** rows.

When a line dies, only the words fade. The red rule stays at full strength,
so the page reads as a list of things crossed off rather than a list of
things faded out.

### The cycling confession

`components/Confessions.tsx`. Three timers per line:

- `READ` 2600ms, long enough to take it in
- `KILL` 1150ms, the rule draws through
- `CLEAR` 550ms, it gets out of the way, then the next index renders

Under reduced motion it does not cycle at all. It renders all six as a plain
static list.

**This is the only thing on the site that moves without being asked.** The
owner approved it knowingly as an exception to his own rule, because it is
the pitch and it has to land before anyone scrolls. Do not take it as
permission to add more self starting motion anywhere else.

### The booking moment

On submit the form does not vanish. It **folds** away using a
`grid-rows-[1fr]` to `grid-rows-[0fr]` transition, the confirmation rises in
its place, LET'S SOLVE THIS arrives in accent one letter at a time, a rule
draws under it, and the first step of the path above gets marked with an
accent segment on its hairline. The page scrolls the moment into view.

The step is marked with a rule, not a tick, not a circle, not an icon.

---

## 8. Lead delivery

`POST /api/session` with `{ problem, channel, contact, preference, name }`.

- All fields are length capped server side. Only `contact` is required.
- Email goes out through **Resend**, called with plain `fetch`. No SDK.
- For an email lead, `reply_to` is set to the visitor's address.
- **If `RESEND_API_KEY` or `LEAD_EMAIL` is missing the site still works.**
  The request is written to the server log and the endpoint returns ok, so a
  booking is never lost just because email is not configured yet.

Environment variables, see `.env.example`:

```
RESEND_API_KEY=
LEAD_EMAIL=
LEAD_FROM="The Advisor <onboarding@resend.dev>"
```

`LEAD_FROM` needs a domain verified with Resend before it can be changed.

There is **no admin page and no database**. That was a deliberate decision:
email now, a real tracker later only if the owner asks for one.

---

## 9. Deploy

- Repo: `Saxqb777/the-advisor`. **It is public.**
- Default branch is `claude/service-business-website-ytroys`, so Vercel
  treats that branch as production and every push goes live.
- Import the repo at vercel.com/new. Next.js is detected. Change nothing.
- Without the two environment variables, bookings land in the Vercel runtime
  log under Project, then Logs.

---

## 10. Working on it

```bash
npm install
npm run dev            # local
npm run build          # must stay clean
npx tsc --noEmit       # must stay clean
```

**How this was verified, and how you should verify changes.** Do not trust
the code by reading it. Build for production, serve it, and drive it with
headless Chromium:

- Screenshot at **390px** and **1440px**
- Assert `document.documentElement.scrollWidth - window.innerWidth === 0`,
  there must be no sideways scroll at any width
- Scroll the page in small steps so every reveal actually fires, rather than
  jumping to an offset
- Run the whole booking round trip and confirm the lead payload

Several real bugs were only caught this way: a focus outline drawing a box
around the writing line, hairlines that never drew because they sat outside
their reveal wrapper, an empty grid gutter eating a row on mobile, and the
headline breaking into orphan words on a phone.

---

## 11. Still open

- The **one month free pilot** line was dropped from the path during editing
  and never restored. The owner knows. It is his call.
- The **error microcopy** ("Add a number so I can reach you.") is not the
  owner's words. It is functional text written during the build and flagged
  to him. Replace it with his wording when he gives it.
- The footer carries only the wordmark and the number.

---

## 12. Rejected. Do not propose these again

Each of these was raised, considered, and turned down for a reason.

| Idea | Why it was killed |
| --- | --- |
| A scannable list of common problems near the top | It turns the page into a menu. The problem has to stay "in the air" until the visitor names it themselves |
| The six confessions as a long scroll section | It was built, then deleted. The same six lines in the hero and again below made the page repeat itself and killed the punch |
| Anything about money on the site | Prices, percentages, monthly, "paid discovery". Money is a conversation, not a web page |
| An about me section | Explicitly cut |
| The place name anywhere on the page | Explicitly cut |
| A calendar or time slot picker | The owner sets the time himself after making contact |
| Confirmation lines that change per channel | Built, then replaced with one general line in the owner's words |
| Counters, parallax, tilt, glow, blur panels, hover motion for its own sake | Against the design rules |
| An admin page in this build | Deferred. Email first, and only build a tracker if he asks |

---

## 13. One page summary for a new model

You are maintaining a single page site for a one man consultancy called The
Advisor. It sells a free 45 minute call. It looks like an expensive printed
document, not a SaaS landing page: bone paper, warm near black text, one
printer's red accent, a high contrast serif for display, hairlines and space
instead of boxes, film grain over everything, and no icons at all.

Its one idea is that the visitor arrives with something slow, watches that
problem get struck out in red in front of them, and is asked for nothing but
a way to be reached.

Every word belongs to the owner. Ask before you write any of it.
