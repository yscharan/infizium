"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const STUDENTS = [
  {
    id: "A001",
    grade: "Grade 9",
    city: "Hyderabad",
    school: "St. Joseph's High School",
    score: "91% in Class 8",
    story: "My father works as a daily labourer. This year has been hard. I want to clear my Class 10 board fees so I can focus on JEE preparation without worrying about the next semester.",
    need: "School Fees",
    total: 8500,
    raised: 6630,
    sponsors: 4,
    tag: "Board Fees",
    tagColor: "#3b82f6",
  },
  {
    id: "B002",
    grade: "Grade 11",
    city: "Warangal",
    school: "Telangana Model School",
    score: "Top 3 in class",
    story: "I cleared the JEE Foundation exam with 94 percentile. I need 6 months of coaching and study material to attempt JEE Mains. This is my only shot.",
    need: "Education Loan",
    total: 24000,
    raised: 9600,
    sponsors: 2,
    tag: "JEE Coaching",
    tagColor: "#7c3aed",
  },
  {
    id: "C003",
    grade: "Grade 6",
    city: "Nizamabad",
    school: "Zilla Parishad High School",
    score: "First in class",
    story: "My family lost our home in the floods last year. I need school bag, books, and uniform for this academic year. I just want to keep studying.",
    need: "Pocket Money",
    total: 3200,
    raised: 3200,
    sponsors: 8,
    tag: "Fully Funded",
    tagColor: "#10b981",
  },
  {
    id: "D004",
    grade: "Grade 10",
    city: "Karimnagar",
    school: "Kasturba Girls School",
    score: "88% in Class 9",
    story: "I want to become a doctor. My mother is a vegetable vendor. I need help with my NEET preparation books and the exam registration fee.",
    need: "School Fees",
    total: 6800,
    raised: 1360,
    sponsors: 1,
    tag: "NEET Prep",
    tagColor: "#f97316",
  },
  {
    id: "E005",
    grade: "Grade 8",
    city: "Khammam",
    school: "Municipal High School",
    score: "93% in Class 7",
    story: "My parents are farmers. After two failed monsoons, there is nothing left. I need basic school supplies and a maths tuition fee to keep my grades up.",
    need: "Pocket Money",
    total: 2400,
    raised: 1680,
    sponsors: 3,
    tag: "Supplies",
    tagColor: "#06b6d4",
  },
  {
    id: "F006",
    grade: "Grade 12",
    city: "Adilabad",
    school: "Sri Chaitanya Jr. College",
    score: "95% in Class 11",
    story: "I was offered a seat at a good engineering college but cannot afford the first-year fee. I will repay every rupee once I am earning. I just need someone to believe in me.",
    need: "Education Loan",
    total: 85000,
    raised: 34000,
    sponsors: 6,
    tag: "Engineering Seat",
    tagColor: "#a855f7",
  },
];

const FILTERS = ["All", "School Fees", "Pocket Money", "Education Loan"];

type InteractionMode = "anonymous" | "semi" | "direct";

const INTERACTION_OPTIONS: { key: InteractionMode; label: string; desc: string }[] = [
  { key: "anonymous", label: "Anonymous", desc: "Student knows support arrived. No identity revealed ever." },
  { key: "semi", label: "Codename", desc: "You choose a name. Student can message your codename." },
  { key: "direct", label: "Direct", desc: "Both sides know each other. Full live interaction." },
];

export default function SponsorPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [donationMode, setDonationMode] = useState<"fees" | "pocket" | "loan">("fees");
  const [interaction, setInteraction] = useState<InteractionMode>("anonymous");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"browse" | "confirm" | "done">("browse");

  const displayed = filter === "All" ? STUDENTS : STUDENTS.filter(s => s.need === filter);
  const selectedStudent = STUDENTS.find(s => s.id === selected);

  return (
    <div className="min-h-screen text-white" style={{ background: "#020818" }}>

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(2,8,24,0.85)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-white hover:text-white/80 transition-colors">Infizium</Link>
            <span className="text-white/20">·</span>
            <span className="text-sm font-semibold text-amber-400">Sponsor a Student</span>
          </div>
          <Link href="/login" className="text-sm text-white/40 hover:text-white/70 transition-colors">Sign in →</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-4 pt-20 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: "rgba(251,191,36,0.06)" }} />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
            style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-amber-400">
              School-Verified Sponsorship
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold leading-[1.1] tracking-tight mb-5"
          >
            Be the reason a student<br />
            <span style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              doesn&apos;t quit.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, ease: EASE }}
            className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed mb-10"
          >
            Every student profile is verified by their school principal. Donations go directly to the student&apos;s pocket money wallet, their school fee account, or as an education loan they repay when earning.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {[
              { value: "47", label: "Students supported" },
              { value: "₹2.3L", label: "Raised this month" },
              { value: "12", label: "Schools verified" },
              { value: "100%", label: "Reaches student directly" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-amber-400">{s.value}</p>
                <p className="text-xs text-white/30">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 px-4" style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-mono text-white/30 tracking-widest uppercase mb-8">Three ways your money reaches the student</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: "💰",
                title: "Pocket Money",
                neon: "#fbbf24",
                desc: "Credited directly to the student's wallet. Parents cannot see the balance or transactions. The student decides how to spend it on their education.",
                note: "Student-only access",
              },
              {
                icon: "🏫",
                title: "School Fees",
                neon: "#3b82f6",
                desc: "Paid directly to the school's verified account. Principal confirms receipt. Both student and parent receive a notification.",
                note: "School-verified payment",
              },
              {
                icon: "🎓",
                title: "Education Loan",
                neon: "#7c3aed",
                desc: "Student receives now. Repays when earning, starting 1 year after first employment. Tracked by the platform. Repayments fund future students.",
                note: "Social contract · No interest",
              },
            ].map(m => (
              <div
                key={m.title}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{ background: `${m.neon}08`, border: `1px solid ${m.neon}25` }}
              >
                <div className="text-2xl">{m.icon}</div>
                <h3 className="font-bold text-white">{m.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed flex-1">{m.desc}</p>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full self-start" style={{ background: `${m.neon}18`, color: m.neon, border: `1px solid ${m.neon}30` }}>
                  {m.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse students */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-white">Students seeking support</h2>
            <div className="flex gap-2">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: filter === f ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.04)",
                    border: filter === f ? "1px solid rgba(251,191,36,0.35)" : "1px solid rgba(255,255,255,0.08)",
                    color: filter === f ? "#fbbf24" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={filter}
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {displayed.map(s => {
              const pct = Math.round((s.raised / s.total) * 100);
              const isFull = pct >= 100;
              return (
                <motion.div
                  key={s.id}
                  variants={fadeUp}
                  className="group rounded-2xl flex flex-col gap-4 p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(2,8,24,0.85)",
                    border: selected === s.id ? `1px solid ${s.tagColor}60` : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: selected === s.id ? `0 0 30px ${s.tagColor}15` : "none",
                  }}
                  onClick={() => { setSelected(s.id); setStep("browse"); }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-white/40">#{s.id}</span>
                        <span className="text-xs text-white/30">·</span>
                        <span className="text-xs text-white/40">{s.grade}</span>
                        <span className="text-xs text-white/30">·</span>
                        <span className="text-xs text-white/40">{s.city}</span>
                      </div>
                      <p className="text-sm font-semibold text-white/80">{s.school}</p>
                      <p className="text-[11px] text-white/25 mt-0.5">✓ School verified · {s.score}</p>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: `${s.tagColor}18`, color: s.tagColor, border: `1px solid ${s.tagColor}30` }}
                    >
                      {s.tag}
                    </span>
                  </div>

                  {/* Story */}
                  <p className="text-sm text-white/40 leading-relaxed">&ldquo;{s.story}&rdquo;</p>

                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-white/40">₹{s.raised.toLocaleString("en-IN")} raised</span>
                      <span className="font-semibold" style={{ color: isFull ? "#10b981" : "rgba(255,255,255,0.6)" }}>
                        {isFull ? "Fully funded!" : `₹${(s.total - s.raised).toLocaleString("en-IN")} remaining`}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(pct, 100)}%` }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ background: isFull ? "#10b981" : s.tagColor }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-white/25">{pct}% funded · {s.sponsors} sponsors</span>
                      <span className="text-[10px]" style={{ color: s.tagColor }}>{s.need}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  {!isFull && (
                    <button
                      className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                      style={{
                        background: selected === s.id ? `${s.tagColor}20` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${selected === s.id ? s.tagColor + "50" : "rgba(255,255,255,0.08)"}`,
                        color: selected === s.id ? s.tagColor : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {selected === s.id ? "Selected — scroll down to sponsor ↓" : "Sponsor this student →"}
                    </button>
                  )}
                  {isFull && (
                    <div className="w-full py-2.5 rounded-xl text-sm font-semibold text-center" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
                      Goal reached · Thank you to {s.sponsors} sponsors
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Donation panel */}
      <AnimatePresence>
        {selected && selectedStudent && step !== "done" && (
          <motion.section
            key="panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ ease: EASE, duration: 0.5 }}
            className="px-4 pb-24"
          >
            <div className="max-w-2xl mx-auto rounded-2xl p-6" style={{ background: "rgba(2,8,24,0.95)", border: "1px solid rgba(251,191,36,0.2)", boxShadow: "0 0 60px rgba(251,191,36,0.08)" }}>
              <h3 className="font-bold text-white mb-1">Support Student #{selectedStudent.id}</h3>
              <p className="text-sm text-white/35 mb-6">{selectedStudent.school} · {selectedStudent.grade}</p>

              {/* Step 1: Choose what to fund */}
              <div className="mb-6">
                <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-3">Where does your money go?</p>
                <div className="grid grid-cols-3 gap-3">
                  {(["fees", "pocket", "loan"] as const).map(m => {
                    const labels = { fees: "School Fees", pocket: "Pocket Money", loan: "Education Loan" };
                    const icons = { fees: "🏫", pocket: "💰", loan: "🎓" };
                    const neons = { fees: "#3b82f6", pocket: "#fbbf24", loan: "#7c3aed" };
                    return (
                      <button
                        key={m}
                        onClick={() => setDonationMode(m)}
                        className="py-3 px-3 rounded-xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all duration-200"
                        style={{
                          background: donationMode === m ? `${neons[m]}15` : "rgba(255,255,255,0.03)",
                          border: `1px solid ${donationMode === m ? neons[m] + "50" : "rgba(255,255,255,0.07)"}`,
                          color: donationMode === m ? neons[m] : "rgba(255,255,255,0.35)",
                        }}
                      >
                        <span className="text-xl">{icons[m]}</span>
                        {labels[m]}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-white/25 mt-2">
                  {donationMode === "fees" && "Paid directly to the school. Principal confirms receipt. Parent is notified."}
                  {donationMode === "pocket" && "Credited to student's private wallet. Parent cannot see this. Student decides how to use it."}
                  {donationMode === "loan" && "Student receives now, repays when earning. No interest. Repayments fund the next student."}
                </p>
              </div>

              {/* Step 2: Amount */}
              <div className="mb-6">
                <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-3">Amount (₹)</p>
                <div className="flex gap-2 flex-wrap mb-3">
                  {[250, 500, 1000, 2500, 5000].map(a => (
                    <button
                      key={a}
                      onClick={() => setAmount(String(a))}
                      className="px-4 py-2 rounded-xl text-sm transition-all duration-200"
                      style={{
                        background: amount === String(a) ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${amount === String(a) ? "rgba(251,191,36,0.4)" : "rgba(255,255,255,0.07)"}`,
                        color: amount === String(a) ? "#fbbf24" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      ₹{a.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Or enter custom amount"
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>

              {/* Step 3: Interaction mode */}
              <div className="mb-6">
                <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-3">How do you want to interact?</p>
                <div className="space-y-2">
                  {INTERACTION_OPTIONS.map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setInteraction(opt.key)}
                      className="w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200"
                      style={{
                        background: interaction === opt.key ? "rgba(251,191,36,0.08)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${interaction === opt.key ? "rgba(251,191,36,0.3)" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: interaction === opt.key ? "#fbbf24" : "rgba(255,255,255,0.2)" }}
                      >
                        {interaction === opt.key && <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/80">{opt.label}</p>
                        <p className="text-xs text-white/30 mt-0.5">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirm */}
              <button
                onClick={() => amount && Number(amount) > 0 ? setStep("done") : null}
                className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.01]"
                style={{
                  background: amount ? "rgba(251,191,36,0.18)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${amount ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: amount ? "#fbbf24" : "rgba(255,255,255,0.2)",
                  cursor: amount ? "pointer" : "not-allowed",
                }}
              >
                {amount ? `Send ₹${Number(amount).toLocaleString("en-IN")} to Student #${selectedStudent.id} →` : "Enter an amount to continue"}
              </button>
            </div>
          </motion.section>
        )}

        {step === "done" && selectedStudent && (
          <motion.section
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: EASE }}
            className="px-4 pb-24"
          >
            <div className="max-w-lg mx-auto rounded-2xl p-8 text-center" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.25)" }}>
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-white mb-2">You just changed a life.</h3>
              <p className="text-white/40 text-sm mb-6">
                ₹{Number(amount).toLocaleString("en-IN")} is on its way to Student #{selectedStudent.id} as {donationMode === "fees" ? "school fee payment" : donationMode === "pocket" ? "pocket money" : "an education loan"}.
                {interaction === "anonymous" ? " Your identity stays private." : interaction === "semi" ? " The student can message your codename." : " The student can reach you directly."}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setStep("browse"); setSelected(null); setAmount(""); }}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/60 border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Sponsor another student
                </button>
                <Link href="/" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors">
                  Back to Infizium
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <p className="text-xs text-white/20">All student profiles are verified by school principals · No platform fee · 100% reaches the student</p>
      </footer>
    </div>
  );
}
