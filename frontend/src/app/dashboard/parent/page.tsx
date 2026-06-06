import Link from "next/link";

const alerts = [
  { time: "8:14 AM", type: "absent", text: "Arjun was marked absent for Period 1 — Maths.", action: "Reply sent: Sick today" },
  { time: "Yesterday", type: "present", text: "Arjun attended all 6 periods.", action: "" },
  { time: "Mon", type: "absent", text: "Arjun was marked absent for Period 3 — Science.", action: "Reply sent: Doctor visit" },
];

const homework = [
  { subject: "Mathematics", title: "Ch 5 — Quadratic Equations", due: "Tomorrow", done: false },
  { subject: "English", title: "Essay: My Favourite Festival", due: "Jun 7", done: false },
  { subject: "Science", title: "Lab diagram — Plant Cell", due: "Jun 10", done: true },
];

const announcements = [
  { from: "Principal Priya", time: "Today 9:00 AM", text: "School will remain closed on June 9 for the state board inspection. Regular classes resume June 10." },
  { from: "Class Teacher Ravi", time: "Yesterday", text: "PTM scheduled for June 15, 10 AM – 1 PM. Please confirm attendance via the approval form." },
];

const forms = [
  { title: "Science Field Trip — Nehru Zoological Park", due: "Jun 8", status: "pending" },
  { title: "Parent-Teacher Meeting — June 15", due: "Jun 12", status: "approved" },
];

export default function ParentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">Infizium</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-orange-600 font-medium">Parent — Lakshmi</span>
          </div>
          <Link href="/login" className="text-xs text-gray-400 hover:text-gray-700">Sign out</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Child summary */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center text-2xl">🧑‍🎓</div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Arjun — Grade 9, Section A</p>
            <p className="text-sm text-gray-500">St. Joseph's High School, Hyderabad</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">87%</p>
            <p className="text-xs text-gray-500">Attendance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Attendance alerts */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>✅</span> Attendance
            </h2>
            <ul className="space-y-3">
              {alerts.map((a, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${a.type === "absent" ? "bg-red-400" : "bg-green-400"} mt-1.5`} />
                  <div>
                    <p className="text-gray-700">{a.text}</p>
                    {a.action && <p className="text-xs text-green-600 mt-0.5">{a.action}</p>}
                    <p className="text-xs text-gray-400">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Homework */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>📚</span> Homework
            </h2>
            <ul className="space-y-3">
              {homework.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className={`mt-1 text-base ${h.done ? "opacity-30" : ""}`}>📖</span>
                  <div className={h.done ? "opacity-40 line-through" : ""}>
                    <p className="text-gray-700 font-medium">{h.title}</p>
                    <p className="text-xs text-gray-400">{h.subject} · Due {h.due}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>📢</span> Announcements
          </h2>
          <ul className="space-y-4">
            {announcements.map((a, i) => (
              <li key={i} className="text-sm border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">{a.from}</span>
                  <span className="text-xs text-gray-400">{a.time}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Forms */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>📋</span> Forms &amp; Approvals
          </h2>
          <ul className="space-y-3">
            {forms.map((f, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-gray-700 font-medium">{f.title}</p>
                  <p className="text-xs text-gray-400">Respond by {f.due}</p>
                </div>
                {f.status === "pending" ? (
                  <div className="flex gap-2">
                    <button className="bg-green-600 text-white text-xs px-3 py-1 rounded-full hover:bg-green-700">Approve</button>
                    <button className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full hover:bg-gray-200">Decline</button>
                  </div>
                ) : (
                  <span className="text-xs text-green-600 font-medium">✓ Approved</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Demo note */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-600 text-center">
          This is a demo preview of the Parent dashboard. All data is illustrative.
          <br />
          <Link href="/" className="underline text-indigo-700 mt-1 inline-block">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
