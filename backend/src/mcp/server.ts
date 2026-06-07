import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { supabase } from "../db/supabase";

const server = new McpServer({
  name: "infizium",
  version: "0.1.0",
});

// ── List schools ──────────────────────────────────────────────
server.tool("list_schools", "List all registered schools", {}, async () => {
  const { data, error } = await supabase.from("schools").select("*").order("name");
  if (error) return { content: [{ type: "text", text: `Error: ${error.message}` }] };
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});

// ── Get students ───────────────────────────────────────────────
server.tool(
  "get_students",
  "List students for a school, optionally filtered by grade and section",
  {
    school_id: z.string().uuid().describe("School UUID"),
    grade: z.string().optional().describe("e.g. '10'"),
    section: z.string().optional().describe("e.g. 'A'"),
  },
  async ({ school_id, grade, section }) => {
    let q = supabase
      .from("students")
      .select("id, grade, section, roll_number, users!user_id(name, phone)")
      .eq("school_id", school_id);
    if (grade) q = q.eq("grade", grade);
    if (section) q = q.eq("section", section);
    const { data, error } = await q.order("roll_number");
    if (error) return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// ── Get attendance ─────────────────────────────────────────────
server.tool(
  "get_attendance",
  "Get attendance for a school on a given date. Returns per-student status.",
  {
    school_id: z.string().uuid(),
    date: z.string().describe("ISO date e.g. 2026-06-07"),
    grade: z.string().optional(),
  },
  async ({ school_id, date, grade }) => {
    let q = supabase
      .from("attendance")
      .select("status, date, students(grade, section, roll_number, users!user_id(name))")
      .eq("school_id", school_id)
      .eq("date", date);
    if (grade) q = q.eq("students.grade", grade);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: `Error: ${error.message}` }] };

    const present = data?.filter((r: { status: string }) => r.status === "present").length ?? 0;
    const absent = data?.filter((r: { status: string }) => r.status === "absent").length ?? 0;
    const summary = `Date: ${date} | Present: ${present} | Absent: ${absent} | Total: ${data?.length ?? 0}`;
    return {
      content: [
        { type: "text", text: summary },
        { type: "text", text: JSON.stringify(data, null, 2) },
      ],
    };
  }
);

// ── Get student summary ────────────────────────────────────────
server.tool(
  "get_student_summary",
  "Full profile for a student — details, attendance stats last 30 days, pending homework",
  {
    student_id: z.string().uuid(),
  },
  async ({ student_id }) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);

    const [profileRes, attendanceRes, homeworkRes] = await Promise.all([
      supabase
        .from("students")
        .select("*, users!user_id(name, phone, email)")
        .eq("id", student_id)
        .single(),
      supabase
        .from("attendance")
        .select("date, status")
        .eq("student_id", student_id)
        .gte("date", thirtyDaysAgo)
        .order("date"),
      supabase
        .from("homework")
        .select("subject, title, due_date")
        .gte("due_date", new Date().toISOString().slice(0, 10))
        .order("due_date")
        .limit(5),
    ]);

    const attendance = attendanceRes.data ?? [];
    const present = attendance.filter((r: { status: string }) => r.status === "present").length;
    const pct = attendance.length ? Math.round((present / attendance.length) * 100) : 0;

    const summary = {
      profile: profileRes.data,
      attendance_last_30d: { present, absent: attendance.length - present, pct, records: attendance },
      pending_homework: homeworkRes.data,
    };
    return { content: [{ type: "text", text: JSON.stringify(summary, null, 2) }] };
  }
);

// ── Get homework ───────────────────────────────────────────────
server.tool(
  "get_homework",
  "Get pending homework for a grade and section",
  {
    school_id: z.string().uuid(),
    grade: z.string(),
    section: z.string(),
  },
  async ({ school_id, grade, section }) => {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from("homework")
      .select("subject, title, description, due_date, users!teacher_id(name)")
      .eq("school_id", school_id)
      .eq("grade", grade)
      .eq("section", section)
      .gte("due_date", today)
      .order("due_date");
    if (error) return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// ── Get announcements ──────────────────────────────────────────
server.tool(
  "get_announcements",
  "Recent announcements for a school",
  {
    school_id: z.string().uuid(),
    limit: z.number().int().min(1).max(20).default(10),
  },
  async ({ school_id, limit }) => {
    const { data, error } = await supabase
      .from("announcements")
      .select("title, body, created_at, whatsapp_sent, read_count, users!author_id(name)")
      .eq("school_id", school_id)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) return { content: [{ type: "text", text: `Error: ${error.message}` }] };
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// ── Send WhatsApp message ──────────────────────────────────────
server.tool(
  "send_whatsapp",
  "Send a WhatsApp message to a user by their phone number",
  {
    phone: z.string().describe("Indian phone e.g. 9876543210"),
    message: z.string().max(1000),
  },
  async ({ phone, message }) => {
    try {
      const { waClient } = await import("../whatsapp/client");
      if (!waClient.isReady()) {
        return { content: [{ type: "text", text: "WhatsApp not connected. Run `npm run whatsapp` first." }] };
      }
      const waId = phone.replace(/\D/g, "").replace(/^0/, "91") + "@c.us";
      await waClient.sendMessage(waId, message);
      return { content: [{ type: "text", text: `✅ Sent to ${waId}` }] };
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${String(err)}` }] };
    }
  }
);

// ── Start ──────────────────────────────────────────────────────
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🤖 Infizium MCP server running (stdio)");
}

main().catch(console.error);
