"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const PARENT_TABS = [
  { id: "overview", label: "Overview", icon: "🏠", href: "/dashboard/parent" },
  { id: "permissions", label: "Permissions", icon: "🔐", href: "/dashboard/parent/permissions" },
];

interface Toggle {
  id: string;
  label: string;
  sub: string;
  phase?: string;
  locked?: boolean;
}

const NOTIFICATION_TOGGLES: Toggle[] = [
  { id: "attendance", label: "Attendance alerts", sub: "WhatsApp message when Arjun is marked absent or late" },
  { id: "homework", label: "Homework notifications", sub: "Alert when a new assignment is posted" },
  { id: "announcements", label: "School announcements", sub: "All circulars and notices from school" },
  { id: "forms", label: "Form approval requests", sub: "Field trips, consent forms, PTM — sent to your WhatsApp" },
  { id: "weekly", label: "Weekly academic summary", sub: "Every Friday — attendance, homework, and highlights" },
];

const FEATURE_TOGGLES: Toggle[] = [
  { id: "ai_tutor", label: "AI Tutor access", sub: "Allow Arjun to use the AI tutor for homework help", phase: "Phase 3", locked: true },
  { id: "ai_essay", label: "AI essay feedback", sub: "AI reads and comments on Arjun's written assignments", phase: "Phase 3", locked: true },
  { id: "sponsor", label: "Sponsorship visibility", sub: "Allow verified donors to see Arjun's public learning profile" },
  { id: "progress_share", label: "Progress shared with teachers", sub: "Teachers can view Arjun's self-reported mood and study hours" },
];

const DATA_TOGGLES: Toggle[] = [
  { id: "attendance_report", label: "Attendance in board reports", sub: "School may include Arjun's attendance in government-mandated reports" },
  { id: "analytics", label: "Anonymous school analytics", sub: "Arjun's data contributes (anonymised) to school-level insights" },
  { id: "third_party", label: "Third-party integrations", sub: "DigiLocker, CBSE portals, and exam boards", phase: "Phase 4", locked: true },
];

const CONSENT_LOG = [
  { date: "Jun 1, 2026", action: "Approved Science Field Trip form", via: "WhatsApp" },
  { date: "May 28, 2026", action: "Approved PTM attendance form", via: "WhatsApp" },
  { date: "May 15, 2026", action: "Updated attendance notifications — turned OFF late alerts", via: "App" },
  { date: "May 3, 2026", action: "Onboarded to Infizium — agreed to base consent", via: "App" },
];

function ToggleRow({ t, on, onToggle }: { t: Toggle; on: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-white/5 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white/80">{t.label}</p>
          {t.phase && (
            <span className="text-[10px] bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded-full font-medium border border-violet-500/20">{t.phase}</span>
          )}
        </div>
        <p className="text-xs text-white/30 mt-0.5 leading-relaxed">{t.sub}</p>
      </div>
      <button
        onClick={!t.locked ? onToggle : undefined}
        className={`flex-shrink-0 relative w-11 h-6 rounded-full transition-all duration-300 ${t.locked ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
        style={{ background: on ? "#16a34a" : "rgba(255,255,255,0.12)" }}
      >
        <motion.div
          animate={{ x: on ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </button>
    </div>
  );
}

export default function PermissionsPage() {
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    attendance: true, homework: true, announcements: true, forms: true, weekly: false,
  });

  const [features, setFeatures] = useState<Record<string, boolean>>({
    ai_tutor: false, ai_essay: false, sponsor: false, progress_share: true,
  });

  const [data, setData] = useState<Record<string, boolean>>({
    attendance_report: true, analytics: false, third_party: false,
  });

  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function toggle(setState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, id: string) {
    setState(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="min-h-screen bg-[#09090b]">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 border-b border-white/8"
        style={{ background: "rgba(9,9,11,0.85)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">Infizium</span>
            <span className="text-white/20">|</span>
            <span className="text-sm text-orange-400 font-medium">Lakshmi</span>
          </div>
          <Link href="/login" className="text-xs text-white/30 hover:text-white/60 transition-colors">Sign out</Link>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

        <DashboardNav tabs={PARENT_TABS} accentColor="#f97316" theme="dark" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="rounded-2xl p-5 overflow-hidden relative border border-white/8"
          style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(234,88,12,0.07) 100%)" }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center text-2xl">🔐</div>
            <div>
              <h1 className="font-bold text-white text-lg">Privacy &amp; Permissions</h1>
              <p className="text-sm text-white/40 mt-0.5">You control what Infizium does with Arjun&apos;s data. These settings are yours.</p>
              <p className="text-xs text-white/25 mt-1">Last updated: May 15, 2026 · Changes are effective immediately</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5, ease: EASE }}
          className="bg-white/5 rounded-2xl border border-white/8 p-5"
        >
          <h2 className="font-semibold text-white/70 text-sm mb-1 flex items-center gap-2">📱 WhatsApp Notifications</h2>
          <p className="text-xs text-white/25 mb-4">All notifications go to your WhatsApp: +91 98765 43210</p>
          <div>
            {NOTIFICATION_TOGGLES.map(t => (
              <ToggleRow key={t.id} t={t} on={notifications[t.id]} onToggle={() => toggle(setNotifications, t.id)} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.5, ease: EASE }}
          className="bg-white/5 rounded-2xl border border-white/8 p-5"
        >
          <h2 className="font-semibold text-white/70 text-sm mb-1 flex items-center gap-2">⚙️ Feature Access</h2>
          <p className="text-xs text-white/25 mb-4">Control which platform features are active for Arjun</p>
          <div>
            {FEATURE_TOGGLES.map(t => (
              <ToggleRow key={t.id} t={t} on={features[t.id]} onToggle={() => toggle(setFeatures, t.id)} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.20, duration: 0.5, ease: EASE }}
          className="bg-white/5 rounded-2xl border border-white/8 p-5"
        >
          <h2 className="font-semibold text-white/70 text-sm mb-1 flex items-center gap-2">🗂️ Data Sharing</h2>
          <p className="text-xs text-white/25 mb-4">Under India&apos;s DPDP Act, you control how Arjun&apos;s data may be used</p>
          <div>
            {DATA_TOGGLES.map(t => (
              <ToggleRow key={t.id} t={t} on={data[t.id]} onToggle={() => toggle(setData, t.id)} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="flex items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={save}
            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: saved ? "#16a34a" : "#f97316",
              color: "white",
              boxShadow: saved ? "0 0 20px rgba(22,163,74,0.3)" : "0 0 20px rgba(249,115,22,0.2)",
            }}
          >
            {saved ? "✓ Preferences saved" : "Save preferences"}
          </motion.button>
          <Link
            href="/dashboard/parent"
            className="px-5 py-3 rounded-xl text-sm font-medium text-white/40 border border-white/10 hover:bg-white/5 transition-colors"
          >
            Back
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5, ease: EASE }}
          className="bg-white/5 rounded-2xl border border-white/8 p-5"
        >
          <h2 className="font-semibold text-white/70 text-sm mb-4 flex items-center gap-2">📋 Consent history</h2>
          <ul className="space-y-3">
            {CONSENT_LOG.map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400/60 mt-1.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white/60">{c.action}</p>
                  <p className="text-white/25 mt-0.5">{c.date} · via {c.via}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-white/15 mt-4">This log is maintained for DPDP compliance. Contact school@infizium.com to request data deletion.</p>
        </motion.div>

      </div>
    </div>
  );
}
