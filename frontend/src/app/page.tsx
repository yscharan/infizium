"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { APP_VERSION } from "@/lib/version";
import { SponsorChat } from "@/components/sponsor-chat";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ── Personas ──────────────────────────────────────────────────────
const personas = [
  {
    id: "parent", idx: 0, role: "Parent", icon: "👩", neon: "#f97316",
    name: "Lakshmi", detail: "38 · Kukatpally, Hyderabad · Home tailor",
    tagline: "Know your child is safe,\nbefore you finish breakfast.",
    story: "Lakshmi watches Arjun leave at 7:30 AM and doesn't know if he's on the bus or safe — until he calls from school. She checks WhatsApp constantly. She won't download another app.",
    gets: ["WhatsApp attendance alert under 10 minutes", "Approve field trips with a WhatsApp reply", "Homework due dates without opening an app", "Full control over what data is shared"],
    href: "/dashboard/parent",
  },
  {
    id: "teacher", idx: 1, role: "Teacher", icon: "👨‍🏫", neon: "#3b82f6",
    name: "Ravi", detail: "34 · Grade 8 Maths · 12 years experience",
    tagline: "40 students. 2 minutes.\nYou teach. We handle admin.",
    story: "Ravi spends 24 minutes a day on attendance registers. He manages a parent WhatsApp group of 42 families — messages arrive at 10 PM. He answers because he cares. It's burning him out.",
    gets: ["Mark attendance in under 90 seconds on mobile", "Parents auto-notified — no manual messages", "Assign homework with a due date in seconds", "After 6 PM messages held until morning"],
    href: "/dashboard/teacher",
  },
  {
    id: "student", idx: 2, role: "Student", icon: "🧑‍🎓", neon: "#10b981",
    name: "Arjun", detail: "15 · Grade 9A · JEE 2028 aspirant",
    tagline: "Doubts at 9 PM?\nAsk. Get an answer. In Telugu.",
    story: "Arjun forgets homework given verbally. He has doubts at 9 PM with no one to ask. He re-reads notes before exams because no one has told him what to study differently.",
    gets: ["Clean homework feed — never miss an assignment", "AI tutor answers questions at night (Phase 3)", "Track attendance % and progress trend", "No extra app for parents to manage"],
    href: "/dashboard/student",
  },
  {
    id: "admin", idx: 3, role: "Admin", icon: "🏫", neon: "#7c3aed",
    name: "Shekhar", detail: "Valmiki Vidyalayam, Hyderabad",
    tagline: "780 students. Real-time.\nFrom your phone.",
    story: "Shekhar starts every morning calling three class teachers for a rough attendance count. He sends announcements to a 200-parent WhatsApp group with no idea who read them.",
    gets: ["School-wide attendance view at 8:15 AM", "Broadcast to 780 parents in under 60 seconds", "Read receipts and delivery tracking per parent", "DPDP-compliant consent audit trail"],
    href: "/dashboard/admin",
  },
];

// ── Persona preview cards ─────────────────────────────────────────
function ParentPreview() {
  const [absent, setAbsent] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAbsent(true), 1200); return () => clearTimeout(t); }, []);
  return (
    <div className="space-y-3">
      <div className="rounded-2xl p-4 border border-orange-500/20" style={{ background: "rgba(249,115,22,0.08)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center text-lg">🧑‍🎓</div>
          <div><p className="font-semibold text-white text-sm">Arjun · Grade 9A</p><p className="text-xs text-white/40">Valmiki Vidyalayam</p></div>
          <AnimatePresence mode="wait">
            <motion.span key={String(absent)} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full border ${absent ? "bg-red-500/20 text-red-300 border-red-500/30" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"}`}>
              {absent ? "Absent" : "Present"}
            </motion.span>
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
      </div>
      <AnimatePresence>
        {absent && (
          <motion.div initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} transition={{ duration: 0.4, ease: EASE }}
            className="rounded-xl p-3 border border-green-700/40 flex gap-3" style={{ background: "rgba(7,94,84,0.35)" }}>
            <span className="text-lg">📱</span>
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

function TeacherPreview() {
  const students = [
    { name: "Arjun", s: "present" }, { name: "Bhavya", s: "absent" },
    { name: "Charan", s: "present" }, { name: "Divya", s: "present" },
    { name: "Eswar", s: "late" }, { name: "Fathima", s: "present" },
  ];
  const [saved, setSaved] = useState(false);
  useEffect(() => { const t = setTimeout(() => setSaved(true), 2000); return () => clearTimeout(t); }, []);
  return (
    <div className="space-y-3">
      <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
        <div className="flex justify-between mb-3">
          <p className="text-xs font-semibold text-white/70">Grade 9A · Period 3 · Maths</p>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">● Live</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {students.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.08 }}
              className={`rounded-lg px-2 py-1.5 text-xs font-medium border ${s.s === "present" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : s.s === "absent" ? "bg-red-500/10 border-red-500/20 text-red-300" : "bg-amber-500/10 border-amber-500/20 text-amber-300"}`}>
              <p className="truncate">{s.name}</p><p className="text-[9px] opacity-60 capitalize">{s.s}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {!saved
          ? <motion.div key="btn" exit={{ opacity: 0 }} className="w-full bg-blue-600 text-white py-2 rounded-xl text-xs font-semibold text-center">Save &amp; notify 1 parent on WhatsApp</motion.div>
          : <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 py-2 rounded-xl text-xs font-semibold text-center">✓ Saved · WhatsApp sent to Bhavya&apos;s parent</motion.div>
        }
      </AnimatePresence>
    </div>
  );
}

function StudentPreview() {
  const hw = [
    { sub: "Maths", title: "Ch 5 — Quadratic Equations", urgent: true, done: false },
    { sub: "English", title: "Essay: My Favourite Festival", urgent: false, done: false },
    { sub: "Science", title: "Lab diagram — Plant Cell", urgent: false, done: true },
  ];
  return (
    <div className="space-y-2">
      {hw.map((h, i) => (
        <motion.div key={h.title} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12, ease: EASE }}
          className={`flex items-start gap-3 p-3 rounded-xl border text-xs ${h.done ? "bg-white/3 border-white/5 opacity-40" : h.urgent ? "bg-red-500/8 border-red-500/20" : "bg-white/5 border-white/8"}`}>
          <div className={`w-4 h-4 rounded-md border flex-shrink-0 mt-0.5 flex items-center justify-center ${h.done ? "bg-emerald-500 border-emerald-500 text-white text-[9px]" : "border-white/25"}`}>{h.done && "✓"}</div>
          <div className="flex-1 min-w-0">
            <p className={`font-medium truncate ${h.done ? "line-through text-white/30" : "text-white/80"}`}>{h.title}</p>
            <p className="text-white/30 text-[10px]">{h.sub}</p>
          </div>
          {h.urgent && !h.done && <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full flex-shrink-0">Tomorrow</span>}
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 text-center">
        <p className="text-[10px] text-emerald-300">🎯 JEE 2028 · Keep going, Arjun.</p>
      </motion.div>
    </div>
  );
}

function AdminPreview() {
  const bars = [{ cls: "Grade 10A", pct: 98, c: "bg-emerald-500" }, { cls: "Grade 9B", pct: 73, c: "bg-red-500" }, { cls: "Grade 8A", pct: 89, c: "bg-amber-400" }];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {[
          { v: "88%", l: "Today's attendance", c: "text-emerald-400", b: "bg-emerald-500/10 border-emerald-500/20" },
          { v: "94", l: "Absent today", c: "text-red-400", b: "bg-red-500/10 border-red-500/20" },
          { v: "3", l: "Announcements sent", c: "text-blue-400", b: "bg-blue-500/10 border-blue-500/20" },
          { v: "12", l: "Forms pending", c: "text-amber-400", b: "bg-amber-500/10 border-amber-500/20" },
        ].map((k, i) => (
          <motion.div key={k.l} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.08 }}
            className={`rounded-xl border ${k.b} p-3 text-center`}>
            <p className={`text-xl font-bold ${k.c}`}>{k.v}</p>
            <p className="text-[10px] text-white/30 mt-0.5 leading-tight">{k.l}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-white/5 border border-white/8 rounded-xl p-3 space-y-2">
        {bars.map((b, i) => (
          <div key={b.cls} className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 w-16">{b.cls}</span>
            <div className="flex-1 bg-white/8 rounded-full h-1.5 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${b.pct}%` }} transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: EASE }} className={`h-1.5 rounded-full ${b.c}`} />
            </div>
            <span className="text-[10px] font-bold text-white/50 w-7 text-right">{b.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const previewContent = [ParentPreview, TeacherPreview, StudentPreview, AdminPreview];

// ── Showcase sidebar ──────────────────────────────────────────────
function ShowcaseSidebar({ idx, onIdx }: { idx: number; onIdx: (i: number) => void }) {
  const [key, setKey] = useState(0);
  const p = personas[idx];
  const Preview = previewContent[idx];

  useEffect(() => {
    const t = setInterval(() => { onIdx((idx + 1) % personas.length); setKey(k => k + 1); }, 5000);
    return () => clearInterval(t);
  }, [idx, onIdx]);

  return (
    <div className="relative h-full flex flex-col justify-between p-10 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0d0a1a 50%, #080d14 100%)" }}>
      <motion.div key={`glow-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 40%, ${p.neon}12 0%, transparent 65%)` }} />
      <div className="relative flex items-center justify-end">
        <AnimatePresence mode="wait">
          <motion.span key={idx} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.4 }}
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: `${p.neon}18`, color: p.neon, border: `1px solid ${p.neon}35` }}>
            {p.icon} {p.role} · {p.name}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="relative flex-1 flex flex-col justify-center py-6 gap-5">
        <AnimatePresence mode="wait">
          <motion.p key={`h-${idx}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: EASE }}
            className="text-3xl font-bold text-white leading-tight whitespace-pre-line"
            style={{ textShadow: `0 0 40px ${p.neon}30` }}>
            {p.tagline}
          </motion.p>
        </AnimatePresence>
        <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}>
          <div className="border-b border-white/6 px-4 py-2.5 flex items-center gap-2" style={{ background: "rgba(0,0,0,0.3)" }}>
            <div className="flex gap-1.5">{["bg-red-500/50","bg-amber-500/50","bg-emerald-500/50"].map(c=><div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`}/>)}</div>
            <div className="flex-1 mx-2"><div className="bg-white/5 border border-white/8 rounded-md px-2.5 py-0.5 flex items-center gap-1.5 max-w-[180px] mx-auto"><span className="text-emerald-400 text-[10px]">🔒</span><span className="text-[10px] text-white/25 font-mono">app.infizium.com</span></div></div>
            <motion.div animate={{ opacity: [0.4,1,0.4] }} transition={{ duration: 2, repeat: Infinity }} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.neon }} /><span className="text-[9px] text-white/25 font-mono">LIVE</span>
            </motion.div>
          </div>
          <div className="p-4">
            <AnimatePresence mode="wait">
              <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}><Preview /></motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          {personas.map((_, i) => (
            <button key={i} onClick={() => { onIdx(i); setKey(k=>k+1); }} className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === idx ? 32 : 8, background: "rgba(255,255,255,0.12)" }}>
              {i === idx && <motion.div key={idx} className="absolute inset-y-0 left-0 rounded-full" style={{ background: p.neon }} initial={{ width:"0%" }} animate={{ width:"100%" }} transition={{ duration: 5, ease:"linear" }} />}
            </button>
          ))}
        </div>
        <p className="text-xs text-white/20">Prepare students for life, not just exams.</p>
      </div>
    </div>
  );
}

// ── Mobile showcase (top card on mobile) ─────────────────────────
function MobileShowcase({ idx, onIdx }: { idx: number; onIdx: (i: number) => void }) {
  const [key, setKey] = useState(0);
  const p = personas[idx];
  const Preview = previewContent[idx];

  useEffect(() => {
    const t = setInterval(() => { onIdx((idx + 1) % personas.length); setKey(k => k + 1); }, 5000);
    return () => clearInterval(t);
  }, [idx, onIdx]);

  return (
    <div className="relative flex flex-col px-4 pt-4 pb-3 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a0a0f 0%, #0d0a1a 100%)" }}>
      <motion.div key={`mg-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 60% 30%, ${p.neon}15 0%, transparent 70%)` }} />
      <div className="relative flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "rgba(0,212,255,0.5)" }}>Telangana School OS</p>
          <AnimatePresence mode="wait">
            <motion.p key={`t-${idx}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE }}
              className="text-xl font-bold text-white leading-tight whitespace-pre-line mt-1">
              {p.tagline}
            </motion.p>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.span key={`badge-${idx}`} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ml-3"
            style={{ background: `${p.neon}18`, color: p.neon, border: `1px solid ${p.neon}35` }}>
            {p.icon} {p.role}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="relative rounded-xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="border-b border-white/6 px-3 py-2 flex items-center gap-1.5" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="flex gap-1">{["bg-red-500/40","bg-amber-500/40","bg-emerald-500/40"].map(c=><div key={c} className={`w-2 h-2 rounded-full ${c}`}/>)}</div>
          <span className="text-[9px] text-white/20 font-mono ml-1">app.infizium.com</span>
          <motion.div animate={{ opacity: [0.4,1,0.4] }} transition={{ duration: 2, repeat: Infinity }} className="ml-auto flex items-center gap-1">
            <span className="w-1 h-1 rounded-full" style={{ background: p.neon }} /><span className="text-[8px] text-white/20 font-mono">LIVE</span>
          </motion.div>
        </div>
        <div className="p-3">
          <AnimatePresence mode="wait">
            <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}><Preview /></motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="relative flex items-center gap-1.5 mt-3">
        {personas.map((_, i) => (
          <button key={i} onClick={() => { onIdx(i); setKey(k=>k+1); }} className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: i === idx ? 28 : 7, background: "rgba(255,255,255,0.12)" }}>
            {i === idx && <motion.div key={idx} className="absolute inset-y-0 left-0 rounded-full" style={{ background: p.neon }} initial={{ width:"0%" }} animate={{ width:"100%" }} transition={{ duration: 5, ease:"linear" }} />}
          </button>
        ))}
        <p className="ml-auto text-[9px] text-white/20">auto-cycling</p>
      </div>
    </div>
  );
}

// ── Split hero ────────────────────────────────────────────────────
function SplitHero() {
  const [idx, setIdx] = useState(0);
  const p = personas[idx];
  return (
    <section className="flex flex-col lg:flex-row min-h-screen">

      {/* Mobile: compact showcase on top */}
      <div className="lg:hidden">
        <MobileShowcase idx={idx} onIdx={setIdx} />
      </div>

      {/* Desktop: full sidebar on left */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] flex-col">
        <ShowcaseSidebar idx={idx} onIdx={setIdx} />
      </div>
      <div className="hidden lg:block w-px bg-white/6" />

      {/* Persona selector — right on desktop, bottom on mobile */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 lg:py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE }} className="w-full max-w-sm">
          <div className="mb-5">
            <h1 className="text-xl lg:text-2xl font-bold text-white mb-1">Who are you?</h1>
            <p className="text-sm text-white/35">Select your role to see what Infizium does for you</p>
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 mb-4">
            {personas.map((per, i) => (
              <motion.button key={per.id} onClick={() => setIdx(i)} whileTap={{ scale: 0.97 }}
                className="rounded-xl lg:rounded-2xl border-2 p-2.5 lg:p-4 text-left transition-all duration-200"
                style={idx === i ? { borderColor: per.neon, background: `${per.neon}10`, boxShadow: `0 0 0 1px ${per.neon}30` } : { borderColor: `${per.neon}30`, background: "rgba(255,255,255,0.02)" }}>
                <div className="text-xl lg:text-2xl mb-1 lg:mb-2">{per.icon}</div>
                <p className="font-semibold text-xs lg:text-sm text-white">{per.role}</p>
                <p className="text-[10px] text-white/35 mt-0.5 leading-snug hidden lg:block">{per.gets[0]}</p>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}
              className="rounded-2xl p-4 mb-4 border" style={{ background: `${p.neon}08`, borderColor: `${p.neon}25` }}>
              <p className="text-xs font-semibold mb-0.5" style={{ color: p.neon }}>{p.icon} {p.role} · {p.name}</p>
              <p className="text-[11px] text-white/40 mb-2.5 leading-relaxed">{p.detail}</p>
              <ul className="space-y-1.5">
                {p.gets.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-white/60">
                    <span style={{ color: p.neon }} className="mt-0.5 flex-shrink-0">→</span>{f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
          <div className="space-y-2">
            <Link href={p.href} className="block w-full py-3 rounded-xl font-semibold text-sm text-white text-center hover:opacity-90 transition-all" style={{ background: p.neon }}>
              Explore as {p.role} →
            </Link>
            <a href="#mission" className="block w-full py-2 rounded-xl text-xs text-white/25 hover:text-white/50 transition-colors text-center">See our mission ↓</a>
          </div>
          <p className="text-center text-[10px] text-white/12 mt-4">DPDP compliant · Access requires admin approval · Valmiki Vidyalayam pilot</p>
        </motion.div>
      </div>
    </section>
  );
}

// ── The four people ───────────────────────────────────────────────
function PeopleSection() {
  return (
    <section id="personas" className="py-24 px-4" style={{ background: "rgba(0,0,0,0.2)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-widest uppercase text-white/30 mb-3">Built for real people</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white tracking-tight mb-3">Four lives. One platform.</motion.h2>
          <motion.p variants={fadeUp} className="text-white/30 max-w-xl mx-auto">Every feature in Infizium is filtered through these four people. If it doesn&apos;t make Lakshmi&apos;s morning easier, it doesn&apos;t ship.</motion.p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1, duration: 0.5, ease: EASE }}
              className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
              style={{ background: `${p.neon}06`, border: `1px solid ${p.neon}20` }}>
              <div className="flex items-start gap-3">
                <span className="text-3xl">{p.icon}</span>
                <div>
                  <p className="font-bold text-white">{p.name}</p>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: p.neon }}>{p.role}</p>
                  <p className="text-[11px] text-white/35 mt-0.5">{p.detail}</p>
                </div>
              </div>
              <p className="text-xs text-white/45 leading-relaxed">{p.story}</p>
              <ul className="mt-auto space-y-1.5">
                {p.gets.slice(0,3).map(g => (
                  <li key={g} className="flex items-start gap-1.5 text-xs text-white/35">
                    <span style={{ color: p.neon }} className="flex-shrink-0 mt-0.5">→</span>{g}
                  </li>
                ))}
              </ul>
              <Link href={p.href} className="mt-1 self-start text-xs font-bold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                style={{ background: `${p.neon}15`, color: p.neon, border: `1px solid ${p.neon}30` }}>
                Preview dashboard →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Mission section ───────────────────────────────────────────────
function MissionSection() {
  return (
    <section id="mission" className="py-28 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #09090b 0%, #0d0515 50%, #09090b 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(0,212,255,0.04)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "rgba(139,92,246,0.06)" }} />
      </div>
      <div className="max-w-5xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold tracking-widest uppercase" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />Mission Infizium
          </span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            Prepare students for life,<br />
            <span style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>not just exams.</span>
          </h2>
          <p className="text-lg font-semibold italic mb-5" style={{ color: "rgba(0,212,255,0.6)", letterSpacing: "0.01em" }}>
            &ldquo;Educate to build a personality.&rdquo;
          </p>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            Schools in Telangana prepare students brilliantly for board exams. But life after school — managing time, money, health, and relationships — is taught nowhere. Infizium starts by fixing the school operating system, then builds the life skills layer on top.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Why", neon: "#f97316", icon: "🎯", heading: "The problem", body: "Parents miss alerts. Teachers waste 24 min/day on registers. Principals have no real-time view. Students get feedback twice a year." },
            { label: "What", neon: "#00d4ff", icon: "🏗️", heading: "What we build", body: "Attendance, homework, announcements, live bus tracking, parent communication, AI bot, and more. WhatsApp-first — no extra app needed for parents." },
            { label: "How", neon: "#10b981", icon: "⚡", heading: "How it works", body: "Mobile-first for teachers. WhatsApp for parents. Clean feed for students. Simple dashboard for admins. No app download required for parents." },
            { label: "Where", neon: "#7c3aed", icon: "📍", heading: "Where we start", body: "Valmiki Vidyalayam, Hyderabad. Every feature is built alongside real teachers, parents, and students here first." },
          ].map((col, i) => (
            <motion.div key={col.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1, duration: 0.5, ease: EASE }}
              className="rounded-2xl p-5 flex flex-col gap-2" style={{ background: `${col.neon}08`, border: `1px solid ${col.neon}20` }}>
              <div className="flex items-center gap-2"><span className="text-xl">{col.icon}</span><span className="text-xs font-bold tracking-widest uppercase" style={{ color: col.neon }}>{col.label}</span></div>
              <p className="font-bold text-white text-sm">{col.heading}</p>
              <p className="text-xs text-white/45 leading-relaxed">{col.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature highlights strip */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }} className="mb-6">
          <p className="text-xs font-mono tracking-widest uppercase text-white/25 text-center mb-4">What&apos;s inside</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: "✅ Attendance", neon: "#10b981", status: "Live" },
              { label: "📚 Homework", neon: "#10b981", status: "Live" },
              { label: "💬 WhatsApp Alerts", neon: "#10b981", status: "Live" },
              { label: "🤖 AI Bot (Telugu)", neon: "#10b981", status: "Live" },
              { label: "📋 Forms & Approvals", neon: "#10b981", status: "Live" },
              { label: "🚌 Live Bus Tracking", neon: "#f59e0b", status: "Phase 2" },
              { label: "📡 Smart Band / Tag", neon: "#f59e0b", status: "Phase 2" },
              { label: "💰 Sponsorship", neon: "#f59e0b", status: "Phase 2" },
              { label: "🧠 AI Tutor", neon: "#7c3aed", status: "Phase 3" },
            ].map(f => (
              <span key={f.label} className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: `${f.neon}12`, color: f.neon, border: `1px solid ${f.neon}30` }}>
                {f.label} <span className="opacity-50 font-normal ml-1">{f.status}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Pilot school */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
          className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5"
          style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}>
          <div className="text-5xl flex-shrink-0">🏫</div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5">
              <p className="font-bold text-white text-lg">Valmiki Vidyalayam, Hyderabad</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>Pilot School</span>
            </div>
            <p className="text-sm text-white/40 mb-2">Our first school. What works here rolls out to the next school. Real teachers, real parents, real students.</p>
            <p className="text-xs text-white/25">School owner: <span className="text-white/50 font-medium">Shekhar Rao Yadagiri</span> · <span className="text-white/50 font-medium">+91 99854 01894</span></p>
          </div>
          <Link href="/login" className="flex-shrink-0 text-sm px-5 py-2.5 rounded-xl font-semibold hover:scale-[1.02] transition-all"
            style={{ background: "rgba(0,212,255,0.10)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff" }}>Get access →</Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── What's built now ──────────────────────────────────────────────
const mvpModules = [
  { icon: "✅", title: "Attendance", status: "Live", neon: "#10b981", desc: "Teacher marks full class on mobile in under 2 minutes. Absent students trigger WhatsApp alerts to parents automatically.", tags: ["teacher","parent","admin"] },
  { icon: "📚", title: "Homework", status: "Live", neon: "#10b981", desc: "Teacher assigns with a due date. Students see a clean feed. Parents notified via WhatsApp. AI bot answers 'what homework is due?' in real time.", tags: ["teacher","student","parent"] },
  { icon: "📢", title: "Announcements", status: "Live", neon: "#10b981", desc: "Admin broadcasts to 780 parents in under 60 seconds. WhatsApp delivery with read tracking per parent. No more group chats.", tags: ["admin","teacher","parent","student"] },
  { icon: "📋", title: "Forms & Approvals", status: "Live", neon: "#10b981", desc: "Parents approve field trips with a WhatsApp reply. Full DPDP-compliant audit log. Admin sees who approved, who declined, who hasn't replied.", tags: ["admin","parent","teacher"] },
  { icon: "💬", title: "WhatsApp-First", status: "Live", neon: "#10b981", desc: "Every alert goes to WhatsApp — no new app for parents. Works for any parent who has WhatsApp. 90%+ of Telangana parents already do.", tags: ["parent","student"] },
  { icon: "🤖", title: "AI Bot (Claude Haiku)", status: "Live", neon: "#10b981", desc: "Parents text the bot anything — \"Arjun attendance ela undi?\" — and get real-time answers from the school database. Responds in Telugu.", tags: ["parent","student"] },
  { icon: "🔐", title: "Parent Permissions", status: "Live", neon: "#10b981", desc: "Parents control which notifications arrive, which features are active for their child, and what data is shared. DPDP compliant.", tags: ["parent","admin"] },
  { icon: "🤖", title: "MCP Server", status: "Live", neon: "#10b981", desc: "7 tools that give Claude Code (development) and the future AI tutor (production) grounded, real-time access to school data.", tags: ["admin"] },
  { icon: "🚌", title: "Commute Ecosystem", status: "Phase 2", neon: "#f59e0b", desc: "UI built. Real GPS integration pending. 5 commute modes + Smart Band + Smart Tag hardware. The 9-minute rule.", tags: ["parent","student","admin"] },
  { icon: "💰", title: "Sponsorship Platform", status: "Phase 2", neon: "#f59e0b", desc: "UI built. Payment integration pending. Donors pay student fees directly to school — no middleman. Anonymous, Codename, or Direct modes.", tags: ["student","admin"] },
  { icon: "📊", title: "Analytics & Reports", status: "Phase 2", neon: "#3b82f6", desc: "Board-ready PDF reports with one click. Attendance trends, form response rates, announcement reach. No Excel required.", tags: ["admin","teacher"] },
  { icon: "🧠", title: "AI Tutor (Telugu)", status: "Phase 3", neon: "#7c3aed", desc: "Bedrock-powered. Student asks in Telugu at 9 PM, tutor answers with worked examples. Aware of weak subjects. Parent-controlled.", tags: ["student","parent"] },
];

const personaNeonMap: Record<string, string> = { parent: "#f97316", teacher: "#3b82f6", student: "#10b981", admin: "#7c3aed" };

function ModulesSection() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? mvpModules : mvpModules.filter(m => m.tags.includes(filter));
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-10">
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-widest uppercase text-white/30 mb-3">All modules</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white tracking-tight mb-3">Everything the school needs,<br/>nothing it doesn&apos;t</motion.h2>
          <motion.p variants={fadeUp} className="text-white/30">12 modules across MVP and future phases. Filter by who uses each one.</motion.p>
        </motion.div>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[{ id: "all", label: "All modules", neon: "#00d4ff" }, ...personas.map(p => ({ id: p.id, label: p.role, neon: p.neon }))].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
              style={filter === f.id ? { background: `${f.neon}20`, color: f.neon, border: `1px solid ${f.neon}40` } : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m, i) => (
            <motion.div key={m.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.05, duration: 0.4, ease: EASE }}
              className="rounded-2xl p-5 flex flex-col gap-3 relative"
              style={{ background: `${m.neon}06`, border: `1px solid ${m.neon}18` }}>
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${m.neon}18`, color: m.neon, border: `1px solid ${m.neon}30` }}>{m.status}</span>
              </div>
              <div className="flex items-start gap-3 pr-16">
                <span className="text-2xl mt-0.5">{m.icon}</span>
                <div><h3 className="font-semibold text-white text-sm">{m.title}</h3><p className="text-xs text-white/35 leading-relaxed mt-0.5">{m.desc}</p></div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {m.tags.map(tag => {
                  const per = personas.find(p => p.id === tag);
                  return per ? <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${per.neon}15`, color: per.neon, border: `1px solid ${per.neon}30` }}>{per.icon} {per.role}</span> : null;
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Commute section ───────────────────────────────────────────────
function CommuteSection() {
  const modes = [
    { icon: "🚌", title: "School Bus", desc: "GPS on every bus. Board/alight WhatsApp ping. Digital roster for driver.", phase: "Phase 2" },
    { icon: "🚗", title: "Parent Car Pool", desc: "Route-matching between school families. Shared live location. Mutual verified identity.", phase: "Phase 2" },
    { icon: "🛺", title: "Auto Buddy", desc: "School-verified auto drivers. Group ride for 3–4 students. Parent gets arrival alert.", phase: "Phase 2" },
    { icon: "🚶", title: "Walk Group", desc: "Group tracking (not individual GPS). Senior student as leader. Parent gets 'group arrived' alert.", phase: "Phase 2" },
    { icon: "📡", title: "Solo + Smart Tag", desc: "Student travels alone. Infizium Tag in bag or Smart Band on wrist. Silent location ping to parent.", phase: "Phase 2" },
  ];
  return (
    <section id="commute-section" className="py-28 px-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #09090b 0%, #0a0d0a 50%, #09090b 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(245,158,11,0.05)" }} />
      </div>
      <div className="max-w-5xl mx-auto relative">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-amber-400">Commute Ecosystem · Phase 2</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            The 9-minute rule.<br/>
            <span style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              A parent who knows their child is 9 minutes from school stops worrying.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/35 max-w-xl mx-auto leading-relaxed">
            Every morning, Lakshmi watches Arjun leave at 7:30 AM and doesn&apos;t know if he&apos;s safe until he calls. That 22-minute gap of no information is exactly what Infizium Commute closes.
          </motion.p>
        </motion.div>

        {/* 5 commute modes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
          {modes.map((m, i) => (
            <motion.div key={m.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.08, duration: 0.5, ease: EASE }}
              className="rounded-2xl p-4 flex flex-col gap-2" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.18)" }}>
              <span className="text-2xl">{m.icon}</span>
              <p className="font-bold text-white text-sm">{m.title}</p>
              <p className="text-xs text-white/40 leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Hardware */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {[
            {
              name: "Infizium Smart Band", icon: "⌚", neon: "#f59e0b",
              specs: ["GPS + BLE 5.0", "7-day battery", "IP67 waterproof", "SOS button — 3-sec hold → parent + admin alert", "School gate geofence auto check-in"],
              who: "Student wears it · Looks like a watch",
            },
            {
              name: "Infizium Tag", icon: "🏷️", neon: "#f97316",
              specs: ["23mm × 23mm × 4mm — fits in school bag", "6-month battery (no daily charging)", "BLE 5.2 + cell triangulation", "Water resistant", "Works without any student action"],
              who: "Hidden in bag · No daily charging",
            },
          ].map((hw, i) => (
            <motion.div key={hw.name} initial={{ opacity: 0, x: i===0 ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
              className="rounded-2xl p-6" style={{ background: `${hw.neon}06`, border: `1px solid ${hw.neon}20` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{hw.icon}</span>
                <div>
                  <p className="font-bold text-white">{hw.name}</p>
                  <p className="text-xs text-white/40">{hw.who}</p>
                </div>
                <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${hw.neon}18`, color: hw.neon, border: `1px solid ${hw.neon}30` }}>Phase 2 prototype</span>
              </div>
              <ul className="space-y-1.5">
                {hw.specs.map(s => <li key={s} className="flex items-start gap-2 text-xs text-white/50"><span style={{ color: hw.neon }} className="flex-shrink-0 mt-0.5">·</span>{s}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Morning timeline */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
          className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245,158,11,0.12)" }}>
          <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-4">Lakshmi&apos;s morning · Arjun&apos;s commute</p>
          <div className="space-y-3">
            {[
              { time: "7:25 AM", msg: "Smart Band auto-activates commute mode", type: "band" },
              { time: "7:31 AM", msg: "✅ Arjun boarded Bus #4. ETA school: 19 min.", type: "wa" },
              { time: "7:51 AM", msg: "🏫 Arjun reached school. Good morning!", type: "wa" },
              { time: "7:51 AM", msg: "Lakshmi stops worrying. She goes back to tailoring.", type: "note" },
            ].map((ev, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1, duration: 0.4, ease: EASE }}
                className="flex items-start gap-3">
                <span className="text-[10px] font-mono text-white/30 w-14 flex-shrink-0 pt-0.5">{ev.time}</span>
                <span className={`text-xs ${ev.type === "wa" ? "text-emerald-300" : ev.type === "band" ? "text-amber-300" : "text-white/30 italic"}`}>{ev.msg}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <Link href="/commute" className="inline-flex items-center gap-2 text-sm px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
            style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", color: "#f59e0b" }}>
            See full commute feature →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── AI section ────────────────────────────────────────────────────
function AISection() {
  const convos = [
    { from: "parent", msg: "Arjun attendance ela undi this week?" },
    { from: "bot", msg: "✅ Arjun attended *4 of 5 days* this week. Absent on Wednesday, June 4. This month: 87% (24 of 28 days)." },
    { from: "parent", msg: "homework enti undi tomorrow?" },
    { from: "bot", msg: "📚 2 assignments due June 8:\n• *Maths* — Chapter 7 exercises\n• *English* — Essay on environment (due June 10)\n\nBoth posted by Ravi sir today." },
  ];
  return (
    <section id="ai-section" className="py-24 px-4" style={{ background: "rgba(0,0,0,0.2)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-widest uppercase text-indigo-400">AI Handler · Live now</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
              A parent texts. The school answers.<br/>
              <span style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>In Telugu. At 10 PM.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 leading-relaxed mb-6">
              Lakshmi texts the bot on WhatsApp or Telegram in Telugu. Claude Haiku calls the real Supabase database, pulls Arjun&apos;s actual attendance and homework, and replies in under 5 seconds — in whatever language she wrote in.
            </motion.p>
            <motion.div variants={fadeUp} className="space-y-3">
              {[
                { icon: "🤖", label: "Built with Claude Haiku + MCP tool use" },
                { icon: "🗣️", label: "Detects Telugu automatically, responds in kind" },
                { icon: "📊", label: "Answers from real Supabase data — not scripted" },
                { icon: "💸", label: "~₹200/month for 500 parents" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-3">
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-sm text-white/60">{f.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
            <div className="rounded-2xl overflow-hidden border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm">📱</div>
                <div><p className="text-xs font-semibold text-white">WhatsApp / @InfiziumBot</p><p className="text-[10px] text-emerald-400">● Online · Responds in English &amp; Telugu</p></div>
              </div>
              <div className="p-4 space-y-3">
                {convos.map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.15, duration: 0.4, ease: EASE }}
                    className={`flex ${c.from === "parent" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${c.from === "parent" ? "bg-emerald-600/30 text-emerald-100 border border-emerald-500/20" : "bg-white/8 text-white/80 border border-white/8"}`}>
                      {c.msg}
                    </div>
                  </motion.div>
                ))}
                <div className="flex items-center gap-1.5 pl-2">
                  {[0,1,2].map(i => <motion.div key={i} animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i*0.2 }} className="w-1.5 h-1.5 rounded-full bg-white/30" />)}
                  <span className="text-[10px] text-white/20 ml-1">Claude is thinking…</span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-white/25 mt-3">Try it: open Telegram → search <span className="text-white/50">@InfiziumBot</span> → /register your_phone</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Roadmap ───────────────────────────────────────────────────────
const phases = [
  { phase: "Phase 0", time: "Done ✓", badge: "Complete", neon: "#10b981", title: "Foundation", modules: ["Next.js on Vercel", "Express + Supabase", "Claude Haiku AI bot", "MCP server (7 tools)", "Telegram testing bot", "GraphQL hooks"] },
  { phase: "MVP", time: "Now · 2026", badge: "Live", neon: "#00d4ff", title: "School OS", modules: ["Attendance", "Homework", "Announcements", "Forms & Approvals", "WhatsApp notifications", "Parent permissions"] },
  { phase: "Phase 2", time: "Q3 2026", badge: "Next", neon: "#3b82f6", title: "Pilot Expansion", modules: ["Real GPS commute", "Smart Band / Tag hardware", "Razorpay/UPI payments", "Sponsorship live", "Telugu language polish", "3–5 schools"] },
  { phase: "Phase 3", time: "Late 2026", badge: "Planned", neon: "#7c3aed", title: "AI Layer", modules: ["Bedrock AI tutor", "Telugu-first Q&A", "Early warning flags", "Essay feedback drafts", "Self-serve onboarding"] },
  { phase: "Phase 4", time: "2027", badge: "Vision", neon: "#f97316", title: "Scale", modules: ["AWS Aurora + Lambda", "Multi-school dashboard", "DigiLocker integration", "Fee management", "PWA offline mode"] },
  { phase: "Phase 5", time: "2028+", badge: "Vision", neon: "#ec4899", title: "Life Platform", modules: ["Fitness & Wellness", "Pocket Money", "Emotional Intelligence", "Goal Setting", "Future Readiness"] },
];

function RoadmapSection() {
  return (
    <section className="py-24 px-4" style={{ background: "rgba(0,0,0,0.15)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-widest uppercase text-white/30 mb-3">Roadmap</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white tracking-tight mb-3">MVP first. Life platform second.</motion.h2>
          <motion.p variants={fadeUp} className="text-white/30 max-w-xl mx-auto">Starting with the urgent needs of Telangana schools today. Life skills modules unlock once the foundation is trusted by pilot schools.</motion.p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {phases.map((ph, i) => (
            <motion.div key={ph.phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.07, duration: 0.5, ease: EASE }}
              className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
              style={{ background: `${ph.neon}06`, border: `1px solid ${ph.neon}20` }}>
              {i <= 1 && <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${ph.neon}, transparent)` }} />}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: ph.neon }}>{ph.phase}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${ph.neon}18`, color: ph.neon, border: `1px solid ${ph.neon}30` }}>{ph.badge}</span>
              </div>
              <div><p className="font-bold text-white text-sm mb-0.5">{ph.title}</p><p className="text-[10px] text-white/30 font-mono">{ph.time}</p></div>
              <ul className="space-y-1 mt-auto">
                {ph.modules.map(m => <li key={m} className="text-[11px] text-white/40 flex items-start gap-1"><span style={{ color: ph.neon }} className="flex-shrink-0 mt-0.5">·</span>{m}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Sponsorship ───────────────────────────────────────────────────
function SponsorshipSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #09090b 0%, #100a04 50%, #09090b 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-mono font-semibold tracking-widest uppercase text-amber-400"
            style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />Sponsorship &amp; Donations
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white tracking-tight mb-3">
            A ₹1,200 school fee<br/>
            <span style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>is the difference between Arjun staying or quitting.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/35 max-w-xl mx-auto text-sm leading-relaxed">
            Donors give directly to verified students — no middleman, no NGO cut. School fee paid straight to the school. Pocket money only the student controls. Education loan repaid when they earn.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            {[
              { icon: "🏫", title: "School Fees", neon: "#3b82f6", note: "Paid direct to school · Parent cannot divert", desc: "Donor pays the school directly. School confirms receipt. Both student and parent get a notification." },
              { icon: "💰", title: "Pocket Money", neon: "#fbbf24", note: "Student controls · Parent cannot see balance", desc: "Goes to the student&apos;s future digital wallet. The student decides how to spend it. No parental override." },
              { icon: "🎓", title: "Education Loan", neon: "#7c3aed", note: "No interest · Repaid when earning", desc: "Student receives now, repays when earning. Repayments fund the next student." },
            ].map(m => (
              <motion.div key={m.title} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="flex gap-4 p-5 rounded-2xl" style={{ background: `${m.neon}08`, border: `1px solid ${m.neon}20` }}>
                <span className="text-2xl flex-shrink-0">{m.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-white text-sm">{m.title}</p>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${m.neon}18`, color: m.neon, border: `1px solid ${m.neon}30` }}>{m.note}</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-3">Interaction modes</p>
              {[
                { dot: "#fbbf24", text: "Anonymous — donor gives, student knows someone cared, no identity shared" },
                { dot: "#f97316", text: "Codename — donor picks a name like \"Phoenix\" — student knows their guardian angel" },
                { dot: "#ef4444", text: "Direct — full identity, live messaging, long-term mentorship" },
              ].map(t => <div key={t.text} className="flex items-start gap-2 text-xs text-white/35 mb-2"><div className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5" style={{ background: t.dot }} />{t.text}</div>)}
            </motion.div>
          </div>
          <div>
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-3">Live interaction preview</p>
            <SponsorChat />
            <div className="text-center pt-4">
              <Link href="/sponsor" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-all"
                style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.4)", color: "#fbbf24" }}>
                Browse students to sponsor →
              </Link>
              <p className="text-xs text-white/20 mt-2">All profiles verified by school principals · 100% reaches the student</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────
const stats = [
  { value: "90%+", label: "Parents on WhatsApp in Telangana" },
  { value: "2 min", label: "To mark attendance for 40 students" },
  { value: "0", label: "App downloads required for parents" },
  { value: "₹200/mo", label: "AI bot cost for 500 parents" },
];

// ── Main page ─────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="flex flex-col min-h-full" style={{ background: "#09090b" }}>

      <motion.nav initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: "rgba(9,9,11,0.92)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.06)" }}>
        {/* Top row */}
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-white">Infizium</span>
            <span className="hidden sm:block text-[10px] font-mono tracking-widest uppercase" style={{ color: "rgba(0,212,255,0.5)" }}>Telangana School OS</span>
            <span className="text-[10px] font-mono text-white/15">v{APP_VERSION}</span>
          </div>
          <Link href="/login" className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
            style={{ background: "rgba(0,212,255,0.10)", border: "1px solid rgba(0,212,255,0.25)", color: "#00d4ff" }}>Sign in</Link>
        </div>
        {/* Scrollable nav chips */}
        <div className="border-t overflow-x-auto scrollbar-none" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-1 px-4 py-1.5 w-max min-w-full">
            {[
              { label: "Mission", href: "#mission" },
              { label: "Personas", href: "#personas" },
              { label: "Features", href: "#features" },
              { label: "Commute", href: "#commute-section" },
              { label: "AI", href: "#ai-section" },
              { label: "Schools", href: "/schools" },
              { label: "Jobs", href: "/jobs" },
            ].map(n => (
              n.href.startsWith("#")
                ? <a key={n.label} href={n.href} className="text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap transition-all text-white/40 hover:text-white/80 hover:bg-white/6">{n.label}</a>
                : <Link key={n.label} href={n.href} className="text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap transition-all"
                    style={{ color: "#00d4ff", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}>{n.label}</Link>
            ))}
          </div>
        </div>
      </motion.nav>
      <div className="h-[84px]" />

      <SplitHero />

      {/* Stats */}
      <section className="border-y py-10 px-4" style={{ background: "rgba(0,212,255,0.02)", borderColor: "rgba(0,212,255,0.08)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <p className="text-3xl font-bold mb-1" style={{ color: "#00d4ff" }}>{s.value}</p>
              <p className="text-sm text-white/35">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <MissionSection />
      <PeopleSection />
      <ModulesSection />
      <CommuteSection />
      <AISection />
      <RoadmapSection />
      <SponsorshipSection />

      {/* CTA */}
      <section className="py-24 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Get your school on Infizium</h2>
          <p className="text-white/35 mb-8 leading-relaxed">We&apos;re onboarding pilot schools in Telangana. Setup takes under 2 hours.</p>
          <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium hover:scale-[1.02] transition-all"
            style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.4)", color: "#00d4ff", boxShadow: "0 0 40px rgba(0,212,255,0.12)" }}>
            Start with a demo →
          </Link>
        </motion.div>
      </section>

      <footer className="border-t py-8 px-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/25">
          <div><span className="font-semibold text-white/50">Infizium</span><span className="ml-2">· Telangana&apos;s school operating system</span></div>
          <div className="flex items-center gap-3 text-xs text-white/20">
            <span>infizium@outlook.com</span><span className="text-white/10">·</span><span className="font-mono">v{APP_VERSION}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
