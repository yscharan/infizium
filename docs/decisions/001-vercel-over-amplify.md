# ADR-001 — Use Vercel instead of AWS Amplify for frontend hosting

**Date:** 2026-06-06  
**Status:** Accepted  
**Version:** v0.3.0

---

## Context

The original architecture doc specified AWS Amplify for Next.js hosting. During Sprint 1, the decision was made to use Vercel instead.

## Decision

Host the Next.js frontend on Vercel, not AWS Amplify.

## Reasons

1. **Speed of setup** — Vercel deploys in under 2 minutes from CLI; Amplify requires IAM roles, app configuration, and branch setup.
2. **Vercel is Next.js-native** — zero configuration for SSR, static pages, and edge functions.
3. **Custom domain is trivial** — one CLI command to add `infizium.com`; Vercel manages DNS and TLS.
4. **Cost** — Vercel Hobby/Pro is free for preview and cheap for production at this scale; Amplify pricing is comparable but less predictable.

## Consequences

- Frontend is not on AWS. This is fine for MVP — Vercel has global CDN and 99.99% SLO.
- If we ever need Cognito-integrated SSR (e.g., server-side JWT validation), we can still call AWS APIs from Vercel functions.
- Backend (Lambda, Aurora, Cognito) remains on AWS. Vercel frontend calls AWS API Gateway over HTTPS.
- `docs/architecture.md` should be updated to reflect Vercel, not Amplify.
