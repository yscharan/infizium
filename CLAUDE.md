# CLAUDE.md — Infizium Project Context

> This file is the bridge between mobile ideation (claude.ai) and laptop execution (Claude CLI).
> Every session on CLI starts here. Read this fully before touching any code.

---

## What is Infizium?

Infizium is a **school management platform** — but that description undersells it.

It is a product born from a real story: a man who ran a school for thirty years holding everything in his head — every fee, every meal, every student, every repair, every salary, every parent conversation — on memory, trust, and will alone. He made it work. Infizium is built so the next generation of school builders don't have to.

**The soul of this product is the origin story. Every design decision, every word in the UI, every feature priority flows from that.**

---

## The Origin — Bapu (Yadagiri Shekhar Rao)

- Born in **Kalamadugu, Jannaram Mandal, Adilabad district** — remote, mostly forest
- First person in his entire family to pursue education
- Funded his schooling by trading curry leaves, eggs, and vegetables — bought a bicycle to reach a school 20km away
- First salary as a government school teacher: **₹100**
- In **1991**, started a residential school in a rented bungalow — one man, every subject, one roof, his family in a single room beside the classrooms
- Built entirely on **direct parent trust** — no marketing, no rank promotion, village-to-village meetings every summer
- Ran the school for **30+ years** through financial crises, COVID, government scholarship delays — never closed, never let a child go
- His students are now doctors, engineers, soldiers, teachers, software professionals across the world

**This is where Infizium comes from. The product is what Bapu needed and never had.**

---

## Mission

**Prepare students for life, not just exams.**

---

## Who Infizium Serves — 4 Stakeholders

### 🎓 Teacher
**Core pressure: syllabus must be completed. Everything else competes with that.**

Features to build:
- Syllabus tracking & subject organisation — know where you are, what's left, pace status
- Daily class planning & scheduling
- Substitution logic when staff is absent
- Underperformer alerts — surface which students need special focus before the teacher discovers it themselves
- Weekly/monthly quiz planning — auto-suggested based on topics covered in the previous week
- Student help request queue — teacher reviews and responds when free, personal without being always-on

---

### 🎒 Student
**Core anxiety: missing one day means losing the thread — and nobody hands it back.**

Features to build:
- Missed day recovery — absent student sees exactly which topics were covered, what homework was assigned, what to catch up
- Weekly revision guide — which topics to go back over, based on what was taught and how the student performed
- Test prep visibility — before weekly/monthly tests, student sees exactly which topics to study drawn from actual syllabus covered
- Personal help requests — raise a flag when stuck on a topic, teacher picks it up and responds personally. No public embarrassment, no waiting for the right classroom moment

---

### 👨‍👩‍👧 Parent
**Core need: to know their child is okay, learning, and that the school sees their child as a person — not a number.**

Features to build:
- Performance updates — not just marks, week-to-week progress and where the child needs support
- Fees visibility — current balance, upcoming dues, payment history without calling the office
- PTA meeting notifications — scheduled in advance with topic context
- Direct teacher feedback — actual classroom observations, not report card language
- Attendance updates — was my child present today
- Field trip tracking — real-time status when the class is off-campus

---

### 🏫 School Management
**Core burden: the widest operational load of any stakeholder — and the least system support. This is where Infizium does its deepest work.**

Features to build:
- **Daily checklist system** — every recurring task surfaces at the right time, checked off, tracked. Management should not have to reconstruct their day from memory every morning
- **Fees tracking & outstanding amounts** — who paid, who hasn't, pending totals, which families need a conversation vs a notice
- **Teacher salary tracking** — what's owed, what's paid, gap before next cycle
- **Bill entry via image capture** — photograph a bill, system reads and logs it. No manual entry, no pile of receipts
- **Food & grocery inventory** — stocked, running low, what to order before the week starts
- **Repairs & pending works** — raised, tracked, assigned, followed up
- **Staff attendance & leave** — who's in, who's absent, substitution trigger before first bell
- **Student health tracking** — reported issues for students and staff, individual history
- **Stationery inventory** — chalk, notebooks, supplies — alerted before runout
- **Bus tracking** — live location, who's on it, on-time status
- **Parent pickup tracking** — who collected their child, who hasn't, wait time
- **Notification engine** — right person, right time, without management having to remember to tell them

---

## Tech Stack

- **Frontend**: Next.js (App Router) on Vercel — `infizium.com`
- **Styling**: Tailwind CSS v4, Framer Motion
- **Design system**: Vercel/Wellfound aesthetic — pure black `#000`, flat cards `#0a0a0a`, 1px `#222` borders, no neon, no glassmorphism, no gradients
- **Typography**: Geist (headline + body), Courier Prime (typewriter/pull-quote accent)
- **Database**: Supabase (PostgreSQL) — project `pimrdtnzvfcrxinwcyot`, Singapore region
- **Auth**: Supabase Auth (→ Cognito in production)
- **AI**: Claude Haiku via Anthropic API + MCP server (7 tools over Supabase data)
- **Notifications**: Telegram bot (@InfiziumBot) for testing; WhatsApp Business API for production
- **Tools in use**: Claude CLI (primary executor), claude.ai mobile (ideation + context bridge)

### Color tokens (current)
- `#000000` — base background
- `#0a0a0a` — card background
- `#222222` — card border
- `rgba(255,255,255,0.4–0.6)` — body text
- `#f59e0b` — amber accent (Bapu section only)
- `#10b981` — green (live/active status)
- `#f97316` — orange (warnings)

---

## Principles

- WhatsApp-first parent communication — meet parents where they already are
- Parent-controlled permissions — parents approve actions, not the school on their behalf
- AI-assisted learning — Anthropic Claude (Haiku for speed, Sonnet for depth)
- School-first workflows — built around how Telangana schools actually operate
- **Security is above all other priorities** — never skip checks, never bypass hooks, never commit secrets
- Low operating cost — serverless wherever possible, no idle compute

---

## MVP Scope

- Student, parent, teacher, and school admin profiles
- Attendance tracking
- Homework assignments
- School announcements
- WhatsApp notifications via API
- Forms and parent approval flows

## Out of Scope (Do Not Build Yet)

Wallet, loans, marketplace, carpool, fitness tracker, advanced analytics, or any module not listed in the MVP.

---

## Workflow — Mobile to MacBook

Claude CLI (laptop) and claude.ai (mobile) do not share session memory.

**This CLAUDE.md is the bridge.**

- Ideas, references, feedback, and direction come in via **claude.ai mobile**
- Execution — code, file creation, project building — happens via **Claude CLI on MacBook**
- When something is decided on mobile, it gets added to this file so CLI knows about it
- Paste-ready prompt blocks are the secondary delivery method when CLAUDE.md hasn't been updated yet

**If you are a CLI session reading this:** treat this file as your full briefing. Do not ask for context that is already here. Start building from where the project is.

---

## Prompt Code Vocabulary

These are active across all sessions. Honour them without asking.

| Code | Meaning |
|------|---------|
| `/beastmode` | Maximum output, no hedging, full execution |
| `/brutal` | Honest critique, no softening |
| `/nopreamble` | Skip all intros, get straight to output |
| `/redteam` | Find every hole in the plan |
| `/ghost` | Silent execution, no commentary |
| `/strategysession` | Big picture thinking, full exploration |
| `/fullstress` | Stress-test the entire system |

---

## Founding Sentence

> "The system Bapu never had — built so every school builder after him doesn't have to carry it alone."

---

## Key Reference Files

| File | Purpose |
|------|---------|
| `docs/vision.md` | Full vision, personas, north star metric |
| `docs/modules.md` | All feature modules in detail |
| `docs/personas.md` | Lakshmi, Ravi, Arjun, Priya — full persona profiles |
| `docs/roadmap.md` | Sprint plan, versioning |
| `CLAUDE.md` (this file) | Context bridge — read first, every session |

---

*Last updated: 2026-06-15 — synced from claude.ai mobile ideation session*
