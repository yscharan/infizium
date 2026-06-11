"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { setSession, UserRole } from "@/lib/session";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

const roles = [
  { id: "parent",  label: "Parent",  icon: "👩",    desc: "Track attendance & homework",    border: "border-orange-500/30", selected: "border-orange-400 bg-orange-500/10 ring-1 ring-orange-500/30", accent: "#f97316", dash: "/dashboard/parent" },
  { id: "teacher", label: "Teacher", icon: "👨‍🏫", desc: "Mark attendance, assign homework", border: "border-blue-500/30",   selected: "border-blue-400 bg-blue-500/10 ring-1 ring-blue-500/30",   accent: "#3b82f6", dash: "/dashboard/teacher" },
  { id: "student", label: "Student", icon: "🧑‍🎓", desc: "Homework feed & progress",        border: "border-emerald-500/30",selected: "border-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/30", accent: "#10b981", dash: "/dashboard/student" },
  { id: "admin",   label: "Admin",   icon: "🏫",    desc: "School-wide operations",         border: "border-violet-500/30", selected: "border-violet-400 bg-violet-500/10 ring-1 ring-violet-500/30", accent: "#7c3aed", dash: "/dashboard/admin" },
];

type Step = "role" | "credentials" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("role");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const role = roles.find(r => r.id === selectedRole);

  function demoLogin() {
    if (!selectedRole) return;
    setSession(selectedRole as UserRole, undefined, true);
    router.push(role!.dash);
  }

  async function sendMagicLink() {
    setError(""); setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
      if (error) throw error;
      setMagicLinkSent(true);
      setStep("otp");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to send link";
      if (msg.includes("fetch") || msg.includes("URL")) { demoLogin(); return; }
      setError(msg);
    } finally { setLoading(false); }
  }

  async function signInWithPassword() {
    setError(""); setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes("fetch") || error.message.includes("URL")) { demoLogin(); return; }
        throw error;
      }
      setSession(selectedRole as UserRole, email, false);
      router.push(role!.dash);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally { setLoading(false); }
  }

  async function verifyOtp() {
    setError(""); setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
      if (error) throw error;
      setSession(selectedRole as UserRole, email, false);
      router.push(role!.dash);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid code");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ background: "#09090b" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="font-bold text-2xl text-white tracking-tight">Infizium</span>
          </Link>
          <p className="text-sm text-white/30 mt-2">School Operating System</p>
        </div>

        <AnimatePresence mode="wait">

          {step === "role" && (
            <motion.div key="role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-sm font-medium text-white/40 text-center mb-5">Who are you?</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {roles.map(r => (
                  <motion.button
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    whileTap={{ scale: 0.97 }}
                    className={`rounded-2xl border-2 p-4 text-left transition-all ${selectedRole === r.id ? r.selected : `${r.border} bg-white/3`}`}
                  >
                    <div className="text-2xl mb-2">{r.icon}</div>
                    <p className="font-semibold text-sm text-white">{r.label}</p>
                    <p className="text-xs text-white/35 mt-0.5 leading-snug">{r.desc}</p>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {selectedRole && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                    <motion.button
                      onClick={() => setStep("credentials")}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all"
                      style={{ background: role?.accent }}
                    >
                      Continue with Email →
                    </motion.button>
                    <motion.button
                      onClick={demoLogin}
                      className="w-full py-2.5 rounded-xl text-xs text-white/30 hover:text-white/60 transition-all"
                    >
                      Demo mode (no login) →
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {step === "credentials" && (
            <motion.div key="creds" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <button onClick={() => setStep("role")} className="text-xs text-white/30 hover:text-white/60 mb-2 flex items-center gap-1">
                ← Back
              </button>
              <p className="font-semibold text-white">Sign in as {role?.label} {role?.icon}</p>

              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@school.edu.in"
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(255,255,255,0.25)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <div>
                <label className="text-xs text-white/40 mb-1.5 block">
                  Password <span className="text-white/20">(leave blank for magic link)</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(255,255,255,0.25)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{error}</p>}

              <motion.button
                onClick={password ? signInWithPassword : sendMagicLink}
                disabled={loading || !email}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40 transition-all"
                style={{ background: role?.accent }}
              >
                {loading ? "Sending…" : password ? "Sign in" : "Send magic link"}
              </motion.button>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <button onClick={() => setStep("credentials")} className="text-xs text-white/30 hover:text-white/60 flex items-center gap-1">
                ← Back
              </button>
              <div>
                <p className="font-semibold text-white mb-1">{magicLinkSent ? "Check your email" : "Enter code"}</p>
                <p className="text-xs text-white/40">
                  {magicLinkSent ? `Magic link + 6-digit code sent to ${email}` : `Code sent to ${email}`}
                </p>
              </div>

              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                className="w-full rounded-xl px-4 py-3.5 text-center text-2xl font-mono tracking-[0.5em] text-white placeholder-white/15 outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />

              {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{error}</p>}

              <motion.button
                onClick={verifyOtp}
                disabled={loading || otp.length < 6}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40"
                style={{ background: role?.accent }}
              >
                {loading ? "Verifying…" : "Verify & Sign in"}
              </motion.button>

              <button onClick={sendMagicLink} className="w-full text-xs text-white/25 hover:text-white/50 transition-colors">
                Resend
              </button>
            </motion.div>
          )}

        </AnimatePresence>

        <p className="text-center text-xs text-white/15 mt-10">
          Protected by Supabase Auth · DPDP compliant
        </p>
      </motion.div>
    </div>
  );
}
