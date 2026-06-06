"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STEPS = [
  {
    id: "mark",
    actor: "teacher",
    title: "Ravi marks Arjun absent",
    subtitle: "8:14 AM · Grade 9A · Period 1",
    detail: "Teacher opens the attendance screen and taps Arjun's name → Absent",
    color: "#3b82f6",
  },
  {
    id: "process",
    actor: "system",
    title: "Infizium processes the event",
    subtitle: "8:14 AM → 8:23 AM · 9 minutes",
    detail: "Attendance saved. Parent linked. WhatsApp message queued and sent within the 10-minute SLA.",
    color: "#6366f1",
  },
  {
    id: "whatsapp",
    actor: "parent",
    title: "Lakshmi receives a WhatsApp message",
    subtitle: "8:23 AM · From Infizium School Bot",
    detail: "No app download. No login. A structured message arrives in her existing WhatsApp.",
    color: "#25d366",
  },
  {
    id: "reply",
    actor: "parent",
    title: "Lakshmi replies in one tap",
    subtitle: "8:25 AM · Reply: 1",
    detail: "She types 1 (Sick/home). Infizium receives the reply, updates the record, notifies the teacher.",
    color: "#25d366",
  },
  {
    id: "done",
    actor: "teacher",
    title: "Teacher sees the update",
    subtitle: "8:25 AM · Arjun: Sick — confirmed",
    detail: "Ravi's screen shows Arjun's absence reason. The audit trail is saved for compliance.",
    color: "#10b981",
  },
];

const MESSAGE_TYPES = [
  {
    icon: "🔔",
    type: "Attendance Alert",
    preview: "Hi Lakshmi, Arjun was marked absent in Period 1 (Mathematics) at St. Joseph's today.\n\nReply 1 – Sick/home\nReply 2 – Doctor visit\nReply 3 – Will arrive late\nReply 4 – Other reason",
    neon: "#ef4444",
    badge: "< 10 min",
  },
  {
    icon: "📚",
    type: "Homework Posted",
    preview: "New homework for Arjun.\n\nSubject: Mathematics\nTitle: Chapter 5 – Quadratic Equations\nDue: Tomorrow\nPosted by: Ravi Sir\n\nReply DONE when completed.",
    neon: "#3b82f6",
    badge: "Instant",
  },
  {
    icon: "📢",
    type: "Announcement",
    preview: "📢 St. Joseph's High School\n\nSchool will remain closed on June 9th (Thursday) for the State Board inspection.\n\nNormal school resumes June 10th.",
    neon: "#f97316",
    badge: "Broadcast",
  },
  {
    icon: "📋",
    type: "Form Approval",
    preview: "Action required for Arjun.\n\nSt. Joseph's is organising a Science Field Trip to Nehru Zoological Park on June 15.\n\nTotal cost: ₹250 (included in school fee)\n\nReply 1 – Approve\nReply 2 – Decline",
    neon: "#7c3aed",
    badge: "Approval",
  },
  {
    icon: "📊",
    type: "Weekly Summary",
    preview: "Weekly update for Arjun (Week 22)\n\nAttendance: 5/5 days ✅\nHomework: 4/5 submitted\nThis week's test: Maths – 89/100 🎉\n\nNext week: Science test on June 12.",
    neon: "#10b981",
    badge: "Weekly",
  },
];

export default function WhatsAppPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeMsg, setActiveMsg] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActiveStep(s => (s + 1) % STEPS.length), 2500);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ background: "#020818" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(2,8,24,0.88)", backdropFilter: "blur(20px)", borderColor: "rgba(37,211,102,0.15)" }}
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-white hover:text-white/80 transition-colors">Infizium</Link>
            <span className="text-white/20">·</span>
            <span className="text-sm font-semibold" style={{ color: "#25d366" }}>WhatsApp-First Platform</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/40 hover:text-white/70 transition-colors">Try demo →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: "rgba(37,211,102,0.06)" }} />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
            style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.25)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#25d366" }} />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase" style={{ color: "#25d366" }}>
              WhatsApp Business API
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold leading-[1.1] tracking-tight mb-5"
          >
            The school speaks.<br />
            <span style={{ background: "linear-gradient(135deg, #25d366, #128c7e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Parents already listen.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, ease: EASE }}
            className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed mb-10"
          >
            Every parent notification in Infizium goes through WhatsApp. No app to download, no login to remember. Parents respond right inside the chat they use all day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {[
              { value: "90%+", label: "WhatsApp penetration in Telangana" },
              { value: "< 10 min", label: "Alert delivery after absence" },
              { value: "0", label: "App downloads required" },
              { value: "1 tap", label: "To approve a field trip" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#25d366" }}>{s.value}</p>
                <p className="text-xs text-white/30">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Flow walkthrough */}
      <section className="py-16 px-4" style={{ background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-mono text-white/25 tracking-widest uppercase mb-12">How it works — end to end</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Steps list */}
            <div className="space-y-3">
              {STEPS.map((step, i) => (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className="w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-300"
                  style={{
                    background: activeStep === i ? `${step.color}10` : "rgba(255,255,255,0.02)",
                    border: activeStep === i ? `1px solid ${step.color}35` : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300"
                    style={{
                      background: activeStep === i ? step.color : "rgba(255,255,255,0.06)",
                      color: activeStep === i ? "white" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm transition-colors duration-300 ${activeStep === i ? "text-white" : "text-white/40"}`}>{step.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: activeStep === i ? step.color : "rgba(255,255,255,0.2)" }}>{step.subtitle}</p>
                    <AnimatePresence>
                      {activeStep === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-white/40 mt-2 leading-relaxed overflow-hidden"
                        >
                          {step.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  {activeStep === i && (
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: step.color, boxShadow: `0 0 8px ${step.color}` }} />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center">
              <div className="relative w-72">
                {/* Phone frame */}
                <div
                  className="rounded-[40px] p-3 shadow-2xl"
                  style={{ background: "#1c1c1e", border: "3px solid rgba(255,255,255,0.1)" }}
                >
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-4 py-2 text-[10px] text-white/50">
                    <span>9:23 AM</span>
                    <div className="flex gap-1">
                      <span>●●●</span>
                      <span>WiFi</span>
                    </div>
                  </div>

                  {/* WhatsApp header */}
                  <div
                    className="rounded-xl px-4 py-3 flex items-center gap-3 mb-2"
                    style={{ background: "#075e54" }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">🏫</div>
                    <div className="flex-1">
                      <p className="text-white text-xs font-semibold">Infizium · St. Joseph&apos;s</p>
                      <p className="text-white/60 text-[10px]">School notification service</p>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{ background: "#25d366" }} />
                  </div>

                  {/* Chat area */}
                  <div
                    className="rounded-xl p-3 min-h-[340px] flex flex-col justify-end gap-2 relative overflow-hidden"
                    style={{ background: "#0a1929" }}
                  >
                    {/* Chat bg pattern */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }} />

                    <AnimatePresence mode="popLayout">
                      {activeStep >= 2 && (
                        <motion.div
                          key="msg-incoming"
                          initial={{ opacity: 0, y: 16, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="self-start max-w-[85%]"
                        >
                          <div className="rounded-xl rounded-tl-sm p-3 text-xs leading-relaxed" style={{ background: "#1e2d3d", color: "rgba(255,255,255,0.85)" }}>
                            <p className="text-[10px] font-semibold mb-1" style={{ color: "#25d366" }}>Infizium School Bot</p>
                            {activeStep === 2 || activeStep === 3 || activeStep === 4 ? (
                              <>
                                <p>Hi Lakshmi, <strong>Arjun was marked absent</strong> in Period 1 (Mathematics) at St. Joseph&apos;s today.</p>
                                <p className="mt-2 text-white/50">Reply to confirm reason:</p>
                                <p className="mt-1">1 – Sick/home<br />2 – Doctor visit<br />3 – Will arrive late<br />4 – Other</p>
                              </>
                            ) : null}
                          </div>
                          <p className="text-[9px] text-white/20 mt-0.5 ml-1">8:23 AM · ✓✓</p>
                        </motion.div>
                      )}

                      {activeStep >= 3 && (
                        <motion.div
                          key="msg-reply"
                          initial={{ opacity: 0, y: 16, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="self-end"
                        >
                          <div className="rounded-xl rounded-tr-sm px-4 py-2.5 text-xs" style={{ background: "#005c4b", color: "rgba(255,255,255,0.9)" }}>
                            1
                          </div>
                          <p className="text-[9px] text-white/20 mt-0.5 mr-1 text-right">8:25 AM · ✓✓</p>
                        </motion.div>
                      )}

                      {activeStep >= 4 && (
                        <motion.div
                          key="msg-confirm"
                          initial={{ opacity: 0, y: 16, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="self-start max-w-[85%]"
                        >
                          <div className="rounded-xl rounded-tl-sm p-3 text-xs leading-relaxed" style={{ background: "#1e2d3d", color: "rgba(255,255,255,0.85)" }}>
                            <p className="text-[10px] font-semibold mb-1" style={{ color: "#25d366" }}>Infizium School Bot</p>
                            <p>Thank you, Lakshmi. We&apos;ve updated Arjun&apos;s absence as <strong>Sick/home</strong>. His teacher has been informed.</p>
                            <p className="mt-1.5 text-white/50">Get well soon! 🙏</p>
                          </div>
                          <p className="text-[9px] text-white/20 mt-0.5 ml-1">8:25 AM · ✓✓</p>
                        </motion.div>
                      )}

                      {activeStep < 2 && (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center h-40 text-center"
                        >
                          <div className="text-3xl mb-2">📱</div>
                          <p className="text-xs text-white/20">Waiting for attendance to be marked…</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-2 mt-2 px-2">
                    <div className="flex-1 rounded-full px-4 py-2 text-xs text-white/20" style={{ background: "rgba(255,255,255,0.06)" }}>
                      {activeStep >= 3 ? "Message sent" : "Type a message…"}
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#25d366" }}>
                      <span className="text-xs">▶</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message types */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-mono text-white/25 tracking-widest uppercase mb-10">Five types of WhatsApp messages</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MESSAGE_TYPES.map((m, i) => (
              <motion.button
                key={m.type}
                onClick={() => setActiveMsg(i)}
                className="rounded-2xl p-5 flex flex-col gap-3 text-left transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: activeMsg === i ? `${m.neon}08` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${activeMsg === i ? m.neon + "40" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: activeMsg === i ? `0 0 30px ${m.neon}10` : "none",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{m.icon}</span>
                    <span className="font-semibold text-sm text-white/80">{m.type}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${m.neon}18`, color: m.neon, border: `1px solid ${m.neon}30` }}>
                    {m.badge}
                  </span>
                </div>
                <div
                  className="rounded-xl p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap"
                  style={{ background: "rgba(0,0,0,0.3)", color: "rgba(255,255,255,0.55)" }}
                >
                  {m.preview}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance strip */}
      <section className="py-12 px-4" style={{ background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: "🔒", title: "DPDP Compliant", sub: "India's data protection law" },
              { icon: "📵", title: "Boundary Controls", sub: "Parents can't message teachers after hours" },
              { icon: "🗂️", title: "Full Audit Trail", sub: "Every reply logged per student" },
              { icon: "🇮🇳", title: "Telugu in Phase 2", sub: "English first, regional next" },
            ].map(c => (
              <div key={c.title}>
                <div className="text-2xl mb-2">{c.icon}</div>
                <p className="text-sm font-semibold text-white/70">{c.title}</p>
                <p className="text-xs text-white/30 mt-0.5">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <p className="text-white/25 text-sm mb-4">See it in action</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard/parent"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.02]"
            style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.4)", color: "#25d366" }}
          >
            View parent dashboard →
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm border border-white/10 text-white/50 hover:bg-white/5 transition-colors"
          >
            Try the demo
          </Link>
        </div>
      </section>

      <footer className="border-t py-8 px-4 text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link href="/" className="text-xs text-white/20 hover:text-white/50 transition-colors">← Back to Infizium</Link>
      </footer>
    </div>
  );
}
