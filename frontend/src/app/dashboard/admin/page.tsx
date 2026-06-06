import Link from "next/link";

const classAttendance = [
  { class: "Grade 6A", present: 38, total: 42, pct: 90 },
  { class: "Grade 7B", present: 35, total: 40, pct: 88 },
  { class: "Grade 8A", present: 40, total: 45, pct: 89 },
  { class: "Grade 9A", present: 34, total: 38, pct: 89 },
  { class: "Grade 9B", present: 29, total: 40, pct: 73 },
  { class: "Grade 10A", present: 44, total: 45, pct: 98 },
];

const announcements = [
  { title: "School closed June 9 — State board inspection", sent: "Today 9:00 AM", reach: "780 parents", read: "612" },
  { title: "PTM scheduled June 15, 10 AM – 1 PM", sent: "Yesterday", reach: "780 parents", read: "541" },
  { title: "Annual Day rehearsal — June 12, all students", sent: "Jun 2", reach: "780 parents", read: "708" },
];

const forms = [
  { title: "Science Field Trip — Nehru Zoological Park", sent: "Jun 1", responses: "312 / 780", pending: 468 },
  { title: "Parent-Teacher Meeting — June 15", sent: "Jun 3", responses: "601 / 780", pending: 179 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">Infizium</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-purple-600 font-medium">Admin — Priya (Vice Principal)</span>
          </div>
          <Link href="/login" className="text-xs text-gray-400 hover:text-gray-700">Sign out</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* School header */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-2xl">🏫</div>
          <div>
            <p className="font-semibold text-gray-800">St. Joseph&apos;s High School, Hyderabad</p>
            <p className="text-sm text-gray-500">800 students · 32 teachers · 18 classes</p>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "School attendance today", value: "88%", color: "text-green-600" },
            { label: "Students absent", value: "94", color: "text-red-500" },
            { label: "Announcements sent", value: "3", color: "text-blue-600" },
            { label: "Forms awaiting response", value: "647", color: "text-orange-500" },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-gray-500 mt-1">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Attendance by class */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><span>✅</span> Attendance by class — today</h2>
          <div className="space-y-2">
            {classAttendance.map((c) => (
              <div key={c.class} className="flex items-center gap-3 text-sm">
                <span className="w-20 text-gray-600 font-medium">{c.class}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${c.pct >= 90 ? "bg-green-500" : c.pct >= 80 ? "bg-yellow-400" : "bg-red-400"}`}
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
                <span className={`w-20 text-right font-semibold ${c.pct >= 90 ? "text-green-600" : c.pct >= 80 ? "text-yellow-600" : "text-red-500"}`}>
                  {c.present}/{c.total} ({c.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Announcements */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2"><span>📢</span> Announcements</h2>
              <button className="text-xs text-purple-600 font-medium hover:underline">+ New</button>
            </div>
            <ul className="space-y-4">
              {announcements.map((a, i) => (
                <li key={i} className="text-sm border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-gray-800">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Sent {a.sent} · {a.reach}</p>
                  <p className="text-xs text-green-600 mt-0.5">✓ Read by {a.read} parents</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Forms */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2"><span>📋</span> Forms &amp; Approvals</h2>
              <button className="text-xs text-purple-600 font-medium hover:underline">+ New form</button>
            </div>
            <ul className="space-y-4">
              {forms.map((f, i) => (
                <li key={i} className="text-sm border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-gray-800">{f.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Sent {f.sent}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div className="h-1.5 bg-green-500 rounded-full" style={{ width: `${(parseInt(f.responses) / 780) * 100}%` }} />
                    </div>
                    <span className="text-xs text-gray-500">{f.responses} responded</span>
                  </div>
                  <p className="text-xs text-orange-500 mt-0.5">{f.pending} parents pending</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><span>⚡</span> Quick actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Broadcast announcement", "Create consent form", "Export attendance report", "Add new student", "Invite teacher", "View all parents", "School settings", "Download board report"].map((a) => (
              <button key={a} className="border border-gray-200 text-sm text-gray-600 rounded-lg px-3 py-2.5 hover:bg-gray-50 text-left">
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-600 text-center">
          Demo preview — Admin dashboard. All data is illustrative.
          <br />
          <Link href="/" className="underline text-indigo-700 mt-1 inline-block">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
