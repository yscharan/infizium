"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { setSession, UserRole, ROLE_DASHBOARD } from "@/lib/session";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

// ── Roles ────────────────────────────────────────────────────────
const roles = [
  { id: "parent",  label: "Parent",  icon: "👩",    desc: "Attendance alerts & approvals",    border: "border-orange-500/30", selected: "border-orange-400 bg-orange-500/10 ring-1 ring-orange-500/30", accent: "#f97316", dash: "/dashboard/parent" },
  { id: "teacher", label: "Teacher", icon: "👨‍🏫", desc: "Attendance, homework, messaging",   border: "border-blue-500/30",   selected: "border-blue-400 bg-blue-500/10 ring-1 ring-blue-500/30",   accent: "#3b82f6", dash: "/dashboard/teacher" },
  { id: "student", label: "Student", icon: "🧑‍🎓", desc: "Homework feed & progress",         border: "border-emerald-500/30",selected: "border-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/30", accent: "#10b981", dash: "/dashboard/student" },
  { id: "admin",   label: "Admin",   icon: "🏫",    desc: "School-wide operations & reports", border: "border-violet-500/30", selected: "border-violet-400 bg-violet-500/10 ring-1 ring-violet-500/30", accent: "#7c3aed", dash: "/dashboard/admin" },
];

type Step = "role" | "credentials" | "otp";

// ── Showcase slides (left panel) ─────────────────────────────────
const slides = [
  {
    persona: "Parent · Lakshmi",
    accent: "#f97316",
    headline: "Know your child is safe,\nbefore you finish breakfast.",
    subline: "Attendance marked. WhatsApp sent. In under 10 minutes.",
    content: <ParentSlide />,
  },
  {
    persona: "Teacher · Ravi",
    accent: "#3b82f6",
    headline: "40 students.\n2 minutes.\nDone.",
    subline: "Mark attendance, auto-notify parents, move on.",
    content: <TeacherSlide />,
  },
  {
    persona: "Student · Arjun",
    accent: "#10b981",
    headline: "Every homework,\nevery deadline,\none feed.",
    subline: "No WhatsApp groups. No missed assignments.",
    content: <StudentSlide />,
  },
  {
    persona: "Admin · Priya",
    accent: "#7c3aed",
    headline: "780 students.\nReal-time.\nFrom your phone.",
    subline: "School-wide attendance, announcements, forms — live.",
    content: <AdminSlide />,
  },
];

// ── Showcase card components ──────────────────────────────────────
function ParentSlide() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 600); return () => clearTimeout(t); }, []);
  return (
    <div className="space-y-3">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-2xl p-4 border border-orange-500/20" style={{ background: "rgba(249,115,22,0.08)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-xl">🧑‍🎓</div>
          <div>
            <p className="font-semibold text-white text-sm">Arjun · Grade 9A</p>
            <p className="text-xs text-white/40">St. Joseph&apos;s High School</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={String(show)} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className={`ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${show ? "bg-red-500/20 text-red-300 border border-red-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${show ? "bg-red-400" : "bg-emerald-400 animate-pulse"}`} />
              {show ? "Absent" : "In school"}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[{ v: "87%", l: "Attendance" }, { v: "2 due", l: "Homework" }, { v: "1", l: "Pending" }].map(s => (
            <div key={s.l} className="bg-white/5 rounded-xl py-2">
              <p className="text-sm font-bold text-orange-400">{s.v}</p>
              <p className="text-[10px] text-white/30">{s.l}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="rounded-xl p-3 border border-green-700/40 flex gap-3" style={{ background: "rgba(7,94,84,0.35)" }}>
            <span className="text-xl">📱</span>
            <div>
              <p className="text-[10px] text-white/50 mb-0.5">WhatsApp · just now</p>
              <p className="text-xs text-white/80">Arjun marked absent — Period 1 Maths. Reply with reason.</p>
              <div className="flex gap-2 mt-1.5">
                <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full">Sick today</span>
                <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full">Doctor visit</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TeacherSlide() {
  const students = [
    { name: "Arjun", s: "present" }, { name: "Bhavya", s: "absent" },
    { name: "Charan", s: "present" }, { name: "Divya", s: "present" },
    { name: "Eswar", s: "late" }, { name: "Fathima", s: "present" },
  ];
  const [saved, setSaved] = useState(false);
  useEffect(() => { const t = setTimeout(() => setSaved(true), 1800); return () => clearTimeout(t); }, []);
  return (
    <div className="space-y-3">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/8 rounded-2xl p-4">
        <div className="flex justify-between mb-3">
          <p className="text-xs font-semibold text-white/70">Grade 9A · Period 3 · Maths</p>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">● Live</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {students.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.08 }}
              className={`rounded-lg px-2 py-1.5 text-xs font-medium border ${s.s === "present" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : s.s === "absent" ? "bg-red-500/10 border-red-500/20 text-red-300" : "bg-amber-500/10 border-amber-500/20 text-amber-300"}`}>
              <p className="truncate">{s.name}</p>
              <p className="text-[9px] opacity-60 capitalize">{s.s}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <AnimatePresence mode="wait">
        {!saved ? (
          <motion.div key="btn" exit={{ opacity: 0 }} className="w-full bg-blue-600 text-white py-2 rounded-xl text-xs font-semibold text-center">
            Save &amp; notify 1 parent on WhatsApp
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 py-2 rounded-xl text-xs font-semibold text-center">
            ✓ Saved · WhatsApp sent to Bhavya&apos;s parent
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StudentSlide() {
  const hw = [
    { sub: "Maths", title: "Ch 5 — Quadratic Equations", urgent: true, done: false },
    { sub: "English", title: "Essay: My Favourite Festival", urgent: false, done: false },
    { sub: "Science", title: "Lab diagram — Plant Cell", urgent: false, done: true },
  ];
  return (
    <div className="space-y-2">
      {hw.map((h, i) => (
        <motion.div key={h.title} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.15, ease: EASE }}
          className={`flex items-start gap-3 p-3 rounded-xl border text-xs ${h.done ? "bg-white/3 border-white/5 opacity-40" : h.urgent ? "bg-red-500/8 border-red-500/20" : "bg-white/5 border-white/8"}`}>
          <div className={`w-4 h-4 rounded-md border flex-shrink-0 mt-0.5 flex items-center justify-center ${h.done ? "bg-emerald-500 border-emerald-500 text-white text-[9px]" : "border-white/25"}`}>
            {h.done && "✓"}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-medium truncate ${h.done ? "line-through text-white/30" : "text-white/80"}`}>{h.title}</p>
            <p className="text-white/30 text-[10px]">{h.sub}</p>
          </div>
          {h.urgent && !h.done && <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full flex-shrink-0">Tomorrow</span>}
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-3 py-2 text-center">
        <p className="text-[10px] text-indigo-300">🎯 JEE 2028 · Keep pushing, Arjun.</p>
      </motion.div>
    </div>
  );
}

function AdminSlide() {
  const bars = [{ class: "Grade 10A", pct: 98, c: "bg-emerald-500" }, { class: "Grade 9B", pct: 73, c: "bg-red-500" }, { class: "Grade 8A", pct: 89, c: "bg-amber-400" }];
  return (
    <div className="space-y-3">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-2">
        {[
          { v: "88%", l: "Today's attendance", c: "text-emerald-400", b: "bg-emerald-500/10 border-emerald-500/20" },
          { v: "94", l: "Absent today", c: "text-red-400", b: "bg-red-500/10 border-red-500/20" },
          { v: "3", l: "Announcements sent", c: "text-blue-400", b: "bg-blue-500/10 border-blue-500/20" },
          { v: "647", l: "Form responses due", c: "text-amber-400", b: "bg-amber-500/10 border-amber-500/20" },
        ].map((k, i) => (
          <motion.div key={k.l} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 + i * 0.08 }}
            className={`rounded-xl border ${k.b} p-3 text-center`}>
            <p className={`text-xl font-bold ${k.c}`}>{k.v}</p>
            <p className="text-[10px] text-white/30 mt-0.5 leading-tight">{k.l}</p>
          </motion.div>
        ))}
      </motion.div>
      <div className="bg-white/5 border border-white/8 rounded-xl p-3 space-y-2">
        {bars.map((b, i) => (
          <div key={b.class} className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 w-16">{b.class}</span>
            <div className="flex-1 bg-white/8 rounded-full h-1.5 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${b.pct}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: EASE }}
                className={`h-1.5 rounded-full ${b.c}`} />
            </div>
            <span className="text-[10px] font-bold text-white/50 w-7 text-right">{b.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Showcase left panel ───────────────────────────────────────────
function ShowcasePanel() {
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);
  const slide = slides[idx];

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % slides.length);
      setKey(k => k + 1);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-full flex flex-col justify-between p-10 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0d0a1a 50%, #080d14 100%)" }}>

      {/* Background glow that changes with slide */}
      <motion.div key={`glow-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 40%, ${slide.accent}10 0%, transparent 65%)` }} />

      {/* Top: logo + persona badge */}
      <div className="relative flex items-center justify-between">
        <Link href="/" className="font-bold text-white text-lg tracking-tight">Infizium</Link>
        <AnimatePresence mode="wait">
          <motion.span key={idx} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: `${slide.accent}18`, color: slide.accent, border: `1px solid ${slide.accent}35` }}>
            {slide.persona}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Middle: headline + live UI card */}
      <div className="relative flex-1 flex flex-col justify-center py-8 gap-6">
        <AnimatePresence mode="wait">
          <motion.div key={`headline-${idx}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: EASE }}>
            <p className="text-3xl font-bold text-white leading-tight whitespace-pre-line mb-2"
              style={{ textShadow: `0 0 40px ${slide.accent}30` }}>
              {slide.headline}
            </p>
            <p className="text-sm text-white/40">{slide.subline}</p>
          </motion.div>
        </AnimatePresence>

        {/* Live UI card */}
        <div className="rounded-2xl border border-white/8 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}>
          <div className="border-b border-white/6 px-4 py-2.5 flex items-center gap-2" style={{ background: "rgba(0,0,0,0.3)" }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
            </div>
            <div className="flex-1 mx-2">
              <div className="bg-white/5 border border-white/8 rounded-md px-2.5 py-0.5 flex items-center gap-1.5 max-w-[180px] mx-auto">
                <span className="text-emerald-400 text-[10px]">🔒</span>
                <span className="text-[10px] text-white/25 font-mono">infizium.com</span>
              </div>
            </div>
            <motion.div key={`dot-${idx}`} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: slide.accent }} />
              <span className="text-[9px] text-white/25 font-mono">LIVE</span>
            </motion.div>
          </div>
          <div className="p-4">
            <AnimatePresence mode="wait">
              <motion.div key={key}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}>
                {slide.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom: progress dots + tagline */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          {slides.map((_, i) => (
            <button key={i} onClick={() => { setIdx(i); setKey(k => k + 1); }} className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === idx ? 32 : 8, background: "rgba(255,255,255,0.12)" }}>
              {i === idx && (
                <motion.div key={idx} className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: slide.accent }}
                  initial={{ width: "0%" }} animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }} />
              )}
            </button>
          ))}
        </div>
        <p className="text-xs text-white/20">Prepare students for life, not just exams.</p>
      </div>
    </div>
  );
}

// ── Login form ────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("role");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const role = roles.find(r => r.id === selectedRole);

  function demoLogin() {
    if (!selectedRole) return;
    setSession(selectedRole as UserRole, undefined, true);
    router.push(role!.dash);
  }

  async function resolveAndRedirect(authEmail: string) {
    // Look up real profile from DB
    const { data: profile, error: profileErr } = await supabase
      .from("users")
      .select("id, name, role, school_id, schools(name)")
      .eq("email", authEmail)
      .single();

    if (profileErr || !profile) {
      setError("Account not found in Infizium. Contact your school admin.");
      return;
    }

    const dbRole = profile.role as UserRole;
    const schoolsRaw = profile.schools as unknown;
    const schoolName = Array.isArray(schoolsRaw)
      ? (schoolsRaw[0]?.name ?? "")
      : ((schoolsRaw as { name: string } | null)?.name ?? "");

    setSession(dbRole, authEmail, false, {
      id: profile.id,
      name: profile.name,
      schoolId: profile.school_id,
      schoolName,
    });

    router.push(ROLE_DASHBOARD[dbRole]);
  }

  async function sendMagicLink() {
    setError(""); setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
      if (error) throw error;
      setMagicLinkSent(true);
      setStep("otp");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to send link";
      if (msg.includes("fetch") || msg.includes("URL")) { demoLogin(); return; }
      setError(msg);
    } finally { setLoading(false); }
  }

  async function signInWithPassword() {
    setError(""); setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes("fetch") || error.message.includes("URL")) { demoLogin(); return; }
        throw error;
      }
      await resolveAndRedirect(email);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally { setLoading(false); }
  }

  async function verifyOtp() {
    setError(""); setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
      if (error) throw error;
      await resolveAndRedirect(email);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid code");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#09090b" }}>

      {/* ── Left: animated showcase (desktop only) ── */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] flex-col">
        <ShowcasePanel />
      </div>

      {/* ── Divider ── */}
      <div className="hidden lg:block w-px bg-white/6" />

      {/* ── Right: login form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 min-h-screen">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <Link href="/" className="font-bold text-xl text-white">Infizium</Link>
          <p className="text-xs text-white/30 mt-1">School Operating System</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="w-full max-w-sm"
        >
          {/* Step header */}
          <AnimatePresence mode="wait">
            {step === "role" && (
              <motion.div key="h-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-7">
                <h1 className="text-2xl font-bold text-white mb-1">Sign in</h1>
                <p className="text-sm text-white/35">Choose your role to continue</p>
              </motion.div>
            )}
            {step === "credentials" && (
              <motion.div key="h-creds" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="mb-7">
                <button onClick={() => setStep("role")} className="text-xs text-white/30 hover:text-white/60 mb-3 flex items-center gap-1 transition-colors">← Back</button>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {role?.icon} {role?.label}
                </h1>
                <p className="text-sm text-white/35">Enter your email to continue</p>
              </motion.div>
            )}
            {step === "otp" && (
              <motion.div key="h-otp" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="mb-7">
                <button onClick={() => setStep("credentials")} className="text-xs text-white/30 hover:text-white/60 mb-3 flex items-center gap-1 transition-colors">← Back</button>
                <h1 className="text-2xl font-bold text-white mb-1">Check your email</h1>
                <p className="text-sm text-white/35">{magicLinkSent ? `Magic link sent to ${email}` : `Code sent to ${email}`}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step content */}
          <AnimatePresence mode="wait">

            {step === "role" && (
              <motion.div key="role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -16 }}>
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {roles.map(r => (
                    <motion.button key={r.id} onClick={() => setSelectedRole(r.id)} whileTap={{ scale: 0.97 }}
                      className={`rounded-2xl border-2 p-4 text-left transition-all duration-200 ${selectedRole === r.id ? r.selected : `${r.border} bg-white/2 hover:bg-white/5`}`}>
                      <div className="text-2xl mb-2">{r.icon}</div>
                      <p className="font-semibold text-sm text-white">{r.label}</p>
                      <p className="text-[11px] text-white/35 mt-0.5 leading-snug">{r.desc}</p>
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence>
                  {selectedRole && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2.5">
                      <motion.button onClick={() => setStep("credentials")} whileTap={{ scale: 0.99 }}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all"
                        style={{ background: role?.accent }}>
                        Continue as {role?.label} →
                      </motion.button>
                      <button onClick={demoLogin}
                        className="w-full py-2.5 rounded-xl text-xs text-white/25 hover:text-white/50 transition-colors">
                        Skip login · demo mode
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {step === "credentials" && (
              <motion.div key="creds" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-3.5">
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">Email address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@school.edu.in" autoFocus
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={e => (e.target.style.borderColor = role?.accent ?? "rgba(255,255,255,0.25)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">
                    Password <span className="text-white/20">(leave blank for magic link)</span>
                  </label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={e => (e.target.style.borderColor = role?.accent ?? "rgba(255,255,255,0.25)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{error}</p>}
                <motion.button onClick={password ? signInWithPassword : sendMagicLink}
                  disabled={loading || !email} whileTap={{ scale: 0.99 }}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40 transition-all mt-1"
                  style={{ background: role?.accent }}>
                  {loading ? "Sending…" : password ? "Sign in" : "Send magic link →"}
                </motion.button>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div key="otp" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <input type="text" inputMode="numeric" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000" autoFocus
                  className="w-full rounded-xl px-4 py-4 text-center text-2xl font-mono tracking-[0.5em] text-white placeholder-white/15 outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{error}</p>}
                <motion.button onClick={verifyOtp} disabled={loading || otp.length < 6} whileTap={{ scale: 0.99 }}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40"
                  style={{ background: role?.accent }}>
                  {loading ? "Verifying…" : "Verify & Sign in →"}
                </motion.button>
                <button onClick={sendMagicLink} className="w-full text-xs text-white/20 hover:text-white/50 transition-colors">Resend code</button>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Step indicator */}
          <div className="flex gap-1.5 justify-center mt-8">
            {(["role", "credentials", "otp"] as Step[]).map((s, i) => (
              <div key={s} className="h-0.5 rounded-full transition-all duration-300"
                style={{ width: step === s ? 24 : 8, background: step === s ? (role?.accent ?? "rgba(255,255,255,0.5)") : "rgba(255,255,255,0.12)" }} />
            ))}
          </div>

          <p className="text-center text-[10px] text-white/12 mt-6">
            DPDP compliant · Supabase Auth · infizium.com
          </p>
        </motion.div>
      </div>
    </div>
  );
}
