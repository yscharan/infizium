# Modules

This document describes every module in the MVP. Anything not listed here is out of scope.

---

## 1. Profiles

### Student Profile
- Name, class, section, roll number, date of birth
- Photo (stored in S3)
- Parent linkage (one or two parents)
- School enrollment details

### Parent Profile
- Name, WhatsApp number (primary identifier), relationship to student
- Permission settings: what notifications they receive, what actions they can approve
- Linked students

### Teacher Profile
- Name, employee ID, subjects taught, classes assigned
- WhatsApp number (optional, used for admin contact only)

### School Admin Profile
- Name, role (admin, principal, office staff)
- School-level permissions

---

## 2. Attendance

- Teachers mark attendance per class per period or once daily.
- Absent students trigger a WhatsApp alert to the linked parent within 10 minutes.
- Parents can respond on WhatsApp to provide a reason (sick, holiday, etc.).
- Attendance history is visible to parents, teachers, and admins.
- Admins see a school-wide attendance summary.

---

## 3. Homework

- Teachers create homework assignments linked to a subject and class.
- Students see pending and past assignments in their feed.
- Parents are notified via WhatsApp when a new assignment is posted.
- Teachers can mark assignments as submitted (manual, no automated submission in MVP).
- No file uploads in MVP — homework is described in text with a due date.

---

## 4. Announcements

- Admins and teachers can post announcements to the whole school, a class, or a section.
- Announcements are delivered via WhatsApp to all linked parents in the target group.
- Announcement history is accessible in the app.
- No reply threading in MVP — announcements are one-way.

---

## 5. WhatsApp Notifications

- All outbound parent communication goes through the WhatsApp Business API.
- Notification types: attendance alert, homework posted, announcement, form approval request.
- Parents respond to approval requests directly in WhatsApp using numbered options (e.g., "Reply 1 to approve, 2 to decline").
- Inbound responses are processed by a Lambda webhook and update the platform state.
- Language: English in MVP, Telugu planned for v2.

---

## 6. Forms and Parent Approvals

- Admins create forms for field trips, events, medical consent, etc.
- Each form has fields (text, yes/no, date) and an approval requirement flag.
- Parents receive a WhatsApp message with a summary and a link to approve or decline.
- Approval status is tracked per student. Admins see a completion dashboard.
- No payment collection in MVP.

---

## Out of Scope for MVP
- Fee payment and wallet
- Leave applications from teachers
- Academic performance reports and grade books
- Timetable management
- Library, canteen, transport, or health modules
- AI tutor (planned for a later phase using Bedrock)
- Student-to-student or student-to-teacher messaging
