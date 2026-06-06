# Product Backlog

Priority order within each column. Items move to a sprint doc when scheduled.

**Legend:** 🔴 Blocker · 🟠 High · 🟡 Medium · 🟢 Nice-to-have · ✅ Done

---

## Epics

| # | Epic | Phase | Sprint |
|---|---|---|---|
| E1 | Frontend UI | Phase 0 | Sprint 1 ✅ |
| E2 | Auth & Infrastructure | Phase 0 | Sprint 2 |
| E3 | Attendance Module | Phase 1 | Sprint 3 |
| E4 | Homework & Announcements | Phase 1 | Sprint 4 |
| E5 | Forms & Approvals | Phase 1 | Sprint 5 |
| E6 | WhatsApp Integration | Phase 1 | Sprint 6 |
| E7 | Polish & Pilot Onboarding | Phase 2 | Sprint 7 |
| E8 | AI Tutor (Bedrock) | Phase 3 | Sprint 8+ |

---

## Backlog Items

### E2 — Auth & Infrastructure

| Priority | Item | Notes |
|---|---|---|
| 🔴 | AWS account + IAM roles | Dev environment |
| 🔴 | Aurora PostgreSQL Serverless v2 | `infizium-dev` cluster |
| 🔴 | Cognito user pools (4 roles) | |
| 🔴 | API Gateway + Lambda scaffold | `/v1/*` |
| 🔴 | DB schema initial migration | From architecture.md |
| 🟠 | RDS Proxy setup | Connection pooling for Lambda |
| 🟠 | Real Cognito auth in frontend | Replace demo login |
| 🟠 | GitHub Actions CI/CD | Lambda deploy pipeline |
| 🟡 | Seed script for demo data | 1 school, sample users |
| 🟡 | Error pages (404, 500) | |

### E3 — Attendance Module

| Priority | Item | Notes |
|---|---|---|
| 🔴 | Teacher attendance marking API — `POST /v1/attendance` | |
| 🔴 | Attendance records DB table | |
| 🔴 | Parent WhatsApp alert on absence | Within 10 min of marking |
| 🟠 | Admin attendance dashboard — real data | Replace dummy data |
| 🟠 | Inbound WhatsApp reply handler | Parent sends reason |
| 🟡 | Attendance export (CSV) | |
| 🟡 | 3-consecutive-absence escalation alert | |

### E4 — Homework & Announcements

| Priority | Item | Notes |
|---|---|---|
| 🔴 | Teacher homework creation API — `POST /v1/homework` | |
| 🔴 | Student homework feed — real data | |
| 🔴 | Parent WhatsApp notification on new homework | |
| 🔴 | Announcement broadcast — `POST /v1/announcements` | |
| 🟠 | WhatsApp delivery tracking | Read receipts |
| 🟡 | File attachments for homework | S3 upload |

### E5 — Forms & Approvals

| Priority | Item | Notes |
|---|---|---|
| 🔴 | Admin form builder API | Basic fields (JSONB) |
| 🔴 | WhatsApp approval request to parent | YES/NO reply |
| 🔴 | Approval status tracking | Admin view |
| 🟠 | Consent audit log | DPDP compliance |
| 🟡 | Form response export | |

### E6 — WhatsApp Integration

| Priority | Item | Notes |
|---|---|---|
| 🔴 | WhatsApp Business API account + BSP setup | Meta approval required |
| 🔴 | Outbound message Lambda — attendance alert template | Pre-approve with Meta |
| 🔴 | Inbound webhook Lambda — handle parent replies | HMAC signature validation |
| 🟠 | Homework reminder template | |
| 🟠 | Announcement template | |
| 🟠 | Approval request template | |
| 🟡 | Telugu language message templates | Phase 2 |

### E7 — Polish & Pilot Onboarding

| Priority | Item | Notes |
|---|---|---|
| 🟠 | Admin school onboarding flow | Self-serve |
| 🟠 | Bulk student CSV import | |
| 🟠 | Parent WhatsApp number collection + OTP | First-time setup |
| 🟡 | PWA install prompt | Offline-capable |
| 🟡 | Telugu UI strings | Phase 2 |

### E8 — AI Tutor

| Priority | Item | Notes |
|---|---|---|
| 🟢 | Bedrock integration — conversational Q&A | Phase 3 |
| 🟢 | Parent consent gate for AI features | |
| 🟢 | Essay feedback endpoint | |
| 🟢 | Practice question generation | |

---

## Completed Items

| Item | Sprint | Version |
|---|---|---|
| Next.js frontend scaffold | Sprint 1 | v0.2.0 |
| 4 role dashboards (demo) | Sprint 1 | v0.2.0 |
| Framer Motion UI redesign | Sprint 1 | v0.3.0 |
| Persona-matched dashboard themes | Sprint 1 | v0.3.0 |
| GitHub repo + Vercel deployment | Sprint 1 | v0.3.0 |
| `infizium.com` domain | Sprint 1 | v0.3.0 |
| Version + changelog system | Sprint 1 | v0.3.0 |
