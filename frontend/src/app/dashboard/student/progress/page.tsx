"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DashboardNav } from "@/components/dashboard-nav";
import { StudentAnimatedBg } from "@/components/student-bg";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STUDENT_TABS = [
  { id: "overview", label: "Overview", icon: "🏠", href: "/dashboard/student" },
  { id: "progress", label: "Progress", icon: "📈", href: "/dashboard/student/progress" },
];

const SUBJECTS = [
  { name: "Mathematics", score: 89, prev: 74, trend: "↑", color: "#6366f1", grade: "A" },
  { name: "Science", score: 76, prev: 81, trend: "↓", color: "#10b981", grade: "B+" },
  { name: "English", score: 62, prev: 58, trend: "↑", color: "#f59e0b", grade: "C+" },
  { name: "Social Studies", score: 84, prev: 80, trend: "↑", color: "#3b82f6", grade: "A-" },
  { name: "Telugu", score: 91, prev: 88, trend: "↑", color: "#ec4899", grade: "A+" },
  { name: "Hindi", score: 70, prev: 70, trend: "→", color: "#a78bfa", grade: "B" },
];

const ATTENDANCE_WEEKS = [
  { week: "W18", days: 5 },
  { week: "W19", days: 4 },
  { week: "W20", days: 5 },
  { week: "W21", days: 3 },
  { week: "W22", days: 5 },
  { week: "W23", days: 4 },
];

const MILESTONES = [
  { icon: "🔥", text: "5-day attendance streak", date: "Jun 6", done: true },
  { icon: "📚", text: "15 homework assignments completed", date: "Jun 5", done: true },
  { icon: "⭐", text: "First 90+ score in Maths", date: "May 30", done: true },
  { icon: "🎯", text: "Score 80+ in English essay", date: "Upcoming", done: false },
  { icon: "🏆", text: "Maintain 85%+ attendance for full term", date: "Upcoming", done: false },
];

const EXAM_COUNTDOWN = 12;

export default function StudentProgress() {
  const avg = Math.round(SUBJECTS.reduce((s, sub) => s + sub.score, 0) / SUBJECTS.length);
  const hwCompletionRate = 78;

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-white/8 glass-dark sticky top-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">Infizium</span>
            <span className="text-white/20">|</span>
            <span className="text-sm text-emerald-400 font-medium">Arjun · Progress</span>
          </div>
          <Link href="/login" className="text-xs text-white/30 hover:text-white/70 transition-colors">Sign out</Link>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

        <DashboardNav tabs={STUDENT_TABS} accentColor="#10b981" theme="dark" />

        {/* Summary hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative overflow-hidden rounded-2xl border border-indigo-500/20 shadow-2xl"
          style={{ background: "#070b18" }}
        >
          <StudentAnimatedBg />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b18]/90 via-[#070b18]/50 to-transparent pointer-events-none" />
          <div className="relative z-10 p-6">
            <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-3">This term</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-3xl font-bold text-white">{avg}%</p>
                <p className="text-xs text-white/40">Avg. score</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-400">87%</p>
                <p className="text-xs text-white/40">Attendance</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-400">{hwCompletionRate}%</p>
                <p className="text-xs text-white/40">HW completion</p>
              </div>
            </div>

            {/* Exam countdown */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
              <div className="text-2xl">⏳</div>
              <div>
                <p className="text-sm font-semibold text-white">{EXAM_COUNTDOWN} days to Term Exam</p>
                <p className="text-xs text-white/30">English and Science need attention before the exam.</p>
              </div>
              <div
                className="ml-auto text-right flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)" }}
              >
                Exam in {EXAM_COUNTDOWN}d
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subject breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
          className="bg-white/5 border border-white/8 rounded-2xl p-5"
        >
          <h2 className="font-semibold text-white text-sm mb-5 flex items-center gap-2">📊 Subject performance</h2>
          <div className="space-y-4">
            {SUBJECTS.map((s, i) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white/80">{s.name}</span>
                    <span className="text-[10px] font-mono" style={{ color: s.trend === "↑" ? "#10b981" : s.trend === "↓" ? "#f87171" : "#94a3b8" }}>
                      {s.trend} {s.prev}%→{s.score}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white/60">{s.grade}</span>
                    <span className="text-sm font-bold text-white">{s.score}%</span>
                  </div>
                </div>
                <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.score}%` }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.8, ease: EASE }}
                    className="h-1.5 rounded-full"
                    style={{ background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Focus recommendation */}
          <div className="mt-5 p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <p className="text-xs font-semibold text-red-400 mb-0.5">⚠️ Needs attention</p>
            <p className="text-xs text-white/40">English (62%) is below the 70% threshold. Focus on essay writing before the June 18 exam.</p>
          </div>
        </motion.div>

        {/* Attendance trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
          className="bg-white/5 border border-white/8 rounded-2xl p-5"
        >
          <h2 className="font-semibold text-white text-sm mb-5 flex items-center gap-2">✅ Attendance trend</h2>
          <div className="flex items-end gap-3 h-24">
            {ATTENDANCE_WEEKS.map((w, i) => (
              <motion.div
                key={w.week}
                initial={{ height: 0 }}
                animate={{ height: `${(w.days / 5) * 100}%` }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: EASE }}
                className="flex-1 flex flex-col items-center justify-end gap-1"
              >
                <span className="text-[9px] text-white/30">{w.days}/5</span>
                <div
                  className="w-full rounded-t-lg transition-colors"
                  style={{
                    height: "100%",
                    background: w.days === 5 ? "#10b981" : w.days >= 4 ? "#f59e0b" : "#f87171",
                  }}
                />
                <span className="text-[9px] text-white/25">{w.week}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-white/25 mt-3">Term attendance: 27/30 days · 90% · Required minimum: 75%</p>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.5, ease: EASE }}
          className="bg-white/5 border border-white/8 rounded-2xl p-5"
        >
          <h2 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">🏅 Milestones</h2>
          <ul className="space-y-3">
            {MILESTONES.map((m, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${m.done ? "bg-emerald-500/20" : "bg-white/5"}`}>
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${m.done ? "text-white/80" : "text-white/35"}`}>{m.text}</p>
                  <p className="text-[10px] text-white/25">{m.date}</p>
                </div>
                {m.done ? (
                  <span className="text-emerald-400 text-sm flex-shrink-0">✓</span>
                ) : (
                  <span className="text-[10px] text-white/20 flex-shrink-0">Upcoming</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* JEE readiness */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-violet-500/20 p-5"
          style={{ background: "linear-gradient(135deg, #1e1b4b, #2e1065)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[40px]" />
          <div className="relative">
            <p className="text-xs font-mono text-violet-400/60 tracking-widest uppercase mb-2">JEE Readiness Index</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-4xl font-bold text-white">42<span className="text-xl text-violet-300">/100</span></p>
                <p className="text-xs text-violet-300/60 mt-1">Grade 9 benchmark · Updated weekly</p>
              </div>
              <div className="flex-1">
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "42%" }}
                    transition={{ delay: 0.5, duration: 1, ease: EASE }}
                    className="h-2 rounded-full"
                    style={{ background: "linear-gradient(90deg, #7c3aed, #a78bfa)" }}
                  />
                </div>
                <p className="text-xs text-violet-300/40 mt-2">Maths strong · Physics needs work in Gr. 11</p>
              </div>
            </div>
            <div className="mt-3 text-xs text-violet-300/40">AI Tutor unlocks in Phase 3 to accelerate this index ›</div>
          </div>
        </motion.div>

        <div className="text-center">
          <Link href="/dashboard/student" className="text-xs text-white/20 hover:text-white/50 transition-colors">← Back to overview</Link>
        </div>
      </div>
    </div>
  );
}
