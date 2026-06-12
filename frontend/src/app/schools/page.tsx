"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const schools = [
  {
    rank: 1,
    name: "Valmiki Vidyalayam",
    location: "Hyderabad",
    since: "1987",
    students: 780,
    neon: "#00d4ff",
    badges: ["Pilot School", "Infizium Live"],
    stats: [
      { label: "Board pass rate", value: "97%" },
      { label: "Sports titles", value: "12" },
      { label: "Notable alumni", value: "34" },
    ],
    desc: "One of Hyderabad's most trusted schools. Strong in academics and athletics. First school on Infizium.",
  },
];

export default function SchoolsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#09090b" }}>
      <nav className="border-b px-5 h-12 flex items-center gap-3" style={{ background: "rgba(9,9,11,0.95)", borderColor: "rgba(255,255,255,0.06)" }}>
        <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors">← Home</Link>
        <span className="text-white/15">/</span>
        <span className="text-sm font-semibold text-white">Schools</span>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mb-10">
          <p className="text-xs font-mono tracking-widest uppercase text-white/30 mb-2">Telangana School Rankings</p>
          <h1 className="text-3xl font-bold text-white mb-2">Schools on Infizium</h1>
          <p className="text-white/35 text-sm">Ranked by historic education outcomes, sports achievements, and notable personalities produced.</p>
        </motion.div>

        <div className="space-y-4">
          {schools.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
              className="rounded-2xl p-5" style={{ background: `${s.neon}06`, border: `1px solid ${s.neon}20` }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${s.neon}15`, border: `1px solid ${s.neon}30` }}>
                  #{s.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="font-bold text-white">{s.name}</h2>
                    {s.badges.map(b => (
                      <span key={b} className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${s.neon}18`, color: s.neon, border: `1px solid ${s.neon}30` }}>{b}</span>
                    ))}
                  </div>
                  <p className="text-xs text-white/35 mb-3">{s.location} · Est. {s.since} · {s.students} students</p>
                  <p className="text-sm text-white/50 mb-4 leading-relaxed">{s.desc}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {s.stats.map(st => (
                      <div key={st.label} className="rounded-xl p-2.5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-lg font-bold" style={{ color: s.neon }}>{st.value}</p>
                        <p className="text-[10px] text-white/30 mt-0.5">{st.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-2xl mb-3">🏫</p>
          <p className="font-semibold text-white mb-1">More schools coming</p>
          <p className="text-sm text-white/35 mb-4">Full rankings with historic data from Shekhar Yadagiri — Valmiki Vidyalayam principal.</p>
          <Link href="/login" className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl font-semibold transition-all"
            style={{ background: "rgba(0,212,255,0.10)", border: "1px solid rgba(0,212,255,0.25)", color: "#00d4ff" }}>
            Add your school →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
