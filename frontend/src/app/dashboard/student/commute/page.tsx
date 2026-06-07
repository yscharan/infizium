"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { CommuteMap } from "@/components/commute-map";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BUDDIES = [
  {
    name: "Ravi K.",
    grade: "10A",
    avatar: "👦",
    mode: "Parent Car",
    modeColor: "#3b82f6",
    route: "Kukatpally → KPHB → School",
    eta: "7:45 AM",
    seats: 2,
    rating: 4.8,
    verified: true,
  },
  {
    name: "Divya S.",
    grade: "10B",
    avatar: "👧",
    mode: "Walk Group",
    modeColor: "#10b981",
    route: "Pragathi Nagar → Sarath City → School",
    eta: "7:50 AM",
    seats: 3,
    rating: 4.9,
    verified: true,
  },
  {
    name: "Akash T.",
    grade: "9A",
    avatar: "🧑",
    mode: "Auto Buddy",
    modeColor: "#f97316",
    route: "Miyapur → JNTU → School",
    eta: "7:55 AM",
    seats: 1,
    rating: 4.7,
    verified: true,
  },
];

const HISTORY = [
  { date: "Today", mode: "Bus #4", depart: "7:31 AM", arrive: "7:51 AM", status: "On time", statusColor: "#10b981" },
  { date: "Wed Jun 4", mode: "Bus #4", depart: "7:31 AM", arrive: "7:53 AM", status: "2 min late", statusColor: "#f59e0b" },
  { date: "Tue Jun 3", mode: "Parent Car", depart: "7:25 AM", arrive: "7:44 AM", status: "On time", statusColor: "#10b981" },
  { date: "Mon Jun 2", mode: "Bus #4", depart: "7:31 AM", arrive: "7:50 AM", status: "On time", statusColor: "#10b981" },
  { date: "Fri May 30", mode: "Walk Group", depart: "7:40 AM", arrive: "8:05 AM", status: "25 min", statusColor: "#10b981" },
];

const TABS = ["My Plan", "Find Buddy", "Live Track", "History"] as const;
type Tab = typeof TABS[number];

export default function StudentCommutePage() {
  const [activeTab, setActiveTab] = useState<Tab>("My Plan");
  const [sos, setSos] = useState(false);
  const [sosPressed, setSosPressed] = useState(false);

  function handleSos() {
    setSosPressed(true);
    setTimeout(() => {
      setSos(true);
      setSosPressed(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen" style={{ background: "#0a0f1a" }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 border-b"
        style={{ background: "rgba(10,15,26,0.9)", backdropFilter: "blur(20px)", borderColor: "rgba(16,185,129,0.12)" }}
      >
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">Infizium</span>
            <span className="text-white/20">|</span>
            <span className="text-sm text-emerald-400 font-medium">Student — Arjun</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/commute" className="text-xs text-white/30 hover:text-emerald-400 transition-colors">About Commute</Link>
            <Link href="/login" className="text-xs text-white/30 hover:text-white/60 transition-colors">Sign out</Link>
          </div>
        </div>
      </motion.header>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">

        {/* Dashboard nav */}
        <DashboardNav
          tabs={[
            { id: "overview", label: "Overview", icon: "🏠", href: "/dashboard/student" },
            { id: "progress", label: "Progress", icon: "📈", href: "/dashboard/student/progress" },
            { id: "commute", label: "Commute", icon: "🚌", href: "/dashboard/student/commute" },
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
          style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "rgba(110,231,183,0.9)" }}
        >
          Good morning, Arjun. Your bus departs in <span className="font-semibold text-emerald-300">14 minutes</span>. Walk to the stop at Kukatpally bus stand — you&apos;re 4 minutes away.
        </motion.div>

        {/* SOS button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex items-center justify-between rounded-2xl px-5 py-4"
          style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)" }}
        >
          <div>
            <p className="font-bold text-white text-sm">🆘 Emergency SOS</p>
            <p className="text-xs text-white/30 mt-0.5">Hold for 3 seconds — alerts parent + school admin with live location</p>
          </div>
          <AnimatePresence mode="wait">
            {sos ? (
              <motion.div
                key="alerted"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-xs px-4 py-2 rounded-full font-semibold"
                style={{ background: "rgba(239,68,68,0.3)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.5)" }}
              >
                ✓ Alert sent
              </motion.div>
            ) : (
              <motion.button
                key="sos"
                onMouseDown={handleSos}
                onTouchStart={handleSos}
                whileTap={{ scale: 0.93 }}
                className="relative px-5 py-2.5 rounded-full font-bold text-sm transition-all overflow-hidden"
                style={{ background: sosPressed ? "rgba(239,68,68,0.5)" : "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", color: "#f87171" }}
              >
                {sosPressed ? "Hold..." : "SOS"}
                {sosPressed && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(239,68,68,0.2)" }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 3, ease: "linear" }}
                  />
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl p-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: activeTab === t ? "rgba(16,185,129,0.15)" : "transparent",
                border: activeTab === t ? "1px solid rgba(16,185,129,0.35)" : "1px solid transparent",
                color: activeTab === t ? "#34d399" : "rgba(255,255,255,0.3)",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">

          {activeTab === "My Plan" && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-4"
            >
              {/* Active commute card */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-mono text-emerald-400/60 tracking-widest uppercase mb-1">Today&apos;s commute</p>
                    <p className="font-bold text-white text-lg">School Bus #4</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-400">LIVE</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[
                    { label: "Departs", val: "7:31 AM", icon: "🚌" },
                    { label: "Arrives school", val: "7:51 AM", icon: "🏫" },
                    { label: "Duration", val: "20 min", icon: "⏱️" },
                  ].map(i => (
                    <div key={i.label} className="text-center">
                      <p className="text-xl mb-1">{i.icon}</p>
                      <p className="text-sm font-bold text-white">{i.val}</p>
                      <p className="text-xs text-white/30">{i.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/30">
                  <span>📍</span> Board at: <span className="text-white/60">Kukatpally Bus Stand, Stop 6</span>
                </div>
              </div>

              {/* Infizium band status */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}>
                <p className="font-semibold text-white mb-3 text-sm flex items-center gap-2">⌚ Infizium Smart Band</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Battery", val: "84%", color: "#10b981" },
                    { label: "GPS signal", val: "Strong", color: "#10b981" },
                    { label: "Commute mode", val: "Active", color: "#00d4ff" },
                    { label: "Last sync", val: "7:18 AM", color: "rgba(255,255,255,0.4)" },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between text-sm">
                      <span className="text-white/30">{s.label}</span>
                      <span className="font-medium" style={{ color: s.color }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly schedule */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="font-semibold text-white mb-4 text-sm">This week&apos;s plan</p>
                <div className="space-y-2.5">
                  {[
                    { day: "Mon", mode: "School Bus #4", color: "#f59e0b" },
                    { day: "Tue", mode: "School Bus #4", color: "#f59e0b" },
                    { day: "Wed", mode: "School Bus #4", color: "#f59e0b" },
                    { day: "Thu", mode: "Parent Car (Ravi K.)", color: "#3b82f6" },
                    { day: "Fri", mode: "School Bus #4", color: "#f59e0b" },
                  ].map(d => (
                    <div key={d.day} className="flex items-center justify-between">
                      <span className="text-xs text-white/30 w-8">{d.day}</span>
                      <span className="flex-1 text-sm text-white/60">{d.mode}</span>
                      <span className="w-2 h-2 rounded-full ml-2" style={{ background: d.color }} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "Find Buddy" && (
            <motion.div
              key="buddy"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-4"
            >
              <div className="text-center py-3">
                <p className="text-sm text-white/40">Students near your route offering shared commutes</p>
              </div>

              {BUDDIES.map((b) => (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-2xl p-5 flex gap-4"
                  style={{ background: `${b.modeColor}06`, border: `1px solid ${b.modeColor}20` }}
                >
                  <div className="text-4xl">{b.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-white">{b.name}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${b.modeColor}15`, color: b.modeColor, border: `1px solid ${b.modeColor}30` }}>
                        {b.mode}
                      </span>
                      {b.verified && <span className="text-xs text-emerald-400">✓ Verified</span>}
                    </div>
                    <p className="text-xs text-white/30 mb-1">Grade {b.grade} · {b.route}</p>
                    <p className="text-xs text-white/40">ETA {b.eta} · {b.seats} seat{b.seats > 1 ? "s" : ""} available · ⭐ {b.rating}</p>
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="text-xs px-4 py-2 rounded-full font-semibold transition-colors"
                      style={{ background: `${b.modeColor}18`, border: `1px solid ${b.modeColor}35`, color: b.modeColor }}
                    >
                      Request
                    </motion.button>
                  </div>
                </motion.div>
              ))}

              <div
                className="rounded-2xl p-5 text-center text-sm text-white/30"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.07)" }}
              >
                <p className="mb-2 text-2xl">🙋</p>
                <p className="text-white/40 font-medium mb-1">Raise a commute request</p>
                <p className="text-xs leading-relaxed">Tell the school your route and preferred time. Admin will match you with a verified buddy or school bus extension.</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="mt-3 text-xs px-5 py-2 rounded-full font-medium"
                  style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399" }}
                >
                  + Raise request
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === "Live Track" && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-4"
            >
              <div className="rounded-2xl overflow-hidden">
                <CommuteMap compact={false} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Bus #4 position", val: "Kukatpally signal", icon: "🚌", color: "#f59e0b" },
                  { label: "ETA to school", val: "19 min", icon: "⏱️", color: "#10b981" },
                  { label: "Students on bus", val: "24 of 28", icon: "👥", color: "#3b82f6" },
                  { label: "Smart Band signal", val: "Strong", icon: "⌚", color: "#00d4ff" },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-4" style={{ background: `${s.color}08`, border: `1px solid ${s.color}18` }}>
                    <p className="text-xl mb-1">{s.icon}</p>
                    <p className="font-bold text-sm" style={{ color: s.color }}>{s.val}</p>
                    <p className="text-xs text-white/25 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "History" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-2.5"
            >
              {HISTORY.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl px-4 py-3.5 flex items-center justify-between"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div>
                    <p className="text-sm font-medium text-white/70">{h.date}</p>
                    <p className="text-xs text-white/30">{h.mode} · {h.depart} → {h.arrive}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: `${h.statusColor}12`, color: h.statusColor, border: `1px solid ${h.statusColor}25` }}>
                    {h.status}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>

        <div className="text-center pt-2">
          <Link href="/commute" className="text-xs text-white/20 hover:text-white/50 transition-colors">← About Infizium Commute</Link>
        </div>
      </div>
    </div>
  );
}
