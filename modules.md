# Modules

## 1. Communication Hub
**Purpose:** WhatsApp-first, structured communication between school, teachers, and parents.

**Key Features**
- Automated WhatsApp notifications: attendance, assignments, events, fee reminders.
- Two-way messaging with reply keywords (e.g., "YES" / "NO" for consents).
- Broadcast templates for class or school-wide announcements.
- Message history and audit trail per student-parent record.
- Boundary controls — parents cannot directly message teachers outside working hours.

**Serves:** Parents, Teachers, Administrators

---

## 2. Learning Management
**Purpose:** Manage assignments, resources, and the academic calendar.

**Key Features**
- Assignment creation with due dates, rubrics, and file attachments.
- Student submission portal (web + mobile).
- Resource library organized by subject, grade, and topic.
- Class schedule and academic calendar visible to all roles.
- Homework tracker for students and parents.

**Serves:** Students, Teachers, Parents

---

## 3. AI Tutor
**Purpose:** Personalized, on-demand academic support powered by AWS Bedrock.

**Key Features**
- Conversational AI tutor scoped to curriculum (CBSE/ICSE/State Board).
- Essay and written assignment feedback with improvement suggestions.
- Concept explanation with examples adapted to student's level.
- Practice question generation by topic and difficulty.
- Parent-controlled access — parents can enable/disable AI tutor per child.

**Serves:** Students (with parent permission)

---

## 4. Assessment & Grading
**Purpose:** Streamline test creation, administration, and feedback.

**Key Features**
- Question bank with tagging by subject, topic, and Bloom's level.
- Online and offline (printable) test generation.
- AI-assisted grading for objective questions; draft suggestions for written answers.
- Score analytics: class average, percentile bands, topic-level gaps.
- Progress reports exportable for parents and board review.

**Serves:** Teachers, Students, Administrators

---

## 5. Attendance
**Purpose:** Accurate, low-friction daily attendance with instant parent notification.

**Key Features**
- Teacher marks attendance on mobile in under two minutes per class.
- Automated WhatsApp message to parent on absence.
- Running attendance percentage per student, visible to parents and admin.
- Configurable alerts (e.g., 3 consecutive absences triggers escalation).
- Monthly attendance reports for compliance.

**Serves:** Teachers, Parents, Administrators

---

## 6. Parent Portal
**Purpose:** Give parents a single, permissioned view of their child's school life.

**Key Features**
- Academic summary: attendance, assignments, test scores, teacher remarks.
- WhatsApp-delivered or in-app depending on parent preference.
- Permission dashboard — parents approve what data is shared with which features.
- Direct access to request a PTM or raise a concern.
- Sibling management — one parent account, multiple children.

**Serves:** Parents

---

## 7. Fee Management
**Purpose:** Simplify fee collection, reminders, and reconciliation.

**Key Features**
- Fee structure configuration per class and category.
- Automated WhatsApp reminders before and after due dates.
- Online payment integration (Razorpay / UPI).
- Payment receipts delivered via WhatsApp.
- Admin dashboard: collected vs. outstanding, defaulter lists.

**Serves:** Parents, Administrators

---

## 8. Admin Dashboard
**Purpose:** School-wide operational visibility for principals and admin staff.

**Key Features**
- Real-time metrics: attendance rate, fee collection, assignment completion.
- Staff performance indicators (assignment turnaround, communication responsiveness).
- Escalation queue with full context for each case.
- Configurable school policies (communication rules, permission defaults).
- Board-ready report generation.

**Serves:** Administrators

---

## 9. Permissions & Consent Engine
**Purpose:** Enforce parent-controlled data and feature permissions across the platform.

**Key Features**
- Granular permission model: AI tutor, data sharing, communication opt-ins.
- Consent collected via WhatsApp or in-app — no paperwork.
- Audit log of all consent events per student.
- School-level defaults with parent override capability.
- DPDP-compliant data handling.

**Serves:** Parents, Administrators
