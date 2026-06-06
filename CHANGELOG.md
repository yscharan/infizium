# Changelog

All notable changes to Infizium are documented here.
Format: [Semantic Versioning](https://semver.org) — `MAJOR.MINOR.PATCH`

- **MAJOR** — breaking change or platform pivot
- **MINOR** — new feature or sprint completion
- **PATCH** — bug fix, copy change, or minor UI tweak

---

## [0.3.0] — 2026-06-06

### Sprint 1 — UI Foundations complete

**Added**
- Framer Motion animations: floating orbs, scroll-triggered reveals, stagger effects on all pages
- Persona-matched dashboard designs:
  - Student: dark mode, weekly streak tracker, homework progress, motivational quote
  - Parent: warm amber tones, "child is safe" status card, WhatsApp hint strip
  - Teacher: class schedule timeline, attendance marking UI, homework submission bars
  - Admin: dark command center, animated live attendance bars, broadcast tracking
- `APP_VERSION` constant in `frontend/src/lib/version.ts`
- Version displayed in landing page footer
- Root `.gitignore`
- GitHub repo: `yscharan/infizium`
- Vercel deployment: `frontend-infizium.vercel.app`
- Custom domain wired: `infizium.com` (DNS propagating via Vercel nameservers)

**Changed**
- Landing page hero: gradient text, animated background orbs, stats bar, dark modules section
- Login page: glassmorphism card, animated role selector, button appears only on role selection
- `globals.css`: custom scrollbar, CSS keyframes for orb animations, glass/glass-dark utilities, gradient-text

**Infrastructure**
- GitHub CLI authenticated as `yscharan`
- Vercel CLI v54.9.1 installed and authenticated
- Auto-deploy on push to `master` branch connected

---

## [0.2.0] — 2026-06-05

### Initial frontend scaffold

**Added**
- Next.js 16 app in `frontend/` with Tailwind CSS v4 and Geist font
- Landing page: hero, persona cards (4 roles), MVP modules section, WhatsApp callout, CTA, footer
- Login page: role selector (parent / teacher / student / admin), name + WhatsApp fields, demo bypass
- Dashboard pages: `/dashboard/parent`, `/dashboard/teacher`, `/dashboard/student`, `/dashboard/admin`
- All dashboards populated with realistic dummy data matching persona stories

---

## [0.1.0] — 2026-05-30

### Documentation baseline

**Added**
- `docs/vision.md` — mission, principles, out-of-scope guardrails
- `docs/personas.md` — Lakshmi (parent), Ravi (teacher), Arjun (student), Priya (admin)
- `docs/modules.md` — MVP feature list with acceptance criteria
- `docs/roadmap.md` — Phase 0–4 with exit criteria per phase
- `docs/architecture.md` — AWS stack diagram, data model, environment table, security notes
- `CLAUDE.md` — project instructions for AI assistant
- Monorepo structure: `frontend/`, `backend/`, `infrastructure/`, `docs/`, `decisions/`
