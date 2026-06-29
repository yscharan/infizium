import { NextRequest, NextResponse } from "next/server";
import { Telegraf } from "telegraf";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import { toE164 } from "@/lib/phone";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Resolve Telegram user → Infizium user ────────────────────────
async function resolveUser(telegramId: number) {
  const { data } = await supabase
    .from("users")
    .select("id, school_id, name, role")
    .eq("whatsapp_id", `tg:${telegramId}`)
    .single();
  return data ?? null;
}

// ── AI tools ─────────────────────────────────────────────────────
const TOOLS: Anthropic.Tool[] = [
  {
    name: "get_student_summary",
    description: "Get full profile for a student — attendance stats last 30 days, pending homework.",
    input_schema: { type: "object" as const, properties: { student_id: { type: "string" } }, required: ["student_id"] },
  },
  {
    name: "get_attendance",
    description: "Get attendance for a student on a specific date.",
    input_schema: { type: "object" as const, properties: { student_id: { type: "string" }, date: { type: "string" } }, required: ["student_id", "date"] },
  },
  {
    name: "get_homework",
    description: "Get pending homework for a grade/section.",
    input_schema: { type: "object" as const, properties: { school_id: { type: "string" }, grade: { type: "string" }, section: { type: "string" } }, required: ["school_id", "grade", "section"] },
  },
  {
    name: "get_announcements",
    description: "Get recent school announcements.",
    input_schema: { type: "object" as const, properties: { school_id: { type: "string" }, limit: { type: "number" } }, required: ["school_id"] },
  },
];

async function executeTool(name: string, input: Record<string, unknown>): Promise<string> {
  try {
    if (name === "get_student_summary") {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
      const [profile, attendance, homework] = await Promise.all([
        supabase.from("students").select("*, users!user_id(name)").eq("id", input.student_id).single(),
        supabase.from("attendance").select("date, status").eq("student_id", input.student_id).gte("date", thirtyDaysAgo),
        supabase.from("homework").select("subject, title, due_date").gte("due_date", new Date().toISOString().slice(0, 10)).limit(5),
      ]);
      const att = attendance.data ?? [];
      const present = att.filter((r: { status: string }) => r.status === "present").length;
      return JSON.stringify({ profile: profile.data, attendance_30d: { present, absent: att.length - present, pct: att.length ? Math.round(present / att.length * 100) : 0 }, pending_homework: homework.data });
    }
    if (name === "get_attendance") {
      const { data } = await supabase.from("attendance").select("date, status").eq("student_id", input.student_id).eq("date", input.date).single();
      return JSON.stringify(data ?? { status: "not marked yet", date: input.date });
    }
    if (name === "get_homework") {
      const { data } = await supabase.from("homework").select("subject, title, due_date").eq("school_id", input.school_id).eq("grade", input.grade).eq("section", input.section).gte("due_date", new Date().toISOString().slice(0, 10)).order("due_date").limit(5);
      return JSON.stringify(data ?? []);
    }
    if (name === "get_announcements") {
      const { data } = await supabase.from("announcements").select("title, body, created_at").eq("school_id", input.school_id).order("created_at", { ascending: false }).limit((input.limit as number) ?? 5);
      return JSON.stringify(data ?? []);
    }
    return JSON.stringify({ error: `Unknown tool: ${name}` });
  } catch (err) {
    return JSON.stringify({ error: String(err) });
  }
}

// ── Role-based tool access ────────────────────────────────────────
const ROLE_TOOLS: Record<string, string[]> = {
  admin:    ["get_student_summary", "get_attendance", "get_homework", "get_announcements"],
  parent:   ["get_student_summary", "get_attendance", "get_homework", "get_announcements"],
  teacher:  ["get_attendance", "get_homework", "get_announcements"],
  student:  [],
  guardian: [],
};

const ROLE_SYSTEM: Record<string, (name: string, schoolId: string, studentId: string | null) => string> = {
  admin: (name, schoolId) =>
    `You are Infizium Assistant for school admin ${name}. School ID: ${schoolId}.
You have full access — all students, all classes, all announcements. Answer any school operations question.
Keep replies brief, use *bold* for key data. Never expose raw UUIDs.`,

  parent: (name, _, studentId) =>
    `You are Infizium Assistant for parent ${name}. Student ID: ${studentId ?? "not linked"}.
You can only access data for your linked student. Answer questions about attendance, homework, announcements.
If student ID is unknown, ask them to contact school admin. Keep replies brief and warm.`,

  teacher: (name, schoolId) =>
    `You are Infizium Assistant for teacher ${name}. School ID: ${schoolId}.
You can access class attendance, homework, and school announcements. No financial data is available to you.
Keep replies concise and professional.`,

  student: (name) =>
    `You are Infizium Assistant. ${name} is a student.
Students cannot access school data through this chat. For homework, attendance and progress, please use the Infizium mobile app.
You can answer general questions about school life, study tips, or education — but not pull live school data.`,

  guardian: (name) =>
    `You are Infizium Assistant. ${name} is registered as a guardian.
Guardians can chat here but cannot access student data without explicit parent permission.
If you need student details, please ask the parent to grant you access in the Infizium app.`,
};

async function handleWithAI(
  message: string,
  user: { id: string; name: string; school_id: string; role: string },
  studentId: string | null
): Promise<string> {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const role = user.role in ROLE_SYSTEM ? user.role : "guardian";
  const allowedToolNames = ROLE_TOOLS[role] ?? [];
  const allowedTools = TOOLS.filter(t => allowedToolNames.includes(t.name));
  const systemPrompt = `${ROLE_SYSTEM[role](user.name, user.school_id, studentId)}\nToday is ${today}.`;

  const messages: Anthropic.MessageParam[] = [{ role: "user", content: message }];
  while (true) {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: systemPrompt,
      messages,
      ...(allowedTools.length > 0 ? { tools: allowedTools } : {}),
    }) as Anthropic.Message;
    if (response.stop_reason === "tool_use") {
      const toolUses = response.content.filter((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
      messages.push({ role: "assistant", content: response.content });
      const results: Anthropic.ToolResultBlockParam[] = await Promise.all(toolUses.map(async (tu) => ({ type: "tool_result" as const, tool_use_id: tu.id, content: await executeTool(tu.name, tu.input as Record<string, unknown>) })));
      messages.push({ role: "user", content: results });
      continue;
    }
    const text = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
    return text?.text ?? "Sorry, something went wrong. Please try again.";
  }
}

// ── Bot handlers ──────────────────────────────────────────────────
bot.start(async (ctx) => {
  const user = await resolveUser(ctx.from.id);
  if (user) {
    await ctx.reply(`👋 Welcome back, *${user.name}*!\n\nJust type your question naturally.\n\n_Infizium School OS_`, { parse_mode: "Markdown" });
  } else {
    await ctx.reply(`👋 Hi! I'm the *Infizium* school assistant.\n\nUse /register <phone> to link your account.\n\nExample: /register 9985401894`, { parse_mode: "Markdown" });
  }
});

bot.command("register", async (ctx) => {
  const phone = ctx.message.text.split(" ")[1];
  if (!phone) { await ctx.reply("Usage: /register <phone>\nExample: /register 9985401894"); return; }
  const normalised = toE164(phone);
  if (!normalised) { await ctx.reply("That doesn't look like a valid number. Include your country code, e.g. /register +18329417456"); return; }
  const { data: user } = await supabase.from("users").select("id, name, role").eq("phone", normalised).single();
  if (!user) { await ctx.reply(`No user found with phone ${phone}. Ask your admin to add you first.`); return; }
  await supabase.from("users").update({ whatsapp_id: `tg:${ctx.from.id}` }).eq("id", user.id);
  await ctx.reply(`✅ Linked! You're now *${user.name}* (${user.role}).\n\nJust type any question to get started.`, { parse_mode: "Markdown" });
});

bot.command("whoami", async (ctx) => {
  const user = await resolveUser(ctx.from.id);
  await ctx.reply(user ? `You're linked as *${user.name}* — ${user.role}` : "Not registered. Use /register <phone>", { parse_mode: "Markdown" });
});

bot.on("text", async (ctx) => {
  const message = ctx.message.text;
  if (message.startsWith("/")) return;
  const user = await resolveUser(ctx.from.id);
  if (!user) { await ctx.reply("You're not registered yet. Use /register <phone> to link your account."); return; }
  await ctx.sendChatAction("typing");
  const { data: student } = await supabase.from("students").select("id").eq("parent_user_id", user.id).single();
  try {
    const reply = await handleWithAI(message, user, student?.id ?? null);
    await ctx.reply(reply, { parse_mode: "Markdown" });

    const BOT_ID = "00000000-0000-0000-0000-000000000001";
    const [userA, userB] = [user.id, BOT_ID].sort();
    const now = new Date().toISOString();

    await Promise.all([
      supabase.from("whatsapp_messages").insert({
        school_id: user.school_id,
        from_user_id: user.id,
        wa_message_id: `tg_in_${Date.now()}`,
        direction: "inbound",
        body: message,
      }),
      supabase.from("whatsapp_messages").insert({
        school_id: user.school_id,
        to_user_id: user.id,
        wa_message_id: `tg_out_${Date.now()}`,
        direction: "outbound",
        body: reply,
      }),
      supabase.from("conversations").upsert({
        school_id: user.school_id,
        user_a_id: userA,
        user_b_id: userB,
        last_message: reply.slice(0, 200),
        last_message_at: now,
        updated_at: now,
      }, { onConflict: "user_a_id,user_b_id" }),
    ]);
  } catch {
    await ctx.reply("Something went wrong. Please try again.");
  }
});

// ── Next.js route handler ─────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Verify request is from Telegram via secret token
  const secret = req.headers.get("x-telegram-bot-api-secret-token");
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Infizium Telegram webhook active" });
}
