"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { CommuteMap } from "@/components/commute-map";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ALERTS = [
  { time: "7:31 AM", icon: "✅", text: "Arjun boarded Bus #4 at Kukatpally Bus Stand", color: "#10b981" },
  { time: "7:18 AM", icon: "⌚", text: "Smart Band activated — commute mode started", color: "#00d4ff" },
  { time: "Yesterday 3:52 PM", icon: "🏠", text: "Arjun reached home. Commute: 18 min", color: "#a78bfa" },
];

const HISTORY = [
  { date: "Today", depart: "7:31 AM", arrive: "7:51 AM (est)", mode: "Bus #4", status: "In transit", statusColor: "#f59e0b" },
  { date: "Wed Jun 4", depart: "7:31 AM", arrive: "7:53 AM", mode: "Bus #4", status: "Safe", statusColor: "#10b981" },
  { date: "Tue Jun 3", depart: "7:25 AM", arrive: "7:44 AM", mode: "Parent Car (Ravi K.)", status: "Safe", statusColor: "#10b981" },
  { date: "Mon Jun 2", depart: "7:31 AM", arrive: "7:50 AM", mode: "Bus #4", status: "Safe", statusColor: "#10b981" },
];

const TABS = ["Live View", "Alerts", "History", "Permissions"] as const;
type Tab = typeof TABS[number];

export default function ParentCommutePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Live View");

  return (
    <div className="min-h-screen bg-[#09090b]">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 border-b border-white/8"
        style={{ background: "rgba(9,9,11,0.85)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">Infizium</span>
            <span className="text-white/20">|</span>
            <span className="text-sm text-orange-400 font-medium">Parent — Lakshmi</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/commute" className="text-xs text-white/30 hover:text-orange-400 transition-colors">About Commute</Link>
            <Link href="/login" className="text-xs text-white/30 hover:text-white/60 transition-colors">Sign out</Link>
          </div>
        </div>
      </motion.header>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">

        <DashboardNav
          tabs={[
            { id: "overview", label: "Overview", icon: "🏠", href: "/dashboard/parent" },
            { id: "permissions", label: "Permissions", icon: "🔒", href: "/dashboard/parent/permissions" },
            { id: "commute", label: "Commute", icon: "🚌", href: "/dashboard/parent/commute" },
          ]}
          accentColor="#f97316"
          theme="dark"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl px-4 py-3 text-sm text-orange-300/80"
          style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)" }}
        >
          Good morning, Lakshmi. <span className="font-semibold text-orange-400">Arjun boarded Bus #4 at 7:31 AM</span> — estimated arrival at school in 12 minutes.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
          className="rounded-2xl p-5 border border-white/8"
          style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(245,158,11,0.05) 100%)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-mono text-orange-400/50 tracking-widest uppercase mb-1">Arjun Sharma · Grade 10A</p>
              <p className="font-bold text-white text-xl">On the way to school 🚌</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: "Boarded", val: "7:31 AM", icon: "✅", color: "#10b981" },
              { label: "Bus", val: "#4", icon: "🚌", color: "#f59e0b" },
              { label: "ETA school", val: "7:51 AM", icon: "🏫", color: "#3b82f6" },
              { label: "Band signal", val: "Strong", icon: "⌚", color: "#00d4ff" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-xl mb-1">{s.icon}</p>
                <p className="text-sm font-bold" style={{ color: s.color }}>{s.val}</p>
                <p className="text-xs text-white/30">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-white/30">
            <span>📍</span>
            <span>Last seen: <span className="text-white/60 font-medium">Near Kukatpally signal — 7:34 AM</span></span>
          </div>
        </motion.div>

        <div className="flex gap-1 rounded-xl p-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: activeTab === t ? "rgba(249,115,22,0.12)" : "transparent",
                border: activeTab === t ? "1px solid rgba(249,115,22,0.3)" : "1px solid transparent",
                color: activeTab === t ? "#fb923c" : "rgba(255,255,255,0.3)",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {activeTab === "Live View" && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-4"
            >
              <div className="rounded-2xl overflow-hidden border border-white/8">
                <CommuteMap compact={false} />
              </div>

              <div className="rounded-2xl p-5 bg-white/5 border border-white/8">
                <p className="text-sm font-semibold text-white/70 mb-4">Route progress</p>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-center">
                      <p className="text-sm">🏠</p>
                      <p className="text-xs text-white/30">Home</p>
                      <p className="text-xs text-white/50 font-medium">7:28</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm">🚌</p>
                      <p className="text-xs text-white/30">Bus stop</p>
                      <p className="text-xs text-white/50 font-medium">7:31</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm">📍</p>
                      <p className="text-xs text-orange-400 font-semibold">Now</p>
                      <p className="text-xs text-orange-400/70 font-medium">7:34</p>
                    </div>
                    <div className="text-center opacity-30">
                      <p className="text-sm">🏫</p>
                      <p className="text-xs text-white/30">School</p>
                      <p className="text-xs text-white/50 font-medium">~7:51</p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "35%" }}
                      transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
                      style={{ background: "linear-gradient(90deg, #10b981, #f59e0b)" }}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-4 border border-blue-500/15 bg-blue-500/5">
                <p className="text-sm font-semibold text-blue-400 mb-2">Bus driver info</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🧑‍✈️</div>
                  <div>
                    <p className="text-sm font-bold text-white/80">Rajesh Kumar</p>
                    <p className="text-xs text-blue-400/60">Bus #4 · Verified by St. Joseph&apos;s · License: AP09H1234</p>
                    <p className="text-xs text-white/25 mt-0.5">On route since 2019</p>
                  </div>
                  <a href="tel:+919876543210" className="ml-auto text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.25)" }}>
                    📞 Call
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "Alerts" && (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-3"
            >
              {ALERTS.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 rounded-xl p-4 bg-white/5 border border-white/8"
                >
                  <div className="text-xl flex-shrink-0">{a.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm text-white/70">{a.text}</p>
                    <p className="text-xs text-white/25 mt-0.5">{a.time}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: a.color }} />
                </motion.div>
              ))}
              <div className="text-center pt-2">
                <p className="text-xs text-white/20">Alerts delivered via WhatsApp · All times IST</p>
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
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 bg-white/5 border border-white/8"
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

          {activeTab === "Permissions" && (
            <motion.div
              key="perms"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="space-y-3"
            >
              <p className="text-sm text-white/40 mb-2">Control what the school can see and when tracking is active.</p>

              {[
                { label: "Live location tracking", desc: "School and parent can see Arjun's position during commute window", enabled: true },
                { label: "Smart Band data", desc: "Infizium Tag/Band shares location. Stops at school arrival.", enabled: true },
                { label: "Share with bus driver", desc: "Driver sees Arjun's boarding status and contact info", enabled: true },
                { label: "Share with buddy parent", desc: "If using parent car pool, buddy's parent sees Arjun's pickup status", enabled: false },
                { label: "Post-school tracking", desc: "Tracking continues on the return commute", enabled: true },
              ].map((p) => (
                <div
                  key={p.label}
                  className="flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 bg-white/5 border border-white/8"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white/80">{p.label}</p>
                    <p className="text-xs text-white/30 mt-0.5">{p.desc}</p>
                  </div>
                  <div
                    className="w-10 h-6 rounded-full relative cursor-pointer transition-colors flex-shrink-0"
                    style={{ background: p.enabled ? "#f97316" : "rgba(255,255,255,0.12)" }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all"
                      style={{ left: p.enabled ? "22px" : "2px" }}
                    />
                  </div>
                </div>
              ))}

              <div className="rounded-xl px-4 py-3 border border-orange-500/15 text-xs text-orange-300/50" style={{ background: "rgba(249,115,22,0.05)" }}>
                Per DPDP Act 2023 — location data is retained for 48 hours only. School admin cannot share with third parties.
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        <div className="text-center pt-2">
          <Link href="/commute" className="text-xs text-white/20 hover:text-white/40 transition-colors">← About Infizium Commute</Link>
        </div>
      </div>
    </div>
  );
}
