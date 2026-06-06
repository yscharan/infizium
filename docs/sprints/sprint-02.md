# Sprint 2 — Backend Foundations & Auth

**Status:** 🟡 Planned  
**Version target:** v0.4.0  
**Dates:** 2026-06-09 to 2026-06-20 (2 weeks)  
**Goal:** Real authentication, a working API scaffold, and the database provisioned — so the demo UI talks to real data.

---

## Sprint Backlog

### Must-Have (MVP gate items)

| # | Task | Owner | Status | Notes |
|---|---|---|---|---|
| 1 | AWS account setup + IAM roles | Charan | ⬜ Todo | Dev environment first |
| 2 | Aurora PostgreSQL Serverless v2 cluster | Charan | ⬜ Todo | `infizium-dev` cluster |
| 3 | RDS Proxy for Lambda connection pooling | Charan | ⬜ Todo | Required before Lambda DB calls |
| 4 | Cognito user pools — 4 roles | Charan | ⬜ Todo | student, parent, teacher, admin |
| 5 | Cognito OTP login for parents (phone number) | Charan | ⬜ Todo | WhatsApp number as identity |
| 6 | Cognito email+password login for teachers/admins | Charan | ⬜ Todo | |
| 7 | API Gateway (REST) scaffold | Charan | ⬜ Todo | `/v1/*` base path |
| 8 | Lambda handler scaffold — profiles domain | Charan | ⬜ Todo | GET /v1/me |
| 9 | Database schema migration tooling | Charan | ⬜ Todo | Use `db-migrate` or Flyway |
| 10 | Initial schema migration (users, schools, profiles) | Charan | ⬜ Todo | From `docs/architecture.md` data model |
| 11 | Frontend auth integration — real Cognito login | Charan | ⬜ Todo | Replace demo role picker |
| 12 | Protected routes — redirect unauthenticated users | Charan | ⬜ Todo | |
| 13 | CI/CD — GitHub Actions for Lambda deploy | Charan | ⬜ Todo | On push to `master` |

### Should-Have (if time allows)

| # | Task | Notes |
|---|---|---|
| 14 | Seed script — 1 school, 2 teachers, 5 students, 2 parents | For demo use |
| 15 | Environment variable management (AWS SSM Parameter Store) | |
| 16 | Error boundary pages (404, 500) in Next.js | |

---

## Definition of Done

A task is **done** when:
1. Code is merged to `master`
2. Build passes in CI
3. Feature works in the `dev` environment
4. CHANGELOG.md updated with the change under the correct version

---

## Exit Criteria

- [ ] A teacher can log in with real Cognito credentials
- [ ] `GET /v1/me` returns the authenticated user's profile from Aurora
- [ ] A parent can log in via OTP on their WhatsApp number
- [ ] Database schema matches `docs/architecture.md`

---

## Version Notes

Planned releases this sprint:
- **v0.4.0-alpha** — Auth working, DB provisioned, no product features yet
- **v0.4.0** — Full sprint complete, CI/CD green
