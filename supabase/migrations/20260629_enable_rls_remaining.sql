-- ── Enable RLS on the 3 tables flagged by Supabase security advisor ──
-- (rls_disabled_in_public). All three are server-managed: the app reaches
-- them only through the service-role key, which bypasses RLS. Enabling RLS
-- with no public policies denies anon/authenticated access while leaving
-- server code unaffected. Security is the #1 priority.

-- OTP codes: must never be client-readable.
ALTER TABLE phone_verifications ENABLE ROW LEVEL SECURITY;

-- Ownership mapping: server-managed only.
ALTER TABLE school_owners ENABLE ROW LEVEL SECURITY;

-- Internal ID counters: server-managed only.
ALTER TABLE ifz_id_seq ENABLE ROW LEVEL SECURITY;
