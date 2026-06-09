"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { DashboardNav } from "@/components/dashboard-nav";
import { getSession, clearSession } from "@/lib/session";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const alerts = [
  { time: "8:14 AM · Today", type: "absent", text: "Arjun was marked absent — Period 1, Maths.", action: "You replied: Sick today" },
  { time: "Yesterday", type: "present", text: "Arjun attended all 6 periods.", action: "" },
  { time: "Monday", type: "absent", text: "Arjun was absent — Period 3, Science.", action: "You replied: Doctor visit" },
];

const homework = [
  { subject: "Mathematics", title: "Ch 5 — Quadratic Equations", due: "Tomorrow", done: false },
  { subject: "English", title: "Essay: My Favourite Festival", due: "Jun 7", done: false },
  { subject: "Science", title: "Lab diagram — Plant Cell", due: "Jun 10", done: true },
];

const announcements = [
  { from: "Principal Priya", time: "Today 9:00 AM", text: "School will remain closed on June 9 for the state board inspection." },
  { from: "Class Teacher Ravi", time: "Yesterday", text: "PTM scheduled for June 15, 10 AM – 1 PM. Please confirm via the approval form." },
];

const forms = [
  { title: "Science Field Trip — Nehru Zoological Park", due: "Jun 8", status: "pending" },
  { title: "Parent-Teacher Meeting — June 15", due: "Jun 12", status: "approved" },
];

export default function ParentDashboard() {
  const router = useRouter();
  const [name, setName] = useState("Lakshmi");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "parent") { router.replace("/login"); return; }
    setName(s.name);
    setReady(true);
  }, [router]);

  function signOut() { clearSession(); router.push("/login"); }

  if (!ready) return <div className="min-h-screen" style={{ background: "#faf7f4" }} />;

  return (
    <div className="min-h-screen" style={{ background: "#faf7f4" }}>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 border-b border-orange-100/60"
        style={{ background: "rgba(250, 247, 244, 0.85)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">Infizium</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-orange-600 font-medium">{name}</span>
          </div>
          <button onClick={signOut} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Sign out</button>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

        <DashboardNav
          tabs={[
            { id: "overview", label: "Overview", icon: "🏠", href: "/dashboard/parent" },
            { id: "permissions", label: "Permissions", icon: "🔐", href: "/dashboard/parent/permissions" },
          ]}
          accentColor="#f97316"
          theme="light"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl px-4 py-3 text-sm text-orange-700/80"
          style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.12)" }}
        >
          Good morning, {name}. ✅ Arjun is in school today. <span className="font-medium text-orange-600">1 form needs your approval.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="rounded-2xl overflow-hidden shadow-lg shadow-orange-100/80"
          style={{ background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #fed7aa 100%)" }}
        >
          <div className="p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-orange-200 flex items-center justify-center text-3xl shadow-inner">🧑‍🎓</div>
              <div>
                <p className="font-bold text-gray-900 text-lg">Arjun</p>
                <p className="text-sm text-orange-700/70">Grade 9 · St. Joseph&apos;s High School</p>
              </div>
              <div className="ml-auto text-right">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-3.5 py-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-semibold text-emerald-700">In school today</span>
                </motion.div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Attendance", value: "87%", sub: "this term" },
                { label: "Homework", value: "2 due", sub: "this week" },
                { label: "Forms", value: "1 pending", sub: "needs approval" },
              ].map((s) => (
                <div key={s.label} className="bg-white/60 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-gray-800">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-[10px] text-gray-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-orange-100/60 border-t border-orange-200/40 px-6 py-3 flex items-center gap-2">
            <span className="text-base">📱</span>
            <p className="text-xs text-orange-700/70">Attendance alerts sent to your WhatsApp within 10 minutes of class starting.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
        >
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm"><span>✅</span> Attendance alerts</h2>
          <ul className="space-y-3">
            {alerts.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${a.type === "absent" ? "bg-red-100 text-red-500" : "bg-emerald-100 text-emerald-500"}`}>
                  {a.type === "absent" ? "✗" : "✓"}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{a.text}</p>
                  {a.action && (
                    <p className="text-xs text-emerald-600 mt-0.5 flex items-center gap-1">
                      <span>💬</span> {a.action}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
          >
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm"><span>📚</span> Arjun&apos;s homework</h2>
            <ul className="space-y-3">
              {homework.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className={`mt-0.5 text-base ${h.done ? "opacity-30" : ""}`}>📖</span>
                  <div className={h.done ? "opacity-40 line-through" : ""}>
                    <p className="text-gray-800 font-medium">{h.title}</p>
                    <p className="text-xs text-gray-400">{h.subject} · Due {h.due}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.5, ease: EASE }}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
          >
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm"><span>📢</span> From school</h2>
            <ul className="space-y-3">
              {announcements.map((a, i) => (
                <li key={i} className="text-sm border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                  <p className="font-medium text-gray-700 text-xs mb-0.5">{a.from} · {a.time}</p>
                  <p className="text-gray-500 leading-relaxed">{a.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
        >
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm"><span>📋</span> Approvals needed</h2>
          <ul className="space-y-3">
            {forms.map((f, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-gray-800 font-medium">{f.title}</p>
                  <p className="text-xs text-gray-400">Respond by {f.due}</p>
                </div>
                {f.status === "pending" ? (
                  <div className="flex gap-2">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="bg-emerald-600 text-white text-xs px-4 py-1.5 rounded-full hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20">
                      Approve
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="bg-gray-100 text-gray-500 text-xs px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors">
                      Decline
                    </motion.button>
                  </div>
                ) : (
                  <span className="text-xs text-emerald-600 font-medium bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">✓ Approved</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
