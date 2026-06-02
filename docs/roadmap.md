# Roadmap

## Phase 0 — Foundation (Now)
Set up the project skeleton so the team can build without blocking each other.

- [ ] Monorepo structure (frontend, backend, infrastructure)
- [ ] Amplify hosting for Next.js frontend
- [ ] Cognito user pools for each role (student, parent, teacher, admin)
- [ ] Aurora PostgreSQL Serverless v2 cluster
- [ ] API Gateway + Lambda scaffold
- [ ] WhatsApp Business API account and test number
- [ ] CI/CD pipeline (GitHub Actions → Amplify + Lambda)
- [ ] Environments: dev, staging, production

---

## Phase 1 — MVP (Target: 8 weeks)
One school, real users, all core workflows functioning.

**Week 1–2: Profiles**
- School admin onboarding flow
- Bulk student import (CSV)
- Parent WhatsApp number collection and verification
- Teacher account creation

**Week 3–4: Attendance**
- Teacher attendance marking UI (mobile-optimised)
- Absent student detection and WhatsApp alert to parent
- Inbound WhatsApp response handling (reason for absence)
- Admin attendance dashboard

**Week 5–6: Homework and Announcements**
- Teacher homework creation
- Student homework feed
- Parent WhatsApp notification on new homework
- Admin and teacher announcement broadcast
- WhatsApp delivery to parents

**Week 7–8: Forms and Approvals**
- Admin form builder (basic fields)
- WhatsApp approval request to parents
- Approval status tracking and admin view
- End-to-end QA with pilot school

---

## Phase 2 — Pilot Expansion (After MVP)
Onboard 3–5 schools. Gather feedback. Fix what is broken.

- Telugu language support in WhatsApp messages
- Attendance analytics (weekly and monthly summaries for parents)
- Homework submission tracking improvements
- Basic student and parent mobile experience improvements
- Admin-level reporting

---

## Phase 3 — AI Tutor (Later)
Introduce Bedrock-powered learning assistance.

- AI tutor accessible to students via the app
- Subject and grade-aware responses
- Parent visibility into AI tutor usage
- Usage guardrails (time limits, content filtering)

---

## What We Are Explicitly Not Building
- Wallet or fee payment (explore in Phase 4 at earliest)
- Marketplace, carpool, loans, fitness — not in any current phase
- Anything requiring a native iOS or Android app in Phase 1 (PWA is sufficient)
