"use client";

import Link from "next/link";

const sections = [
  {
    h: "Using Infizium",
    p: "Infizium is provided to schools and the people they authorise: administrators, teachers, students and parents. By using it, you agree to use it only for running and supporting a school, and only with the access your school has granted you.",
  },
  {
    h: "Accounts and access",
    p: "Access is granted by your school administrator. You are responsible for keeping your login secure and for the activity under your account. Access to a child's information always requires school approval.",
  },
  {
    h: "Acceptable use",
    p: "Do not misuse the platform: no attempting to access data you are not authorised to see, no disrupting the service, and no using it to harm a student, a family or the school. We may suspend access that puts others at risk.",
  },
  {
    h: "The school's data",
    p: "A school owns its records. Infizium is the tool that runs them. We do not sell school or student data, and we use it only to provide the service, as described in our Privacy Policy.",
  },
  {
    h: "Availability and changes",
    p: "We work to keep the service reliable, but it is provided on an as-is basis during the pilot period. Features may be added or changed as the platform grows with the schools that use it. We will give reasonable notice of material changes.",
  },
  {
    h: "Pilot terms",
    p: "During the pilot, setup is free for participating schools. Pricing, once introduced, will be communicated clearly and in advance. Nothing is charged without the school agreeing first.",
  },
  {
    h: "Contact",
    p: "Questions about these terms can be sent to infizium@outlook.com.",
  },
];

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3">Terms of Service</h1>
          <p className="text-white/35 text-sm mb-12">Last updated June 2026. Plain language, no surprises.</p>

          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-lg font-bold text-white mb-2">{s.h}</h2>
                <p className="text-white/50 leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>

          <p className="text-white/20 text-xs mt-16 leading-relaxed border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            This document is provided in good faith and will be reviewed by legal counsel before general availability.
          </p>
        </div>
      </section>
    </div>
  );
}
