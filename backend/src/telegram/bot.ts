import "dotenv/config";
import { Telegraf, Context } from "telegraf";
import { supabase } from "../db/supabase";
import { handleWithAI } from "../whatsapp/ai-handler";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!BOT_TOKEN) throw new Error("Missing TELEGRAM_BOT_TOKEN in .env");

const bot = new Telegraf(BOT_TOKEN);

// ── Map Telegram user_id → Infizium user ───────────────────────
async function resolveUser(telegramId: number, firstName: string) {
  // Look up by telegram_id stored in whatsapp_id field (reused for testing)
  const tgKey = `tg:${telegramId}`;
  const { data: user } = await supabase
    .from("users")
    .select("id, school_id, name, role")
    .eq("whatsapp_id", tgKey)
    .single();
  return user ?? null;
}

// ── /start ─────────────────────────────────────────────────────
bot.start(async (ctx: Context) => {
  const user = await resolveUser(ctx.from!.id, ctx.from!.first_name);
  if (user) {
    await ctx.reply(
      `👋 Welcome back, *${user.name}*!\n\nJust type your question naturally:\n\n` +
      `• "What's Arjun's attendance today?"\n` +
      `• "Any homework due this week?"\n` +
      `• "Show me recent announcements"\n\n` +
      `_Infizium School OS — powered by AI_`,
      { parse_mode: "Markdown" }
    );
  } else {
    await ctx.reply(
      `👋 Hi! I'm the *Infizium* school assistant.\n\n` +
      `You're not registered yet. Ask your school admin to link your phone number.\n\n` +
      `For testing, use /register to link a demo account.`,
      { parse_mode: "Markdown" }
    );
  }
});

// ── /register — for testing: link Telegram ID to a user ────────
bot.command("register", async (ctx: Context) => {
  const args = ctx.message && "text" in ctx.message
    ? ctx.message.text.split(" ").slice(1)
    : [];
  const phone = args[0];

  if (!phone) {
    await ctx.reply("Usage: /register <phone>\nExample: /register 9876543210");
    return;
  }

  const { data: user } = await supabase
    .from("users")
    .select("id, name, role")
    .eq("phone", phone)
    .single();

  if (!user) {
    await ctx.reply(`No user found with phone ${phone}. Ask your admin to add you first.`);
    return;
  }

  const tgKey = `tg:${ctx.from!.id}`;
  await supabase.from("users").update({ whatsapp_id: tgKey }).eq("id", user.id);
  await ctx.reply(`✅ Linked! You're now connected as *${user.name}* (${user.role}).\n\nJust type any question to get started.`, { parse_mode: "Markdown" });
});

// ── /whoami ────────────────────────────────────────────────────
bot.command("whoami", async (ctx: Context) => {
  const user = await resolveUser(ctx.from!.id, ctx.from!.first_name);
  if (user) {
    await ctx.reply(`You're linked as *${user.name}* — ${user.role}`, { parse_mode: "Markdown" });
  } else {
    await ctx.reply("Not registered. Use /register <phone>");
  }
});

// ── All other messages → AI handler ───────────────────────────
bot.on("text", async (ctx: Context) => {
  const message = ctx.message && "text" in ctx.message ? ctx.message.text : "";
  if (!message || message.startsWith("/")) return;

  const user = await resolveUser(ctx.from!.id, ctx.from!.first_name);

  if (!user) {
    await ctx.reply("You're not registered yet. Use /register <phone> to link your account.");
    return;
  }

  // Show typing indicator
  await ctx.sendChatAction("typing");

  // Look up student linked to this user
  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("parent_user_id", user.id)
    .single();

  try {
    const reply = await handleWithAI({
      message,
      parentUser: { id: user.id, name: user.name, school_id: user.school_id },
      studentId: student?.id ?? null,
    });

    // Convert WhatsApp *bold* to Telegram *bold* (compatible)
    await ctx.reply(reply, { parse_mode: "Markdown" });

    // Log conversation
    await supabase.from("whatsapp_messages").insert({
      school_id: user.school_id,
      from_user_id: user.id,
      wa_message_id: `tg_in_${Date.now()}`,
      direction: "inbound",
      body: message,
    });
    await supabase.from("whatsapp_messages").insert({
      school_id: user.school_id,
      to_user_id: user.id,
      wa_message_id: `tg_out_${Date.now()}`,
      direction: "outbound",
      body: reply,
    });
  } catch (err) {
    console.error("AI error:", err);
    await ctx.reply("Something went wrong. Please try again in a moment.");
  }
});

// ── Launch ─────────────────────────────────────────────────────
bot.launch({
  allowedUpdates: ["message"],
}).then(() => {
  console.log("🤖 Infizium Telegram bot is running");
  console.log("   Open Telegram and chat with your bot to test\n");
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
