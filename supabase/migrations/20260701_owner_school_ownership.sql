-- ── Owner model: one owner user, many schools via composite-key join ──
-- Shekhar Rao Yadagiri is a single owner who owns both Valmiki and Nandini.
--   users        : ONE record, role = owner, ifz-own-0000000001
--   school_owners: junction table, composite PK (school_id, owner_id), TWO rows

BEGIN;

-- 1. Register the 'own' counter in the ifz_id sequence
INSERT INTO ifz_id_seq (type_code, counter) VALUES ('own', 0)
ON CONFLICT (type_code) DO NOTHING;

-- 2. Promote the single Shekhar record (Valmiki / gmail) to owner.
--    school_id cleared: ownership now lives in school_owners, not a single FK.
UPDATE users SET
  role      = 'owner',
  ifz_id    = 'ifz-own-0000000001',
  school_id = NULL
WHERE id = 'b1000000-0001-0001-0001-000000000001';

UPDATE ifz_id_seq SET counter = 1 WHERE type_code = 'own';

-- 3. Remove the redundant duplicate Shekhar row (+nandini alias).
--    Verified: 0 references anywhere. The one owner now covers both schools.
DELETE FROM users WHERE id = 'b1000000-0002-0002-0002-000000000002';

-- 4. Ownership junction table with a composite primary key
CREATE TABLE IF NOT EXISTS school_owners (
  school_id  uuid        NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  owner_id   uuid        NOT NULL REFERENCES users(id)   ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (school_id, owner_id)
);
CREATE INDEX IF NOT EXISTS school_owners_owner_idx ON school_owners (owner_id);

-- 5. Link the single owner to both schools (the two composite-key records)
INSERT INTO school_owners (school_id, owner_id) VALUES
  ('a1b2c3d4-0001-0001-0001-000000000001', 'b1000000-0001-0001-0001-000000000001'),  -- Valmiki
  ('a1b2c3d4-0002-0002-0002-000000000002', 'b1000000-0001-0001-0001-000000000001')   -- Nandini
ON CONFLICT (school_id, owner_id) DO NOTHING;

-- 6. Super-admin identity: Charan's ifz_id is phone-based (globally unique,
--    not school-scoped). USA number +1 832 941 7456.
UPDATE users SET
  phone  = '+18329417456',
  ifz_id = 'ifz-18329417456'
WHERE id = 'fbaaa48d-4dd9-4ed8-af5e-901c89cf7966';

-- 7. Verify: one owner, two ownership rows
DO $$
DECLARE owners int; links int;
BEGIN
  SELECT count(*) INTO owners FROM users WHERE role = 'owner';
  SELECT count(*) INTO links  FROM school_owners WHERE owner_id = 'b1000000-0001-0001-0001-000000000001';
  IF owners <> 1 OR links <> 2 THEN
    RAISE EXCEPTION 'Expected 1 owner and 2 ownership links, got % owner(s), % link(s)', owners, links;
  END IF;
END $$;

COMMIT;
