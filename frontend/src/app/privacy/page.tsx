"use client";

import Link from "next/link";

const sections = [
  {
    h: "Who we are",
    p: "Infizium is a school operating system used by schools to run attendance, homework, communication and day-to-day administration. This policy explains what information we handle, why, and the choices you have. It is written to align with India's Digital Personal Data Protection Act.",
  },
  {
    h: "What we collect",
    p: "We collect only what a school needs to operate: student and staff names, class and roll details, attendance and homework records, parent contact numbers for notifications, and basic account information for the people who log in. We do not collect data we do not need, and we do not sell data to anyone.",
  },
  {
    h: "Why we use it",
    p: "Information is used to run the school's daily operations: marking attendance, sharing homework, sending updates to parents on WhatsApp, and giving administrators a clear view of their school. It is used for these purposes only.",
  },
  {
    h: "Parent control and consent",
    p: "Parents decide what notifications they receive and what a school may share. Access to any child's information requires school administrator approval. A consent and audit trail is maintained so it is always clear who has access to what.",
  },
  {
    h: "How we protect it",
    p: "Data is encrypted in transit, access is restricted by role, and security reviews are treated as a first priority, never skipped for speed. Communication runs over channels parents already trust, with no separate app required.",
  },
  {
    h: "Your rights",
    p: "You can ask to see the information held about you or your child, correct it, or request its deletion, subject to the school's own record-keeping obligations. Requests are made through your school, who remains the custodian of its records.",
  },
  {
    h: "Contact",
    p: "For any question about this policy or your data, write to infizium@outlook.com and we will respond.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-full" style={{ background: "#000" }}>
      <nav className="sticky top-0 z-50 border-b" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-white">Infizium</Link>
          <Link href="/" className="text-xs text-white/35 hover:text-white/70 transition-colors">← Back</Link>
        </div>
      </nav>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono tracking-widest uppercase text-white/30 mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-white/35 text-sm mb-12">Last updated June 2026. We keep this short and in plain language on purpose.</p>

          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-lg font-bold text-white mb-2">{s.h}</h2>
                <p className="text-white/50 leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>

          <p className="text-white/20 text-xs mt-16 leading-relaxed border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            This document is provided in good faith and will be reviewed by legal counsel before general availability. Schools remain the data custodians for their own records.
          </p>
        </div>
      </section>
    </div>
  );
}
