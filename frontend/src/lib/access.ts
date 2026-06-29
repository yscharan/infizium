// ── Persona access map (the contract) ───────────────────────────────
// Single source of truth for who-SEES-what and who-CONTROLS-what.
// Two separate axes on purpose:
//   view    = personal/operational data this role may READ
//   control = operational actions this role may DO
// Whoever controls operations (admin) does NOT get free access to personal
// data; editing student/parent data is approval-gated (2FA + parent consent).
// Server gating (route guards, API filters) and UI both read from here.
// Per-user exceptions live in user_permissions and override these defaults.

import type { UserRole } from "./session";

// How much data a role may reach (row scope).
export type DataScope =
  | "self"           // only their own record
  | "child"          // a parent's linked student(s)
  | "class"          // a teacher's assigned classes
  | "school"         // one school
  | "owned_schools"  // every school in school_owners for this owner
  | "all";           // every school (super admin)

// Access level. write implies read.
export type Access = "none" | "read" | "write";

// Data + feature domains. "activity_logs" = a student's browsing / app-usage
// history (digital-wellbeing monitoring) — only the parent and overseers see it.
export const DOMAINS = [
  "academics",      // education, holidays, homework, progress, revision, test prep
  "activity_logs",  // student browsing / screen-time / app usage
  "parent_contact", // who the parent is, their contact details
  "operations",     // fees, salary, inventory, staff, repairs, reports, notifications
  "personal_data",  // editable student/parent personal records (PII)
] as const;
export type Domain = (typeof DOMAINS)[number];

export interface RoleContract {
  scope: DataScope;
  view: Partial<Record<Domain, Access>>;    // what they can SEE
  control: Partial<Record<Domain, Access>>; // what they can DO
  canAddProfiles: boolean;                  // create / onboard users
  oversight: boolean;                       // read across all four personas
  loginOnly: boolean;                       // chatbot-first landing (owner)
}

export const ROLE_ACCESS: Record<UserRole, RoleContract> = {
  // Least data. Only their own academics + holidays.
  student: {
    scope: "self",
    view:    { academics: "read" },
    control: {},
    canAddProfiles: false, oversight: false, loginOnly: false,
  },

  // Everything about their own child, including activity/browsing logs.
  // Controls consent and their child's personal data.
  parent: {
    scope: "child",
    view:    { academics: "read", activity_logs: "read", operations: "read" /* own fees */ },
    control: { personal_data: "write" /* own child, with consent */ },
    canAddProfiles: false, oversight: false, loginOnly: false,
  },

  // Sees who the parent is (to post info) + minimal student read.
  // Controls their own teaching (academics) for their classes.
  teacher: {
    scope: "class",
    view:    { academics: "read", parent_contact: "read" },
    control: { academics: "write" },
    canAddProfiles: false, oversight: false, loginOnly: false,
  },

  // Minimal personal-data visibility, but full operational control.
  // Editing student/parent personal data is approval-gated (see APPROVAL_RULES).
  admin: {
    scope: "school",
    view:    { operations: "read", parent_contact: "read", academics: "read" },
    control: { operations: "write", personal_data: "write" /* via approval only */ },
    canAddProfiles: true, oversight: false, loginOnly: false,
  },

  // Pure overseer: sees everything across owned schools. Adds profiles. No ops.
  owner: {
    scope: "owned_schools",
    view:    { academics: "read", activity_logs: "read", parent_contact: "read", operations: "read", personal_data: "read" },
    control: {},
    canAddProfiles: true, oversight: true, loginOnly: true,
  },

  // Everything, all schools. Full control. Creates owners.
  super_admin: {
    scope: "all",
    view:    { academics: "read", activity_logs: "read", parent_contact: "read", operations: "read", personal_data: "read" },
    control: { operations: "write", personal_data: "write" },
    canAddProfiles: true, oversight: true, loginOnly: false,
  },
};

// ── Approval-gated mutations ─────────────────────────────────────────
// Some writes can't happen directly; they open an approval request that
// must clear 2FA and (where noted) consent from another persona.
export interface ApprovalRule {
  action: string;                 // logical action key
  by: UserRole;                   // who is attempting it
  requiresTwoFactor: boolean;     // attempter must pass 2FA
  requiresConsentFrom?: UserRole; // a second party must approve
}

export const APPROVAL_RULES: ApprovalRule[] = [
  { action: "edit_student_data", by: "admin", requiresTwoFactor: true, requiresConsentFrom: "parent" },
  { action: "edit_parent_data",  by: "admin", requiresTwoFactor: true },
];

// ── Helpers (use these everywhere; never hardcode role checks) ───────

export function contractFor(role: UserRole): RoleContract {
  return ROLE_ACCESS[role];
}

/** Can `role` SEE `domain` at least at `level`? */
export function canView(role: UserRole, domain: Domain, level: Access = "read"): boolean {
  return atLeast(ROLE_ACCESS[role].view[domain] ?? "none", level);
}

/** Can `role` DO (control) `domain` at least at `level`? */
export function canControl(role: UserRole, domain: Domain, level: Access = "write"): boolean {
  return atLeast(ROLE_ACCESS[role].control[domain] ?? "none", level);
}

/** Does this action need an approval flow for this role? Returns the rule or null. */
export function approvalFor(role: UserRole, action: string): ApprovalRule | null {
  return APPROVAL_RULES.find(r => r.by === role && r.action === action) ?? null;
}

export function dataScope(role: UserRole): DataScope {
  return ROLE_ACCESS[role].scope;
}

export function isOverseer(role: UserRole): boolean {
  return ROLE_ACCESS[role].oversight;
}

export function canAddProfiles(role: UserRole): boolean {
  return ROLE_ACCESS[role].canAddProfiles;
}

function atLeast(granted: Access, needed: Access): boolean {
  if (needed === "none") return true;
  if (needed === "read") return granted === "read" || granted === "write";
  return granted === "write";
}
