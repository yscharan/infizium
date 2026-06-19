-- ══════════════════════════════════════════════════════════════════
-- Enable Row-Level Security on all public tables
-- Security model:
--   • anon role: NO access to any table (public API is locked)
--   • authenticated role: read own school's data only
--   • service_role: full access (used by backend API + MCP server)
-- ══════════════════════════════════════════════════════════════════

-- ─── schools ───────────────────────────────────────────────────────
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "schools: authenticated users read their own school"
  ON schools FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

-- ─── users ─────────────────────────────────────────────────────────
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read other users in their school (teachers need to see parents, etc.)
CREATE POLICY "users: read same school"
  ON users FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

-- Users can update only their own row
CREATE POLICY "users: update own row"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ─── students ──────────────────────────────────────────────────────
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "students: read same school"
  ON students FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

-- ─── attendance ────────────────────────────────────────────────────
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "attendance: read same school"
  ON attendance FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

-- Teachers can insert/update attendance for their school
CREATE POLICY "attendance: teachers can mark"
  ON attendance FOR INSERT
  TO authenticated
  WITH CHECK (
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "attendance: teachers can update"
  ON attendance FOR UPDATE
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

-- ─── homework ──────────────────────────────────────────────────────
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;

CREATE POLICY "homework: read same school"
  ON homework FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "homework: teachers can create"
  ON homework FOR INSERT
  TO authenticated
  WITH CHECK (
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "homework: teachers can update"
  ON homework FOR UPDATE
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

-- ─── announcements ─────────────────────────────────────────────────
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "announcements: read same school"
  ON announcements FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "announcements: admins can create"
  ON announcements FOR INSERT
  TO authenticated
  WITH CHECK (
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

-- ─── whatsapp_messages ─────────────────────────────────────────────
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "whatsapp_messages: read own school"
  ON whatsapp_messages FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

-- ─── conversations ─────────────────────────────────────────────────
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conversations: read own"
  ON conversations FOR SELECT
  TO authenticated
  USING (
    user_a_id = auth.uid() OR user_b_id = auth.uid()
  );

-- ─── forms ─────────────────────────────────────────────────────────
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forms: read same school"
  ON forms FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "forms: admins/teachers can create"
  ON forms FOR INSERT
  TO authenticated
  WITH CHECK (
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

-- ─── form_responses ────────────────────────────────────────────────
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "form_responses: read same school"
  ON form_responses FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM forms f
      JOIN users u ON u.id = auth.uid()
      WHERE f.id = form_responses.form_id
        AND f.school_id = u.school_id
    )
  );

CREATE POLICY "form_responses: users can submit"
  ON form_responses FOR INSERT
  TO authenticated
  WITH CHECK (parent_user_id = auth.uid());

-- ─── user_permissions ──────────────────────────────────────────────
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_permissions: users read own"
  ON user_permissions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "user_permissions: admins read school"
  ON user_permissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      JOIN users target ON target.id = user_permissions.user_id
      WHERE u.id = auth.uid()
        AND u.role = 'admin'
        AND u.school_id = target.school_id
    )
  );

-- ─── permission_audit_log ──────────────────────────────────────────
ALTER TABLE permission_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "permission_audit_log: admins read school"
  ON permission_audit_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      JOIN users target ON target.id = permission_audit_log.user_id
      WHERE u.id = auth.uid()
        AND u.role = 'admin'
        AND u.school_id = target.school_id
    )
  );

-- ─── access_requests ───────────────────────────────────────────────
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;

-- Only service_role (backend) can read/write access_requests
-- No authenticated policy needed — handled entirely server-side via service key
