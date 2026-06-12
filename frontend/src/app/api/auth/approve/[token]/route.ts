import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail, approvalEmail } from "@/lib/email";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://infizium-app.vercel.app";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const { data: request, error } = await supabaseAdmin
    .from("access_requests")
    .select("*")
    .eq("token", token)
    .maybeSingle();

  if (error || !request) {
    return new NextResponse("Request not found.", { status: 404 });
  }
  if (request.status !== "pending") {
    return new NextResponse(`This request was already ${request.status}.`, { status: 410 });
  }

  // Generate Supabase invite link (creates auth user + 24h invite URL)
  const { data: inviteData, error: inviteErr } = await supabaseAdmin.auth.admin.generateLink({
    type: "invite",
    email: request.email,
    options: {
      redirectTo: `${APP_URL}/login?approved=1`,
      data: { role: request.role },
    },
  });

  if (inviteErr || !inviteData) {
    console.error("[approve] generateLink error:", inviteErr);
    return new NextResponse("Could not generate invite link. Check Supabase service role key.", { status: 500 });
  }

  // Mark request approved
  await supabaseAdmin
    .from("access_requests")
    .update({ status: "approved", reviewed_at: new Date().toISOString() })
    .eq("id", request.id);

  // Create/update users row so resolveAndRedirect works on login
  await supabaseAdmin
    .from("users")
    .upsert(
      {
        id: inviteData.user.id,
        email: request.email,
        role: request.role,
        name: request.email.split("@")[0], // placeholder; user can update later
        phone: null,
      },
      { onConflict: "id", ignoreDuplicates: false }
    );

  // Send approval email with the invite URL
  const inviteUrl = inviteData.properties?.action_link ?? `${APP_URL}/login`;
  await sendEmail({
    to: request.email,
    subject: "Your Infizium access is approved",
    html: approvalEmail({ email: request.email, role: request.role, inviteUrl }),
  });

  return new NextResponse(
    `<html><body style="font-family:system-ui;background:#09090b;color:#e4e4e7;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
      <div style="text-align:center;max-width:400px;padding:32px;">
        <div style="font-size:48px;margin-bottom:16px;">✓</div>
        <h2 style="color:#10b981;margin:0 0 8px;">Approved</h2>
        <p style="color:#a1a1aa;margin:0;">Invite sent to <strong style="color:#fff;">${request.email}</strong>. They will receive a link to set their password.</p>
      </div>
    </body></html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}
