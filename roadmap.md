# Roadmap

## Phase 0 — Foundation (Months 1–2)
**Goal:** Core infrastructure and one working school end-to-end.

- [ ] AWS Amplify project setup, Cognito auth (student / parent / teacher / admin roles)
- [ ] Aurora PostgreSQL schema: schools, users, students, classes
- [ ] WhatsApp Business API integration (Meta Cloud API)
- [ ] Basic attendance module — teacher marks, parent notified via WhatsApp
- [ ] Onboard one pilot school manually

**Exit Criteria:** A teacher can mark attendance and a parent receives a WhatsApp message within 60 seconds.

---

## Phase 1 — MVP (Months 3–5)
**Goal:** Enough for a pilot school to replace their current tools.

- [ ] Assignment creation and student submission
- [ ] Parent portal (web) — attendance, assignments, scores
- [ ] Fee reminders via WhatsApp
- [ ] Admin dashboard — attendance and fee overview
- [ ] Permissions & consent engine (basic — AI tutor on/off per child)
- [ ] Mobile-responsive UI for teachers and students

**Exit Criteria:** A pilot school runs one full academic month entirely on Infizium with no manual workarounds.

---

## Phase 2 — AI Layer (Months 6–8)
**Goal:** Introduce AI-powered features that create differentiated value.

- [ ] AI Tutor (Bedrock) — conversational Q&A scoped to curriculum
- [ ] AI-assisted grading — draft suggestions for teachers to review
- [ ] Essay feedback for written assignments
- [ ] Practice question generation by topic
- [ ] Student progress analytics with early-warning flags for teachers

**Exit Criteria:** 70% of students in the pilot school use the AI tutor at least once per week.

---

## Phase 3 — Scale (Months 9–12)
**Goal:** Multi-school operations, self-serve onboarding, and operational hardening.

- [ ] Self-serve school onboarding flow
- [ ] Multi-school admin (trust/group level dashboard)
- [ ] Assessment module — question bank, online tests, score analytics
- [ ] Razorpay / UPI online fee payment
- [ ] WhatsApp two-way consent flows (trip approvals, form consents)
- [ ] Sibling management in parent accounts
- [ ] DPDP compliance audit and data handling review

**Exit Criteria:** 10 schools onboarded with less than 2 hours of manual setup each.

---

## Phase 4 — Growth (Year 2)
**Goal:** Deepen product, expand reach, reduce AWS cost per school.

- [ ] Offline-capable mobile app (PWA) for low-connectivity areas
- [ ] Regional language support (Hindi, Telugu, Tamil, Kannada)
- [ ] AI-generated parent-friendly progress narratives (not just numbers)
- [ ] Teacher professional development module
- [ ] Integration with DigiLocker for certificate storage
- [ ] Marketplace for verified tutors and enrichment programs

---

## Principles That Guide Prioritization
1. **Parent trust before feature breadth** — if a parent can't understand or control it, it doesn't ship.
2. **WhatsApp over new surfaces** — every feature should work for a parent who will never open the web app.
3. **AWS cost per school must fall as we scale** — serverless-first, no always-on compute unless justified.
4. **Pilot school feedback overrides roadmap** — what the pilot school struggles with moves up.
