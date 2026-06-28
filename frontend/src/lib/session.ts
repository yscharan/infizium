export type UserRole = "student" | "parent" | "teacher" | "admin" | "owner" | "super_admin";

export interface AppSession {
  role: UserRole;
  name: string;
  demo: boolean;
  email?: string;
  id?: string;
  schoolId?: string;
  schoolName?: string;
  isSuperAdmin?: boolean;
}

const KEY = "infizium_session";

const DEMO_NAMES: Record<UserRole, string> = {
  student: "Arjun",
  parent: "Lakshmi",
  teacher: "Ravi",
  admin: "Priya",
  owner: "Shekhar",
  super_admin: "Charan",
};

export const ROLE_DASHBOARD: Record<UserRole, string> = {
  student: "/dashboard/student",
  parent: "/dashboard/parent",
  teacher: "/dashboard/teacher",
  admin: "/dashboard/admin",
  owner: "/dashboard/owner",
  super_admin: "/dashboard/super",
};

export function setSession(
  role: UserRole,
  email?: string,
  demo = true,
  extras?: { id?: string; name?: string; schoolId?: string; schoolName?: string; isSuperAdmin?: boolean }
) {
  if (typeof window === "undefined") return;
  const s: AppSession = {
    role,
    name: extras?.name ?? DEMO_NAMES[role],
    demo,
    email,
    id: extras?.id,
    schoolId: extras?.schoolId,
    schoolName: extras?.schoolName,
    isSuperAdmin: extras?.isSuperAdmin ?? false,
  };
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function getSession(): AppSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AppSession) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}
