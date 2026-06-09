-- Infizium — Supabase schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Order matters — referenced tables first

-- ─── Extensions ────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Schools ───────────────────────────────────────────────────
create table if not exists schools (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  district      text not null,
  state         text not null default 'Telangana',
  phone         text,
  whatsapp_number text,
  created_at    timestamptz default now()
);

-- ─── Users (all roles in one table) ────────────────────────────
create type user_role as enum ('student', 'parent', 'teacher', 'admin');

create table if not exists users (
  id            uuid primary key default uuid_generate_v4(),
  school_id     uuid references schools(id) on delete cascade,
  role          user_role not null,
  name          text not null,
  phone         text not null unique,
  whatsapp_id   text unique,          -- phone@c.us format used by whatsapp-web.js
  email         text,
  created_at    timestamptz default now()
);

create index if not exists users_school_id_idx on users(school_id);
create index if not exists users_whatsapp_id_idx on users(whatsapp_id);
create index if not exists users_phone_idx on users(phone);

-- ─── Students (extended profile for users with role=student) ───
create table if not exists students (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references users(id) on delete cascade unique,
  school_id     uuid references schools(id) on delete cascade,
  grade         text not null,
  section       text not null,
  roll_number   text not null,
  parent_user_id uuid references users(id),
  created_at    timestamptz default now(),
  unique(school_id, grade, section, roll_number)
);

-- ─── Attendance ─────────────────────────────────────────────────
create type attendance_status as enum ('present', 'absent', 'late');

create table if not exists attendance (
  id            uuid primary key default uuid_generate_v4(),
  student_id    uuid references students(id) on delete cascade,
  school_id     uuid references schools(id) on delete cascade,
  date          date not null,
  status        attendance_status not null,
  marked_by     uuid references users(id),
  created_at    timestamptz default now(),
  unique(student_id, date)
);

create index if not exists attendance_student_date_idx on attendance(student_id, date);
create index if not exists attendance_school_date_idx on attendance(school_id, date);

-- ─── Homework ───────────────────────────────────────────────────
create type homework_status as enum ('pending', 'submitted', 'graded');

create table if not exists homework (
  id            uuid primary key default uuid_generate_v4(),
  school_id     uuid references schools(id) on delete cascade,
  teacher_id    uuid references users(id),
  grade         text not null,
  section       text not null,
  subject       text not null,
  title         text not null,
  description   text,
  due_date      date not null,
  status        homework_status not null default 'pending',
  created_at    timestamptz default now()
);

create index if not exists homework_school_grade_idx on homework(school_id, grade, section);

-- ─── Announcements ──────────────────────────────────────────────
create table if not exists announcements (
  id                uuid primary key default uuid_generate_v4(),
  school_id         uuid references schools(id) on delete cascade,
  author_id         uuid references users(id),
  title             text not null,
  body              text not null,
  target_grades     text[],             -- null = all grades
  whatsapp_sent     boolean default false,
  whatsapp_sent_at  timestamptz,
  read_count        int default 0,
  created_at        timestamptz default now()
);

create index if not exists announcements_school_idx on announcements(school_id, created_at desc);

-- ─── WhatsApp messages (audit log) ──────────────────────────────
create type message_direction as enum ('inbound', 'outbound');

create table if not exists whatsapp_messages (
  id              uuid primary key default uuid_generate_v4(),
  school_id       uuid references schools(id),
  from_user_id    uuid references users(id),
  to_user_id      uuid references users(id),
  wa_message_id   text unique,          -- WA's own message ID
  direction       message_direction not null,
  body            text not null,
  media_url       text,
  delivered       boolean default false,
  read            boolean default false,
  created_at      timestamptz default now()
);

create index if not exists wa_msgs_school_idx on whatsapp_messages(school_id, created_at desc);
create index if not exists wa_msgs_from_idx on whatsapp_messages(from_user_id);

-- ─── Conversations (thread between two users) ───────────────────
create table if not exists conversations (
  id              uuid primary key default uuid_generate_v4(),
  school_id       uuid references schools(id) on delete cascade,
  user_a_id       uuid references users(id),
  user_b_id       uuid references users(id),
  last_message    text,
  last_message_at timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  unique(user_a_id, user_b_id)
);

-- ─── Forms (consent forms, field trips, PTM, etc.) ─────────────
create type form_status as enum ('draft', 'active', 'closed');

create table if not exists forms (
  id              uuid primary key default uuid_generate_v4(),
  school_id       uuid references schools(id) on delete cascade,
  created_by      uuid references users(id),
  title           text not null,
  description     text,
  target_grades   text[],                  -- null = all grades
  deadline        date,
  status          form_status not null default 'active',
  created_at      timestamptz default now()
);

create index if not exists forms_school_idx on forms(school_id, created_at desc);

-- ─── Form responses (parent approvals) ──────────────────────────
create type form_response_value as enum ('approved', 'declined', 'pending');

create table if not exists form_responses (
  id              uuid primary key default uuid_generate_v4(),
  form_id         uuid references forms(id) on delete cascade,
  student_id      uuid references students(id) on delete cascade,
  parent_user_id  uuid references users(id),
  response        form_response_value not null default 'pending',
  note            text,                    -- parent can add a note with decline
  responded_at    timestamptz,
  created_at      timestamptz default now(),
  unique(form_id, student_id)
);

create index if not exists form_responses_form_idx on form_responses(form_id);
create index if not exists form_responses_parent_idx on form_responses(parent_user_id);

-- ─── User permissions (DPDP-compliant consent storage) ───────────
create table if not exists user_permissions (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references users(id) on delete cascade,
  school_id       uuid references schools(id) on delete cascade,
  permission_key  text not null,           -- e.g. 'whatsapp_attendance', 'location_sharing'
  granted         boolean not null default true,
  granted_via     text not null default 'app',  -- 'app', 'whatsapp', 'admin'
  updated_at      timestamptz default now(),
  created_at      timestamptz default now(),
  unique(user_id, permission_key)
);

create index if not exists user_permissions_user_idx on user_permissions(user_id);

-- Permission audit log — every change recorded for DPDP compliance
create table if not exists permission_audit_log (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references users(id) on delete cascade,
  permission_key  text not null,
  old_value       boolean,
  new_value       boolean not null,
  changed_via     text not null default 'app',
  created_at      timestamptz default now()
);

-- ─── Seed: demo school + users ───────────────────────────────────
insert into schools (name, district, state, whatsapp_number)
values ('St. Joseph''s High School', 'Hyderabad', 'Telangana', '+919876543210')
on conflict do nothing;
