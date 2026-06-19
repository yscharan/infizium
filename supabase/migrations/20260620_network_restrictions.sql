-- ══════════════════════════════════════════════════════════════════
-- Supabase Network Restrictions + Private Networking Setup
-- ══════════════════════════════════════════════════════════════════
--
-- IMPORTANT: This SQL file documents network hardening steps.
-- Some of these require the Supabase Dashboard, not just SQL.
--
-- STEP 1 (Dashboard): Network Restrictions
-- Go to: Settings → Database → Network Restrictions
-- Add allowed CIDRs:
--   • Your office/home IP (get it from: curl ifconfig.me)
--   • Vercel does NOT have static IPs on free/pro tier.
--     For static Vercel IPs → upgrade to Vercel Enterprise (Secure Compute)
--     OR use a proxy/tunnel with a fixed IP for DB direct access.
--   • Only restrict PORT 5432 (direct Postgres).
--     The PostgREST API (port 443) is always public — protected by RLS + anon key.
--
-- STEP 2 (SQL — run this): Lock down anon role further
-- ══════════════════════════════════════════════════════════════════

-- Revoke anon's ability to use the public schema entirely
-- (RLS handles per-table, this adds a schema-level lock)
REVOKE USAGE ON SCHEMA public FROM anon;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon;

-- Re-grant only to authenticated and service_role
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

-- authenticated: only SELECT where RLS allows, no direct INSERT/UPDATE/DELETE
-- (all writes go through service_role via backend API)
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;

-- service_role already has superuser-equivalent access by default in Supabase

-- ──────────────────────────────────────────────────────────────────
-- STEP 3: Supabase Auth Settings (Dashboard)
-- Settings → Auth → General:
--   • Site URL: https://infizium.com
--   • Redirect URLs (whitelist only):
--       https://infizium.com/**
--       https://infizium.com/login
--   • Disable "Enable email confirmations" only if using invite flow
--   • Enable "Secure email change" = ON
--
-- Settings → Auth → Rate Limits:
--   • Sign-in attempts: 10 per hour (already default)
--   • OTP/magic link: 5 per hour
--
-- ──────────────────────────────────────────────────────────────────
-- STEP 4: Production VPC (when migrating to AWS)
-- This is the target architecture — not for Supabase MVP.
--
-- AWS VPC Layout:
--   VPC CIDR: 10.0.0.0/16
--
--   Private subnets (no internet):
--     10.0.1.0/24  — ap-south-1a  (Aurora, Lambda)
--     10.0.2.0/24  — ap-south-1b  (Aurora replica, Lambda)
--
--   Public subnets (NAT gateway only):
--     10.0.101.0/24 — ap-south-1a
--     10.0.102.0/24 — ap-south-1b
--
--   Security Groups:
--     sg-aurora:    inbound 5432 from sg-lambda only. No internet.
--     sg-lambda:    inbound from API Gateway only. Outbound to sg-aurora + internet via NAT.
--     sg-nat:       outbound to internet (for WhatsApp API, Anthropic, etc.)
--
--   VPC Endpoints (keep traffic off internet):
--     com.amazonaws.ap-south-1.s3          (S3 — for media uploads)
--     com.amazonaws.ap-south-1.secretsmanager (secrets — DB password, API keys)
--     com.amazonaws.ap-south-1.bedrock-runtime (AI — no internet hop for Bedrock)
--
--   No public DB endpoint. Aurora only reachable from Lambda SG.
--   Secrets Manager holds: DB password, WhatsApp token, Anthropic key.
--   Lambda reads secrets at cold start via VPC endpoint.
-- ══════════════════════════════════════════════════════════════════
