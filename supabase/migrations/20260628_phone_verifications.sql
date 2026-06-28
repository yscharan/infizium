-- Phone number verification OTP codes
-- Used during login (2FA after password) and new-user requests (confirm phone ownership)

CREATE TABLE IF NOT EXISTS phone_verifications (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  phone       text        NOT NULL,
  code        text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  expires_at  timestamptz NOT NULL DEFAULT (now() + interval '10 minutes'),
  used        boolean     NOT NULL DEFAULT false
);

-- Index for quick lookup and cleanup
CREATE INDEX IF NOT EXISTS idx_phone_verifications_phone ON phone_verifications (phone);

-- Auto-delete expired codes after 1 day (keeps table lean)
CREATE OR REPLACE FUNCTION delete_expired_phone_verifications()
RETURNS void LANGUAGE sql AS $$
  DELETE FROM phone_verifications WHERE expires_at < now() - interval '1 day';
$$;

-- Ensure users.phone column exists (was added in earlier migrations but guard here)
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone text;

-- phone_verified flag: true once the user has completed at least one OTP challenge
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_verified boolean NOT NULL DEFAULT false;

-- Add phone to access_requests so admin sees the verified number
ALTER TABLE access_requests ADD COLUMN IF NOT EXISTS phone text;
