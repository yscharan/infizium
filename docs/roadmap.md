# Roadmap

_Last updated: 2026-06-07 · Current version: v0.3.8_

---

## Where We Are Right Now

Infizium is live at **infizium.com** as a full demo experience. The frontend is complete and deployed. The backend is built and ready to connect to a real Supabase database. The AI-powered WhatsApp/Telegram bot is built. The MCP server is built. Everything is waiting on one thing: a real pilot school.

**Built and live (v0.3.8):**
- 13 frontend pages on infizium.com
- Express API (users, attendance, homework, announcements, chat)
- Supabase PostgreSQL schema — all core tables
- WhatsApp bridge (whatsapp-web.js) + Telegram AI bot for testing
- Claude Haiku AI handler — natural language Q&A over real school data
- MCP server — 7 tools, Claude Code can query live school data
- GraphQL layer — Supabase pg_graphql hooks for all dashboard pages

**Not yet live:**
- Real Supabase project (schema not deployed yet — needs Charan to run schema.sql)
- Real Anthropic API key in .env
- Telegram bot token in .env
- Railway backend deployment (config ready, env vars needed)
- Frontend connected to real data (still on mock/static data)
- Any real school using it

---

## Phase 0 — Foundation ✅ (Months 1–2)
**Status: Complete as of v0.3.8**

- [x] Monorepo structure — `frontend/`, `backend/`, `infrastructure/`, `docs/`, `decisions/`
- [x] Next.js 16 frontend on Vercel — infizium.com
- [x] Backend scaffold — Express + Node.js + TypeScript
- [x] Supabase schema designed and ready to deploy
- [x] WhatsApp integration built (whatsapp-web.js bridge)
- [x] Telegram bot for testing (free, no Meta approval)
- [x] AI handler — Claude Haiku + tool-use over Supabase
- [x] MCP server — Claude Code can query school data directly
- [x] GraphQL client — Supabase pg_graphql queries + React hooks
- [x] GitHub repo: yscharan/infizium (master branch)
- [x] CI via Vercel auto-deploy on push
- [x] `.mcp.json` — MCP server registered for Claude Code sessions

**Deferred to production (AWS):**
- [ ] Cognito user pools per role
- [ ] Aurora PostgreSQL Serverless v2
- [ ] API Gateway + Lambda handlers
- [ ] GitHub Actions CI/CD pipeline

**Exit Criteria:** ✅ A teacher marks attendance and a parent receives a WhatsApp/Telegram alert within 60 seconds (demo proven, real school next)

---

## Phase 1 — MVP with Real School (Months 3–5)
**Status: Backend ready. Needs real Supabase project + pilot school.**

### Infrastructure to complete
- [ ] Create Supabase project — Mumbai region (ap-south-1)
- [ ] Run `backend/src/db/schema.sql` to deploy all tables
- [ ] Set backend `.env` — SUPABASE_URL, SERVICE_ROLE_KEY, ANTHROPIC_API_KEY, TELEGRAM_BOT_TOKEN
- [ ] Set frontend `.env.local` — NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] Enable `pg_graphql` extension on Supabase
- [ ] Deploy backend to Railway (config already in `backend/railway.json`)
- [ ] Connect frontend dashboard pages to real GraphQL data (hooks already built)
- [ ] Supabase Auth — real login replacing demo bypass

### Profiles and onboarding
- [ ] School admin onboarding flow — name, district, WhatsApp number
- [ ] Bulk student import (CSV upload → parse → insert students + users)
- [ ] Parent WhatsApp number collection via teacher-sent link
- [ ] Teacher account creation by admin
- [ ] Parent OTP verification via WhatsApp

### Attendance (API built, UI needs real data)
- [x] Teacher bulk attendance marking API — `POST /api/attendance/bulk`
- [x] Attendance summary API — `GET /api/attendance/summary/:student_id`
- [ ] Wire teacher dashboard to real attendance API
- [ ] Absent student WhatsApp alert via AI handler (automatic on mark)
- [ ] Inbound WhatsApp response — parent replies reason, stored in DB
- [ ] Admin attendance dashboard with real class data

### Homework (API built)
- [x] Teacher homework creation API — `POST /api/homework`
- [x] Homework feed API — `GET /api/homework`
- [ ] Wire student/parent dashboards to real homework data
- [ ] Parent WhatsApp alert on new homework assignment

### Announcements (API built)
- [x] Announcement broadcast API with optional WhatsApp blast
- [ ] Admin creates announcement in dashboard, real WhatsApp send
- [ ] Delivery tracking per parent

### Forms and Approvals
- [ ] Form builder API (admin creates fields + approval requirement)
- [ ] Parent WhatsApp approval request (YES/NO reply)
- [ ] Approval status dashboard for admin
- [ ] Consent audit log per student (DPDP)

### AI bot — Telegram (built, needs env vars)
- [x] Natural language Q&A — parent asks anything, Claude answers using real data
- [x] Telugu/English language detection and response
- [x] `/register <phone>` to link Telegram account to Infizium user
- [x] Tool use loop — get_attendance, get_homework, get_announcements, get_student_summary
- [ ] Add TELEGRAM_BOT_TOKEN to .env and test with real school data

**Exit Criteria:** A pilot school runs one full academic month on Infizium. Teacher marks attendance in under 2 minutes. Parent receives alert within 60 seconds. Zero manual workarounds.

---

## Phase 2 — Pilot Expansion (Months 6–8)
**Goal:** 3–5 schools. Gather feedback. Fix what is broken. Add Telugu.**

### Language
- [ ] Telugu language support in WhatsApp/Telegram messages
- [ ] AI handler responds in Telugu when parent writes in Telugu (Claude already detects — needs Telugu prompt tuning)
- [ ] Hugging Face Telugu NLP models evaluated vs Bedrock for tutor (Phase 3 prep)

### Attendance enhancements
- [ ] Weekly attendance summaries to parents every Friday evening
- [ ] Configurable absence escalation — 3 consecutive absences triggers escalation message to parent and admin
- [ ] Monthly attendance reports for board compliance

### Parent experience
- [ ] Sibling management — one parent account, multiple children linked
- [ ] Parent-requested PTM slot booking via WhatsApp
- [ ] Academic narrative summaries — weekly "Arjun had a good week in Maths, struggled with English writing" via WhatsApp

### Commute ecosystem (built in v0.3.8, needs real data)
- [x] Commute showcase page — `/commute`
- [x] Student commute dashboard — `/dashboard/student/commute`
- [x] Parent live tracking view — `/dashboard/parent/commute`
- [x] CommuteMap animated SVG component
- [ ] Real GPS integration — school bus location via hardware or driver mobile
- [ ] Smart Band / Tag hardware prototype (Infizium wristband + bag tag)
- [ ] Geofence triggers — auto check-in at school gate
- [ ] SOS alert pipeline — band button → parent WhatsApp + admin dashboard ping

### Sponsorship platform (built in v0.3.6)
- [x] Sponsor browse page — `/sponsor`
- [x] 3 donation modes — school fees (direct to school), pocket money (parent-inaccessible), education loan
- [x] 3 interaction modes — anonymous, codename, direct
- [ ] Razorpay/UPI payment integration
- [ ] Donor-student real message thread (direct mode)
- [ ] School fee direct transfer flow — donor pays school, not parent
- [ ] Repayment tracking for education loans

### Admin
- [ ] Admin-level reporting for board presentations (attendance, form response rates, announcement reach)
- [ ] School settings — branding, WhatsApp number, working hours boundary

**Exit Criteria:** 5 schools onboarded with less than 2 hours of manual setup each.

---

## Phase 3 — AI Layer (Months 9–12)
**Goal:** Differentiated AI features that no competing school ERP has.**

### AI Tutor
- [ ] Conversational Q&A scoped to Telangana state curriculum (Classes 6–10)
- [ ] Powered by Amazon Bedrock (Claude or Titan) — OR Hugging Face Telugu model (evaluate both)
- [ ] Parent-controlled — can enable/disable per child from permissions dashboard
- [ ] Student asks question on app or WhatsApp; tutor answers with worked example
- [ ] Tutor is aware of student's weak subjects (from progress data) and adjusts depth
- [ ] Telugu language support — student can ask in Telugu
- [ ] Bedrock vs Hugging Face Telugu evaluation: cost, accuracy, latency

### AI-assisted teaching tools
- [ ] Practice question generation by topic, difficulty level, and student's weak areas
- [ ] Essay feedback drafts — teacher reviews and approves before sending to student
- [ ] Early warning flags — "Arjun's Maths score dropped 18% in 3 weeks" alert to teacher
- [ ] AI-generated weekly student narrative for parents (teacher approves)

### MCP server enhancements
- [ ] Additional tools: `get_class_performance`, `flag_at_risk_students`, `generate_report`
- [ ] Claude Code can use MCP to answer admin questions during development
- [ ] MCP server deployed to Lambda for production AI tutor use

### Self-serve onboarding
- [ ] School admin signs up, imports CSV, invites teachers — zero Infizium involvement
- [ ] WhatsApp number verification via Meta OTP

**Exit Criteria:** 70% of students in pilot schools use the AI tutor at least once per week.

---

## Phase 4 — Scale (Year 2)
**Goal:** Multi-school operations, payments, offline capability, AWS migration.**

### Payments
- [ ] Razorpay / UPI online fee payment with WhatsApp receipts
- [ ] Parent pays fee via WhatsApp link — no app install needed
- [ ] School receives payment directly — Infizium takes no cut in MVP payment flow
- [ ] Fee reminder automation — WhatsApp sequence at 7 days, 3 days, day-of

### Multi-school / trust level
- [ ] Trust/group admin dashboard — manage multiple schools under one login
- [ ] Consolidated attendance and performance across schools
- [ ] Centralised teacher management for trust-run school networks

### Infrastructure migration
- [ ] Migrate from Supabase → Aurora PostgreSQL Serverless v2 (AWS Mumbai)
- [ ] Migrate from Railway → API Gateway + Lambda (serverless)
- [ ] Migrate from Vercel → AWS Amplify (optional — Vercel may stay)
- [ ] Cognito user pools replacing Supabase Auth
- [ ] DataDog monitoring once multi-school traffic justifies it (previously evaluated and deferred)

### Offline and accessibility
- [ ] PWA with offline capability for low-connectivity areas
- [ ] Teacher can mark attendance offline; syncs when connection restored
- [ ] Low-bandwidth mode — text-only WhatsApp messages, no images

### Compliance and integrations
- [ ] DigiLocker integration — certificates and mark sheets stored on DigiLocker
- [ ] DPDP compliance audit with external reviewer
- [ ] Regional language expansion — Hindi, Tamil, Kannada after Telugu

---

## Phase 5 — Student Life Platform (Year 3+)
**Goal:** Expand beyond school operations into whole-student development.**

### Modules (all parent-controlled, school-endorsed)
- Fitness & Wellness — daily activity, PE integration, personalised health goals
- Nutrition & Food — healthy eating guidance, school canteen awareness
- Pocket Money — financial literacy, saving goals, parent-controlled allowances
- Daily Routine — morning/evening routine builder, habit tracker, study schedule
- Emotional Intelligence — mood tracking, stress management, guided exercises
- Organised Life — goal setting, task management, life planning
- Parent Guidance — family conversation prompts, parenting tips, shared goals
- Future Readiness — career exploration, life skills curriculum, real-world prep

### Design principle
Every module in Phase 5 requires:
1. Parent permission to activate per child
2. Age-appropriate content review
3. School endorsement before rollout to that school's students

---

## Principles That Guide Prioritization

1. **Parent trust before feature breadth** — if a parent cannot understand or control it, it does not ship.
2. **WhatsApp over new surfaces** — every feature should work for a parent who will never open the web app.
3. **Pilot school feedback overrides roadmap** — what the pilot school struggles with moves to the top.
4. **AWS cost per school must fall as we scale** — serverless-first, no always-on compute unless justified.
5. **Telugu first** — every AI feature must work in Telugu before it works in any other regional language.
6. **AI amplifies humans** — AI tutor answers questions; teachers still teach. AI flags risks; teachers still decide.
7. **Keep MVP small** — wallet, loans (beyond education loan sponsorship), marketplace, fitness in MVP is a trap.

---

## Technology Decisions Log

| Decision | Choice | Reason | Revisit when |
|---|---|---|---|
| Frontend hosting | Vercel | Fast deploy, preview URLs, free | Scale cost exceeds Amplify |
| Database (MVP) | Supabase | Free tier, pg_graphql, real-time, Mumbai region | 50 schools+ → Aurora |
| Database (prod) | Aurora PostgreSQL Serverless v2 | AWS-native, scales to zero, RDS Proxy | Already planned |
| Auth (MVP) | Supabase Auth | Bundled with Supabase | Phase 4 → Cognito |
| API (MVP) | Express + Railway | Fast iteration, cheap | Phase 4 → Lambda |
| GraphQL | Supabase pg_graphql | Zero resolver code, reflects schema | If complex mutations needed → Apollo |
| WhatsApp (test) | whatsapp-web.js | Free, instant, QR auth | Not for production |
| WhatsApp (prod) | Meta WhatsApp Cloud API | Official, reliable, templates | When pilot school onboarded |
| Bot testing | Telegram | Free bot API, same AI code, WhatsApp-like UX | Replace with WA in production |
| AI model | Claude Haiku | Fast, cheap (~₹200/month for 500 parents), tool-use | Upgrade to Sonnet for tutor |
| AI tutor (Phase 3) | Evaluate Bedrock vs Hugging Face Telugu | Telugu accuracy is critical | Phase 3 sprint start |
| Monitoring | CloudWatch (free) | Sufficient for MVP | DataDog at multi-school scale |
| MCP server | @modelcontextprotocol/sdk | Claude Code dev tool + AI tutor foundation | Already in use |
