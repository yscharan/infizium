"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { APP_VERSION } from "@/lib/version";
import { useState, useEffect } from "react";
import { DemoShowcase } from "@/components/demo-showcase";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const personas = [
  {
    role: "Parent",
    name: "Lakshmi",
    icon: "👩",
    color: "from-orange-50 to-amber-50",
    border: "border-orange-100 hover:border-orange-300",
    accent: "text-orange-600",
    badge: "bg-orange-100 text-orange-700",
    glow: "hover:shadow-orange-100/60",
    description: "Receives attendance alerts on WhatsApp within minutes. Approves field trips with a single reply.",
    needs: ["Know child is safe", "Approve forms on WhatsApp", "See homework due dates"],
    href: "/dashboard/parent",
  },
  {
    role: "Teacher",
    name: "Ravi",
    icon: "👨‍🏫",
    color: "from-blue-50 to-indigo-50",
    border: "border-blue-100 hover:border-blue-300",
    accent: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    glow: "hover:shadow-blue-100/60",
    description: "Marks attendance for 40 students in under 2 minutes. Parents notified automatically.",
    needs: ["Mark attendance fast", "Assign homework", "Message parents via platform"],
    href: "/dashboard/teacher",
  },
  {
    role: "Student",
    name: "Arjun",
    icon: "🧑‍🎓",
    color: "from-emerald-50 to-green-50",
    border: "border-emerald-100 hover:border-emerald-300",
    accent: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    glow: "hover:shadow-emerald-100/60",
    description: "Sees all pending homework in one feed. Never misses an announcement.",
    needs: ["Check homework due dates", "See announcements", "Track progress"],
    href: "/dashboard/student",
  },
  {
    role: "Admin",
    name: "Priya",
    icon: "🏫",
    color: "from-purple-50 to-violet-50",
    border: "border-purple-100 hover:border-purple-300",
    accent: "text-purple-600",
    badge: "bg-purple-100 text-purple-700",
    glow: "hover:shadow-purple-100/60",
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
  return (
    <div className="flex flex-col min-h-full" style={{ background: "#09090b" }}>

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="glass-dark fixed top-0 left-0 right-0 z-50 border-b border-white/8"
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <span className="font-bold text-[17px] tracking-tight text-white">Infizium</span>
          <div className="flex items-center gap-6">
            <Link href="#personas" className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block">Who it&apos;s for</Link>
            <Link href="#modules" className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block">Features</Link>
            <Link
              href="/login"
              className="text-sm bg-white text-gray-900 px-4 py-1.5 rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-[1.03] font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-28 px-4 min-h-[92vh] flex items-center">
        {/* Animated orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[80px]" />
          <div className="orb-2 absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/12 rounded-full blur-[80px]" />
          <div className="orb-3 absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400">Telangana&apos;s School Operating System</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            Prepare students{" "}
            <span className="gradient-text">for life,</span>
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
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-7 py-3.5 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/10"
            >
              Explore the platform
              <span className="text-gray-500">→</span>
            </Link>
            <a
              href="#personas"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/70 px-7 py-3.5 rounded-xl font-medium hover:bg-white/5 transition-all duration-200 hover:border-white/25"
            >
              See who it&apos;s for
            </a>
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
        className="border-y border-white/8 py-10 px-4"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-sm text-white/40">{s.label}</p>
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
            <p className="text-white/30 text-base">Click a card to preview that role&apos;s experience.</p>
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
                <Link
                  href={p.href}
                  className={`group block border rounded-2xl p-6 flex flex-col gap-3 bg-gradient-to-br ${p.color} ${p.border} transition-all duration-300 hover:shadow-xl ${p.glow} hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{p.icon}</span>
                    <div>
                      <span className={`text-xs font-semibold uppercase tracking-wide ${p.accent}`}>{p.role}</span>
                      <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
                  <ul className="mt-auto space-y-1.5">
                    {p.needs.map((n) => (
                      <li key={n} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="mt-0.5 text-gray-300">→</span>
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                  <span className={`self-start text-xs font-medium px-2.5 py-1 rounded-full mt-1 ${p.badge} group-hover:scale-105 transition-transform`}>
                    Preview →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="py-24 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Everything the school needs,<br />nothing it doesn&apos;t</h2>
            <p className="text-gray-500 text-base">MVP modules — lean, low cost, immediately useful.</p>
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
                className="group bg-white/5 border border-white/8 rounded-2xl p-6 flex gap-4 hover:bg-white/8 hover:border-white/15 transition-all duration-300"
              >
                <span className="text-2xl mt-0.5 group-hover:scale-110 transition-transform duration-300">{m.icon}</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">{m.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Student Life Platform — future vision */}
      <section className="py-28 px-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #09090b 0%, #0d0515 50%, #09090b 100%)" }}>
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-500/6 rounded-full blur-[100px]" />
          <div className="orb-2 absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs font-bold tracking-widest uppercase text-violet-400">The bigger vision</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
              Prepare students for life,<br />
              <span style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                not just exams.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 max-w-xl mx-auto leading-relaxed">
              Infizium is building toward a complete student life platform — academics, wellness, financial literacy, emotional intelligence, and family guidance in one place.
            </motion.p>
          </motion.div>

          {/* Life module grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            {[
              {
                phase: "Phase 4",
                icon: "🏋️",
                title: "Fitness & Wellness",
                desc: "Daily activity tracking, PE class integration, and personalised health goals for each student.",
                color: "from-rose-500/10 to-red-500/5",
                border: "border-rose-500/20",
                badge: "bg-rose-500/15 text-rose-400",
                glow: "rose",
              },
              {
                phase: "Phase 4",
                icon: "🥗",
                title: "Nutrition & Food",
                desc: "Healthy eating guidance, school canteen awareness, and weekly nutrition tips for parents.",
                color: "from-green-500/10 to-emerald-500/5",
                border: "border-green-500/20",
                badge: "bg-green-500/15 text-green-400",
                glow: "green",
              },
              {
                phase: "Phase 4",
                icon: "💰",
                title: "Pocket Money",
                desc: "Financial literacy for students — saving goals, spending habits, and parent-controlled allowances.",
                color: "from-amber-500/10 to-yellow-500/5",
                border: "border-amber-500/20",
                badge: "bg-amber-500/15 text-amber-400",
                glow: "amber",
              },
              {
                phase: "Phase 4",
                icon: "📅",
                title: "Daily Routine",
                desc: "Morning and evening routine builder, habit tracker, and study schedule planner.",
                color: "from-blue-500/10 to-indigo-500/5",
                border: "border-blue-500/20",
                badge: "bg-blue-500/15 text-blue-400",
                glow: "blue",
              },
              {
                phase: "Phase 5",
                icon: "🧘",
                title: "Emotional Intelligence",
                desc: "Guided exercises for patience, stress management, mood tracking, and building resilience.",
                color: "from-violet-500/10 to-purple-500/5",
                border: "border-violet-500/20",
                badge: "bg-violet-500/15 text-violet-400",
                glow: "violet",
              },
              {
                phase: "Phase 5",
                icon: "🗂️",
                title: "Organised Life",
                desc: "Goal setting, task management, and life planning tools that build real-world executive skills.",
                color: "from-cyan-500/10 to-teal-500/5",
                border: "border-cyan-500/20",
                badge: "bg-cyan-500/15 text-cyan-400",
                glow: "cyan",
              },
              {
                phase: "Phase 5",
                icon: "👨‍👩‍👧",
                title: "Parent Guidance",
                desc: "Family conversation prompts, parenting tips by age, and shared goal-setting between parent and child.",
                color: "from-orange-500/10 to-amber-500/5",
                border: "border-orange-500/20",
                badge: "bg-orange-500/15 text-orange-400",
                glow: "orange",
              },
              {
                phase: "Phase 5",
                icon: "🌱",
                title: "Future Readiness",
                desc: "Career exploration, life skills curriculum, and real-world preparation for students beyond Class 10.",
                color: "from-pink-500/10 to-rose-500/5",
                border: "border-pink-500/20",
                badge: "bg-pink-500/15 text-pink-400",
                glow: "pink",
              },
            ].map((m, i) => (
              <motion.div
                key={m.title}
                variants={fadeUp}
                className={`group relative bg-gradient-to-br ${m.color} border ${m.border} rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02]`}
              >
                {/* Lock overlay */}
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.badge}`}>{m.phase}</span>
                </div>
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{m.icon}</span>
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm">{m.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{m.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-white/20 text-xs">
                  <span>🔒</span>
                  <span>Coming soon</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Phase callout strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="border border-white/8 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="text-4xl">🎓</div>
            <div className="flex-1">
              <p className="font-semibold text-white mb-1">MVP first. Life platform second.</p>
              <p className="text-sm text-white/40 leading-relaxed">
                We&apos;re starting with attendance, homework, and parent communication — the urgent needs of Telangana schools today. Life skills modules unlock once the foundation is trusted by pilot schools.
              </p>
            </div>
            <a href="#personas" className="flex-shrink-0 border border-white/15 text-white/60 text-sm px-5 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
              See the MVP →
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px]" />
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
          <motion.p variants={fadeUp} className="text-white/40 mb-8 leading-relaxed">
            We&apos;re onboarding pilot schools in Telangana. Setup takes under 2 hours.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/10"
            >
              Start with a demo
              <span className="text-gray-500">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <span className="font-semibold text-white/60">Infizium</span>
          <span>Telangana&apos;s school operating system</span>
          <span className="flex items-center gap-2">
            <span>infizium.com</span>
            <span className="text-white/15">·</span>
            <span className="font-mono text-xs text-white/20">v{APP_VERSION}</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
