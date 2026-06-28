-- ── Remove dummy/seed users and duplicate rows ─────────────────────
-- Leaves only real accounts before live onboarding begins:
--   keep  fbaaa48d…  Charan Yadagiri  (super admin, sreecharanrao.ssc@gmail.com)
--   keep  b1000000-0001…  Shekhar Rao Yadagiri  (Valmiki, ifz-adm-0000000001)
--   keep  b1000000-0002…  Shekhar Rao Yadagiri  (Nandini,  ifz-adm-0000000002)
--   keep  00000000…0001  Infizium Bot  (system)
--
-- Removes the 10 documented demo personas (docs/personas.md) and 3 duplicate
-- rows. Children of students cascade automatically; homework.teacher_id is the
-- only NO ACTION dependency, cleared first.

BEGIN;

-- 1. Clear the one NO ACTION dependent: homework authored by dummy teachers
DELETE FROM homework
WHERE teacher_id IN (
  'c1000000-0001-0001-0001-000000000001',  -- Ravi Kumar
  '40340cba-5e81-4d22-aa30-cca8fd8b60ce',  -- Padma Reddy
  'b73b4c1a-8d13-4178-979a-176ff3f6e932'   -- Srikanth Babu
);

-- 2. Remove dummy student profile rows. CASCADE clears their attendance,
--    fee_payments, health_records, quiz_results, pickup_log, etc.
--    Also covers any student whose parent_user_id points at a dummy parent.
DELETE FROM students
WHERE user_id IN (
        'e1000000-0001-0001-0001-000000000001',  -- Arjun Yadagiri
        'ad1db541-160e-4a93-b452-4a06d9ac835f',  -- Suresh Yadav
        'cce36888-c9d2-4502-b10a-896ece31933b',  -- Rahul Naik
        '06c34d69-9ca9-4156-8737-94dabe6ce456',  -- Priya Naik
        '0bde3755-d18c-4dd9-a0b1-c0319e9e41e5'    -- Kiran Raju
      )
   OR parent_user_id IN (
        'd1000000-0001-0001-0001-000000000001',  -- Lakshmi Devi
        'c9c2dab6-d055-41e3-aec0-75017e2afbb7'    -- Sunitha Raju
      );

-- 3. Delete the dummy + duplicate users themselves.
DELETE FROM users
WHERE id IN (
  -- 10 seed demo personas (Valmiki Vidyalayam)
  'e1000000-0001-0001-0001-000000000001',  -- Arjun Yadagiri   (student)
  'ad1db541-160e-4a93-b452-4a06d9ac835f',  -- Suresh Yadav     (student)
  'cce36888-c9d2-4502-b10a-896ece31933b',  -- Rahul Naik       (student)
  '06c34d69-9ca9-4156-8737-94dabe6ce456',  -- Priya Naik       (student)
  '0bde3755-d18c-4dd9-a0b1-c0319e9e41e5',  -- Kiran Raju       (student)
  'd1000000-0001-0001-0001-000000000001',  -- Lakshmi Devi     (parent)
  'c9c2dab6-d055-41e3-aec0-75017e2afbb7',  -- Sunitha Raju     (parent)
  'c1000000-0001-0001-0001-000000000001',  -- Ravi Kumar       (teacher)
  '40340cba-5e81-4d22-aa30-cca8fd8b60ce',  -- Padma Reddy      (teacher)
  'b73b4c1a-8d13-4178-979a-176ff3f6e932',  -- Srikanth Babu    (teacher)
  -- 3 duplicate rows
  'a9b1ecc2-2227-4f67-9421-ff69a26f2840',  -- Charan Yadagiri  dup (infizium@outlook.com)
  '952d6955-2695-4f4b-97de-e29f866e6d25',  -- Charan Yadagiri  dup (infizium@outlook.com)
  '6b42c1c2-0d8d-4525-b6c5-2c20fcad93da'   -- Shekhar Rao Yadagiri dup (Valmiki, no ifz_id)
);

-- 4. Verify: exactly 4 real accounts should remain.
DO $$
DECLARE remaining int;
BEGIN
  SELECT count(*) INTO remaining FROM users;
  IF remaining <> 4 THEN
    RAISE EXCEPTION 'Expected 4 users after cleanup, found %', remaining;
  END IF;
END $$;

COMMIT;
