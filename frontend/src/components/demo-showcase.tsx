"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const tabs = [
  { id: "parent", label: "Parent", icon: "👩", name: "Lakshmi", color: "text-orange-400", active: "bg-orange-500/15 border-orange-500/40 text-orange-300" },
  { id: "teacher", label: "Teacher", icon: "👨‍🏫", name: "Ravi", color: "text-blue-400", active: "bg-blue-500/15 border-blue-500/40 text-blue-300" },
  { id: "student", label: "Student", icon: "🧑‍🎓", name: "Arjun", color: "text-emerald-400", active: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300" },
  { id: "admin", label: "Admin", icon: "🏫", name: "Priya", color: "text-violet-400", active: "bg-violet-500/15 border-violet-500/40 text-violet-300" },
];

// ── Parent preview ──────────────────────────────────────────────
function ParentScreen({ tick }: { tick: number }) {
  const present = tick % 2 === 0;
  return (
    <div className="p-5 space-y-4 text-white">
      {/* Child card */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-xl">🧑‍🎓</div>
        <div className="flex-1">
          <p className="font-semibold text-white text-sm">Arjun · Grade 9A</p>
          <p className="text-xs text-white/40">St. Joseph&apos;s High School</p>
        </div>
        <motion.div
          key={String(present)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${present ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${present ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
          {present ? "In school" : "Absent"}
        </motion.div>
      </div>

      {/* WhatsApp alert */}
      <AnimatePresence>
        {!present && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-[#075e54]/40 border border-[#128c7e]/40 rounded-xl p-3 flex gap-3 items-start"
          >
            <span className="text-lg">📱</span>
            <div>
              <p className="text-xs text-white/60 mb-0.5">WhatsApp · just now</p>
              <p className="text-sm text-white/90">Arjun was marked absent for Period 1 — Maths. Reply with reason.</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full">Sick today</span>
                <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full">Doctor visit</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Approvals */}
      <div className="bg-white/5 border border-white/8 rounded-xl p-4">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Pending approvals</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80 font-medium">Science Field Trip</p>
            <p className="text-xs text-white/30">Respond by Jun 8</p>
          </div>
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full cursor-pointer">Approve</motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 text-white/50 text-xs px-3 py-1 rounded-full cursor-pointer">Decline</motion.div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[{ v: "87%", l: "Attendance" }, { v: "2", l: "Due soon" }, { v: "1", l: "Pending" }].map(s => (
          <div key={s.l} className="bg-white/5 border border-white/8 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-orange-400">{s.v}</p>
            <p className="text-[10px] text-white/30">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Teacher preview ─────────────────────────────────────────────
const studentList = [
  { name: "Arjun", status: "present" },
  { name: "Bhavya", status: "absent" },
  { name: "Charan", status: "present" },
  { name: "Divya", status: "present" },
  { name: "Eswar", status: "late" },
  { name: "Fathima", status: "present" },
];

function TeacherScreen({ tick }: { tick: number }) {
  const saved = tick > 2;
  return (
    <div className="p-5 space-y-4 text-white">
      {/* Period badge */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white/80">Grade 9A · Period 3 · Maths</p>
        <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full">● Live</span>
      </div>

      {/* Student grid */}
      <div className="grid grid-cols-3 gap-2">
        {studentList.map((s, i) => {
          const style = s.status === "present"
            ? "bg-emerald-500/12 border-emerald-500/25 text-emerald-300"
            : s.status === "absent"
            ? "bg-red-500/12 border-red-500/25 text-red-300"
            : "bg-amber-500/12 border-amber-500/25 text-amber-300";
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className={`border rounded-xl px-3 py-2.5 text-xs font-medium ${style}`}
            >
              <p className="truncate">{s.name}</p>
              <p className="text-[10px] opacity-60 capitalize mt-0.5">{s.status}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Save button */}
      <AnimatePresence mode="wait">
        {!saved ? (
          <motion.div key="save" exit={{ opacity: 0 }} className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium text-center cursor-pointer hover:bg-blue-500 transition-colors">
            Save &amp; notify 1 parent on WhatsApp
          </motion.div>
        ) : (
          <motion.div key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 py-2.5 rounded-xl text-sm font-medium text-center flex items-center justify-center gap-2">
            <span>✓</span> Saved · WhatsApp sent to Bhavya&apos;s parent
          </motion.div>
        )}
      </AnimatePresence>

      {/* Homework bar */}
      <div className="bg-white/5 border border-white/8 rounded-xl p-4">
        <div className="flex justify-between mb-2">
          <p className="text-xs text-white/60">Ch 5 — Quadratic Equations · 9A</p>
          <p className="text-xs text-white/40">28/38</p>
        </div>
        <div className="w-full bg-white/8 rounded-full h-1.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "73%" }}
            transition={{ delay: 0.4, duration: 1, ease: EASE }}
            className="h-1.5 bg-blue-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

// ── Student preview ─────────────────────────────────────────────
const hwItems = [
  { sub: "Mathematics", title: "Ch 5 — Quadratic Equations", urgent: true, done: false },
  { sub: "English", title: "Essay: My Favourite Festival", urgent: false, done: false },
  { sub: "Science", title: "Lab diagram — Plant Cell", urgent: false, done: true },
];

function StudentScreen({ tick }: { tick: number }) {
  const streak = Math.min(tick + 3, 7);
  return (
    <div className="p-5 space-y-4 text-white">
      {/* Profile + streak */}
      <div className="bg-gradient-to-br from-indigo-950 to-violet-950 border border-indigo-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center text-lg">🧑‍🎓</div>
          <div>
            <p className="text-sm font-semibold text-white">Arjun · Grade 9A</p>
            <p className="text-xs text-white/30">87% attendance</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span className="text-orange-400">🔥</span>
            <span className="text-sm font-bold text-white">{streak}</span>
            <span className="text-xs text-white/30">day streak</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className={`flex-1 h-1.5 rounded-full ${i < streak ? "bg-emerald-500" : "bg-white/10"}`}
            />
          ))}
        </div>
      </div>

      {/* Homework */}
      <div className="space-y-2">
        <p className="text-xs text-white/40 uppercase tracking-widest">Homework</p>
        {hwItems.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={`flex items-center gap-3 p-3 rounded-xl border text-sm ${
              h.done ? "bg-white/3 border-white/5 opacity-40" : h.urgent ? "bg-red-500/8 border-red-500/20" : "bg-white/5 border-white/8"
            }`}
          >
            <div className={`w-4 h-4 rounded-md border flex-shrink-0 flex items-center justify-center ${h.done ? "bg-emerald-500 border-emerald-500 text-white text-[10px]" : "border-white/20"}`}>
              {h.done && "✓"}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium truncate ${h.done ? "line-through text-white/30" : "text-white/80"}`}>{h.title}</p>
              <p className="text-[10px] text-white/30">{h.sub}</p>
            </div>
            {h.urgent && !h.done && <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full flex-shrink-0">Tomorrow</span>}
          </motion.div>
        ))}
      </div>

      {/* Motivational tag */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-2.5 text-center">
        <p className="text-xs text-indigo-300">🎯 JEE 2028 · Keep pushing, Arjun.</p>
      </div>
    </div>
  );
}

// ── Admin preview ───────────────────────────────────────────────
const bars = [
  { class: "Grade 6A", pct: 90 },
  { class: "Grade 9B", pct: 73 },
  { class: "Grade 10A", pct: 98 },
  { class: "Grade 8A", pct: 89 },
];

function AdminScreen({ tick }: { tick: number }) {
  const absent = 94 - (tick % 4) * 2;
  return (
    <div className="p-5 space-y-4 text-white">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { v: "88%", l: "Attendance", c: "text-emerald-400", b: "bg-emerald-500/10 border-emerald-500/20" },
          { v: String(absent), l: "Absent today", c: "text-red-400", b: "bg-red-500/10 border-red-500/20" },
          { v: "3", l: "Announcements", c: "text-blue-400", b: "bg-blue-500/10 border-blue-500/20" },
          { v: "647", l: "Pending forms", c: "text-amber-400", b: "bg-amber-500/10 border-amber-500/20" },
        ].map((k) => (
          <motion.div key={k.l} layout className={`rounded-xl border ${k.b} p-3 text-center`}>
            <p className={`text-xl font-bold ${k.c}`}>{k.v}</p>
            <p className="text-[10px] text-white/30 mt-0.5">{k.l}</p>
          </motion.div>
        ))}
      </div>

      {/* Attendance bars */}
      <div className="bg-white/5 border border-white/8 rounded-xl p-4 space-y-2.5">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Live attendance</p>
        {bars.map((b, i) => (
          <div key={b.class} className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 w-16">{b.class}</span>
            <div className="flex-1 bg-white/8 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${b.pct}%` }}
                transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: EASE }}
                className={`h-1.5 rounded-full ${b.pct >= 90 ? "bg-emerald-500" : b.pct >= 80 ? "bg-amber-400" : "bg-red-500"}`}
              />
            </div>
            <span className={`text-[10px] font-bold w-8 text-right ${b.pct >= 90 ? "text-emerald-400" : b.pct >= 80 ? "text-amber-400" : "text-red-400"}`}>{b.pct}%</span>
          </div>
        ))}
      </div>

      {/* Broadcast strip */}
      <div className="flex items-center gap-3 bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-3">
        <span className="text-lg">📢</span>
        <p className="text-xs text-white/70 flex-1">School closed June 9 — board inspection</p>
        <span className="text-[10px] text-emerald-400 font-medium">612 read</span>
      </div>
    </div>
  );
}

// ── Main showcase ───────────────────────────────────────────────
export function DemoShowcase() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => setActive(a => (a + 1) % 4), 4000);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1500);
    return () => clearInterval(t);
  }, []);

  const screens = [
    <ParentScreen key="parent" tick={tick} />,
    <TeacherScreen key="teacher" tick={tick} />,
    <StudentScreen key="student" tick={tick} />,
    <AdminScreen key="admin" tick={tick} />,
  ];

  return (
    <section className="py-24 px-4 bg-[#09090b] relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb-1 absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-[80px]" />
        <div className="orb-2 absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-violet-500/8 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Live preview</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            A different experience for every role
          </h2>
          <p className="text-white/40 text-base">Switch personas to see how Infizium looks and feels for each user.</p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-8 flex-wrap"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                active === i ? t.active : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.name}</span>
              <span className="sm:hidden">{t.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
          className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
          style={{ background: "#111114" }}
        >
          {/* Browser chrome bar */}
          <div className="border-b border-white/8 px-4 py-3 flex items-center gap-3" style={{ background: "#0d0d10" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex-1 mx-2">
              <div className="bg-white/6 border border-white/8 rounded-lg px-3 py-1 flex items-center gap-2 max-w-[260px] mx-auto">
                <span className="text-emerald-400 text-xs">🔒</span>
                <span className="text-xs text-white/30 font-mono">infizium.com/dashboard/{tabs[active].id}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Live</span>
            </div>
          </div>

          {/* Dashboard header inside mockup */}
          <div className="border-b border-white/6 px-5 h-11 flex items-center justify-between" style={{ background: "#111114" }}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Infizium</span>
              <span className="text-white/15">|</span>
              <span className={`text-xs font-medium ${tabs[active].color}`}>
                {tabs[active].label} — {tabs[active].name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">{tabs[active].icon}</div>
            </div>
          </div>

          {/* Screen content */}
          <div className="min-h-[440px]" style={{ background: "#0c0c0e" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {screens[active]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar auto-cycle indicator */}
          <div className="h-0.5 bg-white/5">
            <motion.div
              key={active}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
              className={`h-0.5 ${
                active === 0 ? "bg-orange-500" : active === 1 ? "bg-blue-500" : active === 2 ? "bg-emerald-500" : "bg-violet-500"
              }`}
            />
          </div>
        </motion.div>

        {/* Caption */}
        <p className="text-center text-xs text-white/20 mt-4">
          Auto-cycling · click a tab to switch · all data is a live demo
        </p>
      </div>
    </section>
  );
}
