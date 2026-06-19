-- ══════════════════════════════════════════════════════════════════
-- Infizium — Full Feature Schema
-- All stakeholder features: Admin, Teacher, Student, Parent
-- ══════════════════════════════════════════════════════════════════

-- ─── Admin: Daily Checklist ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS daily_tasks (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  title        text not null,
  category     text not null check (category in ('opening','academic','admin','closing','recurring')),
  assigned_to  uuid references users(id),
  recurrence   text not null default 'daily' check (recurrence in ('daily','weekly','monthly','once')),
  due_time     time,
  created_by   uuid references users(id),
  created_at   timestamptz default now()
);

CREATE TABLE IF NOT EXISTS daily_task_completions (
  id           uuid primary key default gen_random_uuid(),
  task_id      uuid references daily_tasks(id) on delete cascade,
  school_id    uuid references schools(id) on delete cascade,
  completed_by uuid references users(id),
  completed_at timestamptz default now(),
  date         date not null default current_date,
  notes        text,
  unique(task_id, date)
);

-- ─── Admin: Fee Tracking ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fee_structures (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  grade        text not null,
  label        text not null,          -- "Tuition", "Transport", "Hostel"
  amount       numeric(10,2) not null,
  due_day      int,                    -- day of month fee is due
  academic_year text not null default '2025-26',
  created_at   timestamptz default now()
);

CREATE TABLE IF NOT EXISTS fee_payments (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  student_id   uuid references students(id) on delete cascade,
  fee_structure_id uuid references fee_structures(id),
  amount_paid  numeric(10,2) not null,
  payment_date date not null default current_date,
  payment_mode text not null default 'cash' check (payment_mode in ('cash','upi','bank','cheque')),
  receipt_no   text,
  recorded_by  uuid references users(id),
  notes        text,
  created_at   timestamptz default now()
);

-- ─── Admin: Staff Salary ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS salary_records (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  user_id      uuid references users(id) on delete cascade,
  month        text not null,          -- "2026-06"
  amount       numeric(10,2) not null,
  paid_on      date,
  payment_mode text default 'bank',
  status       text not null default 'pending' check (status in ('pending','paid','partial')),
  notes        text,
  recorded_by  uuid references users(id),
  created_at   timestamptz default now(),
  unique(user_id, month)
);

-- ─── Admin: Inventory (Food, Stationery, Supplies) ────────────────
CREATE TABLE IF NOT EXISTS inventory_items (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  name         text not null,
  category     text not null check (category in ('food','stationery','cleaning','medicine','other')),
  unit         text not null default 'units',   -- "kg", "packets", "pieces"
  current_qty  numeric(10,2) not null default 0,
  low_threshold numeric(10,2) not null default 5,
  created_at   timestamptz default now()
);

CREATE TABLE IF NOT EXISTS inventory_logs (
  id           uuid primary key default gen_random_uuid(),
  item_id      uuid references inventory_items(id) on delete cascade,
  school_id    uuid references schools(id) on delete cascade,
  change_qty   numeric(10,2) not null,   -- positive = stock in, negative = used
  reason       text,
  recorded_by  uuid references users(id),
  created_at   timestamptz default now()
);

-- ─── Admin: Maintenance / Repairs ─────────────────────────────────
CREATE TABLE IF NOT EXISTS maintenance_requests (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  title        text not null,
  description  text,
  location     text,                    -- "Block A - Room 3", "Toilets"
  priority     text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  status       text not null default 'open' check (status in ('open','in_progress','done')),
  raised_by    uuid references users(id),
  assigned_to  uuid references users(id),
  resolved_at  timestamptz,
  created_at   timestamptz default now()
);

-- ─── Admin: Bills / Expense Capture ──────────────────────────────
CREATE TABLE IF NOT EXISTS bills (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  vendor       text,
  category     text,                    -- "electricity", "groceries", "repairs"
  amount       numeric(10,2) not null,
  bill_date    date not null default current_date,
  image_url    text,                    -- S3 / Supabase Storage URL
  notes        text,
  recorded_by  uuid references users(id),
  created_at   timestamptz default now()
);

-- ─── Admin: Student Health ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS health_records (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  student_id   uuid references students(id) on delete cascade,
  reported_by  uuid references users(id),
  complaint    text not null,
  action_taken text,
  sent_home    boolean default false,
  date         date not null default current_date,
  created_at   timestamptz default now()
);

-- ─── Admin: Parent Pickup Log ────────────────────────────────────
CREATE TABLE IF NOT EXISTS pickup_log (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  student_id   uuid references students(id) on delete cascade,
  picked_up_by text not null,           -- name of person who collected
  relation     text,                    -- "mother", "father", "guardian"
  picked_up_at timestamptz default now(),
  recorded_by  uuid references users(id)
);

-- ─── Teacher: Syllabus & Topics ──────────────────────────────────
CREATE TABLE IF NOT EXISTS subjects (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  teacher_id   uuid references users(id),
  name         text not null,
  grade        text not null,
  section      text not null,
  academic_year text not null default '2025-26',
  total_topics int not null default 0,
  created_at   timestamptz default now()
);

CREATE TABLE IF NOT EXISTS topics (
  id           uuid primary key default gen_random_uuid(),
  subject_id   uuid references subjects(id) on delete cascade,
  school_id    uuid references schools(id) on delete cascade,
  title        text not null,
  chapter      text,
  order_index  int not null default 0,
  estimated_periods int default 1,
  created_at   timestamptz default now()
);

CREATE TABLE IF NOT EXISTS topics_covered (
  id           uuid primary key default gen_random_uuid(),
  topic_id     uuid references topics(id) on delete cascade,
  school_id    uuid references schools(id) on delete cascade,
  taught_by    uuid references users(id),
  date         date not null default current_date,
  notes        text,
  created_at   timestamptz default now(),
  unique(topic_id, date)
);

-- ─── Teacher: Substitutions ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS substitutions (
  id              uuid primary key default gen_random_uuid(),
  school_id       uuid references schools(id) on delete cascade,
  absent_teacher  uuid references users(id),
  substitute      uuid references users(id),
  date            date not null default current_date,
  grade           text not null,
  section         text not null,
  period          int,
  subject         text,
  assigned_by     uuid references users(id),
  created_at      timestamptz default now()
);

-- ─── Teacher + Student: Help Requests ────────────────────────────
CREATE TABLE IF NOT EXISTS help_requests (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  student_id   uuid references students(id) on delete cascade,
  teacher_id   uuid references users(id),
  subject_id   uuid references subjects(id),
  topic_id     uuid references topics(id),
  question     text not null,
  status       text not null default 'open' check (status in ('open','seen','answered')),
  answer       text,
  answered_at  timestamptz,
  created_at   timestamptz default now()
);

-- ─── Teacher: Quizzes & Assessments ──────────────────────────────
CREATE TABLE IF NOT EXISTS quizzes (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  subject_id   uuid references subjects(id),
  teacher_id   uuid references users(id),
  title        text not null,
  quiz_type    text not null default 'weekly' check (quiz_type in ('weekly','monthly','unit','terminal')),
  scheduled_date date,
  total_marks  int default 20,
  created_at   timestamptz default now()
);

CREATE TABLE IF NOT EXISTS quiz_results (
  id           uuid primary key default gen_random_uuid(),
  quiz_id      uuid references quizzes(id) on delete cascade,
  student_id   uuid references students(id) on delete cascade,
  school_id    uuid references schools(id) on delete cascade,
  marks        int,
  remarks      text,
  entered_by   uuid references users(id),
  created_at   timestamptz default now(),
  unique(quiz_id, student_id)
);

-- ─── Parent: Field Trips ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS field_trips (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  title        text not null,
  destination  text not null,
  date         date not null,
  grades       text[],
  departure_time time,
  return_time  time,
  teacher_in_charge uuid references users(id),
  status       text not null default 'planned' check (status in ('planned','ongoing','completed','cancelled')),
  created_by   uuid references users(id),
  created_at   timestamptz default now()
);

CREATE TABLE IF NOT EXISTS field_trip_students (
  id           uuid primary key default gen_random_uuid(),
  trip_id      uuid references field_trips(id) on delete cascade,
  student_id   uuid references students(id) on delete cascade,
  parent_consent boolean default false,
  boarded      boolean default false,
  returned     boolean default false,
  unique(trip_id, student_id)
);

-- ─── Admin: Staff Attendance ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS staff_attendance (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  user_id      uuid references users(id) on delete cascade,
  date         date not null default current_date,
  status       text not null check (status in ('present','absent','half_day','leave')),
  leave_type   text,                    -- "sick", "casual", "earned"
  noted_by     uuid references users(id),
  created_at   timestamptz default now(),
  unique(user_id, date)
);

-- ─── Notifications log ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id           uuid primary key default gen_random_uuid(),
  school_id    uuid references schools(id) on delete cascade,
  recipient_id uuid references users(id),
  type         text not null,           -- "attendance", "fee_due", "announcement", "help_answered"
  title        text not null,
  body         text not null,
  channel      text not null default 'whatsapp' check (channel in ('whatsapp','telegram','in_app')),
  sent         boolean default false,
  sent_at      timestamptz,
  read         boolean default false,
  reference_id uuid,                    -- id of the related record
  created_at   timestamptz default now()
);

-- ─── RLS on all new tables ────────────────────────────────────────
ALTER TABLE daily_tasks             ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_task_completions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structures          ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_payments            ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_records          ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items         ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_requests    ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records          ENABLE ROW LEVEL SECURITY;
ALTER TABLE pickup_log              ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects                ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics_covered          ENABLE ROW LEVEL SECURITY;
ALTER TABLE substitutions           ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_requests           ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results            ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trips             ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_trip_students     ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_attendance        ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications           ENABLE ROW LEVEL SECURITY;

-- Tables with direct school_id — bulk policy
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'daily_tasks','daily_task_completions','fee_structures','fee_payments',
    'salary_records','inventory_items','inventory_logs','maintenance_requests',
    'bills','health_records','pickup_log','subjects','topics_covered',
    'substitutions','help_requests','quizzes','field_trips',
    'staff_attendance','notifications'
  ] LOOP
    EXECUTE format(
      'CREATE POLICY %I ON %I FOR SELECT TO authenticated
       USING (school_id IN (SELECT school_id FROM users WHERE id = auth.uid()))',
      t || '_school_read', t
    );
  END LOOP;
END $$;

-- topics: read via subject → school
CREATE POLICY topics_school_read ON topics FOR SELECT TO authenticated
  USING (subject_id IN (
    SELECT s.id FROM subjects s
    JOIN users u ON u.id = auth.uid()
    WHERE s.school_id = u.school_id
  ));

-- quiz_results: read via quiz → school
CREATE POLICY quiz_results_school_read ON quiz_results FOR SELECT TO authenticated
  USING (quiz_id IN (
    SELECT q.id FROM quizzes q
    JOIN users u ON u.id = auth.uid()
    WHERE q.school_id = u.school_id
  ));

-- field_trip_students: read via trip → school
CREATE POLICY field_trip_students_school_read ON field_trip_students FOR SELECT TO authenticated
  USING (trip_id IN (
    SELECT ft.id FROM field_trips ft
    JOIN users u ON u.id = auth.uid()
    WHERE ft.school_id = u.school_id
  ));

-- Notifications: users read their own
CREATE POLICY notifications_own_read ON notifications FOR SELECT TO authenticated
  USING (recipient_id = auth.uid());

-- Help requests: students read their own
CREATE POLICY help_requests_student_read ON help_requests FOR SELECT TO authenticated
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Grant SELECT on all new tables to authenticated
GRANT SELECT ON
  daily_tasks, daily_task_completions, fee_structures, fee_payments,
  salary_records, inventory_items, inventory_logs, maintenance_requests,
  bills, health_records, pickup_log, subjects, topics, topics_covered,
  substitutions, help_requests, quizzes, quiz_results, field_trips,
  field_trip_students, staff_attendance, notifications
TO authenticated;
