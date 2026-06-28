import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function normalisePhone(raw: string) {
  return raw.replace(/\D/g, "").slice(-10);
}

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();
    if (!phone || !code) {
      return NextResponse.json({ error: "Phone and code required." }, { status: 400 });
    }

    const norm = normalisePhone(phone);

    const { data: record, error } = await supabase
      .from("phone_verifications")
      .select("id, code, expires_at, used")
      .eq("phone", norm)
      .eq("used", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !record) {
      return NextResponse.json({ error: "No active OTP found for this number. Request a new code." }, { status: 404 });
    }

    if (new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ error: "This code has expired. Request a new one." }, { status: 410 });
    }

    if (record.code !== String(code).trim()) {
      return NextResponse.json({ error: "Incorrect code. Check the message and try again." }, { status: 401 });
    }

    // Mark code used
    await supabase.from("phone_verifications").update({ used: true }).eq("id", record.id);

    // Mark phone verified on user profile (if exists)
    await supabase.from("users").update({ phone_verified: true }).eq("phone", norm);

    // Check if a profile exists for this phone
    const { data: user } = await supabase
      .from("users")
      .select("id, name, role, email, school_id, is_super_admin, schools(name)")
      .eq("phone", norm)
      .maybeSingle();

    return NextResponse.json({ ok: true, profileExists: !!user, user: user ?? null });
  } catch (err) {
    console.error("[verify-phone-otp]", err);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
