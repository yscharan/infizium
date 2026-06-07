# Infizium — Project Status

**Current version:** v0.3.8
**Last updated:** 2026-06-07

---

## Live URLs

| Environment | URL | Status |
|---|---|---|
| Production | https://infizium.com | ✅ Live |
| Vercel preview | https://frontend-9mm2pn9zs-infizium.vercel.app | ✅ Live |
| GitHub | https://github.com/yscharan/infizium | ✅ |
| Backend (Railway) | Setup in progress | 🔜 |

---

## Pages live on infizium.com

| Route | Description |
|---|---|
| `/` | Landing — sci-fi cinematic, particle canvas, holographic rings |
| `/login` | Role selector — student / parent / teacher / admin |
| `/sponsor` | Sponsorship & Donation platform |
| `/whatsapp` | WhatsApp integration walkthrough |
| `/commute` | Travel Buddy showcase — cinematic narrative, 5 modes, hardware |
| `/dashboard/student` | Student dashboard |
| `/dashboard/student/progress` | Subjects, attendance bars, milestones, JEE Readiness |
| `/dashboard/student/commute` | My Plan, Find Buddy, Live Track, History, SOS |
| `/dashboard/parent` | Parent dashboard |
| `/dashboard/parent/permissions` | DPDP-compliant permission toggles |
| `/dashboard/parent/commute` | Live map, alerts, route progress, driver info |
| `/dashboard/teacher` | Teacher dashboard |
| `/dashboard/admin` | Admin dashboard |

---

## Backend status

| Module | Status |
|---|---|
| Express API | ✅ Built — users, attendance, homework, announcements, chat, WhatsApp |
| Supabase schema | ✅ Built — run `backend/src/db/schema.sql` to deploy |
| WhatsApp bridge | ✅ Built — `npm run whatsapp`, scan QR |
| Telegram AI bot | ✅ Built — `npm run telegram`, set `TELEGRAM_BOT_TOKEN` |
| MCP server | ✅ Built — `npm run mcp`, 7 tools over Supabase |
| AI handler | ✅ Built — Claude Haiku + tool-use, Telugu/English aware |
| GraphQL hooks | ✅ Built — Supabase pg_graphql queries for all dashboard data |
| Railway deploy | 🔜 Needs env vars set in Railway dashboard |

---

## What needs to happen to go fully live

| Task | Owner | Notes |
|---|---|---|
| Create Supabase project | Charan | Mumbai region, run schema.sql |
| Set backend `.env` | Charan | SUPABASE_URL, SERVICE_ROLE_KEY, ANTHROPIC_API_KEY, TELEGRAM_BOT_TOKEN |
| Enable pg_graphql on Supabase | Charan | `create extension if not exists pg_graphql;` |
| Set frontend `.env.local` | Charan | NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY |
| Deploy backend to Railway | Charan | Connect GitHub → root dir `backend` → add env vars |
| Create Telegram bot | Charan | @BotFather → /newbot → copy token |
| Get Anthropic API key | Charan | console.anthropic.com |
| WhatsApp Business API | Later | Production — when pilot school onboarded |

---

## Sprint history

| Sprint | Goal | Status | Version |
|---|---|---|---|
| Sprint 1 | UI Foundations — landing, login, dashboards | ✅ Done | v0.2.0 – v0.3.0 |
| Sprint 2a | Sci-fi redesign, sponsorship, deep-links | ✅ Done | v0.3.5 – v0.3.7 |
| Sprint 2b | Commute ecosystem + backend + AI bot | ✅ Done | v0.3.8 |
| Sprint 3 | Connect frontend to real Supabase data | 🔜 Next | v0.4.0 |
| Sprint 4 | Auth (Cognito/Supabase Auth), real login | ⬜ Backlog | v0.5.0 |
| Sprint 5 | Pilot school onboarding — real data | ⬜ Backlog | v0.6.0 |
| Sprint 6 | WhatsApp Business API (production) | ⬜ Backlog | v0.7.0 |
| Sprint 7 | AI tutor — Bedrock / Hugging Face Telugu | ⬜ Backlog | v1.0.0 |

---

## Tech stack in use

| Layer | Technology | Status |
|---|---|---|
| Frontend | Next.js 16.2.7, Tailwind v4, Framer Motion v12 | ✅ Live |
| Hosting | Vercel + infizium.com | ✅ Live |
| Database | Supabase (PostgreSQL) — Mumbai region | 🔜 Setup |
| API | Express + Node.js, GraphQL (pg_graphql) | ✅ Built |
| Auth | Supabase Auth (→ Cognito in production) | 🔜 Next sprint |
| AI bot | Claude Haiku via Anthropic API + MCP | ✅ Built |
| WhatsApp (test) | whatsapp-web.js + Telegram bot | ✅ Built |
| WhatsApp (prod) | Meta WhatsApp Business API | ⬜ Later |
| MCP server | @modelcontextprotocol/sdk, 7 tools | ✅ Built |
