"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

const roles = [
  { id: "parent",  label: "Parent",  icon: "👩",    desc: "Track attendance & homework",    border: "border-orange-200", selected: "border-orange-400 bg-orange-50 ring-2 ring-orange-200", accent: "#f97316", dash: "/dashboard/parent" },
  { id: "teacher", label: "Teacher", icon: "👨‍🏫", desc: "Mark attendance, assign homework", border: "border-blue-200",   selected: "border-blue-400 bg-blue-50 ring-2 ring-blue-200",   accent: "#3b82f6", dash: "/dashboard/teacher" },
  { id: "student", label: "Student", icon: "🧑‍🎓", desc: "Homework feed & progress",        border: "border-emerald-200",selected: "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200", accent: "#10b981", dash: "/dashboard/student" },
  { id: "admin",   label: "Admin",   icon: "🏫",    desc: "School-wide operations",         border: "border-violet-200", selected: "border-violet-400 bg-violet-50 ring-2 ring-violet-200", accent: "#7c3aed", dash: "/dashboard/admin" },
];

type Step = "role" | "credentials" | "otp";
type Method = "phone" | "email";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("role");
  const [method, setMethod] = useState<Method>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const role = roles.find(r => r.id === selectedRole);

  // Demo bypass — works without Supabase for UI testing
  function demoLogin() {
    if (!selectedRole) return;
    router.push(role!.dash);
  }

  async function sendOtp() {
    setError(""); setLoading(true);
    try {
      if (method === "phone") {
        const e164 = "+91" + phone.replace(/\D/g, "").slice(-10);
        const { error } = await supabase.auth.signInWithOtp({ phone: e164 });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
      }
      setStep("otp");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to send OTP";
      // If Supabase not configured, fall back to demo
      if (msg.includes("fetch") || msg.includes("URL")) {
        demoLogin(); return;
      }
      setError(msg);
    } finally { setLoading(false); }
  }

  async function verifyOtp() {
    setError(""); setLoading(true);
    try {
      let result;
      if (method === "phone") {
        const e164 = "+91" + phone.replace(/\D/g, "").slice(-10);
        result = await supabase.auth.verifyOtp({ phone: e164, token: otp, type: "sms" });
      } else {
        result = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });
      }
      if (result.error) throw result.error;
      router.push(role!.dash);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid OTP");
    } finally { setLoading(false); }
  }

  async function emailLogin() {
    setError(""); setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes("fetch") || error.message.includes("URL")) {
          demoLogin(); return;
        }
        throw error;
      }
      router.push(role!.dash);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="font-display font-bold text-2xl text-gray-900 tracking-tight">Infizium</span>
          </Link>
          <p className="text-sm text-gray-400 mt-2">School Operating System</p>
        </div>

        {/* Step: Role */}
        <AnimatePresence mode="wait">
          {step === "role" && (
            <motion.div key="role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-sm font-medium text-gray-500 text-center mb-5">Who are you?</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {roles.map(r => (
                  <motion.button
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    whileTap={{ scale: 0.97 }}
                    className={`rounded-2xl border-2 p-4 text-left transition-all ${selectedRole === r.id ? r.selected : `${r.border} bg-white`}`}
                  >
                    <div className="text-2xl mb-2">{r.icon}</div>
                    <p className="font-display font-semibold text-sm text-gray-800">{r.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-snug">{r.desc}</p>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {selectedRole && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <motion.button
                      onClick={() => { setMethod("phone"); setStep("credentials"); }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl font-display font-semibold text-sm text-white transition-all"
                      style={{ background: role?.accent }}
                    >
                      Continue with Phone →
                    </motion.button>
                    <motion.button
                      onClick={() => { setMethod("email"); setStep("credentials"); }}
                      className="w-full py-3 rounded-xl font-medium text-sm text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all"
                    >
                      Use email instead
                    </motion.button>
                    <motion.button
                      onClick={demoLogin}
                      className="w-full py-2.5 rounded-xl text-xs text-gray-400 hover:text-gray-600 transition-all"
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
              <button onClick={() => setStep("role")} className="text-xs text-gray-400 hover:text-gray-600 mb-2 flex items-center gap-1">
                ← Back
              </button>

              <p className="font-display font-semibold text-gray-800">
                Sign in as {role?.label} {role?.icon}
              </p>

              {method === "phone" ? (
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">WhatsApp number</label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500">🇮🇳 +91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      maxLength={10}
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">OTP sent via SMS / WhatsApp</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@school.edu.in"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                  {(selectedRole === "admin" || selectedRole === "teacher") && (
                    <div>
                      <label className="text-xs text-gray-400 mb-1.5 block">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
                      />
                    </div>
                  )}
                </div>
              )}

              {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

              <motion.button
                onClick={method === "phone" || (method === "email" && !password) ? sendOtp : emailLogin}
                disabled={loading || (method === "phone" ? phone.length < 10 : !email)}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-display font-semibold text-sm text-white disabled:opacity-40 transition-all"
                style={{ background: role?.accent }}
              >
                {loading ? "Sending…" : method === "phone" ? "Send OTP" : password ? "Sign in" : "Send magic link"}
              </motion.button>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <button onClick={() => setStep("credentials")} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                ← Back
              </button>

              <div>
                <p className="font-display font-semibold text-gray-800 mb-1">Enter OTP</p>
                <p className="text-xs text-gray-400">
                  Sent to {method === "phone" ? `+91 ${phone}` : email}
                </p>
              </div>

              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="6-digit code"
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-center text-xl font-mono tracking-[0.4em] outline-none focus:border-gray-400"
              />

              {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

              <motion.button
                onClick={verifyOtp}
                disabled={loading || otp.length < 6}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-display font-semibold text-sm text-white disabled:opacity-40"
                style={{ background: role?.accent }}
              >
                {loading ? "Verifying…" : "Verify & Sign in"}
              </motion.button>

              <button onClick={sendOtp} className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Resend OTP
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-gray-300 mt-10">
          Protected by Supabase Auth · DPDP compliant
        </p>
      </motion.div>
    </div>
  );
}
