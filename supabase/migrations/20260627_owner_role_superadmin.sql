-- ── Add owner role and super-admin fields ──────────────────────────
-- Schema + super-admin flag only. Row dedupe and dummy-user removal
-- live in 20260628_remove_dummy_users.sql (explicit ids, no guesswork).

-- 1. Extend role enum with owner (school principal persona)
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'owner';

-- 2. Super-admin flag on users (only Charan, the developer)
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_super_admin boolean NOT NULL DEFAULT false;

-- 3. Date of birth, used to verify admin/owner identity when created
ALTER TABLE users ADD COLUMN IF NOT EXISTS dob date;

-- 4. Mark Charan (sreecharanrao.ssc@gmail.com) as the super admin, by id.
--    This is the only account that sees and assigns across every school.
UPDATE users
SET is_super_admin = true
WHERE id = 'fbaaa48d-4dd9-4ed8-af5e-901c89cf7966';
