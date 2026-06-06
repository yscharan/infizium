"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const roles = [
  { id: "parent", label: "Parent", icon: "👩", desc: "Track your child's attendance and homework", color: "border-orange-300 bg-orange-50", selected: "border-orange-500 bg-orange-100 ring-2 ring-orange-400" },
  { id: "teacher", label: "Teacher", icon: "👨‍🏫", desc: "Mark attendance and assign homework", color: "border-blue-300 bg-blue-50", selected: "border-blue-500 bg-blue-100 ring-2 ring-blue-400" },
  { id: "student", label: "Student", icon: "🧑‍🎓", desc: "View homework and announcements", color: "border-green-300 bg-green-50", selected: "border-green-500 bg-green-100 ring-2 ring-green-400" },
  { id: "admin", label: "School Admin", icon: "🏫", desc: "Manage the school and send announcements", color: "border-purple-300 bg-purple-50", selected: "border-purple-500 bg-purple-100 ring-2 ring-purple-400" },
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-gray-900">Infizium</Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">← Back to home</Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in to Infizium</h1>
            <p className="text-sm text-gray-500">Choose your role to continue</p>
          </div>

          <form onSubmit={handleEnter} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a…</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`border rounded-xl p-4 text-left transition-all cursor-pointer ${
                      selectedRole === r.id ? r.selected : r.color + " hover:shadow-sm"
                    }`}
                  >
                    <div className="text-2xl mb-1">{r.icon}</div>
                    <div className="font-semibold text-gray-800 text-sm">{r.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedRole}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Enter dashboard →
            </button>

            <p className="text-center text-xs text-gray-400">
              This is a demo. No OTP or real authentication in this preview.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
