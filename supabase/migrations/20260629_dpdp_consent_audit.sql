-- ── DPDP layer: consent, audit, and approval-gated mutations ─────────
-- India's Digital Personal Data Protection Act 2023 obligations:
-- consent (esp. minors' data), purpose limitation, auditability.
-- All tables RLS-enabled + server-only (service-role) from creation.

-- 1. Consent records: who consented to what, for which data principal.
--    Minors (students) require guardian (parent) consent. Purpose-bound.
CREATE TABLE IF NOT EXISTS consent_records (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id       uuid REFERENCES schools(id) ON DELETE CASCADE,
  subject_user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- the data principal
  guardian_user_id uuid REFERENCES users(id) ON DELETE SET NULL,         -- parent, for minors
  purpose         text NOT NULL,           -- e.g. 'wellbeing_activity_monitoring'
  scope           text NOT NULL DEFAULT 'standard',
  granted         boolean NOT NULL DEFAULT false,
  method          text,                    -- how consent was captured
  granted_at      timestamptz,
  revoked_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS consent_subject_idx ON consent_records (subject_user_id, purpose);
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON consent_records FROM anon, authenticated;

-- 2. Audit log: every sensitive read/write of personal data + approvals.
CREATE TABLE IF NOT EXISTS audit_log (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  actor_role    text,
  action        text NOT NULL,             -- 'view' | 'edit' | 'approve' | ...
  target_table  text,
  target_id     text,
  school_id     uuid,
  detail        jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS audit_actor_idx  ON audit_log (actor_user_id, created_at);
CREATE INDEX IF NOT EXISTS audit_target_idx ON audit_log (target_table, target_id);
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON audit_log FROM anon, authenticated;

-- 3. Approval requests: admin edits to student/parent data don't apply
--    directly. They open a request that must clear 2FA + (for student data)
--    parent consent. Mirrors APPROVAL_RULES in lib/access.ts.
CREATE TABLE IF NOT EXISTS approval_requests (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id        uuid REFERENCES schools(id) ON DELETE CASCADE,
  requested_by     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action           text NOT NULL,          -- 'edit_student_data' | 'edit_parent_data'
  target_user_id   uuid REFERENCES users(id) ON DELETE CASCADE,
  payload          jsonb NOT NULL DEFAULT '{}'::jsonb,   -- the proposed change
  two_factor_passed boolean NOT NULL DEFAULT false,
  consent_user_id  uuid REFERENCES users(id) ON DELETE SET NULL,  -- parent who must approve
  status           text NOT NULL DEFAULT 'pending',   -- pending|approved|denied|applied
  created_at       timestamptz NOT NULL DEFAULT now(),
  resolved_at      timestamptz
);
CREATE INDEX IF NOT EXISTS approval_status_idx ON approval_requests (school_id, status);
ALTER TABLE approval_requests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON approval_requests FROM anon, authenticated;
