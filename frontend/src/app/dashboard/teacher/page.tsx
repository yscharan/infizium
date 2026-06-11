"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { DashboardNav } from "@/components/dashboard-nav";
import { getSession, clearSession } from "@/lib/session";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const students = [
  { name: "Arjun K.", roll: "01", status: "present" },
  { name: "Bhavya R.", roll: "02", status: "absent" },
  { name: "Charan S.", roll: "03", status: "present" },
  { name: "Divya M.", roll: "04", status: "present" },
  { name: "Eswar P.", roll: "05", status: "late" },
  { name: "Fathima B.", roll: "06", status: "present" },
  { name: "Ganesh T.", roll: "07", status: "present" },
  { name: "Harini L.", roll: "08", status: "absent" },
];

const homework = [
  { subject: "Mathematics", title: "Ch 5 — Quadratic Equations", class: "9A", due: "Tomorrow", submissions: 28, total: 38 },
  { subject: "Mathematics", title: "Ch 4 — Arithmetic Progressions", class: "9B", due: "Jun 7", submissions: 35, total: 40 },
  { subject: "Mathematics", title: "Practice Set — Triangles", class: "8A", due: "Jun 10", submissions: 12, total: 42 },
];

const statusStyle: Record<string, { bg: string; text: string; dot: string }> = {
  present: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  absent:  { bg: "bg-red-500/10",     text: "text-red-400",     dot: "bg-red-400" },
  late:    { bg: "bg-amber-500/10",   text: "text-amber-400",   dot: "bg-amber-400" },
};

const classes = [
  { name: "Grade 9A", subject: "Mathematics", time: "8:00 AM", done: true },
  { name: "Grade 8B", subject: "Mathematics", time: "9:30 AM", done: true },
  { name: "Grade 9B", subject: "Mathematics", time: "11:00 AM", done: false, current: true },
  { name: "Grade 8A", subject: "Mathematics", time: "2:00 PM", done: false },
];

export default function TeacherDashboard() {
  const router = useRouter();
  const [name, setName] = useState("Ravi");
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "teacher") { router.replace("/login"); return; }
    setName(s.name);
    setEmail(s.email ?? "");
    setReady(true);
  }, [router]);

  function signOut() { clearSession(); router.push("/login"); }

  const absent = students.filter(s => s.status === "absent").length;

  if (!ready) return <div className="min-h-screen bg-[#09090b]" />;

  return (
    <div className="min-h-screen bg-[#09090b]">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 border-b border-white/8"
        style={{ background: "rgba(9,9,11,0.85)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">Infizium</span>
            <span className="text-white/20">|</span>
            <span className="text-sm text-blue-400 font-medium">{name} — Mathematics</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-amber-500/15 text-amber-400 px-2.5 py-1 rounded-full font-medium border border-amber-500/20">
              Period 3 in progress
            </span>
            <button onClick={signOut} className="text-xs text-white/30 hover:text-white/60 transition-colors">Sign out</button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

        <DashboardNav
          tabs={[
            { id: "overview", label: "Today", icon: "📅", href: "/dashboard/teacher" },
            { id: "students", label: "Students", icon: "👥", href: "/dashboard/teacher" },
          ]}
          accentColor="#3b82f6"
          theme="dark"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl px-4 py-3 text-sm text-blue-300/80"
          style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}
        >
          Good morning, {name}. Period 3 starts in <span className="font-medium text-blue-400">20 minutes.</span> Bhavya and Harini haven&apos;t had parent confirmation for yesterday&apos;s absence.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="bg-white/5 rounded-2xl border border-white/8 p-5"
        >
          <h2 className="font-semibold text-white/70 text-sm mb-4 flex items-center gap-2"><span>📅</span> Today&apos;s classes</h2>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {classes.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className={`flex-shrink-0 rounded-xl px-4 py-3 border text-sm min-w-[120px] ${
                  c.current
                    ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/20"
                    : c.done
                    ? "bg-white/3 border-white/6 text-white/25"
                    : "bg-white/5 border-white/8 text-white/70"
                }`}
              >
                <p className="font-semibold">{c.name}</p>
                <p className={`text-xs mt-0.5 ${c.current ? "text-blue-100" : "text-white/30"}`}>{c.time}</p>
                {c.done && <p className="text-xs mt-1 text-emerald-400/70">✓ Done</p>}
                {c.current && <p className="text-xs mt-1 text-blue-100">● Now</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
          className="bg-white/5 rounded-2xl border border-white/8 overflow-hidden"
        >
          <div className="p-5 border-b border-white/6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-white/70 flex items-center gap-2 text-sm">
                <span>✅</span> Mark Attendance — Grade 9A · Period 3
              </h2>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <span className="w-2 h-2 rounded-full bg-red-400" /> {absent} absent
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {students.map((s, i) => (
                <motion.div
                  key={s.roll}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.04, duration: 0.3 }}
                  className={`rounded-xl px-3 py-2.5 text-sm flex items-center justify-between gap-2 border border-white/5 ${statusStyle[s.status].bg}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusStyle[s.status].dot}`} />
                    <span className={`font-medium ${statusStyle[s.status].text}`}>{s.name.split(" ")[0]}</span>
                  </div>
                  <span className={`text-[10px] capitalize opacity-60 ${statusStyle[s.status].text}`}>{s.status}</span>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-500 transition-colors shadow-sm shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              <span>💬</span> Save &amp; notify {absent} parent{absent !== 1 ? "s" : ""} on WhatsApp
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
          className="bg-white/5 rounded-2xl border border-white/8 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white/70 flex items-center gap-2 text-sm"><span>📚</span> Homework submissions</h2>
            <motion.button whileHover={{ scale: 1.04 }} className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-full font-medium hover:bg-blue-500/15 transition-colors">
              + New assignment
            </motion.button>
          </div>
          <ul className="space-y-3">
            {homework.map((h, i) => (
              <li key={i} className="text-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <span className="font-medium text-white/80">{h.title}</span>
                    <span className="text-xs text-white/30 ml-2">· {h.class} · Due {h.due}</span>
                  </div>
                  <span className="text-sm font-semibold text-white/60">{h.submissions}/{h.total}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(h.submissions / h.total) * 100}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: EASE }}
                    className={`h-1.5 rounded-full ${(h.submissions / h.total) > 0.7 ? "bg-emerald-500" : "bg-amber-400"}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5 }}
          className="bg-white/5 rounded-2xl border border-white/8 p-5"
        >
          <h2 className="font-semibold text-white/70 mb-3 flex items-center gap-2 text-sm"><span>⚡</span> Quick actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {["Post announcement", "Create form", "Message a parent", "View student progress", "Download attendance report", "Schedule PTM"].map((a) => (
              <motion.button
                key={a}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/3 border border-white/8 text-sm text-white/50 rounded-xl px-3 py-2.5 hover:bg-blue-500/8 hover:border-blue-500/20 hover:text-white/70 transition-all text-left"
              >
                {a}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.5, ease: EASE }}
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
              <p className="text-white/70">Teacher</p>
            </div>
            <div>
              <p className="text-white/25 text-xs mb-0.5">Email</p>
              <p className="text-white/70">{email || "—"}</p>
            </div>
            <div>
              <p className="text-white/25 text-xs mb-0.5">Subject</p>
              <p className="text-white/70">Mathematics</p>
            </div>
            <div className="col-span-2 mt-1 pt-3 border-t border-white/5">
              <p className="text-white/25 text-xs mb-1">Telegram / WhatsApp link</p>
              <p className="text-white/50 text-xs leading-relaxed">
                To chat with Infizium on Telegram, open <span className="text-blue-400">@InfiziumBot</span> and send{" "}
                <code className="bg-white/8 px-1.5 py-0.5 rounded text-white/70">/register &lt;your phone&gt;</code>
              </p>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <Link href="/" className="text-xs text-white/20 hover:text-white/40 transition-colors">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
