"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { StudentAnimatedBg } from "@/components/student-bg";
import { DashboardNav } from "@/components/dashboard-nav";
import { getSession, clearSession } from "@/lib/session";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const homework = [
  { subject: "Mathematics", title: "Ch 5 — Quadratic Equations", teacher: "Ravi Sir", due: "Tomorrow", urgent: true, done: false },
  { subject: "English", title: "Essay: My Favourite Festival", teacher: "Meena Ma'am", due: "Jun 7", urgent: false, done: false },
  { subject: "Science", title: "Lab diagram — Plant Cell", teacher: "Suresh Sir", due: "Jun 10", urgent: false, done: true },
  { subject: "Social Studies", title: "Map work — Rivers of India", teacher: "Anitha Ma'am", due: "Jun 12", urgent: false, done: false },
];

const announcements = [
  { from: "Principal Priya", time: "Today 9:00 AM", text: "School closed June 9 — state board inspection.", tag: "Holiday", tagStyle: "bg-red-500/20 text-red-300" },
  { from: "Class Teacher Ravi", time: "Yesterday", text: "PTM scheduled June 15, 10 AM – 1 PM. Your parents have been notified.", tag: "Notice", tagStyle: "bg-blue-500/20 text-blue-300" },
  { from: "Sports Dept.", time: "Mon", text: "Football team selections — June 8 at 4 PM on the ground.", tag: "Sports", tagStyle: "bg-emerald-500/20 text-emerald-300" },
];

const streakDays = [true, true, true, false, true, true, false];
const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

const health = {
  heightCm: 162,
  weightKg: 48,
  lastChecked: "Jun 15, 2026",
};

// Simple supportive guidance from BMI. Never clinical, never shaming.
function bmiAdvice(bmi: number) {
  if (bmi < 18.5) return {
    label: "Still growing",
    tone: "#38bdf8",
    tip: "Your body is still building itself. Add an extra serving through the day, like dal, eggs, milk, peanuts or a banana, and keep playing your sport.",
  };
  if (bmi < 25) return {
    label: "Healthy range",
    tone: "#10b981",
    tip: "You are in a healthy range. Keep the routine steady: balanced meals, plenty of water, eight hours of sleep, and some movement every day.",
  };
  if (bmi < 30) return {
    label: "A little above",
    tone: "#f59e0b",
    tip: "Small steps add up. Swap fried and sugary snacks for fruit, choose water over soft drinks, and get thirty active minutes outdoors each day.",
  };
  return {
    label: "Let us work on it together",
    tone: "#f97316",
    tip: "No pressure and no labels. Your PT teacher will set a gentle daily routine, and the school nurse is there whenever you want to talk.",
  };
}

export default function StudentDashboard() {
  const router = useRouter();
  const [name, setName] = useState("Arjun");
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "student") { router.replace("/login"); return; }
    setName(s.name);
    setEmail(s.email ?? "");
    setReady(true);
  }, [router]);

  function signOut() { clearSession(); router.push("/login"); }

  const completed = homework.filter(h => h.done).length;
  const total = homework.length;

  const bmi = +(health.weightKg / Math.pow(health.heightCm / 100, 2)).toFixed(1);
  const advice = bmiAdvice(bmi);

  if (!ready) return <div className="min-h-screen bg-[#0c0c0e]" />;

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-white/8 glass-dark sticky top-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">Infizium</span>
            <span className="text-white/20">|</span>
            <span className="text-sm text-emerald-400 font-medium">Student</span>
          </div>
          <button onClick={signOut} className="text-xs text-white/30 hover:text-white/70 transition-colors">Sign out</button>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

        <DashboardNav
          tabs={[
            { id: "overview", label: "Overview", icon: "🏠", href: "/dashboard/student" },
            { id: "progress", label: "Progress", icon: "📈", href: "/dashboard/student/progress" },
          ]}
          accentColor="#10b981"
          theme="dark"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl px-4 py-3 text-sm"
          style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)", color: "rgba(52,211,153,0.9)" }}
        >
          Good morning, {name}! 🔥 5-day streak. <span className="font-semibold">2 assignments due this week.</span> Term exam in 12 days.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative overflow-hidden rounded-2xl border border-indigo-500/20 shadow-2xl shadow-indigo-950/60"
          style={{ background: "#070b18" }}
        >
          <StudentAnimatedBg />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b18]/85 via-[#070b18]/40 to-[#070b18]/70 pointer-events-none" />
          <div className="relative z-10 p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/30">
              🧑‍🎓
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-lg">{name}</p>
              <p className="text-sm text-white/40">Grade 9 · Section A · Roll No. 01</p>
              <p className="text-xs text-white/30 mt-0.5">St. Joseph&apos;s High School, Hyderabad</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-emerald-400">87%</p>
              <p className="text-xs text-white/40">Attendance</p>
            </div>
          </div>

          <div className="relative z-10 mx-6 mb-6 pt-4 border-t border-white/10">
            <p className="text-xs text-white/40 mb-3 uppercase tracking-widest">This week</p>
            <div className="flex gap-2">
              {streakDays.map((active, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${active ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30" : "bg-white/5 text-white/20"}`}>
                    {active ? "✓" : dayLabels[i]}
                  </div>
                  <span className="text-[10px] text-white/30">{dayLabels[i]}</span>
                </motion.div>
              ))}
              <div className="ml-auto flex items-center gap-1.5">
                <span className="text-orange-400 text-lg">🔥</span>
                <div>
                  <p className="text-sm font-bold text-white">5 day streak</p>
                  <p className="text-[10px] text-white/30">Keep it up!</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 rounded-2xl px-5 py-4"
        >
          <p className="text-sm text-indigo-300 font-medium">&ldquo;Success is not final, failure is not fatal — it is the courage to continue that counts.&rdquo;</p>
          <p className="text-xs text-white/30 mt-1">Keep pushing, {name}. JEE is within reach. 🎯</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
          className="bg-white/5 border border-white/8 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white flex items-center gap-2 text-sm">
              <span>📚</span> Homework
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex-1 w-24 bg-white/10 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completed / total) * 100}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
                  className="h-1.5 bg-emerald-400 rounded-full"
                />
              </div>
              <span className="text-xs text-white/40">{completed}/{total} done</span>
            </div>
          </div>
          <ul className="space-y-2">
            {homework.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                className={`flex items-start gap-3 p-3 rounded-xl border text-sm transition-all ${
                  h.done
                    ? "bg-white/3 border-white/5 opacity-40"
                    : h.urgent
                    ? "bg-red-500/8 border-red-500/20"
                    : "bg-white/3 border-white/8"
                }`}
              >
                <div className={`w-5 h-5 rounded-md border flex-shrink-0 mt-0.5 flex items-center justify-center ${h.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/20"}`}>
                  {h.done && <span className="text-[10px]">✓</span>}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${h.done ? "line-through text-white/30" : "text-white"}`}>{h.title}</p>
                  <p className="text-xs text-white/30 mt-0.5">{h.subject} · {h.teacher}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {h.urgent && !h.done && (
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">Tomorrow</span>
                  )}
                  {!h.urgent && <span className="text-xs text-white/30">{h.due}</span>}
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
          className="bg-white/5 border border-white/8 rounded-2xl p-5"
        >
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm"><span>📢</span> Announcements</h2>
          <ul className="space-y-3">
            {announcements.map((a, i) => (
              <li key={i} className="border-b border-white/5 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white/80">{a.from}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${a.tagStyle}`}>{a.tag}</span>
                  </div>
                  <span className="text-xs text-white/25">{a.time}</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{a.text}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
          className="bg-white/5 border border-white/8 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white flex items-center gap-2 text-sm"><span>❤️</span> Health &amp; Wellbeing</h2>
            <span className="text-[10px] text-white/30">Checked {health.lastChecked}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Height", value: `${health.heightCm}`, unit: "cm" },
              { label: "Weight", value: `${health.weightKg}`, unit: "kg" },
              { label: "BMI", value: `${bmi}`, unit: advice.label },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-white/3 border border-white/8 p-3 text-center">
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-xl font-bold text-white leading-none">{m.value}</p>
                <p className="text-[10px] mt-1" style={{ color: m.label === "BMI" ? advice.tone : "rgba(255,255,255,0.3)" }}>{m.unit}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-3 flex gap-3" style={{ background: `${advice.tone}12`, border: `1px solid ${advice.tone}30` }}>
            <span className="text-lg flex-shrink-0">🌱</span>
            <div>
              <p className="text-xs font-semibold mb-0.5" style={{ color: advice.tone }}>Recommended for you</p>
              <p className="text-xs text-white/55 leading-relaxed">{advice.tip}</p>
            </div>
          </div>

          <p className="text-[10px] text-white/25 mt-3 leading-relaxed">
            Recorded at the school health check. This is friendly guidance, not a medical opinion. Talk to your PT teacher or the school nurse anytime.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-violet-500/20 p-5"
          style={{ background: "linear-gradient(135deg, #1e1b4b, #2e1065)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[40px]" />
          <div className="relative flex gap-4">
            <div className="w-10 h-10 bg-violet-500/20 border border-violet-500/30 rounded-xl flex items-center justify-center text-xl">🤖</div>
            <div>
              <p className="font-semibold text-white mb-1">AI Tutor — Coming Phase 3</p>
              <p className="text-sm text-violet-300/60 leading-relaxed">Ask doubts you&apos;re too shy to raise in class. Get feedback on essays. Practice with past papers. Powered by Amazon Bedrock.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/3 rounded-2xl border border-white/6 p-5"
        >
          <h2 className="font-semibold text-white/40 mb-3 flex items-center gap-2 text-xs uppercase tracking-wider"><span>👤</span> Your profile</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div>
              <p className="text-white/25 text-xs mb-0.5">Name</p>
              <p className="text-white/70">{name || "—"}</p>
            </div>
            <div>
              <p className="text-white/25 text-xs mb-0.5">Role</p>
              <p className="text-white/70">Student · Grade 9A</p>
            </div>
            <div>
              <p className="text-white/25 text-xs mb-0.5">Email</p>
              <p className="text-white/70">{email || "—"}</p>
            </div>
            <div>
              <p className="text-white/25 text-xs mb-0.5">School</p>
              <p className="text-white/70">St. Joseph&apos;s High School</p>
            </div>
            <div className="col-span-2 mt-1 pt-3 border-t border-white/5">
              <p className="text-white/25 text-xs mb-1">Telegram link</p>
              <p className="text-white/50 text-xs leading-relaxed">
                Open <span className="text-emerald-400">@InfiziumBot</span> on Telegram and send{" "}
                <code className="bg-white/8 px-1.5 py-0.5 rounded text-white/70">/register &lt;your phone&gt;</code>
              </p>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <Link href="/" className="text-xs text-white/20 hover:text-white/50 transition-colors">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
