import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { toE164, localDigits } from "@/lib/phone";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

// Rate limit: max codes per phone within the window.
const RATE_WINDOW_MIN = 15;
const RATE_MAX = 5;

async function sendTelegram(chatId: string, text: string) {
  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    }
  );
  return res.ok;
}

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();
    if (!phone) return NextResponse.json({ error: "Phone number required." }, { status: 400 });

    const e164 = toE164(phone);
    if (!e164) {
      return NextResponse.json({ error: "Enter a valid mobile number with country code." }, { status: 400 });
    }

    // Rate limit: count recent codes for this phone.
    const since = new Date(Date.now() - RATE_WINDOW_MIN * 60_000).toISOString();
    const { count } = await supabase
      .from("phone_verifications")
      .select("id", { count: "exact", head: true })
      .eq("phone", e164)
      .gte("created_at", since);
    if ((count ?? 0) >= RATE_MAX) {
      return NextResponse.json(
        { error: `Too many code requests. Try again in ${RATE_WINDOW_MIN} minutes.` },
        { status: 429 }
      );
    }

    // Generate 6-digit OTP
    const code = String(Math.floor(100000 + Math.random() * 900000));

    // Invalidate any prior unused codes for this phone, then store the new one (E.164).
    await supabase
      .from("phone_verifications")
      .update({ used: true })
      .eq("phone", e164)
      .eq("used", false);

    const { error: insertErr } = await supabase
      .from("phone_verifications")
      .insert({ phone: e164, code });

    if (insertErr) {
      console.error("[send-phone-otp] insert:", insertErr);
      return NextResponse.json({ error: "Could not generate OTP. Try again." }, { status: 500 });
    }

    // Look up Telegram chat_id linked to this phone (stored as tg:chatId in whatsapp_id)
    const { data: user } = await supabase
      .from("users")
      .select("id, name, whatsapp_id")
      .eq("phone", e164)
      .maybeSingle();

    const telegramChatId = user?.whatsapp_id?.startsWith("tg:")
      ? user.whatsapp_id.slice(3)
      : null;

    if (telegramChatId) {
      const sent = await sendTelegram(
        telegramChatId,
        `<b>Infizium login code</b>\n\n<code>${code}</code>\n\nEnter this in the app to sign in. Valid for 10 minutes.`
      );
      if (!sent) {
        return NextResponse.json({ error: "Could not reach your Telegram. Make sure you have started @InfiziumBot." }, { status: 503 });
      }
      return NextResponse.json({ ok: true, method: "telegram", masked: `Telegram linked to ${e164}` });
    }

    // Phone not linked to Telegram yet — return instructions
    return NextResponse.json({
      ok: false,
      method: "not_linked",
      instructions: `Open Telegram, search @InfiziumBot, and send:\n/register ${localDigits(e164)}\n\nThen come back and tap Resend.`,
      norm: e164,
    });
  } catch (err) {
    console.error("[send-phone-otp]", err);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
