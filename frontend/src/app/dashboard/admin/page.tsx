"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DashboardNav } from "@/components/dashboard-nav";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const classAttendance = [
  { class: "Grade 6A", present: 38, total: 42, pct: 90 },
  { class: "Grade 7B", present: 35, total: 40, pct: 88 },
  { class: "Grade 8A", present: 40, total: 45, pct: 89 },
  { class: "Grade 9A", present: 34, total: 38, pct: 89 },
  { class: "Grade 9B", present: 29, total: 40, pct: 73 },
  { class: "Grade 10A", present: 44, total: 45, pct: 98 },
];

const announcements = [
  { title: "School closed June 9 — State board inspection", sent: "Today 9:00 AM", reach: 780, read: 612 },
  { title: "PTM scheduled June 15, 10 AM – 1 PM", sent: "Yesterday", reach: 780, read: 541 },
  { title: "Annual Day rehearsal — June 12", sent: "Jun 2", reach: 780, read: 708 },
];

const forms = [
  { title: "Science Field Trip — Nehru Zoological Park", sent: "Jun 1", responses: 312, total: 780 },
  { title: "Parent-Teacher Meeting — June 15", sent: "Jun 3", responses: 601, total: 780 },
];

const quickActions = ["Broadcast announcement", "Create consent form", "Export attendance", "Add student", "Invite teacher", "View all parents", "School settings", "Board report"];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
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
            <span className="text-sm text-violet-400 font-medium">Admin — Priya</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-white/8 text-white/50 px-2.5 py-1 rounded-full border border-white/10">St. Joseph&apos;s High School</span>
            <Link href="/login" className="text-xs text-white/30 hover:text-white/60 transition-colors">Sign out</Link>
          </div>
        </div>
      </motion.header>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">

        {/* Nav */}
        <DashboardNav
          tabs={[
            { id: "overview", label: "Overview", icon: "🏠", href: "/dashboard/admin" },
            { id: "reports", label: "Reports", icon: "📊", href: "/dashboard/admin/reports" },
          ]}
          accentColor="#7c3aed"
          theme="dark"
        />

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl px-4 py-3 text-sm"
          style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", color: "rgba(167,139,250,0.9)" }}
        >
          Good morning, Priya. School-wide attendance is <span className="font-semibold text-violet-300">88%</span> today. 47 parents haven&apos;t responded to the Field Trip form — deadline is Jun 8.
        </motion.div>

        {/* KPI row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { label: "Attendance today", value: "88%", icon: "📊", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/8" },
            { label: "Absent today", value: "94", icon: "⚠️", color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/8" },
            { label: "Announcements", value: "3", icon: "📢", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/8" },
            { label: "Pending forms", value: "647", icon: "📋", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/8" },
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

        {/* Attendance bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
          className="bg-white/5 border border-white/8 rounded-2xl p-5"
        >
          <h2 className="font-semibold text-white text-sm mb-5 flex items-center gap-2"><span>✅</span> Live attendance — today</h2>
          <div className="space-y-3">
            {classAttendance.map((c, i) => (
              <div key={c.class} className="flex items-center gap-3">
                <span className="w-20 text-xs text-white/50 font-medium">{c.class}</span>
                <div className="flex-1 bg-white/8 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ delay: 0.25 + i * 0.08, duration: 0.9, ease: EASE }}
                    className={`h-2 rounded-full ${c.pct >= 90 ? "bg-emerald-500" : c.pct >= 80 ? "bg-amber-400" : "bg-red-500"}`}
                  />
                </div>
                <span className={`w-24 text-right text-xs font-bold ${c.pct >= 90 ? "text-emerald-400" : c.pct >= 80 ? "text-amber-400" : "text-red-400"}`}>
                  {c.present}/{c.total} · {c.pct}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Announcements */}
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
            <ul className="space-y-4">
              {announcements.map((a, i) => (
                <li key={i} className="text-sm border-b border-white/5 last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-white/80 leading-snug">{a.title}</p>
                  <p className="text-xs text-white/30 mt-1">Sent {a.sent}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 bg-white/8 rounded-full h-1 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(a.read / a.reach) * 100}%` }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: EASE }}
                        className="h-1 bg-emerald-500 rounded-full"
                      />
                    </div>
                    <span className="text-xs text-emerald-400 font-medium">{a.read} read</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Forms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
            className="bg-white/5 border border-white/8 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white flex items-center gap-2 text-sm"><span>📋</span> Forms &amp; Approvals</h2>
              <motion.button whileHover={{ scale: 1.05 }} className="text-xs bg-violet-500/20 text-violet-400 border border-violet-500/30 px-3 py-1.5 rounded-full font-medium hover:bg-violet-500/30 transition-colors">
                + New form
              </motion.button>
            </div>
            <ul className="space-y-5">
              {forms.map((f, i) => (
                <li key={i} className="text-sm border-b border-white/5 last:border-0 pb-5 last:pb-0">
                  <p className="font-medium text-white/80 leading-snug">{f.title}</p>
                  <p className="text-xs text-white/30 mt-1">Sent {f.sent}</p>
                  <div className="mt-2.5 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Response rate</span>
                      <span className="text-white/60 font-medium">{f.responses}/{f.total}</span>
                    </div>
                    <div className="w-full bg-white/8 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(f.responses / f.total) * 100}%` }}
                        transition={{ delay: 0.45 + i * 0.1, duration: 0.9, ease: EASE }}
                        className="h-1.5 bg-violet-500 rounded-full"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-amber-400/80 mt-1.5">{f.total - f.responses} parents yet to respond</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Quick actions */}
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

        <div className="text-center">
          <Link href="/" className="text-xs text-white/20 hover:text-white/50 transition-colors">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
