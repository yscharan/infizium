"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { InfiziumMark } from "@/components/infizium-mark";
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
    name: "Shekhar", detail: "Valmiki Vidyalayam, Karimnagar",
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
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
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
          className={`flex items-start gap-3 p-3 rounded-xl border text-xs ${h.done ? "bg-white/3 border-white/5 opacity-40" : h.urgent ? "bg-red-500/8 border-red-500/20" : "bg-white/5 border-white/10"}`}>
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
      <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
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
      style={{ background: "#0a0a0a" }}>
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
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}>
          <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-2" style={{ background: "rgba(0,0,0,0.3)" }}>
            <div className="flex gap-1.5">{["bg-red-500/50","bg-amber-500/50","bg-emerald-500/50"].map(c=><div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`}/>)}</div>
            <div className="flex-1 mx-2"><div className="bg-white/5 border border-white/10 rounded-md px-2.5 py-0.5 flex items-center gap-1.5 max-w-[180px] mx-auto"><span className="text-emerald-400 text-[10px]">🔒</span><span className="text-[10px] text-white/25 font-mono">app.infizium.com</span></div></div>
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
      style={{ background: "#0a0a0a" }}>
      <div className="relative flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] font-mono tracking-widest uppercase text-white/25">Telangana School OS</p>
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
      <div className="relative rounded-xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="border-b border-white/[0.08] px-3 py-2 flex items-center gap-1.5" style={{ background: "rgba(0,0,0,0.4)" }}>
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
      <div className="hidden lg:block w-px bg-white/10" />

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
    <section id="personas" className="py-24 px-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-widest uppercase text-white/30 mb-3">Built for real people</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white tracking-tight mb-3">Four lives. One platform.</motion.h2>
          <motion.p variants={fadeUp} className="text-white/30 max-w-xl mx-auto">Every feature in Infizium is filtered through these four people. If it doesn&apos;t make Lakshmi&apos;s morning easier, it doesn&apos;t ship.</motion.p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1, duration: 0.5, ease: EASE }}
              className="rounded-lg p-5 flex flex-col gap-3"
              style={{ background: "#0a0a0a", border: "1px solid #222" }}>
              <div className="flex items-start gap-3">
                <span className="text-3xl">{p.icon}</span>
                <div>
                  <p className="font-bold text-white">{p.name}</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">{p.role}</p>
                  <p className="text-[11px] text-white/35 mt-0.5">{p.detail}</p>
                </div>
              </div>
              <p className="text-xs text-white/45 leading-relaxed">{p.story}</p>
              <ul className="mt-auto space-y-1.5">
                {p.gets.slice(0,3).map(g => (
                  <li key={g} className="flex items-start gap-1.5 text-xs text-white/35">
                    <span className="text-white/30 flex-shrink-0 mt-0.5">→</span>{g}
                  </li>
                ))}
              </ul>
              <Link href={p.href} className="mt-1 self-start text-xs font-medium px-3 py-1.5 rounded border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-colors">
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
    <section id="mission" className="py-28 px-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
            Mission Infizium
          </span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            Prepare students for life,<br />
            not just exams.
          </h2>
          <p className="text-lg font-semibold mb-5 text-white/50">
            Educate to build a personality.
          </p>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            Schools in Telangana prepare students brilliantly for board exams. But life after school — managing time, money, health, and relationships — is taught nowhere. Infizium starts by fixing the school operating system, then builds the life skills layer on top.
          </p>
          <p className="text-white/25 text-sm mt-5 max-w-xl mx-auto leading-relaxed">
            This mission has a human origin. Yadagiri Shekhar Rao — Bapu — built a school with nothing but trust, a bicycle, and thirty years of dedication to children who had nowhere else to go.{" "}
            <a href="#bapu" className="underline underline-offset-2 text-white/40 hover:text-white/60 transition-colors">His story ↓</a>
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Why", neon: "#f97316", icon: "🎯", heading: "The problem", body: "Parents miss alerts. Teachers waste 24 min/day on registers. Principals have no real-time view. Students get feedback twice a year." },
            { label: "What", neon: "#00d4ff", icon: "🏗️", heading: "What we build", body: "Attendance, homework, announcements, live bus tracking, parent communication, AI bot, and more. WhatsApp-first — no extra app needed for parents." },
            { label: "How", neon: "#10b981", icon: "⚡", heading: "How it works", body: "Mobile-first for teachers. WhatsApp for parents. Clean feed for students. Simple dashboard for admins. No app download required for parents." },
            { label: "Where", neon: "#7c3aed", icon: "📍", heading: "Where we start", body: "Valmiki Vidyalayam, Karimnagar, Telangana. Every feature is built alongside real teachers, parents, and students here first." },
          ].map((col, i) => (
            <motion.div key={col.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1, duration: 0.5, ease: EASE }}
              className="rounded-lg p-5 flex flex-col gap-2" style={{ background: "#0a0a0a", border: "1px solid #222" }}>
              <div className="flex items-center gap-2"><span className="text-xl">{col.icon}</span><span className="text-xs font-bold tracking-widest uppercase text-white/40">{col.label}</span></div>
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
          className="rounded-lg overflow-hidden"
          style={{ background: "#0a0a0a", border: "1px solid #222" }}>
          <div className="p-6 flex flex-col sm:flex-row items-start gap-5">
            <div className="text-5xl flex-shrink-0">🏫</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <p className="font-bold text-white text-lg">Valmiki Vidyalayam</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>Pilot School</span>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=Backside+SRR+Ground+Vidyanagar+Karimnagar+Telangana+505001"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-2 w-fit">
                <span>📍</span>
                <span>Chaitanyapuri, Karimnagar, Telangana 505001</span>
              </a>
              <p className="text-sm text-white/40 mb-2">Our first school. What works here rolls out to the next school. Real teachers, real parents, real students.</p>
              <p className="text-xs text-white/25">Principal: <span className="text-white/50 font-medium">Shekhar Rao Yadagiri</span> · <span className="text-white/50 font-medium">+91 99854 01894</span></p>
            </div>
            <Link href="/login" className="flex-shrink-0 text-sm px-5 py-2.5 rounded-lg font-medium border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors">Get access →</Link>
          </div>
          <div className="w-full h-48 overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Chaitanyapuri+Karimnagar+Telangana+505001+India&output=embed&z=16"
              width="100%" height="100%" style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Features by persona ───────────────────────────────────────────
const featuresByPersona = [
  {
    persona: "parent", icon: "👩", label: "Parent", neon: "#f97316",
    features: [
      { icon: "📱", title: "Attendance alerts on WhatsApp", status: "Live", desc: "Get a WhatsApp message the moment your child is marked absent. No app to download, no login needed." },
      { icon: "💬", title: "Ask anything on WhatsApp", status: "Live", desc: "Text your question in Telugu or English — attendance, homework, fees. Get an instant answer from the school." },
      { icon: "📋", title: "Approve field trips by WhatsApp reply", status: "Live", desc: "School sends a permission request. Reply YES or NO. Your response is recorded and the school is notified." },
      { icon: "🔔", title: "Homework reminders", status: "Live", desc: "Know what your child has due tomorrow. Sent directly to your WhatsApp the night before." },
      { icon: "🔐", title: "Control your child's data", status: "Live", desc: "Decide which notifications you receive and what information the school can access. DPDP compliant." },
      { icon: "🚌", title: "Live bus tracking", status: "Phase 2", desc: "See your child's bus on a map. Get a ping when they board and when they reach school." },
    ],
  },
  {
    persona: "teacher", icon: "👨‍🏫", label: "Teacher", neon: "#3b82f6",
    features: [
      { icon: "✅", title: "Mark attendance in 2 minutes", status: "Live", desc: "Open the app, tap present or absent for each student. Parents are notified automatically. No register, no WhatsApp messages." },
      { icon: "📚", title: "Assign homework in seconds", status: "Live", desc: "Type the assignment, set a due date, done. Every student and parent sees it instantly." },
      { icon: "📢", title: "Send announcements", status: "Live", desc: "Broadcast to your class or the whole school. Read receipts show who got it." },
      { icon: "📋", title: "Create approval forms", status: "Live", desc: "Field trips, events, consent — send a form, track who approved, who declined, who hasn't responded." },
      { icon: "📊", title: "Class reports", status: "Phase 2", desc: "Attendance trends, homework completion rates, and class performance in one view. No Excel." },
    ],
  },
  {
    persona: "student", icon: "🧑‍🎓", label: "Student", neon: "#10b981",
    features: [
      { icon: "📚", title: "Clean homework feed", status: "Live", desc: "See all assignments due, with deadlines. Never miss something given verbally in class." },
      { icon: "📈", title: "Track your attendance", status: "Live", desc: "See your attendance percentage and which days you were absent. Know when you're close to the limit." },
      { icon: "🎯", title: "Progress at a glance", status: "Live", desc: "Your academic summary — subjects, attendance, homework completion — in one screen." },
      { icon: "💰", title: "Sponsorship support", status: "Phase 2", desc: "If your family needs help with fees, anonymous sponsors can pay directly to your school. No shame, no middleman." },
      { icon: "🧠", title: "Study help in Telugu", status: "Phase 3", desc: "Ask any question from your syllabus late at night and get a worked example back. In Telugu." },
      { icon: "🌱", title: "Personality & life skills", status: "Phase 3", desc: "Routine tracking, goal setting, and character building built into your daily school experience." },
    ],
  },
  {
    persona: "admin", icon: "🏫", label: "Admin", neon: "#7c3aed",
    features: [
      { icon: "📊", title: "School-wide attendance at 8:15 AM", status: "Live", desc: "See which classes are fully marked, which are pending, and the school-wide attendance rate before assembly." },
      { icon: "📢", title: "Broadcast to all parents in 60 seconds", status: "Live", desc: "Type your announcement once. Every parent in the school gets it on WhatsApp. Delivery tracked." },
      { icon: "📋", title: "Forms and consent management", status: "Live", desc: "Create forms, send them to parents, and see a real-time response tracker. Full audit log." },
      { icon: "🔐", title: "Parent permissions dashboard", status: "Live", desc: "See which parents have granted which permissions. DPDP compliance built in." },
      { icon: "🚌", title: "Fleet and commute overview", status: "Phase 2", desc: "All buses on a map. Which students are in transit, who has arrived, which route is delayed." },
      { icon: "📈", title: "Analytics and board reports", status: "Phase 2", desc: "Generate PDF reports for the school board with one click. Attendance, homework, form response rates." },
      { icon: "💰", title: "Sponsorship management", status: "Phase 2", desc: "Review student sponsorship requests, verify and publish profiles, track donations to your school." },
    ],
  },
  {
    persona: "commute", icon: "🚌", label: "Commute Ecosystem", neon: "#f59e0b",
    features: [
      { icon: "🚌", title: "School Bus GPS", status: "Phase 2", desc: "Live GPS on every school bus. Parent gets a WhatsApp ping when their child boards and when the bus reaches school." },
      { icon: "🚗", title: "Parent Car Pool", status: "Phase 2", desc: "Route-matching between verified school families. Shared live location during the trip. Mutual identity verified." },
      { icon: "🛺", title: "Auto Buddy", status: "Phase 2", desc: "School-verified auto drivers only. Group ride for 3 to 4 students. Parent gets an arrival alert at drop-off." },
      { icon: "🚶", title: "Walk Group", status: "Phase 2", desc: "Group check-in tracking — not individual GPS. A senior student leads. Parent gets one alert when the group arrives." },
      { icon: "📡", title: "Solo + Smart Tag", status: "Phase 2", desc: "Student travels alone. Infizium Tag in school bag pings location silently. Parent sees the journey on their phone." },
      { icon: "⌚", title: "Smart Band", status: "Phase 2", desc: "GPS + BLE wristband for students. 7-day battery. SOS button. Auto check-in at school gate. Looks like a watch." },
    ],
  },
];

function ModulesSection() {
  return (
    <section id="features" className="py-24 px-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-widest uppercase text-white/30 mb-3">Features</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white tracking-tight mb-3">Built for each person in the school</motion.h2>
          <motion.p variants={fadeUp} className="text-white/30 max-w-xl mx-auto">Every feature is designed around one person&apos;s daily need. Shared features appear where they matter most.</motion.p>
        </motion.div>
        <div className="space-y-12">
          {featuresByPersona.map((group, gi) => (
            <motion.div key={group.persona} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.05, duration: 0.5, ease: EASE }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{group.icon}</span>
                <div>
                  <p className="font-bold text-white text-lg">{group.label}</p>
                </div>
                <div className="flex-1 h-px ml-2 bg-white/[0.08]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.features.map((f, fi) => (
                  <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: fi * 0.05, duration: 0.4, ease: EASE }}
                    className="rounded-lg p-4 flex flex-col gap-2"
                    style={{ background: "#0a0a0a", border: "1px solid #222" }}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <span className="text-lg flex-shrink-0 mt-0.5">{f.icon}</span>
                        <p className="font-semibold text-white text-sm leading-snug">{f.title}</p>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 text-white/40 bg-white/[0.06] border border-white/10">{f.status}</span>
                    </div>
                    <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
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
    <section id="commute-section" className="py-28 px-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-white/40">Commute Ecosystem · Phase 2</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            The 9-minute rule.<br/>
            A parent who knows their child is 9 minutes from school stops worrying.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/35 max-w-xl mx-auto leading-relaxed">
            Every morning, Lakshmi watches Arjun leave at 7:30 AM and doesn&apos;t know if he&apos;s safe until he calls. That 22-minute gap of no information is exactly what Infizium Commute closes.
          </motion.p>
        </motion.div>

        {/* 5 commute modes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
          {modes.map((m, i) => (
            <motion.div key={m.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.08, duration: 0.5, ease: EASE }}
              className="rounded-lg p-4 flex flex-col gap-2" style={{ background: "#0a0a0a", border: "1px solid #222" }}>
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
              className="rounded-lg p-6" style={{ background: "#0a0a0a", border: "1px solid #222" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{hw.icon}</span>
                <div>
                  <p className="font-bold text-white">{hw.name}</p>
                  <p className="text-xs text-white/40">{hw.who}</p>
                </div>
                <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full text-white/40 bg-white/[0.06] border border-white/10">Phase 2</span>
              </div>
              <ul className="space-y-1.5">
                {hw.specs.map(s => <li key={s} className="flex items-start gap-2 text-xs text-white/50"><span className="text-white/30 flex-shrink-0 mt-0.5">·</span>{s}</li>)}
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
          <Link href="/commute" className="inline-flex items-center gap-2 text-sm px-6 py-3 rounded-lg font-medium border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors">
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
    <section id="ai-section" className="py-24 px-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-widest uppercase text-white/40">AI Handler · Live now</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
              A parent texts. The school answers.<br/>
              In Telugu. At 10 PM.
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
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm">📱</div>
                <div><p className="text-xs font-semibold text-white">WhatsApp / @InfiziumBot</p><p className="text-[10px] text-emerald-400">● Online · Responds in English &amp; Telugu</p></div>
              </div>
              <div className="p-4 space-y-3">
                {convos.map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.15, duration: 0.4, ease: EASE }}
                    className={`flex ${c.from === "parent" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${c.from === "parent" ? "bg-emerald-600/30 text-emerald-100 border border-emerald-500/20" : "bg-white/8 text-white/80 border border-white/10"}`}>
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
    <section className="py-24 px-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-widest uppercase text-white/30 mb-3">Roadmap</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white tracking-tight mb-3">MVP first. Life platform second.</motion.h2>
          <motion.p variants={fadeUp} className="text-white/30 max-w-xl mx-auto">Starting with the urgent needs of Telangana schools today. Life skills modules unlock once the foundation is trusted by pilot schools.</motion.p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {phases.map((ph, i) => (
            <motion.div key={ph.phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.07, duration: 0.5, ease: EASE }}
              className="rounded-lg p-5 flex flex-col gap-3 relative overflow-hidden"
              style={{ background: "#0a0a0a", border: "1px solid #222" }}>
              {i <= 1 && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "rgba(255,255,255,0.15)" }} />}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest uppercase text-white/40">{ph.phase}</span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full text-white/40 bg-white/[0.06] border border-white/10">{ph.badge}</span>
              </div>
              <div><p className="font-bold text-white text-sm mb-0.5">{ph.title}</p><p className="text-[10px] text-white/30 font-mono">{ph.time}</p></div>
              <ul className="space-y-1 mt-auto">
                {ph.modules.map(m => <li key={m} className="text-[11px] text-white/40 flex items-start gap-1"><span className="text-white/20 flex-shrink-0 mt-0.5">·</span>{m}</li>)}
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
    <section className="py-24 px-4 relative overflow-hidden border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-white/40">Sponsorship &amp; Donations</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white tracking-tight mb-3">
            A ₹1,200 school fee<br/>
            is the difference between Arjun staying or quitting.
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
                className="flex gap-4 p-5 rounded-lg" style={{ background: "#0a0a0a", border: "1px solid #222" }}>
                <span className="text-2xl flex-shrink-0">{m.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-bold text-white text-sm">{m.title}</p>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full text-white/35 bg-white/[0.05] border border-white/10">{m.note}</span>
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
              <Link href="/sponsor" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm bg-white text-black hover:bg-white/90 transition-colors">
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

// ── Bapu section ─────────────────────────────────────────────────
function BapuSection() {
  const story = [
    {
      kicker: "Where he comes from",
      heading: "The boy from Kalamadugu",
      body: "Bapu was born in Kalamadugu, a remote village in Jannaram Mandal of Adilabad district — in his childhood, mostly forest. His was a lower-middle-class family that lived off the land. His father was uneducated. Not one of his siblings had pursued schooling. He was the first of his entire line to reach for an education — carrying dreams far too big for the place he was born into. Study was never a plan to be weighed. It was a decision made early and held without flinching: I must study, at any cost.",
    },
    {
      kicker: "How he began",
      heading: "A bicycle bought with curry leaves",
      body: "There was no high school in the village. The nearest was twenty kilometres away, and to reach it a boy needed a bicycle. So he became a trader. He carried curry leaves from his village to sell in Jannaram, bought eggs there, and carried those home to sell again — cent by cent, trip by trip — until a second-hand bicycle was finally his. Vegetables and greens funded his college. He tutored younger students to keep himself going. His family barely had enough to eat. He never once leaned on them for his education.",
    },
    {
      kicker: "Why it mattered",
      heading: "The insult that became fuel",
      body: "One memory sharpened everything. A man with money told the boy plainly that, being poor, he would amount to nothing — he would earn no respect, hold no position, and certainly never become a leader. Bapu carried those words for years — not to nurse the wound, but to answer it. He decided he would show that a person with nothing could still rise, could still build a respectable life, and could still hold open the door he'd had to force open himself, for every child standing behind him.",
    },
    {
      kicker: "What he believed",
      heading: "Education above every other thing",
      body: "For Bapu, education was never one good thing among many — it was the thing. Money comes and goes, he would say; today you have it, tomorrow you don't. But what you learn is yours for life. He believed education was the one force capable of rebuilding a society on better values. And he passed this straight to his children: the truest way any enterprise can serve its people is through education and the work it creates. Teach a child and you don't lift one child alone — a family thrives, a community thrives, the next generation rises.",
    },
    {
      kicker: "What he built",
      heading: "The school that trust built",
      body: "In 1991, he began his own. It started small: a handful of children from nearby villages, housed and fed and taught in a rented bungalow — one man teaching every subject while his own family lived in a single room beside the classrooms. He kept fees minimal and cut them further whenever a farmer's harvest failed. He never marketed a rank. Instead, every summer, he and his teachers drove across districts to sit with parents face to face. Trust was the only capital he ever raised — and it never ran out.",
    },
    {
      kicker: "What he protected",
      heading: "Holding it together, whatever it took",
      body: "When COVID shut budget schools across the state, he refused to let go of the children. He gave concessions, he gave his word, and when the school's books would not balance, he turned to other work simply to keep it alive. Those other ventures were never the point — they were scaffolding to keep the school standing. A budget school is a service, not a business. He lived that line, continuing to teach and shelter children on his own money even when promised scholarships went unpaid.",
    },
  ];

  return (
    <section id="bapu" className="py-28 px-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-4xl mx-auto">

        {/* Section label */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-16">
          <motion.p variants={fadeUp} className="font-typewriter text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(245,158,11,0.5)" }}>
            విద్యే మార్గం · Education is the way
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            Why Infizium exists.<br />His name is Bapu.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/40 text-lg max-w-2xl leading-relaxed">
            Before there was a platform, there was a man from a forest village in Adilabad who sold curry leaves as a boy, built a school from nothing, and spent thirty years proving that the only thing that outlasts money is what you learn.
          </motion.p>
        </motion.div>

        {/* Portrait + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-20 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-2">
            <div className="aspect-[4/5] rounded-lg flex flex-col items-center justify-center text-center relative overflow-hidden"
              style={{ background: "#0a0a0a", border: "1px solid #2a2a2a" }}>
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(245,158,11,0.06) 0%, transparent 65%)" }} />
              <p className="font-typewriter text-7xl relative" style={{ color: "rgba(245,158,11,0.25)" }}>యశ</p>
              <p className="text-white/20 text-xs mt-3 relative font-mono tracking-widest uppercase">Photograph</p>
            </div>
            <div className="mt-6">
              <p className="font-bold text-white text-lg">Yadagiri Shekhar Rao</p>
              <p className="font-typewriter text-sm mt-1" style={{ color: "rgba(245,158,11,0.6)" }}>
                Born in Kalamadugu, Jannaram Mandal, Adilabad
              </p>
              <p className="text-white/35 text-sm mt-2 leading-relaxed">
                First of his family to hold a book — and he spent his life handing books to everyone else.
              </p>
              <p className="text-white/20 text-xs mt-4 font-mono">
                Principal · Valmiki Vidyalayam · Karimnagar<br />
                Founder · est. 1991
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-3 space-y-10">
            {story.slice(0, 3).map((s, i) => (
              <motion.div key={s.kicker} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}>
                <p className="font-typewriter text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(245,158,11,0.45)" }}>{s.kicker}</p>
                <h3 className="font-typewriter text-xl font-bold text-white mb-3">{s.heading}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pull quote */}
        <motion.blockquote initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
          className="my-16 px-8 py-8 rounded-lg"
          style={{ background: "rgba(245,158,11,0.04)", borderLeft: "3px solid rgba(245,158,11,0.4)" }}>
          <p className="font-typewriter text-white text-xl sm:text-2xl leading-relaxed font-medium">
            Money is a material. Work is a dedication. Service is rising above your own needs — and giving yourself back.
          </p>
          <p className="font-typewriter text-sm mt-4" style={{ color: "rgba(245,158,11,0.5)" }}>
            — The three measures Bapu has lived his life by.
          </p>
        </motion.blockquote>

        {/* Remaining story sections */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {story.slice(3).map((s, i) => (
            <motion.div key={s.kicker} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
              className="rounded-lg p-5" style={{ background: "#0a0a0a", border: "1px solid #222" }}>
              <p className="font-typewriter text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(245,158,11,0.4)" }}>{s.kicker}</p>
              <h3 className="font-typewriter font-bold text-white text-base mb-2 leading-snug">{s.heading}</h3>
              <p className="text-white/35 text-xs leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>

        {/* What he became */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
          className="rounded-lg p-8 mb-16" style={{ background: "#0a0a0a", border: "1px solid #2a2a2a" }}>
          <p className="font-typewriter text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(245,158,11,0.4)" }}>What he became</p>
          <h3 className="font-typewriter text-2xl font-bold text-white mb-4">A forest, not a bird</h3>
          <p className="text-white/45 text-sm leading-relaxed mb-4">
            Over thirty years, his students became doctors, engineers, teachers, software professionals, soldiers, police, officers, and founders — and still they call him: when they are admitted somewhere, when they leave for abroad, when they start something of their own. <em className="text-white/60">"This is like I am qualified in all those professions,"</em> he says of them. <em className="text-white/60">"I accomplished all of them for my country."</em>
          </p>
          <p className="text-white/40 text-sm leading-relaxed">
            When he describes who he is, he never reaches for the language of power. The wealthy come and go like birds passing over a forest. The common people are not birds — they are trees, and together they are a forest larger than anything that flies above it. Bapu never wanted to be the bird. He has spent his whole life being the forest.
          </p>
        </motion.div>

        {/* Closing — Gandhi quote + why Infizium */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}
          className="text-center border-t pt-14" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="font-typewriter text-white/55 text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto italic">
            "The best way to find yourself is to lose yourself in the service of others."
          </p>
          <p className="font-typewriter text-sm mt-4" style={{ color: "rgba(245,158,11,0.45)" }}>
            — the line Bapu has carried, from Mahatma Gandhi.
          </p>
          <div className="mt-10 max-w-xl mx-auto">
            <p className="text-white/35 text-sm leading-relaxed">
              Infizium is built to give schools like Bapu's — the ones built on trust, not marketing; on service, not margin — the tools they have never had. Every feature is built with his school in mind first.
            </p>
          </div>
          <p className="font-typewriter text-xs tracking-widest uppercase mt-8" style={{ color: "rgba(245,158,11,0.35)" }}>
            For Bapu · జై హింద్
          </p>
        </motion.div>

      </div>
    </section>
  );
}

// ── History section — dual-track parallel timeline ───────────────
const dualTrack = [
  {
    telangana: { year: "6th Century BCE", title: "The land of the Godavari", body: "Before any border was drawn, the Godavari carved through this region. Cities, temples, trade routes — built on this ground. Karimnagar stands on it." },
    bapu: null,
  },
  {
    telangana: { year: "1163 CE", title: "The Kakatiya Empire", body: "Queen Rudrama Devi — one of the first women to command an empire in Indian history. Built forts, reformed taxes, earned loyalty through justice, not fear. She came from here." },
    bapu: null,
  },
  {
    telangana: { year: "1687 CE", title: "Hyderabad's golden age", body: "The Nizams built one of the wealthiest cities in the world. Scientists, poets, architects from Telangana built institutions still standing. Culture was not imported — it was grown." },
    bapu: null,
  },
  {
    telangana: null,
    bapu: { year: "Early 1960s", title: "A boy in Kalamadugu", body: "Born in a forest village in Adilabad. First in his family to reach for education. The school was 20km away. There was no bus, no money, and no precedent." },
  },
  {
    telangana: { year: "1969", title: "The Telangana Movement", body: "Students and teachers walked out of classrooms into streets. They weren't asking for something new — only that the world acknowledge what had always been true about this land." },
    bapu: { year: "~1975", title: "The bicycle", body: "He traded curry leaves and eggs — village to market, back again — until he had enough for a second-hand bicycle. That bicycle reached the school. That school reached him." },
  },
  {
    telangana: null,
    bapu: { year: "Early 1980s", title: "First salary: ₹100", body: "Government school teacher. The full weight of a classroom on his shoulders. A hundred rupees a month. He never complained. He kept teaching." },
  },
  {
    telangana: null,
    bapu: { year: "1991", title: "A school begins", body: "One rented bungalow. One man teaching every subject. His family in a single room beside the classrooms. Fees minimal — waived whenever a farmer's harvest failed. No marketing. Only trust." },
  },
  {
    telangana: { year: "2014", title: "Telangana — a state is born", body: "The 29th state of India. The youngest. Built by the grandparents of children who are in classrooms right now. The next chapter belongs to them." },
    bapu: { year: "2014", title: "23 years and counting", body: "Two decades of students taught, fed, sheltered. They are now engineers, doctors, soldiers, teachers, software professionals — across the country and across the world." },
  },
  {
    telangana: null,
    bapu: { year: "2020–21", title: "COVID. The school stayed open.", body: "While budget schools across Telangana closed, he gave concessions, worked other jobs, spent his own money to keep it running. Not one child was permanently sent home." },
  },
];

function HistorySection() {
  // Center column is 64px wide. Left line at x=16, right line at x=48.
  const CX_LEFT = 16;   // Telangana line x
  const CX_RIGHT = 48;  // Bapu line x
  const COL_W = 64;

  return (
    <section className="py-28 px-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp} className="font-typewriter text-xs tracking-widest uppercase mb-3 text-white/25">
            Two tracks · One story
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-typewriter text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            The land. The man.<br />The reason.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/35 max-w-xl mx-auto leading-relaxed text-[0.95rem]">
            Telangana has carried great people for over two thousand years. Bapu is one of them. Both tracks flow into the same place.
          </motion.p>
        </motion.div>

        {/* Track legend */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex justify-center gap-10 mb-12">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-px" style={{ background: "rgba(251,191,36,0.6)" }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgba(251,191,36,0.5)" }}>Telangana</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-px" style={{ background: "rgba(255,255,255,0.3)" }} />
            <span className="text-xs font-mono uppercase tracking-widest text-white/30">Bapu&apos;s journey</span>
          </div>
        </motion.div>

        {/* Dual-track timeline */}
        <div className="relative">
          {/* Two continuous vertical lines */}
          <div className="absolute inset-y-0 pointer-events-none" style={{ left: `calc(50% - ${COL_W / 2}px)`, width: `${COL_W}px` }}>
            <div className="absolute top-0 bottom-0 w-px" style={{ left: `${CX_LEFT}px`, background: "linear-gradient(180deg, transparent, rgba(251,191,36,0.35) 5%, rgba(251,191,36,0.35) 92%, transparent)" }} />
            <div className="absolute top-0 bottom-0 w-px" style={{ left: `${CX_RIGHT}px`, background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.18) 5%, rgba(255,255,255,0.18) 92%, transparent)" }} />
          </div>

          {dualTrack.map((row, i) => (
            <div key={i} className="grid items-center" style={{ gridTemplateColumns: `1fr ${COL_W}px 1fr`, minHeight: "120px" }}>
              {/* Left — Telangana */}
              <div className="py-5 pr-8">
                {row.telangana && (
                  <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.55, ease: EASE }} className="text-right">
                    <p className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: "rgba(251,191,36,0.5)" }}>
                      {row.telangana.year}
                    </p>
                    <h3 className="font-typewriter font-bold text-white text-sm mb-1.5 leading-snug">{row.telangana.title}</h3>
                    <p className="font-typewriter text-white/35 text-xs leading-relaxed">{row.telangana.body}</p>
                  </motion.div>
                )}
              </div>

              {/* Center — dots on tracks */}
              <div className="relative flex-shrink-0" style={{ width: `${COL_W}px`, height: "100%" }}>
                {row.telangana && (
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full z-10"
                    style={{ left: `${CX_LEFT - 5}px`, background: "rgba(251,191,36,0.85)", border: "1.5px solid rgba(251,191,36,1)", boxShadow: "0 0 8px rgba(251,191,36,0.4)" }} />
                )}
                {row.bapu && (
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.15, duration: 0.3 }}
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full z-10"
                    style={{ left: `${CX_RIGHT - 5}px`, background: "rgba(255,255,255,0.65)", border: "1.5px solid rgba(255,255,255,0.85)", boxShadow: "0 0 8px rgba(255,255,255,0.15)" }} />
                )}
              </div>

              {/* Right — Bapu */}
              <div className="py-5 pl-8">
                {row.bapu && (
                  <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.55, ease: EASE }}>
                    <p className="text-[10px] font-mono tracking-widest uppercase mb-1 text-white/30">{row.bapu.year}</p>
                    <h3 className="font-typewriter font-bold text-white text-sm mb-1.5 leading-snug">{row.bapu.title}</h3>
                    <p className="font-typewriter text-white/35 text-xs leading-relaxed">{row.bapu.body}</p>
                  </motion.div>
                )}
              </div>
            </div>
          ))}

          {/* Convergence — both tracks merge into Infizium */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid items-center" style={{ gridTemplateColumns: `1fr ${COL_W}px 1fr`, minHeight: "80px" }}>
            <div />
            <div className="relative flex-shrink-0 flex flex-col items-center justify-start" style={{ width: `${COL_W}px` }}>
              {/* Two lines converging to center */}
              <svg width={COL_W} height="40" style={{ display: "block", overflow: "visible" }}>
                <line x1={CX_LEFT} y1="0" x2={COL_W / 2} y2="38" stroke="rgba(251,191,36,0.4)" strokeWidth="1" />
                <line x1={CX_RIGHT} y1="0" x2={COL_W / 2} y2="38" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <circle cx={COL_W / 2} cy="38" r="5" fill="white" />
              </svg>
            </div>
            <div />
          </motion.div>
        </div>

        {/* Closing statement */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
          className="text-center mt-2 pb-4">
          <p className="font-bold text-white text-xl mb-2">Infizium</p>
          <p className="font-typewriter text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            The system Bapu never had — built so every school builder after him doesn&apos;t have to carry it alone.
          </p>
          <p className="text-[10px] font-mono uppercase tracking-widest mt-4" style={{ color: "rgba(251,191,36,0.35)" }}>
            Telangana · est. 1991 · For the next generation
          </p>
        </motion.div>

      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────
const stats = [
  { value: "90%+", label: "Parents on WhatsApp in Telangana" },
  { value: "2 min", label: "To mark attendance for 40 students" },
  { value: "0", label: "App downloads required for parents" },
  { value: "9 min", label: "The rule: parent stops worrying" },
];

// ── Main page ─────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="flex flex-col min-h-full" style={{ background: "#000" }}>

      <motion.nav initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(24px)", borderColor: "rgba(255,255,255,0.1)" }}>
        {/* Top row */}
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <InfiziumMark size={30} className="flex-shrink-0 text-white" />
            <span className="font-bold text-base tracking-tight text-white">Infizium</span>
            <span className="text-[10px] font-mono text-white/20">v{APP_VERSION}</span>
          </div>
          <Link href="/login" className="text-xs px-4 py-1.5 rounded font-medium border border-white/20 text-white hover:bg-white/10 transition-colors">Sign in</Link>
        </div>
        {/* Scrollable nav chips */}
        <div className="border-t overflow-x-auto scrollbar-none" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-1 px-4 py-1.5 w-max min-w-full">
            {[
              { label: "Mission", href: "#mission" },
              { label: "Personas", href: "#personas" },
              { label: "Features", href: "#features" },
              { label: "Schools", href: "/schools" },
              { label: "Jobs", href: "/jobs" },
            ].map(n => (
              n.href.startsWith("#")
                ? <a key={n.label} href={n.href} className="text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap transition-all text-white/40 hover:text-white/70">{n.label}</a>
                : <Link key={n.label} href={n.href} className="text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap transition-all text-white/60 hover:text-white">{n.label}</Link>
            ))}
          </div>
        </div>
      </motion.nav>
      <div className="h-[84px]" />

      <SplitHero />

      {/* Stats */}
      <section className="border-y py-10 px-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <p className="text-3xl font-bold mb-1 text-white">{s.value}</p>
              <p className="text-sm text-white/40">{s.label}</p>
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
      <HistorySection />

      {/* CTA */}
      <section className="py-24 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Get your school on Infizium</h2>
          <p className="text-white/35 mb-8 leading-relaxed">We&apos;re onboarding pilot schools in Telangana. Setup takes under 2 hours.</p>
          <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium bg-white text-black hover:bg-white/90 transition-colors">
            Start with a demo →
          </Link>
        </motion.div>
      </section>

      <footer className="border-t py-8 px-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/25">
            <span className="font-semibold text-white/50">Infizium</span>
            <span className="ml-2">· Telangana&apos;s school operating system</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/25">
            <span>infizium@outlook.com</span>
            <span className="text-white/10">·</span>
            <a href="https://www.instagram.com/infizium" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              <span>@infizium</span>
            </a>
            <a href="https://www.linkedin.com/company/107568906/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <span>LinkedIn</span>
            </a>
            <span className="text-white/10">·</span>
            <span className="font-mono">v{APP_VERSION}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
