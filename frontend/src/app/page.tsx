"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { APP_VERSION } from "@/lib/version";
import { useState, useEffect } from "react";
import { DemoShowcase } from "@/components/demo-showcase";
import { HeroCanvas } from "@/components/hero-canvas";
import { SponsorChat } from "@/components/sponsor-chat";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function useScramble(text: string, duration = 1400) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#!";
    let t0: number | null = null;
    let raf: number;
    setOut(text.split("").map(c => /\S/.test(c) ? chars[~~(Math.random() * chars.length)] : c).join(""));
    const loop = (ts: number) => {
      if (!t0) t0 = ts;
      const pct = Math.min((ts - t0) / duration, 1);
      const resolved = Math.floor(pct * text.length);
      setOut(text.split("").map((c, i) => {
        if (!/\S/.test(c)) return c;
        if (i < resolved) return c;
        return chars[~~(Math.random() * chars.length)];
      }).join(""));
      if (pct < 1) raf = requestAnimationFrame(loop);
      else setOut(text);
    };
    const to = setTimeout(() => { raf = requestAnimationFrame(loop); }, 500);
    return () => { clearTimeout(to); cancelAnimationFrame(raf); };
  }, [text, duration]);
  return out;
}

const personas = [
  {
    role: "Parent", name: "Lakshmi", icon: "👩",
    neon: "#f97316",
    description: "Receives attendance alerts on WhatsApp within minutes. Approves field trips with a single reply.",
    needs: ["Know child is safe", "Approve forms on WhatsApp", "See homework due dates"],
    href: "/dashboard/parent",
  },
  {
    role: "Teacher", name: "Ravi", icon: "👨‍🏫",
    neon: "#3b82f6",
    description: "Marks attendance for 40 students in under 2 minutes. Parents notified automatically.",
    needs: ["Mark attendance fast", "Assign homework", "Message parents via platform"],
    href: "/dashboard/teacher",
  },
  {
    role: "Student", name: "Arjun", icon: "🧑‍🎓",
    neon: "#10b981",
    description: "Sees all pending homework in one feed. Never misses an announcement.",
    needs: ["Check homework due dates", "See announcements", "Track progress"],
    href: "/dashboard/student",
  },
  {
    role: "Admin", name: "Priya", icon: "🏫",
    neon: "#7c3aed",
    description: "Views school-wide attendance in real time. Broadcasts circulars with delivery tracking.",
    needs: ["Real-time attendance view", "Broadcast announcements", "Track form approvals"],
    href: "/dashboard/admin",
  },
];

const modules = [
  { icon: "✅", title: "Attendance", desc: "Teachers mark on mobile. Parents get WhatsApp alerts under 10 minutes." },
  { icon: "📚", title: "Homework", desc: "Assign with a due date. Parents notified automatically. Students see a clean feed." },
  { icon: "📢", title: "Announcements", desc: "Broadcast to the whole school, a class, or a section." },
  { icon: "📋", title: "Forms & Approvals", desc: "Parents approve trips and consents on WhatsApp. Full audit trail." },
  { icon: "💬", title: "WhatsApp-First", desc: "Every parent notification goes through WhatsApp. No new app to install." },
  { icon: "🔐", title: "Parent Permissions", desc: "Parents control what is shared and what features are active for their child." },
];

const stats = [
  { value: "90%+", label: "Parents on WhatsApp in Telangana" },
  { value: "2 min", label: "To mark attendance for a full class" },
  { value: "0", label: "App downloads required for parents" },
  { value: "800", label: "Students per school in pilot" },
];

export default function Home() {
  const badge = useScramble("TELANGANA'S SCHOOL OPERATING SYSTEM");

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#020818" }}>

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: "rgba(2, 8, 24, 0.8)", backdropFilter: "blur(20px)", borderColor: "rgba(0, 212, 255, 0.12)" }}
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <span className="font-bold text-[17px] tracking-tight text-white">
            Infizium
            <span className="ml-2 text-[10px] font-mono text-cyan-500/60 tracking-widest">v{APP_VERSION}</span>
          </span>
          <div className="flex items-center gap-6">
            <Link href="#personas" className="text-sm text-white/40 hover:text-cyan-400 transition-colors hidden sm:block">Who it&apos;s for</Link>
            <Link href="#modules" className="text-sm text-white/40 hover:text-cyan-400 transition-colors hidden sm:block">Features</Link>
            <Link
              href="/login"
              className="text-sm px-4 py-1.5 rounded-full font-medium transition-all duration-200 hover:scale-[1.03]"
              style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff" }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-28 px-4 min-h-[92vh] flex items-center">
        {/* Full-section particle canvas */}
        <HeroCanvas />

        {/* Cyber grid overlay */}
        <div className="absolute inset-0 cyber-grid pointer-events-none opacity-70" />

        {/* Depth orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[80px]" style={{ background: "rgba(0,212,255,0.06)" }} />
          <div className="orb-2 absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[80px]" style={{ background: "rgba(139,92,246,0.10)" }} />
          <div className="orb-3 absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full blur-[80px]" style={{ background: "rgba(0,212,255,0.04)" }} />
        </div>

        {/* Holographic ring — desktop only */}
        <div
          className="absolute right-[8%] top-1/2 -translate-y-1/2 w-64 h-64 hidden xl:block pointer-events-none"
          style={{ perspective: "600px" }}
        >
          <div className="holo-ring holo-ring-a" />
          <div className="holo-ring holo-ring-b" />
          <div className="holo-ring holo-ring-c" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#00d4ff", animation: "neon-pulse 2s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
            style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00d4ff" }} />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase" style={{ color: "#00d4ff" }}>
              {badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            Prepare students{" "}
            <span className="cyber-gradient-text">for life,</span>
            <br />not just exams.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="text-lg text-white/40 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Infizium connects parents, teachers, students, and admins through a single platform — with WhatsApp as the primary channel for every parent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02]"
              style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.4)", color: "#00d4ff", boxShadow: "0 0 30px rgba(0,212,255,0.15)" }}
            >
              Explore the platform
              <span>→</span>
            </Link>
            <a
              href="#personas"
              className="inline-flex items-center justify-center gap-2 border border-white/12 text-white/60 px-7 py-3.5 rounded-xl font-medium hover:bg-white/5 transition-all duration-200 hover:border-white/20"
            >
              See who it&apos;s for
            </a>
          </motion.div>

          {/* Floating tech tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mt-10"
          >
            {["WhatsApp-First", "AI-Powered (Phase 3)", "AWS Serverless", "Telangana Schools"].map(tag => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product showcase */}
      <DemoShowcase />

      {/* Stats bar */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="border-y py-10 px-4"
        style={{ background: "rgba(0,212,255,0.02)", borderColor: "rgba(0,212,255,0.08)" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <p className="text-3xl font-bold mb-1" style={{ color: "#00d4ff" }}>{s.value}</p>
              <p className="text-sm text-white/35">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* WhatsApp callout */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="py-14 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#075e54] to-[#128c7e] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 shadow-lg shadow-green-900/10">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">📱</div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-white mb-2">No app download required for parents</h2>
              <p className="text-green-100/80 text-sm leading-relaxed max-w-xl">
                Over 90% of parents in Telangana are already on WhatsApp. Attendance alerts, homework reminders, and approval requests arrive as WhatsApp messages — parents reply right there.
              </p>
              <Link href="/whatsapp" className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-200/80 hover:text-white transition-colors mt-3">
                See the full WhatsApp flow →
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Personas */}
      <section id="personas" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Built for everyone in the school</h2>
            <p className="text-white/25 text-base">Click a card to preview that role&apos;s dashboard.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {personas.map((p) => (
              <motion.div key={p.role} variants={fadeUp}>
                <Link href={p.href} className="group relative block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5">
                  {/* Glass base */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: "rgba(2, 8, 24, 0.85)", backdropFilter: "blur(20px)" }}
                  />
                  {/* Neon border */}
                  <div
                    className="absolute inset-0 rounded-2xl transition-all duration-300"
                    style={{ border: `1px solid ${p.neon}35`, boxShadow: `inset 0 0 0 1px ${p.neon}15` }}
                  />
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(ellipse at top, ${p.neon}18, transparent 70%)`,
                      boxShadow: `0 0 50px ${p.neon}25, 0 0 0 1px ${p.neon}50`,
                    }}
                  />
                  {/* Content */}
                  <div className="relative p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{p.icon}</span>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: p.neon }}>{p.role}</span>
                        <p className="font-semibold text-white/70 text-sm">{p.name}</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/35 leading-relaxed">{p.description}</p>
                    <ul className="mt-auto space-y-1.5">
                      {p.needs.map((n) => (
                        <li key={n} className="flex items-start gap-2 text-xs text-white/25">
                          <span style={{ color: p.neon }}>→</span>
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                    <span
                      className="self-start text-xs font-bold px-2.5 py-1 rounded-full mt-1"
                      style={{
                        background: `${p.neon}15`,
                        color: p.neon,
                        border: `1px solid ${p.neon}35`,
                      }}
                    >
                      Preview →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section
        id="modules"
        className="py-24 px-4"
        style={{ background: "rgba(0,0,0,0.3)" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Everything the school needs,<br />nothing it doesn&apos;t</h2>
            <p className="text-white/30 text-base">MVP modules — lean, low cost, immediately useful.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {modules.map((m) => (
              <motion.div
                key={m.title}
                variants={fadeUp}
                className="group flex gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                whileHover={{
                  boxShadow: "0 0 30px rgba(0,212,255,0.06), 0 0 0 1px rgba(0,212,255,0.15)",
                }}
              >
                <span className="text-2xl mt-0.5 group-hover:scale-110 transition-transform duration-300">{m.icon}</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">{m.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Student Life Platform — future vision */}
      <section
        className="py-28 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #020818 0%, #0d0515 50%, #020818 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(139,92,246,0.07)" }} />
          <div className="orb-2 absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "rgba(236,72,153,0.05)" }} />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
            >
              <span className="text-xs font-bold tracking-widest uppercase text-violet-400">The bigger vision</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
              Prepare students for life,<br />
              <span style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                not just exams.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/35 max-w-xl mx-auto leading-relaxed">
              Infizium is building toward a complete student life platform — academics, wellness, financial literacy, emotional intelligence, and family guidance in one place.
            </motion.p>
          </motion.div>

          {/* Travel Buddy — live feature */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-2xl p-5 mb-6 flex flex-col sm:flex-row gap-5 items-center"
            style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}
          >
            <div className="text-5xl flex-shrink-0">🚌</div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                <p className="font-bold text-white text-lg">Travel Buddy &amp; Commute</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>
                  Live now
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed mb-3">
                Live GPS tracking on every school bus. Parent car pools, auto buddies, walk groups — all verified by school. Smart Band wristband or hidden bag Tag for students who travel alone. SOS with one press.
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {["School bus GPS", "Parent car pool", "Auto buddy", "Walk group", "Smart Band / Tag", "SOS alert"].map(f => (
                  <span key={f} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>{f}</span>
                ))}
              </div>
            </div>
            <Link
              href="/commute"
              className="flex-shrink-0 text-sm px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-[1.02]"
              style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", color: "#f59e0b" }}
            >
              See it live →
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            {[
              { phase: "Phase 4", icon: "🏋️", title: "Fitness & Wellness", desc: "Daily activity tracking, PE class integration, and personalised health goals.", neon: "#f43f5e" },
              { phase: "Phase 4", icon: "🥗", title: "Nutrition & Food", desc: "Healthy eating guidance, school canteen awareness, and weekly nutrition tips.", neon: "#10b981" },
              { phase: "Phase 4", icon: "💰", title: "Pocket Money", desc: "Financial literacy — saving goals, spending habits, parent-controlled allowances.", neon: "#f59e0b" },
              { phase: "Phase 4", icon: "📅", title: "Daily Routine", desc: "Morning and evening routine builder, habit tracker, study schedule planner.", neon: "#3b82f6" },
              { phase: "Phase 5", icon: "🧘", title: "Emotional Intelligence", desc: "Guided exercises for patience, stress management, mood tracking, resilience.", neon: "#7c3aed" },
              { phase: "Phase 5", icon: "🗂️", title: "Organised Life", desc: "Goal setting, task management, and life planning tools for real-world skills.", neon: "#06b6d4" },
              { phase: "Phase 5", icon: "👨‍👩‍👧", title: "Parent Guidance", desc: "Family conversation prompts, parenting tips, and shared goal-setting.", neon: "#f97316" },
              { phase: "Phase 5", icon: "🌱", title: "Future Readiness", desc: "Career exploration, life skills curriculum, real-world prep beyond Class 10.", neon: "#ec4899" },
            ].map((m) => (
              <motion.div
                key={m.title}
                variants={fadeUp}
                className="group relative rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02]"
                style={{ background: `${m.neon}08`, border: `1px solid ${m.neon}20` }}
              >
                <div className="absolute top-3 right-3">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${m.neon}18`, color: m.neon, border: `1px solid ${m.neon}30` }}
                  >
                    {m.phase}
                  </span>
                </div>
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{m.icon}</span>
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm">{m.title}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{m.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-white/20 text-xs">
                  <span>🔒</span>
                  <span>Coming soon</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="text-4xl">🎓</div>
            <div className="flex-1">
              <p className="font-semibold text-white mb-1">MVP first. Life platform second.</p>
              <p className="text-sm text-white/35 leading-relaxed">
                Starting with attendance, homework, and parent communication — the urgent needs of Telangana schools today. Life skills modules unlock once the foundation is trusted by pilot schools.
              </p>
            </div>
            <a
              href="#personas"
              className="flex-shrink-0 text-sm px-5 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
            >
              See the MVP →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sponsorship Platform */}
      <section className="py-28 px-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020818 0%, #100a04 50%, #020818 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: "rgba(251,191,36,0.05)" }} />
          <div className="orb-2 absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "rgba(249,115,22,0.05)" }} />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-widest uppercase text-amber-400">Sponsorship &amp; Donations</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
              Be the reason a student<br />
              <span style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                doesn&apos;t quit.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/35 max-w-xl mx-auto leading-relaxed">
              Donors give directly to verified students — as pocket money only the student controls, as school fee paid straight to the school, or as an education loan repaid when they earn.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Three flow types */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="space-y-4"
            >
              {[
                {
                  icon: "💰", title: "Pocket Money", neon: "#fbbf24",
                  desc: "Goes directly to the student's private wallet. Parents cannot see the balance or transactions. The student decides how to spend it.",
                  note: "Parent access: None",
                },
                {
                  icon: "🏫", title: "School Fees", neon: "#3b82f6",
                  desc: "Paid directly to the school's verified account. School principal confirms receipt. Student and parent both receive a confirmation.",
                  note: "School-verified payment",
                },
                {
                  icon: "🎓", title: "Education Loan", neon: "#7c3aed",
                  desc: "Student receives now, repays when earning — starting 1 year after first employment. No interest. Repayments fund the next student.",
                  note: "Social contract · No interest",
                },
              ].map(m => (
                <motion.div
                  key={m.title}
                  variants={fadeUp}
                  className="flex gap-4 p-5 rounded-2xl"
                  style={{ background: `${m.neon}08`, border: `1px solid ${m.neon}20` }}
                >
                  <div className="text-2xl flex-shrink-0 mt-0.5">{m.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white">{m.title}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${m.neon}18`, color: m.neon, border: `1px solid ${m.neon}30` }}>{m.note}</span>
                    </div>
                    <p className="text-sm text-white/35 leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Interaction spectrum */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-4">Donor privacy spectrum</p>
                <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
                  <span className="font-semibold text-white/60">Anonymous</span>
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(251,191,36,0.6), rgba(249,115,22,0.6))" }} />
                  <span className="font-semibold text-white/60">Direct</span>
                </div>
                {["Anonymous — student never knows your identity", "Codename — student can message your chosen alias", "Direct — full identity revealed, live interaction"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/30 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: i === 0 ? "#fbbf24" : i === 1 ? "#f97316" : "#ef4444" }} />
                    {t}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Live interaction demo */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="text-xs font-mono text-white/25 tracking-widest uppercase mb-2">Live interaction preview</div>
              <SponsorChat />
              <div className="text-center pt-4">
                <Link
                  href="/sponsor"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.4)", color: "#fbbf24", boxShadow: "0 0 30px rgba(251,191,36,0.1)" }}
                >
                  Browse students to sponsor →
                </Link>
                <p className="text-xs text-white/20 mt-3">All profiles verified by school principals · 100% reaches the student</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px]" style={{ background: "rgba(0,212,255,0.05)" }} />
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-xl mx-auto text-center relative"
        >
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-4 tracking-tight">
            Get your school on Infizium
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/35 mb-8 leading-relaxed">
            We&apos;re onboarding pilot schools in Telangana. Setup takes under 2 hours.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "rgba(0,212,255,0.12)",
                border: "1px solid rgba(0,212,255,0.4)",
                color: "#00d4ff",
                boxShadow: "0 0 40px rgba(0,212,255,0.12)",
              }}
            >
              Start with a demo →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4" style={{ borderColor: "rgba(0,212,255,0.08)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/25">
          <span className="font-semibold text-white/50">Infizium</span>
          <span>Telangana&apos;s school operating system</span>
          <span className="flex items-center gap-2">
            <span>infizium.com</span>
            <span className="text-white/10">·</span>
            <span className="font-mono text-xs text-white/20">v{APP_VERSION}</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
