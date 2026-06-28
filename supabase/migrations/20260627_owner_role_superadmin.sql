-- ── Add owner role and super-admin fields ──────────────────────────

-- 1. Extend role enum with owner
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'owner';

-- 2. Super-admin flag on users (only Charan)
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_super_admin boolean NOT NULL DEFAULT false;

-- 3. Date of birth — used to verify admin/owner identity when created
ALTER TABLE users ADD COLUMN IF NOT EXISTS dob date;

-- 4. Mark Charan as super admin (school_id null accounts)
UPDATE users
SET is_super_admin = true
WHERE name = 'Charan Yadagiri' AND school_id IS NULL;

-- 5. Dedupe Shekhar Yadagiri duplicates — keep the one with school_id = Valmiki
DELETE FROM users
WHERE name = 'Shekhar Rao Yadagiri'
  AND school_id = 'a1b2c3d4-0002-0002-0002-000000000002'
  AND id NOT IN (
    SELECT id FROM users
    WHERE name = 'Shekhar Rao Yadagiri'
      AND school_id = 'a1b2c3d4-0001-0001-0001-000000000001'
    LIMIT 1
  );

-- 6. Clean up extra Charan rows (keep super admin, remove duplicates)
DELETE FROM users
WHERE name = 'Charan Yadagiri'
  AND is_super_admin = false
  AND school_id IS NULL;
