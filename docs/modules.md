# Modules

Modules marked **[MVP]** are in scope now. Everything else is planned for later phases.

---

## 1. Profiles [MVP]

### Student Profile
- Name, class, section, roll number, date of birth, photo (S3)
- Parent linkage (one or two parents)
- School enrollment details

### Parent Profile
- Name, WhatsApp number (primary identifier), relationship to student
- Permission dashboard — what notifications they receive, what actions they can approve
- Sibling management — one parent account, multiple children (Phase 2)

### Teacher Profile
- Name, employee ID, subjects taught, classes assigned

### School Admin Profile
- Name, role (admin, principal, office staff), school-level permissions

---

## 2. Attendance [MVP]
**Purpose:** Accurate, low-friction daily attendance with instant parent notification.

- Teacher marks attendance on mobile in under two minutes per class.
- Absent students trigger a WhatsApp alert to the linked parent within 10 minutes.
- Parents respond on WhatsApp to provide a reason (sick, holiday, etc.).
- Running attendance percentage per student, visible to parents and admin.
- Configurable alerts — e.g., 3 consecutive absences triggers escalation (Phase 2).
- Monthly attendance reports for compliance (Phase 2).

**Serves:** Teachers, Parents, Administrators

---

## 3. Homework [MVP]
**Purpose:** Assign, track, and notify without paper.

- Teachers create assignments linked to a subject and class, with a due date.
- Students see a feed of pending and past assignments.
- Parents are notified via WhatsApp when a new assignment is posted.
- Teachers mark assignments submitted (manual in MVP; file uploads in Phase 2).
- No automated submission portal in MVP — description and due date only.

**Serves:** Students, Teachers, Parents

---

## 4. Announcements [MVP]
**Purpose:** Structured, one-way broadcast to replace chaotic WhatsApp group posts.

- Admins and teachers post announcements to the whole school, a class, or a section.
- Delivered via WhatsApp to all linked parents in the target group.
- Announcement history accessible in the app.
- No reply threading in MVP — announcements are one-way.
- Message history and audit trail per student-parent record.

**Serves:** Parents, Teachers, Administrators

---

## 5. WhatsApp Notifications [MVP]
**Purpose:** Meet parents where they already are.

- All outbound parent communication goes through the WhatsApp Business API.
- Notification types: attendance alert, homework posted, announcement, form approval request.
- Parents respond using numbered options (e.g., "Reply 1 to approve, 2 to decline").
- Inbound responses are processed by a Lambda webhook and update platform state.
- Boundary controls — parents cannot directly message teachers outside working hours.
- Language: English in MVP, Telugu in Phase 2.

**Serves:** Parents

---

## 6. Forms and Parent Approvals [MVP]
**Purpose:** Collect consent digitally without chasing parents.

- Admins create forms for field trips, events, medical consent, etc.
- Each form has fields (text, yes/no, date) and an approval requirement flag.
- Parents receive a WhatsApp message with a summary and approve or decline by reply.
- Approval status tracked per student; admins see a completion dashboard.
- Audit log of all consent events per student (DPDP compliance).
- No payment collection in MVP.

**Serves:** Parents, Administrators

---

## 7. Permissions and Consent Engine [MVP]
**Purpose:** Enforce parent-controlled data and feature permissions across the platform.

- Granular permission model: which notifications to receive, AI tutor on/off per child (Phase 2), data sharing opt-ins.
- Consent collected via WhatsApp or in-app — no paperwork.
- School-level defaults with parent override capability.
- DPDP-compliant data handling.

**Serves:** Parents, Administrators

---

## Future Modules (Not MVP)

| Module | Phase | Notes |
|---|---|---|
| AI Tutor | Phase 3 | Bedrock-powered, curriculum-scoped, parent-controlled access |
| Assessment and Grading | Phase 3 | Question bank, online tests, AI-assisted grading drafts |
| Fee Management | Phase 3+ | WhatsApp reminders, Razorpay/UPI, receipt delivery |
| Parent Portal (enhanced) | Phase 2 | PTM requests, weekly academic narrative summaries |
| Admin Dashboard (advanced) | Phase 2 | Staff performance indicators, board-ready reports |
| DigiLocker Integration | Phase 4 | Certificate storage |
| Regional Languages | Phase 2 | Telugu first, then Hindi, Tamil, Kannada |

**Do not build wallet, loans, marketplace, carpool, fitness, or teacher professional development in any current phase.**
