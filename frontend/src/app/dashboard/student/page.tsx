import Link from "next/link";

const homework = [
  { subject: "Mathematics", title: "Ch 5 — Quadratic Equations", teacher: "Ravi Sir", due: "Tomorrow", urgent: true },
  { subject: "English", title: "Essay: My Favourite Festival", teacher: "Meena Ma'am", due: "Jun 7", urgent: false },
  { subject: "Science", title: "Lab diagram — Plant Cell", teacher: "Suresh Sir", due: "Jun 10", urgent: false },
  { subject: "Social Studies", title: "Map work — Rivers of India", teacher: "Anitha Ma'am", due: "Jun 12", urgent: false },
];

const announcements = [
  { from: "Principal Priya", time: "Today 9:00 AM", text: "School will remain closed on June 9 for the state board inspection. Regular classes resume June 10.", tag: "Holiday" },
  { from: "Class Teacher Ravi", time: "Yesterday", text: "PTM scheduled for June 15, 10 AM – 1 PM. Your parents have been notified.", tag: "Notice" },
  { from: "Sports Dept.", time: "Mon", text: "Selections for the district-level football team will be held on June 8 at 4 PM on the ground.", tag: "Sports" },
];

const tagColor: Record<string, string> = {
  Holiday: "bg-red-100 text-red-600",
  Notice: "bg-blue-100 text-blue-600",
  Sports: "bg-green-100 text-green-600",
};

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">Infizium</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-green-600 font-medium">Student — Arjun</span>
          </div>
          <Link href="/login" className="text-xs text-gray-400 hover:text-gray-700">Sign out</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile bar */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-2xl">🧑‍🎓</div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Arjun — Grade 9, Section A</p>
            <p className="text-sm text-gray-500">St. Joseph&apos;s High School · Roll No. 01</p>
          </div>
          <div className="flex gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-green-600">87%</p>
              <p className="text-xs text-gray-400">Attendance</p>
            </div>
            <div>
              <p className="text-xl font-bold text-orange-500">3</p>
              <p className="text-xs text-gray-400">Due soon</p>
            </div>
          </div>
        </div>

        {/* Homework */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><span>📚</span> Homework</h2>
          <ul className="space-y-3">
            {homework.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-sm border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                <span className="mt-0.5 text-lg">📖</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800">{h.title}</p>
                    {h.urgent && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Due tomorrow</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{h.subject} · {h.teacher}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{h.due}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><span>📢</span> Announcements</h2>
          <ul className="space-y-4">
            {announcements.map((a, i) => (
              <li key={i} className="text-sm border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">{a.from}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColor[a.tag]}`}>{a.tag}</span>
                  </div>
                  <span className="text-xs text-gray-400">{a.time}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* AI tutor coming soon */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🤖</span>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">AI Tutor — Coming in Phase 3</h3>
              <p className="text-sm text-gray-500">
                Ask questions, get essay feedback, and practice problems — powered by Amazon Bedrock.
                Your parent can enable or disable it at any time.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-600 text-center">
          Demo preview — Student dashboard. All data is illustrative.
          <br />
          <Link href="/" className="underline text-indigo-700 mt-1 inline-block">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
