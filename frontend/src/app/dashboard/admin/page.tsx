"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { DashboardNav } from "@/components/dashboard-nav";
import { getSession, clearSession } from "@/lib/session";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

interface Announcement {
  id: string;
  title: string;
  created_at: string;
}

interface Stats {
  students: number;
  teachers: number;
  parents: number;
  announcements: number;
  homework: number;
}

const quickActions = ["Broadcast announcement", "Create consent form", "Export attendance", "Add student", "Invite teacher", "View all parents", "School settings", "Board report"];

export default function AdminDashboard() {
  const router = useRouter();
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [schoolName, setSchoolName] = useState("Your School");
  const [ready, setReady] = useState(false);
  const [stats, setStats] = useState<Stats>({ students: 0, teachers: 0, parents: 0, announcements: 0, homework: 0 });
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "admin") { router.replace("/login"); return; }
    setName(s.name);
    setEmail(s.email ?? "");
    const sid = s.schoolId ?? "";
    const sName = s.schoolName ?? "Your School";
    setSchoolId(sid);
    setSchoolName(sName);
    setReady(true);

    if (sid) {
      fetchStats(sid);
      fetchAnnouncements(sid);
    }
  }, [router]);

  async function fetchStats(sid: string) {
    const [studentsRes, teachersRes, parentsRes, announcementsRes, homeworkRes] = await Promise.all([
      supabase.from("students").select("id", { count: "exact", head: true }).eq("school_id", sid),
      supabase.from("users").select("id", { count: "exact", head: true }).eq("school_id", sid).eq("role", "teacher"),
      supabase.from("users").select("id", { count: "exact", head: true }).eq("school_id", sid).eq("role", "parent"),
      supabase.from("announcements").select("id", { count: "exact", head: true }).eq("school_id", sid),
      supabase.from("homework").select("id", { count: "exact", head: true }).eq("school_id", sid),
    ]);

    setStats({
      students: studentsRes.count ?? 0,
      teachers: teachersRes.count ?? 0,
      parents: parentsRes.count ?? 0,
      announcements: announcementsRes.count ?? 0,
      homework: homeworkRes.count ?? 0,
    });
  }

  async function fetchAnnouncements(sid: string) {
    const { data } = await supabase
      .from("announcements")
      .select("id, title, created_at")
      .eq("school_id", sid)
      .order("created_at", { ascending: false })
      .limit(5);
    if (data) setAnnouncements(data);
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 86400000) return `Today ${d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
    if (diff < 172800000) return "Yesterday";
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  }

  function signOut() { clearSession(); router.push("/login"); }

  if (!ready) return <div className="min-h-screen bg-[#09090b]" />;

  return (
    <div className="min-h-screen bg-[#09090b]">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 border-b border-white/8 glass-dark"
      >
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">Infizium</span>
            <span className="text-white/20">|</span>
            <span className="text-sm text-violet-400 font-medium">Admin — {name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-white/8 text-white/50 px-2.5 py-1 rounded-full border border-white/10">{schoolName}</span>
            <button onClick={signOut} className="text-xs text-white/30 hover:text-white/60 transition-colors">Sign out</button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">

        <DashboardNav
          tabs={[
            { id: "overview", label: "Overview", icon: "🏠", href: "/dashboard/admin" },
            { id: "reports", label: "Reports", icon: "📊", href: "/dashboard/admin/reports" },
          ]}
          accentColor="#7c3aed"
          theme="dark"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl px-4 py-3 text-sm"
          style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", color: "rgba(167,139,250,0.9)" }}
        >
          Welcome back, <span className="font-semibold text-violet-300">{name}</span>. You&apos;re managing <span className="font-semibold text-violet-300">{schoolName}</span>.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { label: "Students", value: stats.students.toString(), icon: "🎒", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/8" },
            { label: "Teachers", value: stats.teachers.toString(), icon: "👨‍🏫", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/8" },
            { label: "Announcements", value: stats.announcements.toString(), icon: "📢", color: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/8" },
            { label: "Homework set", value: stats.homework.toString(), icon: "📚", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/8" },
          ].map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.08, duration: 0.4 }}
              className={`rounded-2xl border ${k.border} ${k.bg} p-5 text-center`}
            >
              <div className="text-xl mb-1">{k.icon}</div>
              <p className={`text-3xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-white/30 mt-1 leading-tight">{k.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.5, ease: EASE }}
            className="bg-white/5 border border-white/8 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white flex items-center gap-2 text-sm"><span>📢</span> Announcements</h2>
              <motion.button whileHover={{ scale: 1.05 }} className="text-xs bg-violet-500/20 text-violet-400 border border-violet-500/30 px-3 py-1.5 rounded-full font-medium hover:bg-violet-500/30 transition-colors">
                + Broadcast
              </motion.button>
            </div>
            {announcements.length === 0 ? (
              <p className="text-xs text-white/25 text-center py-4">No announcements yet</p>
            ) : (
              <ul className="space-y-4">
                {announcements.map((a, i) => (
                  <li key={a.id} className="text-sm border-b border-white/5 last:border-0 pb-4 last:pb-0">
                    <p className="font-medium text-white/80 leading-snug">{a.title}</p>
                    <p className="text-xs text-white/30 mt-1">Sent {formatDate(a.created_at)}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1 bg-white/8 rounded-full h-1 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: EASE }}
                          className="h-1 bg-emerald-500 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-emerald-400 font-medium">Delivered</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
            className="bg-white/5 border border-white/8 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white flex items-center gap-2 text-sm"><span>👥</span> School roster</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "Students enrolled", val: stats.students, icon: "🎒", color: "#10b981" },
                { label: "Teachers", val: stats.teachers, icon: "👨‍🏫", color: "#3b82f6" },
                { label: "Parents linked", val: stats.parents, icon: "👪", color: "#f97316" },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{r.icon}</span>
                    <span className="text-sm text-white/60">{r.label}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: r.color }}>{r.val}</span>
                </div>
              ))}
            </div>

            {schoolId && (
              <div className="mt-4 pt-4 border-t border-white/6">
                <p className="text-xs text-white/20 font-mono break-all">school_id: {schoolId}</p>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="bg-white/5 border border-white/8 rounded-2xl p-5"
        >
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm"><span>⚡</span> Quick actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {quickActions.map((a) => (
              <motion.button
                key={a}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.98 }}
                className="border border-white/8 bg-white/3 text-sm text-white/50 rounded-xl px-3 py-2.5 hover:text-white/80 transition-all text-left"
              >
                {a}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/3 rounded-2xl border border-white/6 p-5"
        >
          <h2 className="font-semibold text-white/40 mb-3 flex items-center gap-2 text-xs uppercase tracking-wider"><span>👤</span> Your profile</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div>
              <p className="text-white/25 text-xs mb-0.5">Name</p>
              <p className="text-white/70">{name || "—"}</p>
            </div>
            <div>
              <p className="text-white/25 text-xs mb-0.5">Role</p>
              <p className="text-white/70">School Admin</p>
            </div>
            <div>
              <p className="text-white/25 text-xs mb-0.5">Email</p>
              <p className="text-white/70">{email || "—"}</p>
            </div>
            <div>
              <p className="text-white/25 text-xs mb-0.5">School</p>
              <p className="text-white/70">{schoolName}</p>
            </div>
            <div className="col-span-2 mt-1 pt-3 border-t border-white/5">
              <p className="text-white/25 text-xs mb-1">Telegram / WhatsApp link</p>
              <p className="text-white/50 text-xs leading-relaxed">
                Open <span className="text-violet-400">@InfiziumBot</span> on Telegram and send{" "}
                <code className="bg-white/8 px-1.5 py-0.5 rounded text-white/70">/register &lt;your phone&gt;</code>
              </p>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <Link href="/" className="text-xs text-white/20 hover:text-white/50 transition-colors">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
