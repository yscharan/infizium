export type UserRole = "student" | "parent" | "teacher" | "admin";

export interface AppSession {
  role: UserRole;
  name: string;
  demo: boolean;
}

const KEY = "infizium_session";

const DEMO_NAMES: Record<UserRole, string> = {
  student: "Arjun",
  parent: "Lakshmi",
  teacher: "Ravi",
  admin: "Priya",
};

export const ROLE_DASHBOARD: Record<UserRole, string> = {
  student: "/dashboard/student",
  parent: "/dashboard/parent",
  teacher: "/dashboard/teacher",
  admin: "/dashboard/admin",
};

export function setSession(role: UserRole, name?: string, demo = true) {
  if (typeof window === "undefined") return;
  const s: AppSession = { role, name: name ?? DEMO_NAMES[role], demo };
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
