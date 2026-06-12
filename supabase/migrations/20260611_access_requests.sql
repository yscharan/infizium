-- Access requests table — admin-approved onboarding flow.
-- Phone is now optional on users; required only for WhatsApp/chat features.

-- Make phone optional (was NOT NULL)
ALTER TABLE users ALTER COLUMN phone DROP NOT NULL;

-- Access requests
CREATE TABLE IF NOT EXISTS access_requests (
  id             uuid primary key default uuid_generate_v4(),
  email          text not null,
  role           text not null check (role in ('student', 'parent', 'teacher', 'admin')),
  persona_detail text,                     -- "Student ID: IFZ-STU-001" / "Parent of Arjun, Grade 9A"
  message        text,                     -- free-text from applicant
  school_name    text,
  status         text not null default 'pending' check (status in ('pending', 'approved', 'denied')),
  token          text unique not null default encode(gen_random_bytes(32), 'hex'),
  created_at     timestamptz default now(),
  reviewed_at    timestamptz,
  reviewer_notes text
);

CREATE INDEX IF NOT EXISTS access_requests_email_idx ON access_requests (email);
CREATE INDEX IF NOT EXISTS access_requests_token_idx ON access_requests (token);
CREATE INDEX IF NOT EXISTS access_requests_status_idx ON access_requests (status);
