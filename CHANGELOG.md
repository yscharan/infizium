# Changelog

All notable changes to Infizium are documented here.
Format: [Semantic Versioning](https://semver.org) — `MAJOR.MINOR.PATCH`

- **MAJOR** — breaking change or platform pivot
- **MINOR** — new feature or sprint completion
- **PATCH** — bug fix, copy change, or minor UI tweak

---

## [0.3.8] — 2026-06-07

### Commute ecosystem + backend + GraphQL + MCP + Telegram AI bot

**Frontend**
- `/commute` — Travel Buddy showcase: cinematic narrative, 5 commute modes (Bus/Car/Auto/Walk/Solo+Tag), hardware section (Smart Band + Tag), animated morning timeline 7:28–7:51 AM
- `/dashboard/student/commute` — My Plan, Find Buddy, Live Track, History tabs; SOS button with hold animation
- `/dashboard/parent/commute` — Live map, route progress bar, board/alight alerts, driver info + call, commute permissions (DPDP compliant)
- `CommuteMap` animated SVG component — 5 live routes with glowing moving dots, school pulsing marker, LIVE badge
- Travel Buddy "Live now" card added to landing page Student Life Platform section
- GraphQL client (`src/lib/gql/client.ts`) — Supabase pg_graphql endpoint
- GraphQL queries (`src/lib/gql/queries.ts`) — attendance, homework, announcements, students, conversations, messages
- GraphQL hooks (`src/lib/gql/hooks.ts`) — `useHomework`, `useAttendanceSummary`, `useMessages` etc.

**Backend (new — `backend/`)**
- Express API server on port 4000 — health, users, attendance (bulk), homework, announcements, chat, WhatsApp
- Supabase schema (`src/db/schema.sql`) — schools, users, students, attendance, homework, announcements, conversations, whatsapp_messages
- WhatsApp bridge (`src/whatsapp/client.ts`) — whatsapp-web.js, QR auth, inbound message routing
- AI handler (`src/whatsapp/ai-handler.ts`) — Claude Haiku + tool-use loop; natural language Q&A over Supabase data; Telugu/English aware
- Telegram bot (`src/telegram/bot.ts`) — full testing bot; `/register`, `/whoami`, AI-powered chat; mirrors WhatsApp flow exactly
- MCP server (`src/mcp/server.ts`) — 7 tools: `list_schools`, `get_students`, `get_attendance`, `get_student_summary`, `get_homework`, `get_announcements`, `send_whatsapp`
- `.mcp.json` at repo root — registers MCP server with Claude Code

**Infrastructure**
- Railway deploy config (`backend/railway.json`, `backend/Procfile`)
- `backend/.env.example` — SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY, TELEGRAM_BOT_TOKEN

---

## [0.3.7] — 2026-06-06

### Deep-links, WhatsApp demo, permissions, student progress, dashboard navs

**Added**
- `DashboardNav` component — reusable tab nav with active state, accent colour, light/dark theme
- `/whatsapp` — 5-step walkthrough, animated phone mockup, WhatsApp message types, DPDP compliance strip
- `/dashboard/parent/permissions` — toggle rows (spring animated), 3 permission sections, consent history, DPDP note
- `/dashboard/student/progress` — 6 subjects with trend arrows, weekly attendance bars, milestones, JEE Readiness Index, exam countdown
- All 4 dashboards updated — DashboardNav tabs added, AI greeting narration cards at top

---

## [0.3.6] — 2026-06-06

### Sponsorship & Donation platform

**Added**
- `SponsorChat` component — auto-cycling animated donor ↔ student chat loop
- `/sponsor` — 6 student cards (Hyderabad/Warangal/Nizamabad/Karimnagar/Khammam/Adilabad), filter tabs, donation panel (fees/pocket/loan), 3 interaction modes, confirmation flow
- Landing page sponsorship section with SponsorChat and donor privacy spectrum

---

## [0.3.5] — 2026-06-06

### Sci-fi cinematic UI redesign

**Added**
- `HeroCanvas` component — dense cyan/violet particle network, 90+ particles, radial glow halos, ResizeObserver responsive
- Holographic CSS rings (`holo-ring-a/b/c`) — rotateX + rotateZ orbital illusion
- `globals.css` — holo-spin keyframes, neon-pulse, scan-line, cyber-gradient-text, cyber-grid
- `useScramble` hook — text scramble animation
- Dark persona cards with inline neon borders
- Background: `#020818` deep navy throughout

**Changed**
- Landing page hero: full sci-fi cinematic redesign with HeroCanvas background

---

## [0.3.0] — 2026-06-06

### Sprint 1 — UI Foundations complete

**Added**
- Framer Motion animations on all pages
- Persona-matched dashboard designs (student/parent/teacher/admin)
- `APP_VERSION` constant in `frontend/src/lib/version.ts`
- GitHub repo: `yscharan/infizium`
- Vercel deployment + custom domain: `infizium.com`

---

## [0.2.0] — 2026-06-05

### Initial frontend scaffold

**Added**
- Next.js 16 app with Tailwind CSS v4 and Geist font
- Landing page, Login page, 4 dashboard pages with realistic dummy data

---

## [0.1.0] — 2026-05-30

### Documentation baseline

**Added**
- `docs/vision.md`, `docs/personas.md`, `docs/modules.md`, `docs/roadmap.md`, `docs/architecture.md`
- `CLAUDE.md` — project instructions
- Monorepo structure: `frontend/`, `backend/`, `infrastructure/`, `docs/`, `decisions/`
