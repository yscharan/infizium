-- ── Security hardening: revoke loose grants + fix advisor warnings ──

-- 1. Defense in depth: strip anon/authenticated table grants on the three
--    server-only tables. RLS already blocks rows; this removes the grant too.
REVOKE ALL ON phone_verifications FROM anon, authenticated;
REVOKE ALL ON school_owners       FROM anon, authenticated;
REVOKE ALL ON ifz_id_seq          FROM anon, authenticated;

-- 2. Fix function_search_path_mutable: pin an empty search_path and fully
--    schema-qualify the table so the function can't be hijacked via search_path.
CREATE OR REPLACE FUNCTION delete_expired_phone_verifications()
RETURNS void
LANGUAGE sql
SET search_path = ''
AS $$
  DELETE FROM public.phone_verifications WHERE expires_at < now() - interval '1 day';
$$;
