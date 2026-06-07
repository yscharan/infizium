# Modules

_Last updated: 2026-06-07_

Modules marked **[MVP]** are in scope now and have backend API + frontend UI built. **[Built]** means code exists and is deployed. **[Phase N]** means planned for that phase.

---

## 1. Profiles [MVP] [Built]

### Student Profile
- Name, class, section, roll number, date of birth, photo (S3 — Phase 2)
- Parent linkage — one or two parents per student
- School enrollment details
- DB: `students` table linked to `users` table

### Parent Profile
- Name, WhatsApp number (primary identifier), phone
- `whatsapp_id` — format `91XXXXXXXXXX@c.us` for whatsapp-web.js, `tg:USER_ID` for Telegram testing
- Permission dashboard — granular control over notifications, features, data sharing
- Sibling management — one parent account, multiple children (Phase 2)

### Teacher Profile
- Name, employee ID, subjects taught, classes assigned
- School-level access, not cross-school

### School Admin Profile
- Name, role (admin, principal, office staff), school-level permissions
- Trust/group admin level (Phase 4)

### API endpoints (built)
- `GET /api/users?school_id=&role=` — list by school + role
- `GET /api/users/:id` — profile with student join
- `POST /api/users` — create user

---

## 2. Attendance [MVP] [Built]

**Purpose:** Accurate, low-friction daily attendance with instant parent notification.

### What's built
- `POST /api/attendance` — mark single student
- `POST /api/attendance/bulk` — mark entire class at once (teacher sends full class array)
- `GET /api/attendance/summary/:student_id?from=&to=` — attendance stats with present/absent/late counts + percentage
- `GET /api/attendance?school_id=&date=&grade=` — full class attendance for a day
- DB: `attendance` table with unique constraint on (student_id, date) — upsert safe

### Behaviour
- Teacher marks attendance on mobile — bulk API call for whole class
- Absent students trigger WhatsApp alert to linked parent via AI handler (automatic on mark — Phase 1 wiring)
- Parents respond on WhatsApp to provide a reason (the AI handler receives and logs it)
- Running attendance percentage per student — visible to parents via AI bot and student dashboard
- Admin dashboard shows school-wide attendance with per-class colour-coded bars

### Configurable (Phase 2)
- 3 consecutive absences → escalation alert to parent + admin
- Weekly summary to parents every Friday
- Monthly compliance reports for board

**Serves:** Teachers (mark), Parents (receive alerts), Students (see own %, AI bot), Administrators (school-wide view)

---

## 3. Homework [MVP] [Built]

**Purpose:** Assign, track, and notify without paper.

### What's built
- `POST /api/homework` — teacher creates assignment (subject, grade, section, due_date)
- `GET /api/homework?school_id=&grade=&section=` — pending homework for a class
- `PATCH /api/homework/:id` — update status, edit details
- DB: `homework` table with grade + section scope

### Behaviour
- Teachers create assignments linked to subject, class, section, with due date and description
- Students see a feed of pending and past assignments
- Parents notified via WhatsApp when a new assignment is posted
- AI bot responds to "what homework is due?" with real-time Supabase data

### Phase 2 additions
- File attachments for homework (S3)
- Student submission status per homework item
- Teacher-marked submission (manual review)

**Serves:** Students (see feed), Teachers (create), Parents (WhatsApp alerts + AI bot)

---

## 4. Announcements [MVP] [Built]

**Purpose:** Structured one-way broadcast replacing chaotic WhatsApp group posts.

### What's built
- `POST /api/announcements` — create + optional immediate WhatsApp blast to all parents
- `GET /api/announcements?school_id=` — list with author, reach, read count
- DB: `announcements` table with `whatsapp_sent`, `whatsapp_sent_at`, `read_count`, `target_grades[]`
- WhatsApp blast: iterates all parent `whatsapp_id`s for the school, sends via waClient

### Behaviour
- Admins and teachers post to whole school, a class, or a section
- Delivered via WhatsApp to all linked parents in the target group
- Announcement history in the app
- No reply threading in MVP — announcements are one-way
- Read tracking (manual increment — Phase 2 gets WhatsApp read receipts)

**Serves:** Parents (receive), Teachers (post to class), Administrators (school-wide broadcast)

---

## 5. WhatsApp Notifications [MVP] [Built]

**Purpose:** Meet parents where they already are.

### What's built
- `whatsapp-web.js` bridge — `npm run whatsapp`, scan QR once, session persisted in `.wwebjs_auth/`
- Inbound message handler — receives parent messages, routes to AI handler
- `POST /api/whatsapp/send` — direct send from dashboard (admin/teacher use)
- `GET /api/whatsapp/messages?school_id=` — full message audit log
- `GET /api/whatsapp/status` — returns `{ ready: true/false }`

### Notification types
- Attendance absent alert — auto-sent when student marked absent
- Homework posted — auto-sent when teacher creates assignment
- Announcement broadcast — manual trigger from admin dashboard
- Form approval request — "Reply YES to approve, NO to decline" (Phase 1)
- Commute alerts — boarded bus, arrived school, SOS (Phase 2)

### Production path
- whatsapp-web.js is for development/testing — uses a personal WhatsApp account
- Production: Meta WhatsApp Cloud API — requires business verification, approved number, message templates
- Transition: same `waClient.sendMessage()` interface, swap implementation only
- No AI handler code changes when switching to Meta API

### Boundary controls (Phase 2)
- Parent direct messages to teachers are held outside school hours (6 PM – 8 AM)
- Delivered next morning with "Sent at 10:47 PM" timestamp

**Serves:** Parents (receive), All roles (trigger notifications)

---

## 6. Telegram Bot [Built — Testing Layer]

**Purpose:** Full AI Q&A testing environment while WhatsApp Business API is pending.

### What's built
- `npm run telegram` — starts bot using `TELEGRAM_BOT_TOKEN`
- `/start` — welcome message, prompts to register
- `/register <phone>` — links Telegram user ID to Infizium user (stores `tg:USER_ID` in `whatsapp_id` field)
- `/whoami` — shows linked user name and role
- Any text message → AI handler → Claude Haiku → real Supabase data → reply

### Behaviour
- Identical AI handler as WhatsApp (`src/whatsapp/ai-handler.ts`)
- All conversations logged to `whatsapp_messages` table with `tg_in_*` and `tg_out_*` IDs
- Typing indicator shown while AI is thinking
- Handles both English and Telugu naturally

### Transition to WhatsApp
- Zero code changes to `ai-handler.ts`
- Add WhatsApp transport when Meta Business API is approved
- Both can run simultaneously — pilot school on WhatsApp, testing continues on Telegram

**Serves:** Internal testing, early adopter parents who have Telegram, development verification

---

## 7. AI Handler — Claude Haiku + MCP Tool Use [Built]

**Purpose:** Natural language Q&A over real school data for parents on WhatsApp/Telegram.

### What's built (`src/whatsapp/ai-handler.ts`)
- Anthropic SDK with `claude-haiku-4-5-20251001` model
- 4 tools in Anthropic tool_use format: `get_student_summary`, `get_attendance`, `get_homework`, `get_announcements`
- Agentic loop — Claude calls tools until it has enough data to answer
- System prompt includes parent name, school_id, student_id, today's date
- Language detection — if parent writes Telugu, Claude responds in Telugu
- WhatsApp formatting — `*bold*` for important values, under 5 lines per response

### Example interactions
```
Parent: "Any homework due tomorrow?"
Claude calls: get_homework(school_id, grade, section)
Claude replies: "📚 2 assignments due Jun 8:
• *Maths* — Chapter 7 exercises (due tomorrow)
• *English* — Essay on environment (due Jun 10)"

Parent: "Arjun attendance ela undi this week?"
Claude calls: get_attendance(student_id, date: this week)
Claude replies: "✅ Arjun attended *4 of 5 days* this week.
Absent on: Wednesday, June 4."
```

### Cost
- Claude Haiku: ~$0.001 per conversation (3–4 tool calls + response)
- 500 parents × 3 messages/day = ~₹150–200/month total

**Serves:** Parents (primary), all roles who interact with the school via WhatsApp/Telegram

---

## 8. MCP Server [Built]

**Purpose:** Give Claude Code (development) and future AI tutor (production) grounded, real-time access to school data.

### What's built (`src/mcp/server.ts`)
7 tools registered with `@modelcontextprotocol/sdk`:

| Tool | What it returns |
|---|---|
| `list_schools` | All registered schools |
| `get_students` | Students filtered by school/grade/section |
| `get_attendance` | Daily attendance with present/absent summary |
| `get_student_summary` | Full profile + 30-day attendance stats + pending homework |
| `get_homework` | Pending homework for a grade/section |
| `get_announcements` | Recent announcements for a school |
| `send_whatsapp` | Send a WhatsApp message to any phone number |

### How to use in Claude Code
- `.mcp.json` at repo root registers the server automatically
- Once Supabase `.env` is filled: restart Claude Code → MCP server connects
- Ask Claude: "What's the attendance for Grade 10A today?" → real Supabase query

### Production path
- MCP server deployed to Lambda as the AI tutor's data access layer
- Same 7 tools, same interface — tutor calls them with student context
- Additional tools added in Phase 3: `get_class_performance`, `flag_at_risk_students`, `generate_report`

**Serves:** Development (Claude Code queries school data directly), Phase 3 AI tutor

---

## 9. GraphQL Layer [Built]

**Purpose:** Frontend dashboard pages fetch exactly the data they need, no over-fetching.

### What's built
- `frontend/src/lib/gql/client.ts` — GraphQLClient pointing to Supabase `/graphql/v1`
- `frontend/src/lib/gql/queries.ts` — All queries: attendance, homework, announcements, students, conversations, messages
- `frontend/src/lib/gql/hooks.ts` — React hooks: `useHomework`, `useAttendanceSummary`, `useClassAttendance`, `useAnnouncements`, `useStudents`, `useConversations`, `useMessages`

### Activation
1. Enable pg_graphql on Supabase: `create extension if not exists pg_graphql;`
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `frontend/.env.local`
3. Hooks are ready — just call `useHomework(schoolId, grade, section)` in any dashboard component

### Why GraphQL over REST for the frontend
- Parent dashboard needs student + attendance + homework in one query (3 REST calls → 1 GraphQL)
- Teacher dashboard needs attendance + student list + homework in one shot
- Admin dashboard needs school-wide data across multiple tables
- Supabase pg_graphql reflects the schema automatically — zero resolvers to write

**Serves:** All dashboard pages (frontend)

---

## 10. Commute Ecosystem [Built — UI complete, real GPS pending]

**Purpose:** Make the 22-minute journey to school visible to parents and safe for students.

### What's built
- `/commute` — showcase page with cinematic narrative, 5 commute modes, hardware section, morning timeline
- `/dashboard/student/commute` — My Plan (bus info, band status, weekly schedule), Find Buddy (request car pool/auto/walk), Live Track (animated map + stats), History
- `/dashboard/parent/commute` — Live View (map + route progress), Alerts (board/alight pings), History, Permissions
- `CommuteMap` component — animated SVG with 5 moving route dots, school pulsing marker, LIVE badge

### 5 commute modes
1. **School Bus** — GPS on every school bus, board/alight WhatsApp alert, digital roster for driver
2. **Parent Car Pool** — route-matching between school families, shared live location, mutual verified identity
3. **Auto Buddy** — school-verified auto drivers, group ride for 3–4 students, parent gets arrival alert
4. **Walk Group** — group tracking (not individual GPS), senior student as leader, parent gets "group arrived" alert
5. **Solo + Smart Tag** — student travels alone, Infizium Tag/Band sends silent location to parent

### Hardware accessories (Phase 2 prototype)
**Infizium Smart Band (wristband):**
- GPS + BLE 5.0
- 7-day battery life
- IP67 waterproof
- SOS button — 3-second hold → live location sent to parent AND admin simultaneously
- School gate geofence auto check-in

**Infizium Tag (bag tracker):**
- Fits inside school bag, 23mm × 23mm × 4mm
- 6-month battery (no daily charging)
- BLE 5.2 + cell triangulation
- Water resistant
- Works without any student action

### What needs to be built (Phase 2)
- Real GPS integration — driver mobile or hardware bus tracker
- Smart Band / Tag hardware prototype manufacturing
- Geofence triggers at school gate
- SOS alert pipeline — band button → `send_whatsapp` MCP tool → parent + admin
- Commute data stored in DB (route_logs table — TBD)
- Parent live tracking map wired to real GPS coordinates

**Serves:** Parents (safety, peace of mind), Students (safety, SOS), Admins (school-wide arrival tracking)

---

## 11. Sponsorship & Donation Platform [Built — payment integration pending]

**Purpose:** Connect donors directly with students who need financial support — transparently, with dignity.

### What's built
- `/sponsor` — browse 6 verified students (A001–F006 across 6 Telangana districts)
- Filter tabs: All / School Fees / Pocket Money / Education Loan
- Donation panel: 3 modes (fees/pocket/loan), amount presets + custom input
- 3 interaction modes: Anonymous / Codename / Direct
- Confirmation flow: browse → confirm → "You just changed a life"

### 3 donation types
1. **School fees** — payment goes directly to school's account, parent cannot divert
2. **Pocket money** — direct to student's future digital wallet, parent-inaccessible if donor specifies
3. **Education loan** — tracked repayment begins when student starts earning

### 3 interaction modes
1. **Anonymous** — donor gives, student knows someone cared, no identity shared either way
2. **Codename** — donor picks a name ("Phoenix", "Guardian 42") — student knows their guardian angel's codename
3. **Direct** — donor and student can exchange messages (moderated by Infizium), long-term mentorship

### What needs to be built (Phase 2)
- Razorpay / UPI payment integration
- School verification flow — admin certifies student need
- Donor identity verification (KYC lite)
- Direct mode — message thread between donor and student
- Education loan repayment tracking
- Real student data from pilot schools (currently demo data)

**Serves:** Donors (give directly, transparently), Students (receive without dignity compromise), Schools (fees paid reliably), Parents (visible but not in control)

---

## 12. Permissions and Consent Engine [MVP] [Built UI — API pending]

**Purpose:** Parent-controlled data and feature permissions, DPDP compliant.

### What's built (UI)
- `/dashboard/parent/permissions` — toggle rows with spring animation
- 3 sections: WhatsApp Notifications (5 toggles), Feature Access (4 toggles), Data Sharing (3 toggles)
- Consent history log (4 entries)
- DPDP Act 2023 compliance note
- Phase 3-locked features shown with lock indicator

### What needs to be built (Phase 1)
- Permission state stored in Supabase (user_permissions table — not yet in schema)
- Permission checks in AI handler — respect parent opt-outs
- DPDP audit log — every consent change timestamped and stored
- WhatsApp-based permission control — parent texts "STOP alerts" and it actually stops

### DPDP compliance requirements
- Location data retained max 48 hours (commute data)
- No third-party sharing without explicit consent
- Parent can revoke all permissions and request data deletion
- Consent required before AI tutor activates for their child
- All consent events logged with timestamp, method (WhatsApp/app), and what was consented

**Serves:** Parents (control), Administrators (compliance), Legal (audit trail)

---

## Future Modules (Phase 3+)

| Module | Phase | Key detail |
|---|---|---|
| AI Tutor | 3 | Bedrock/Hugging Face, Telugu-first, parent-controlled access |
| Assessment & Grading | 3 | Question bank, online tests, AI grading drafts |
| Fee Management | 3+ | WhatsApp reminders, Razorpay/UPI, receipts |
| PTM Booking | 2 | Parent books slot via WhatsApp, teacher manages calendar |
| Admin Reporting | 2 | Board-ready PDF reports, one-click export |
| DigiLocker | 4 | Certificate and mark sheet storage |
| Regional Languages | 2 | Telugu first → Hindi, Tamil, Kannada |
| Fitness & Wellness | 5 | PE integration, health goals, parent-controlled |
| Pocket Money | 5 | Financial literacy, spending habits, parent-controlled allowances |
| Emotional Intelligence | 5 | Mood tracking, stress management, resilience exercises |
| Future Readiness | 5 | Career exploration, life skills, real-world prep |

**Do not build:** wallet, personal loans (beyond education loan sponsorship), marketplace, teacher professional development, social network features — in any current phase.
