import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

function e164(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) return `+${digits}`;
  if (digits.length === 10) return `+91${digits}`;
  return `+${digits}`;
}

function normalisePhone(raw: string) {
  return raw.replace(/\D/g, "").slice(-10);
}

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

    const norm = normalisePhone(phone);
    if (norm.length !== 10) {
      return NextResponse.json({ error: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });
    }

    // Generate 6-digit OTP
    const code = String(Math.floor(100000 + Math.random() * 900000));

    // Store in phone_verifications (invalidate any prior unused codes for this phone)
    await supabase
      .from("phone_verifications")
      .update({ used: true })
      .eq("phone", norm)
      .eq("used", false);

    const { error: insertErr } = await supabase
      .from("phone_verifications")
      .insert({ phone: norm, code });

    if (insertErr) {
      console.error("[send-phone-otp] insert:", insertErr);
      return NextResponse.json({ error: "Could not generate OTP. Try again." }, { status: 500 });
    }

    // Look up Telegram chat_id linked to this phone (stored as tg:chatId in whatsapp_id)
    const { data: user } = await supabase
      .from("users")
      .select("id, name, whatsapp_id")
      .eq("phone", norm)
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
      return NextResponse.json({ ok: true, method: "telegram", masked: `Telegram linked to +91${norm}` });
    }

    // Phone not linked to Telegram yet — return instructions
    return NextResponse.json({
      ok: false,
      method: "not_linked",
      instructions: `Open Telegram, search @InfiziumBot, and send:\n/register ${norm}\n\nThen come back and tap Resend.`,
      norm,
    });
  } catch (err) {
    console.error("[send-phone-otp]", err);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
