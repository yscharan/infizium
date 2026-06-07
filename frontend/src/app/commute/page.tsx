"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CommuteMap } from "@/components/commute-map";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const MODES = [
  {
    icon: "🚌",
    title: "School Bus",
    neon: "#f59e0b",
    tagline: "The official route, now visible",
    desc: "Live GPS on every school bus. Parents see the bus position, ETA, and get a WhatsApp ping when their child boards and alights. Driver gets a roster, school gets the log.",
    features: ["Live bus position on map", "Board/alight WhatsApp alert", "Digital roster for driver", "Breakdown escalation to admin"],
  },
  {
    icon: "🚗",
    title: "Parent Car Pool",
    neon: "#3b82f6",
    tagline: "Neighbours already going the same way",
    desc: "A parent heading toward school can mark their route. Nearby parents see the offer. Students get a verified lift. Everyone shares live location during the commute.",
    features: ["Route-matching across school families", "Shared live tracking", "Mutual verified identity", "Automatic school arrival ping"],
  },
  {
    icon: "🛺",
    title: "Auto Buddy",
    neon: "#f97316",
    tagline: "The auto-wala who knows every child",
    desc: "Regular auto-rickshaw drivers who serve the school can be verified by the admin. Parents book a trusted auto, share location with Infizium, and receive arrival alerts.",
    features: ["Driver verified by school admin", "Route broadcast to parents", "Group ride for 3–4 students", "SOS routes to school and parent"],
  },
  {
    icon: "🚶",
    title: "Walk Group",
    neon: "#10b981",
    tagline: "Safety in numbers, even on foot",
    desc: "Students who live within 1km of school form a verified walk group. The group's movement is tracked as one unit. Parents see the group's position — not individual GPS.",
    features: ["Group tracking (not individual)", "Senior student as group leader", "Parent gets 'group arrived' alert", "Walk route verified by school"],
  },
  {
    icon: "📡",
    title: "Solo + Smart Tag",
    neon: "#a78bfa",
    tagline: "When none of the above fits",
    desc: "Student travels alone. Infizium Smart Tag (in school bag) or Smart Band (wristband) sends location silently. Parent sees live position. School sees arrival. No phone needed.",
    features: ["Smart Tag hides in school bag", "Smart Band worn on wrist", "Auto check-in at school gate", "SOS button on the band"],
  },
];

const HARDWARE = [
  {
    icon: "⌚",
    name: "Infizium Smart Band",
    sub: "Wristband · GPS + BLE + SOS",
    neon: "#00d4ff",
    desc: "Worn on the wrist like a watch. Sends GPS position every 30 seconds during the commute window. One-press SOS sends live location to parent and school admin simultaneously.",
    specs: ["GPS + BLE 5.0", "7-day battery life", "IP67 waterproof", "SOS button with 3-sec hold", "School gate geofence check-in"],
  },
  {
    icon: "🏷️",
    name: "Infizium Tag",
    sub: "Bag tracker · Hidden · No charge needed",
    neon: "#fbbf24",
    desc: "Sits inside the school bag. Smaller than a coin. Uses BLE + cell triangulation. No daily charging — battery lasts 6 months. Parents see the bag, students don't carry a device.",
    specs: ["BLE 5.2 + cell triangulation", "6-month battery", "23mm × 23mm × 4mm", "Water resistant", "Works without student action"],
  },
];

const TIMELINE = [
  { time: "7:28 AM", who: "Arjun", icon: "🧑‍🎓", event: "Leaves home. Smart Band activates commute mode automatically.", color: "#a78bfa" },
  { time: "7:29 AM", who: "Lakshmi", icon: "👩", event: "WhatsApp: 'Arjun started his commute. Live location is active.'", color: "#f97316" },
  { time: "7:31 AM", who: "Arjun", icon: "🚌", event: "Boards the school bus. Infizium logs his board time and seat.", color: "#f59e0b" },
  { time: "7:31 AM", who: "Lakshmi", icon: "👩", event: "WhatsApp: '✅ Arjun boarded Bus #4. ETA school: 19 minutes.'", color: "#f97316" },
  { time: "7:50 AM", who: "Bus", icon: "🚌", event: "Bus arrives at school gate. Geofence triggered.", color: "#f59e0b" },
  { time: "7:51 AM", who: "Lakshmi", icon: "👩", event: "WhatsApp: '🏫 Arjun reached school. Good morning!'", color: "#25d366" },
  { time: "7:51 AM", who: "Priya (Admin)", icon: "🏫", event: "Dashboard: 312/800 students arrived. Bus #4 — on time.", color: "#7c3aed" },
];

export default function CommutePage() {
  return (
    <div className="min-h-screen text-white" style={{ background: "#020818" }}>

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(2,8,24,0.88)", backdropFilter: "blur(20px)", borderColor: "rgba(245,158,11,0.15)" }}
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-white">Infizium</Link>
            <span className="text-white/20">·</span>
            <span className="text-sm font-semibold text-amber-400">Commute</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/student/commute" className="text-xs text-white/40 hover:text-amber-400 transition-colors">Student view</Link>
            <Link href="/dashboard/parent/commute" className="text-xs text-white/40 hover:text-amber-400 transition-colors">Parent view</Link>
            <Link href="/login" className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b" }}>
              Try demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px]" style={{ background: "rgba(245,158,11,0.05)" }} />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-mono font-semibold tracking-widest uppercase text-amber-400">Infizium Commute</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold leading-[1.1] tracking-tight mb-5">
                Every student.<br />Every route.<br />
                <span style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Every morning.
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-white/40 text-lg leading-relaxed mb-4">
                The 22 minutes between home and school are invisible to parents. Infizium Commute changes that — live tracking, verified buddies, school bus GPS, and a one-press SOS that reaches both parent and school.
              </motion.p>

              <motion.p variants={fadeUp} className="text-white/25 text-sm italic mb-8 leading-relaxed border-l-2 border-amber-500/30 pl-4">
                &ldquo;Every morning in Hyderabad, a mother watches her son leave at 7:30 AM.
                For the next 22 minutes, she doesn&apos;t know if he&apos;s on the bus, stuck in traffic, or safe.
                Until now.&rdquo;
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard/parent/commute"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]"
                  style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)", color: "#f59e0b" }}
                >
                  Parent live view →
                </Link>
                <Link
                  href="/dashboard/student/commute"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-white/10 text-white/50 hover:bg-white/5 transition-colors"
                >
                  Student commute →
                </Link>
              </motion.div>
            </motion.div>

            {/* Live map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            >
              <p className="text-[10px] font-mono text-white/20 tracking-widest uppercase mb-2">Live — St. Joseph&apos;s catchment area · Hyderabad</p>
              <CommuteMap />
              <div className="mt-3 flex gap-4 justify-center">
                {[
                  { v: "312", l: "Students tracked" },
                  { v: "8", l: "School buses live" },
                  { v: "47", l: "Parent car pools" },
                  { v: "22 min", l: "Avg commute" },
                ].map(s => (
                  <div key={s.l} className="text-center">
                    <p className="text-base font-bold text-amber-400">{s.v}</p>
                    <p className="text-[9px] text-white/25">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commute modes */}
      <section className="py-20 px-4" style={{ background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Five ways to commute, one platform</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-3">Every student travels differently.<br />Infizium tracks them all.</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {MODES.map(m => (
              <motion.div
                key={m.title}
                variants={fadeUp}
                className="group rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1"
                style={{ background: `${m.neon}06`, border: `1px solid ${m.neon}22` }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{m.icon}</div>
                  <div>
                    <p className="font-bold text-white">{m.title}</p>
                    <p className="text-[11px]" style={{ color: m.neon }}>{m.tagline}</p>
                  </div>
                </div>
                <p className="text-sm text-white/35 leading-relaxed">{m.desc}</p>
                <ul className="mt-auto space-y-1.5">
                  {m.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-white/30">
                      <span style={{ color: m.neon }}>·</span> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* CTA card */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-5 flex flex-col items-center justify-center gap-4 text-center"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-4xl">🆘</p>
              <div>
                <p className="font-bold text-white mb-1">SOS — Always On</p>
                <p className="text-xs text-white/30 leading-relaxed">Any mode, any time — hold the SOS button for 3 seconds. Live location sent to parent AND school admin simultaneously. School can dispatch help.</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)" }}>
                Instant escalation
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hardware */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">Hardware Accessories</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-3">No phone required for students to be tracked.</motion.h2>
            <motion.p variants={fadeUp} className="text-white/35 max-w-lg mx-auto">The student just carries the bag or wears the band. The rest is automatic.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {HARDWARE.map(h => (
              <motion.div
                key={h.name}
                variants={fadeUp}
                className="rounded-2xl p-6 flex gap-5"
                style={{ background: `${h.neon}06`, border: `1px solid ${h.neon}22` }}
              >
                <div className="text-5xl flex-shrink-0">{h.icon}</div>
                <div className="flex-1">
                  <p className="font-bold text-white text-lg">{h.name}</p>
                  <p className="text-xs mb-3" style={{ color: h.neon }}>{h.sub}</p>
                  <p className="text-sm text-white/35 leading-relaxed mb-4">{h.desc}</p>
                  <ul className="space-y-1.5">
                    {h.specs.map(s => (
                      <li key={s} className="flex items-center gap-2 text-xs text-white/30">
                        <span style={{ color: h.neon }}>✓</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Morning timeline */}
      <section className="py-20 px-4" style={{ background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-3">7:28 AM to 7:51 AM</motion.h2>
            <motion.p variants={fadeUp} className="text-white/30">The 23-minute journey Lakshmi used to spend worrying.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-[52px] top-4 bottom-4 w-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            <div className="space-y-4">
              {TIMELINE.map((e, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 text-right w-14">
                    <span className="text-[10px] font-mono text-white/25">{e.time}</span>
                  </div>
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-base relative z-10"
                    style={{ background: `${e.color}18`, border: `1px solid ${e.color}30` }}
                  >
                    {e.icon}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs font-semibold mb-0.5" style={{ color: e.color }}>{e.who}</p>
                    <p className="text-sm text-white/50 leading-relaxed">{e.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-5xl mb-6">🎒</p>
          <h2 className="text-3xl font-bold text-white mb-4">The journey is part of school life.</h2>
          <p className="text-white/35 mb-8 leading-relaxed">Every student's journey deserves the same attention as their attendance. Infizium Commute is the layer that makes the invisible visible — for parents, schools, and the students themselves.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard/parent/commute"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]"
              style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)", color: "#f59e0b" }}
            >
              See parent live view →
            </Link>
            <Link href="/dashboard/student/commute" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm border border-white/10 text-white/50 hover:bg-white/5 transition-colors">
              Student commute →
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 px-4 text-center" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <Link href="/" className="text-xs text-white/20 hover:text-white/50 transition-colors">← Back to Infizium</Link>
      </footer>
    </div>
  );
}
