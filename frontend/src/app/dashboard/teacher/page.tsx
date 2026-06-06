import Link from "next/link";

const students = [
  { name: "Arjun K.", roll: "01", status: "present" },
  { name: "Bhavya R.", roll: "02", status: "absent" },
  { name: "Charan S.", roll: "03", status: "present" },
  { name: "Divya M.", roll: "04", status: "present" },
  { name: "Eswar P.", roll: "05", status: "late" },
  { name: "Fathima B.", roll: "06", status: "present" },
  { name: "Ganesh T.", roll: "07", status: "present" },
  { name: "Harini L.", roll: "08", status: "absent" },
];

const homework = [
  { subject: "Mathematics", title: "Ch 5 — Quadratic Equations", class: "9A", due: "Tomorrow", submissions: "28/38" },
  { subject: "Mathematics", title: "Ch 4 — Arithmetic Progressions", class: "9B", due: "Jun 7", submissions: "35/40" },
  { subject: "Mathematics", title: "Practice Set — Triangles", class: "8A", due: "Jun 10", submissions: "12/42" },
];

const statusColor: Record<string, string> = {
  present: "bg-green-100 text-green-700",
  absent: "bg-red-100 text-red-700",
  late: "bg-yellow-100 text-yellow-700",
};

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">Infizium</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-blue-600 font-medium">Teacher — Ravi</span>
          </div>
          <Link href="/login" className="text-xs text-gray-400 hover:text-gray-700">Sign out</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Classes today", value: "4" },
            { label: "Students absent", value: "3" },
            { label: "Homework pending review", value: "2" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <span>✅</span> Mark Attendance — Grade 9A, Period 1
            </h2>
            <span className="text-xs text-gray-400">Today · 8:00 AM</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {students.map((s) => (
              <div
                key={s.roll}
                className={`rounded-lg border px-3 py-2 text-sm font-medium flex items-center justify-between gap-2 ${statusColor[s.status]} border-transparent`}
              >
                <span>{s.roll}. {s.name.split(" ")[0]}</span>
                <span className="capitalize text-xs">{s.status}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            Save &amp; notify parents of absences
          </button>
          <p className="text-xs text-gray-400 mt-2 text-center">WhatsApp alerts will be sent automatically to parents of absent students.</p>
        </div>

        {/* Homework */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2"><span>📚</span> Homework</h2>
            <button className="text-xs text-blue-600 font-medium hover:underline">+ New assignment</button>
          </div>
          <ul className="space-y-3">
            {homework.map((h, i) => (
              <li key={i} className="flex items-center justify-between text-sm border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="font-medium text-gray-800">{h.title}</p>
                  <p className="text-xs text-gray-400">{h.subject} · {h.class} · Due {h.due}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">{h.submissions}</p>
                  <p className="text-xs text-gray-400">submitted</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><span>⚡</span> Quick actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["Post announcement", "Create form", "Message a parent", "View student progress", "Download attendance", "Schedule PTM"].map((a) => (
              <button key={a} className="border border-gray-200 text-sm text-gray-600 rounded-lg px-3 py-2 hover:bg-gray-50 text-left">
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-600 text-center">
          Demo preview — Teacher dashboard. All data is illustrative.
          <br />
          <Link href="/" className="underline text-indigo-700 mt-1 inline-block">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
