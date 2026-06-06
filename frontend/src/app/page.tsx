import Link from "next/link";

const personas = [
  {
    role: "Parent",
    name: "Lakshmi",
    icon: "👩",
    color: "bg-orange-50 border-orange-200",
    accent: "text-orange-600",
    badge: "bg-orange-100 text-orange-700",
    description:
      "Receives attendance alerts on WhatsApp within minutes. Approves field trips with a single reply. No app download needed.",
    needs: ["Know child is safe", "Approve forms on WhatsApp", "See homework due dates"],
    href: "/dashboard/parent",
  },
  {
    role: "Teacher",
    name: "Ravi",
    icon: "👨‍🏫",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    description:
      "Marks attendance for 40 students in under 2 minutes. Assigns homework. Parents are notified automatically.",
    needs: ["Mark attendance fast", "Assign homework", "Message parents via platform"],
    href: "/dashboard/teacher",
  },
  {
    role: "Student",
    name: "Arjun",
    icon: "🧑‍🎓",
    color: "bg-green-50 border-green-200",
    accent: "text-green-600",
    badge: "bg-green-100 text-green-700",
    description:
      "Sees all pending homework in one feed. Never misses an announcement. AI tutor coming in Phase 3.",
    needs: ["Check homework due dates", "See school announcements", "Track progress"],
    href: "/dashboard/student",
  },
  {
    role: "Admin",
    name: "Priya",
    icon: "🏫",
    color: "bg-purple-50 border-purple-200",
    accent: "text-purple-600",
    badge: "bg-purple-100 text-purple-700",
    description:
      "Views school-wide attendance in real time. Broadcasts circulars with delivery tracking. Collects parent consent digitally.",
    needs: ["Real-time attendance view", "Broadcast announcements", "Track form approvals"],
    href: "/dashboard/admin",
  },
];

const modules = [
  { icon: "✅", title: "Attendance", desc: "Teachers mark on mobile. Parents get WhatsApp alerts in under 10 minutes." },
  { icon: "📚", title: "Homework", desc: "Assign with a due date. Parents notified automatically. Students see a clean feed." },
  { icon: "📢", title: "Announcements", desc: "Broadcast to the whole school, a class, or a section. Replaces noisy WhatsApp groups." },
  { icon: "📋", title: "Forms & Approvals", desc: "Parents approve trips and consents on WhatsApp. No printing. Full audit trail." },
  { icon: "💬", title: "WhatsApp-First", desc: "Every parent notification goes through WhatsApp. No new app to install." },
  { icon: "🔐", title: "Parent Permissions", desc: "Parents control what is shared and what features are active for their child." },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Nav */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight text-gray-900">Infizium</span>
          <div className="flex items-center gap-4">
            <Link href="#personas" className="text-sm text-gray-600 hover:text-gray-900">
              Who it&apos;s for
            </Link>
            <Link href="#modules" className="text-sm text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link
              href="/login"
              className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-4">
            Telangana&apos;s School Operating System
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Prepare students for life,<br />not just exams.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Infizium connects parents, teachers, students, and school admins through
            a single platform — with WhatsApp as the primary channel for parent communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Explore the platform
            </Link>
            <a
              href="#personas"
              className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              See who it&apos;s for
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp callout */}
      <section className="bg-green-600 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="text-5xl">📱</div>
          <div>
            <h2 className="text-xl font-bold mb-1">No app download required for parents</h2>
            <p className="text-green-100 text-sm">
              Over 90% of parents in Telangana are on WhatsApp. Attendance alerts,
              homework reminders, and approval requests arrive as WhatsApp messages.
              Parents reply right there — no account, no install.
            </p>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section id="personas" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Built for everyone in the school</h2>
            <p className="text-gray-500">Click a card to preview that role&apos;s experience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personas.map((p) => (
              <Link
                key={p.role}
                href={p.href}
                className={`border rounded-xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow ${p.color}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{p.icon}</span>
                  <div>
                    <span className={`text-xs font-semibold uppercase tracking-wide ${p.accent}`}>{p.role}</span>
                    <p className="font-semibold text-gray-800">{p.name}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
                <ul className="mt-auto space-y-1">
                  {p.needs.map((n) => (
                    <li key={n} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="mt-0.5">→</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
                <span className={`self-start text-xs font-medium px-2 py-1 rounded-full mt-2 ${p.badge}`}>
                  Preview →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything the school needs, nothing it doesn&apos;t</h2>
            <p className="text-gray-500">MVP modules — lean, low cost, immediately useful.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m) => (
              <div key={m.title} className="bg-white rounded-xl border border-gray-100 p-6 flex gap-4">
                <span className="text-2xl mt-0.5">{m.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{m.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get your school on Infizium</h2>
          <p className="text-gray-500 mb-8">
            We&apos;re onboarding pilot schools in Telangana. Setup takes under 2 hours.
          </p>
          <Link
            href="/login"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Start with a demo →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span className="font-semibold text-gray-700">Infizium</span>
          <span>Telangana&apos;s school operating system</span>
          <span>infizium.com</span>
        </div>
      </footer>
    </div>
  );
}
