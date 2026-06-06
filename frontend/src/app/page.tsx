"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
    <div className="flex flex-col min-h-full bg-white">

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="glass fixed top-0 left-0 right-0 z-50 border-b border-gray-100/80"
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <span className="font-bold text-[17px] tracking-tight text-gray-900">Infizium</span>
          <div className="flex items-center gap-6">
            <Link href="#personas" className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">Who it&apos;s for</Link>
            <Link href="#modules" className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">Features</Link>
            <Link
              href="/login"
              className="text-sm bg-gray-900 text-white px-4 py-1.5 rounded-full hover:bg-gray-700 transition-all duration-200 hover:scale-[1.03]"
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
          <div className="orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[80px]" />
          <div className="orb-2 absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-[80px]" />
          <div className="orb-3 absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-purple-100/30 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-600">Telangana&apos;s School Operating System</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.08] tracking-tight mb-6"
          >
            Prepare students{" "}
            <span className="gradient-text">for life,</span>
            <br />not just exams.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed"
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
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-7 py-3.5 rounded-xl font-medium hover:bg-gray-700 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-900/10"
            >
              Explore the platform
              <span className="text-gray-400">→</span>
            </Link>
            <a
              href="#personas"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-7 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 hover:border-gray-300"
            >
              See who it&apos;s for
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="border-y border-gray-100 bg-gray-50/60 py-10 px-4"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <p className="text-3xl font-bold text-gray-900 mb-1">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Built for everyone in the school</h2>
            <p className="text-gray-400 text-base">Click a card to preview that role&apos;s experience.</p>
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

      {/* CTA */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[100px]" />
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-xl mx-auto text-center relative"
        >
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Get your school on Infizium
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 mb-8 leading-relaxed">
            We&apos;re onboarding pilot schools in Telangana. Setup takes under 2 hours.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-700 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-900/10"
            >
              Start with a demo
              <span className="text-gray-400">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span className="font-semibold text-gray-700">Infizium</span>
          <span>Telangana&apos;s school operating system</span>
          <span>infizium.com</span>
        </div>
      </footer>
    </div>
  );
}
