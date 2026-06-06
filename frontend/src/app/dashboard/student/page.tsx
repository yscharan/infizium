"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StudentAnimatedBg } from "@/components/student-bg";
import { DashboardNav } from "@/components/dashboard-nav";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const homework = [
  { subject: "Mathematics", title: "Ch 5 — Quadratic Equations", teacher: "Ravi Sir", due: "Tomorrow", urgent: true, done: false },
  { subject: "English", title: "Essay: My Favourite Festival", teacher: "Meena Ma'am", due: "Jun 7", urgent: false, done: false },
  { subject: "Science", title: "Lab diagram — Plant Cell", teacher: "Suresh Sir", due: "Jun 10", urgent: false, done: true },
  { subject: "Social Studies", title: "Map work — Rivers of India", teacher: "Anitha Ma'am", due: "Jun 12", urgent: false, done: false },
];

const announcements = [
  { from: "Principal Priya", time: "Today 9:00 AM", text: "School closed June 9 — state board inspection.", tag: "Holiday", tagStyle: "bg-red-500/20 text-red-300" },
  { from: "Class Teacher Ravi", time: "Yesterday", text: "PTM scheduled June 15, 10 AM – 1 PM. Your parents have been notified.", tag: "Notice", tagStyle: "bg-blue-500/20 text-blue-300" },
  { from: "Sports Dept.", time: "Mon", text: "Football team selections — June 8 at 4 PM on the ground.", tag: "Sports", tagStyle: "bg-emerald-500/20 text-emerald-300" },
];

const streakDays = [true, true, true, false, true, true, false];
const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

export default function StudentDashboard() {
  const completed = homework.filter(h => h.done).length;
  const total = homework.length;

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white">
      {/* Header */}
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
            <span className="text-sm text-emerald-400 font-medium">Student</span>
          </div>
          <Link href="/login" className="text-xs text-white/30 hover:text-white/70 transition-colors">Sign out</Link>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

        {/* Nav */}
        <DashboardNav
          tabs={[
            { id: "overview", label: "Overview", icon: "🏠", href: "/dashboard/student" },
            { id: "progress", label: "Progress", icon: "📈", href: "/dashboard/student/progress" },
          ]}
          accentColor="#10b981"
          theme="dark"
        />

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl px-4 py-3 text-sm"
          style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)", color: "rgba(52,211,153,0.9)" }}
        >
          Good morning, Arjun! 🔥 5-day streak. <span className="font-semibold">2 assignments due this week.</span> Term exam in 12 days.
        </motion.div>

        {/* Hero profile — animated canvas background */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative overflow-hidden rounded-2xl border border-indigo-500/20 shadow-2xl shadow-indigo-950/60"
          style={{ background: "#070b18" }}
        >
          {/* Live canvas bg */}
          <StudentAnimatedBg />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b18]/85 via-[#070b18]/40 to-[#070b18]/70 pointer-events-none" />
          <div className="relative z-10 p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/30">
              🧑‍🎓
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-lg">Arjun</p>
              <p className="text-sm text-white/40">Grade 9 · Section A · Roll No. 01</p>
              <p className="text-xs text-white/30 mt-0.5">St. Joseph&apos;s High School, Hyderabad</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-emerald-400">87%</p>
              <p className="text-xs text-white/40">Attendance</p>
            </div>
          </div>

          {/* Streak */}
          <div className="relative z-10 mx-6 mb-6 pt-4 border-t border-white/10">
            <p className="text-xs text-white/40 mb-3 uppercase tracking-widest">This week</p>
            <div className="flex gap-2">
              {streakDays.map((active, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${active ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30" : "bg-white/5 text-white/20"}`}>
                    {active ? "✓" : dayLabels[i]}
                  </div>
                  <span className="text-[10px] text-white/30">{dayLabels[i]}</span>
                </motion.div>
              ))}
              <div className="ml-auto flex items-center gap-1.5">
                <span className="text-orange-400 text-lg">🔥</span>
                <div>
                  <p className="text-sm font-bold text-white">5 day streak</p>
                  <p className="text-[10px] text-white/30">Keep it up!</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Motivational quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 rounded-2xl px-5 py-4"
        >
          <p className="text-sm text-indigo-300 font-medium">&ldquo;Success is not final, failure is not fatal — it is the courage to continue that counts.&rdquo;</p>
          <p className="text-xs text-white/30 mt-1">Keep pushing, Arjun. JEE is within reach. 🎯</p>
        </motion.div>

        {/* Homework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
          className="bg-white/5 border border-white/8 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white flex items-center gap-2 text-sm">
              <span>📚</span> Homework
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex-1 w-24 bg-white/10 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completed / total) * 100}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
                  className="h-1.5 bg-emerald-400 rounded-full"
                />
              </div>
              <span className="text-xs text-white/40">{completed}/{total} done</span>
            </div>
          </div>
          <ul className="space-y-2">
            {homework.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                className={`flex items-start gap-3 p-3 rounded-xl border text-sm transition-all ${
                  h.done
                    ? "bg-white/3 border-white/5 opacity-40"
                    : h.urgent
                    ? "bg-red-500/8 border-red-500/20"
                    : "bg-white/3 border-white/8"
                }`}
              >
                <div className={`w-5 h-5 rounded-md border flex-shrink-0 mt-0.5 flex items-center justify-center ${h.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/20"}`}>
                  {h.done && <span className="text-[10px]">✓</span>}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${h.done ? "line-through text-white/30" : "text-white"}`}>{h.title}</p>
                  <p className="text-xs text-white/30 mt-0.5">{h.subject} · {h.teacher}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {h.urgent && !h.done && (
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">Tomorrow</span>
                  )}
                  {!h.urgent && <span className="text-xs text-white/30">{h.due}</span>}
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
          className="bg-white/5 border border-white/8 rounded-2xl p-5"
        >
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm"><span>📢</span> Announcements</h2>
          <ul className="space-y-3">
            {announcements.map((a, i) => (
              <li key={i} className="border-b border-white/5 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white/80">{a.from}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${a.tagStyle}`}>{a.tag}</span>
                  </div>
                  <span className="text-xs text-white/25">{a.time}</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{a.text}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Pocket Money Wallet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
          className="rounded-2xl p-5 border border-amber-500/20 overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(249,115,22,0.06))" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px]" style={{ background: "rgba(251,191,36,0.12)" }} />
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-mono text-amber-400/70 tracking-widest uppercase mb-1">My Wallet</p>
                <p className="text-3xl font-bold text-white">₹1,250</p>
                <p className="text-xs text-white/30 mt-0.5">Private balance · Parents cannot see this</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
            <div className="space-y-2">
              {[
                { from: "Anonymous Donor", amount: "+₹500", note: "JEE practice papers", time: "Jun 3" },
                { from: "Codename: StarGazer", amount: "+₹750", note: "Keep studying!", time: "May 28" },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3 text-xs p-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: "rgba(251,191,36,0.12)" }}>💎</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 font-medium truncate">{t.from}</p>
                    <p className="text-white/30">{t.note}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-amber-400">{t.amount}</p>
                    <p className="text-white/25">{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Link href="/sponsor" className="flex-1 text-center text-xs py-2 rounded-xl font-semibold text-amber-400/70 border border-amber-500/15 hover:bg-amber-500/10 transition-colors">
                Get more support →
              </Link>
              <button className="flex-1 text-center text-xs py-2 rounded-xl font-semibold text-white/30 border border-white/8 hover:bg-white/5 transition-colors">
                Send thank-you note
              </button>
            </div>
          </div>
        </motion.div>

        {/* AI Tutor teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-violet-500/20 p-5"
          style={{ background: "linear-gradient(135deg, #1e1b4b, #2e1065)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[40px]" />
          <div className="relative flex gap-4">
            <div className="w-10 h-10 bg-violet-500/20 border border-violet-500/30 rounded-xl flex items-center justify-center text-xl">🤖</div>
            <div>
              <p className="font-semibold text-white mb-1">AI Tutor — Coming Phase 3</p>
              <p className="text-sm text-violet-300/60 leading-relaxed">Ask doubts you&apos;re too shy to raise in class. Get feedback on essays. Practice with past papers. Powered by Amazon Bedrock.</p>
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
