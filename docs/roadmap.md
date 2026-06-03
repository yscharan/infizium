# Roadmap

## Phase 0 — Foundation (Months 1–2)
**Goal:** Core infrastructure and one working school end-to-end.

- [ ] Monorepo structure (frontend, backend, infrastructure)
- [ ] AWS Amplify hosting for Next.js frontend
- [ ] Cognito user pools per role (student, parent, teacher, admin)
- [ ] Aurora PostgreSQL Serverless v2 cluster + RDS Proxy
- [ ] API Gateway + Lambda scaffold
- [ ] WhatsApp Business API account and test number (Meta Cloud API)
- [ ] CI/CD pipeline (GitHub Actions → Amplify + Lambda)
- [ ] Environments: dev, staging, production
- [ ] Onboard one pilot school manually

**Exit Criteria:** A teacher marks attendance and a parent receives a WhatsApp alert within 60 seconds.

---

## Phase 1 — MVP (Months 3–5)
**Goal:** Enough for a pilot school to replace their current paper and WhatsApp workflows.

**Profiles and Auth**
- [ ] School admin onboarding flow
- [ ] Bulk student import (CSV)
- [ ] Parent WhatsApp number collection and OTP verification
- [ ] Teacher account creation

**Attendance**
- [ ] Teacher attendance marking UI (mobile-optimised)
- [ ] Absent student WhatsApp alert to parent
- [ ] Inbound WhatsApp response handling (reason for absence)
- [ ] Admin attendance dashboard

**Homework and Announcements**
- [ ] Teacher homework creation with due date
- [ ] Student homework feed
- [ ] Parent WhatsApp notification on new homework
- [ ] Announcement broadcast (school / class / section)
- [ ] WhatsApp delivery with history in app

**Forms and Approvals**
- [ ] Admin form builder (basic fields)
- [ ] WhatsApp approval request to parents
- [ ] Approval status tracking and admin view
- [ ] Consent audit log (DPDP)

**Exit Criteria:** A pilot school runs one full academic month entirely on Infizium with no manual workarounds.

---

## Phase 2 — Pilot Expansion (Months 6–8)
**Goal:** Onboard 3–5 schools. Gather feedback. Fix what is broken.

- [ ] Telugu language support in WhatsApp messages
- [ ] Attendance analytics — weekly and monthly summaries for parents
- [ ] Configurable absence escalation alerts (3 consecutive absences)
- [ ] Sibling management in parent accounts
- [ ] File attachments for homework
- [ ] Mobile-responsive UI improvements based on pilot feedback
- [ ] Admin-level reporting for board presentations

**Exit Criteria:** 5 schools onboarded with less than 2 hours of manual setup each.

---

## Phase 3 — AI Layer (Months 9–12)
**Goal:** Introduce AI-powered features that create differentiated value.

- [ ] AI Tutor (Bedrock) — conversational Q&A scoped to curriculum
- [ ] AI-assisted grading drafts for teachers to review
- [ ] Essay feedback for written assignments
- [ ] Practice question generation by topic and difficulty
- [ ] Student progress analytics with early-warning flags for teachers
- [ ] Fee reminders via WhatsApp (no payment collection yet)
- [ ] Self-serve school onboarding flow

**Exit Criteria:** 70% of students in pilot schools use the AI tutor at least once per week.

---

## Phase 4 — Scale (Year 2)
**Goal:** Multi-school operations, online payments, and reduced AWS cost per school.

- [ ] Razorpay / UPI online fee payment with WhatsApp receipts
- [ ] Multi-school admin (trust/group level dashboard)
- [ ] Offline-capable PWA for low-connectivity areas
- [ ] DigiLocker integration for certificate storage
- [ ] DPDP compliance audit and external review
- [ ] Regional language expansion (Hindi, Tamil, Kannada)

---

## Principles That Guide Prioritization
1. **Parent trust before feature breadth** — if a parent cannot understand or control it, it does not ship.
2. **WhatsApp over new surfaces** — every feature should work for a parent who will never open the web app.
3. **AWS cost per school must fall as we scale** — serverless-first, no always-on compute unless justified.
4. **Pilot school feedback overrides roadmap** — what the pilot school struggles with moves up.
5. **Keep MVP small** — wallet, loans, marketplace, carpool, and fitness are not in any current phase.
