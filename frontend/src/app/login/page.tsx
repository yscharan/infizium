"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const roles = [
  {
    id: "parent",
    label: "Parent",
    icon: "👩",
    desc: "Track attendance and homework",
    color: "border-orange-200 bg-orange-50/60",
    selected: "border-orange-400 bg-orange-50 ring-2 ring-orange-300/60 shadow-orange-100",
    accent: "text-orange-600",
  },
  {
    id: "teacher",
    label: "Teacher",
    icon: "👨‍🏫",
    desc: "Mark attendance, assign homework",
    color: "border-blue-200 bg-blue-50/60",
    selected: "border-blue-400 bg-blue-50 ring-2 ring-blue-300/60 shadow-blue-100",
    accent: "text-blue-600",
  },
  {
    id: "student",
    label: "Student",
    icon: "🧑‍🎓",
    desc: "View homework and announcements",
    color: "border-emerald-200 bg-emerald-50/60",
    selected: "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-300/60 shadow-emerald-100",
    accent: "text-emerald-600",
  },
  {
    id: "admin",
    label: "School Admin",
    icon: "🏫",
    desc: "Manage school, send announcements",
    color: "border-purple-200 bg-purple-50/60",
    selected: "border-purple-400 bg-purple-50 ring-2 ring-purple-300/60 shadow-purple-100",
    accent: "text-purple-600",
  },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  function handleEnter(e: React.FormEvent) {
    e.preventDefault();
    if (selectedRole) router.push(`/dashboard/${selectedRole}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 flex flex-col">
      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb-2 absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[100px]" />
        <div className="orb-3 absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-100/20 rounded-full blur-[80px]" />
      </div>

      <nav className="relative z-10 border-b border-gray-100/60 glass">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-[17px] tracking-tight text-gray-900">Infizium</Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1">
            <span>←</span> Back
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-2xl font-bold text-gray-900 mb-1 tracking-tight"
            >
              Sign in to Infizium
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gray-400"
            >
              Choose your role to continue
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            onSubmit={handleEnter}
            className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-xl shadow-gray-900/5 p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a…</label>
              <div className="grid grid-cols-2 gap-2.5">
                {roles.map((r, i) => (
                  <motion.button
                    key={r.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    onClick={() => setSelectedRole(r.id)}
                    className={`border rounded-xl p-3.5 text-left transition-all duration-200 cursor-pointer hover:shadow-md ${
                      selectedRole === r.id ? r.selected + " shadow-md" : r.color + " hover:border-gray-300"
                    }`}
                  >
                    <div className="text-xl mb-1">{r.icon}</div>
                    <div className={`font-semibold text-sm ${selectedRole === r.id ? r.accent : "text-gray-800"}`}>{r.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5 leading-tight">{r.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-300 bg-gray-50/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">WhatsApp number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-300 bg-gray-50/50 transition-all"
                />
              </div>
            </div>

            <AnimatePresence>
              {selectedRole && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/10 hover:scale-[1.01]"
                >
                  Enter dashboard →
                </motion.button>
              )}
            </AnimatePresence>

            {!selectedRole && (
              <div className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-medium text-center text-sm">
                Select a role to continue
              </div>
            )}

            <p className="text-center text-xs text-gray-400">
              Demo preview — no real authentication.
            </p>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
