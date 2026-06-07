import Anthropic from "@anthropic-ai/sdk";
import { supabase } from "../db/supabase";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Tool definitions (mirrors MCP tools, in Anthropic format) ──
const TOOLS: Anthropic.Tool[] = [
  {
    name: "get_student_summary",
    description: "Get full profile for a student — attendance stats last 30 days, pending homework, grade and section.",
    input_schema: {
      type: "object" as const,
      properties: {
        student_id: { type: "string", description: "Student UUID" },
      },
      required: ["student_id"],
    },
  },
  {
    name: "get_attendance",
    description: "Get attendance records for a student on a specific date or date range.",
    input_schema: {
      type: "object" as const,
      properties: {
        student_id: { type: "string" },
        date: { type: "string", description: "ISO date e.g. 2026-06-07. Use today's date if not specified." },
      },
      required: ["student_id", "date"],
    },
  },
  {
    name: "get_homework",
    description: "Get pending homework for the student's grade and section.",
    input_schema: {
      type: "object" as const,
      properties: {
        school_id: { type: "string" },
        grade: { type: "string" },
        section: { type: "string" },
      },
      required: ["school_id", "grade", "section"],
    },
  },
  {
    name: "get_announcements",
    description: "Get recent school announcements.",
    input_schema: {
      type: "object" as const,
      properties: {
        school_id: { type: "string" },
        limit: { type: "number", description: "How many announcements to return (default 5)" },
      },
      required: ["school_id"],
    },
  },
];

// ── Execute a tool call made by Claude ─────────────────────────
async function executeTool(name: string, input: Record<string, unknown>): Promise<string> {
  try {
    if (name === "get_student_summary") {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
      const [profile, attendance, homework] = await Promise.all([
        supabase.from("students").select("*, users!user_id(name, phone)").eq("id", input.student_id).single(),
        supabase.from("attendance").select("date, status").eq("student_id", input.student_id).gte("date", thirtyDaysAgo),
        supabase.from("homework").select("subject, title, due_date").gte("due_date", new Date().toISOString().slice(0, 10)).limit(5),
      ]);
      const att = attendance.data ?? [];
      const present = att.filter((r: { status: string }) => r.status === "present").length;
      return JSON.stringify({
        profile: profile.data,
        attendance_30d: { present, absent: att.length - present, pct: att.length ? Math.round(present / att.length * 100) : 0 },
        pending_homework: homework.data,
      });
    }

    if (name === "get_attendance") {
      const { data } = await supabase
        .from("attendance")
        .select("date, status")
        .eq("student_id", input.student_id)
        .eq("date", input.date)
        .single();
      return JSON.stringify(data ?? { status: "not marked yet", date: input.date });
    }

    if (name === "get_homework") {
      const today = new Date().toISOString().slice(0, 10);
      const { data } = await supabase
        .from("homework")
        .select("subject, title, due_date")
        .eq("school_id", input.school_id)
        .eq("grade", input.grade)
        .eq("section", input.section)
        .gte("due_date", today)
        .order("due_date")
        .limit(5);
      return JSON.stringify(data ?? []);
    }

    if (name === "get_announcements") {
      const { data } = await supabase
        .from("announcements")
        .select("title, body, created_at")
        .eq("school_id", input.school_id)
        .order("created_at", { ascending: false })
        .limit((input.limit as number) ?? 5);
      return JSON.stringify(data ?? []);
    }

    return JSON.stringify({ error: `Unknown tool: ${name}` });
  } catch (err) {
    return JSON.stringify({ error: String(err) });
  }
}

// ── Main: handle inbound WhatsApp message with AI ──────────────
export async function handleWithAI(params: {
  message: string;
  parentUser: { id: string; name: string; school_id: string };
  studentId: string | null;
}): Promise<string> {
  const { message, parentUser, studentId } = params;
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const systemPrompt = `You are Infizium Assistant — a helpful school communication bot for ${parentUser.name}'s child's school.
Today is ${today}.

Key facts you always know:
- Parent name: ${parentUser.name}
- School ID: ${parentUser.school_id}
- Student ID: ${studentId ?? "unknown — tell parent to contact school admin to link their account"}

Rules:
- Be warm, brief, and clear. Use simple English or mirror the parent's language.
- If the parent writes in Telugu, reply in Telugu (use English script, not Unicode Telugu).
- Always be helpful — never say "I don't know" without first trying a tool call.
- Format replies for WhatsApp: use *bold* for important info, keep it under 5 lines.
- If student ID is unknown, ask them to contact school admin with their child's roll number.
- Never expose internal IDs or raw JSON to the parent.`;

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: message },
  ];

  // Agentic loop — Claude calls tools until it has enough to answer
  while (true) {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: systemPrompt,
      tools: TOOLS,
      messages,
    });

    // If Claude wants to call tools — execute them and feed results back
    if (response.stop_reason === "tool_use") {
      const toolUses = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
      );

      messages.push({ role: "assistant", content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = await Promise.all(
        toolUses.map(async (tu) => ({
          type: "tool_result" as const,
          tool_use_id: tu.id,
          content: await executeTool(tu.name, tu.input as Record<string, unknown>),
        }))
      );

      messages.push({ role: "user", content: toolResults });
      continue;
    }

    // Final text response
    const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
    return textBlock?.text ?? "Sorry, something went wrong. Please try again.";
  }
}
