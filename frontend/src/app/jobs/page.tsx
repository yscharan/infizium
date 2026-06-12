"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const jobs = [
  {
    school: "Valmiki Vidyalayam",
    location: "Karimnagar, Telangana",
    role: "Maths Teacher",
    grade: "Grades 9 & 10",
    type: "Full-time",
    neon: "#10b981",
    posted: "Jun 2026",
    desc: "CBSE curriculum. 3+ years experience preferred. Telugu and English medium.",
    requirements: ["B.Ed or equivalent", "Telugu medium preferred", "CBSE experience a plus"],
  },
  {
    school: "Valmiki Vidyalayam",
    location: "Karimnagar, Telangana",
    role: "Physical Education Teacher",
    grade: "All grades",
    type: "Full-time",
    neon: "#f59e0b",
    posted: "Jun 2026",
    desc: "Build the sports culture at one of Karimnagar's leading schools. State-level sports achievement preferred.",
    requirements: ["Sports science or B.P.Ed", "State level sports background", "Discipline and energy"],
  },
];

export default function JobsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#09090b" }}>
      <nav className="border-b px-5 h-12 flex items-center gap-3" style={{ background: "rgba(9,9,11,0.95)", borderColor: "rgba(255,255,255,0.06)" }}>
        <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors">← Home</Link>
        <span className="text-white/15">/</span>
        <span className="text-sm font-semibold text-white">Jobs</span>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mb-10">
          <p className="text-xs font-mono tracking-widest uppercase text-white/30 mb-2">Open Positions</p>
          <h1 className="text-3xl font-bold text-white mb-2">Jobs at Telangana Schools</h1>
          <p className="text-white/35 text-sm">Real openings. Verified by principals. No middleman.</p>
        </motion.div>

        <div className="space-y-4 mb-8">
          {jobs.map((j, i) => (
            <motion.div key={`${j.school}-${j.role}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
              className="rounded-2xl p-5" style={{ background: `${j.neon}06`, border: `1px solid ${j.neon}20` }}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h2 className="font-bold text-white text-lg">{j.role}</h2>
                  <p className="text-sm text-white/40">{j.school} · {j.location} · {j.grade}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${j.neon}18`, color: j.neon, border: `1px solid ${j.neon}30` }}>{j.type}</span>
                  <span className="text-[10px] text-white/25">Posted {j.posted}</span>
                </div>
              </div>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">{j.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {j.requirements.map(r => (
                  <span key={r} className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                    {r}
                  </span>
                ))}
              </div>
              <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                style={{ background: `${j.neon}15`, color: j.neon, border: `1px solid ${j.neon}30` }}>
                Apply via Infizium →
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-2xl mb-3">📋</p>
          <p className="font-semibold text-white mb-1">More positions from Shekhar</p>
          <p className="text-sm text-white/35 mb-4">Real job data from Valmiki Vidyalayam is being added. More schools coming as they join.</p>
          <Link href="/login" className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl font-semibold transition-all"
            style={{ background: "rgba(0,212,255,0.10)", border: "1px solid rgba(0,212,255,0.25)", color: "#00d4ff" }}>
            Post a job at your school →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
