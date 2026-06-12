import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail, denialEmail } from "@/lib/email";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

  await supabaseAdmin
    .from("access_requests")
    .update({ status: "denied", reviewed_at: new Date().toISOString() })
    .eq("id", request.id);

  await sendEmail({
    to: request.email,
    subject: "Update on your Infizium access request",
    html: denialEmail({ email: request.email }),
  });

  return new NextResponse(
    `<html><body style="font-family:system-ui;background:#09090b;color:#e4e4e7;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
      <div style="text-align:center;max-width:400px;padding:32px;">
        <div style="font-size:48px;margin-bottom:16px;">✗</div>
        <h2 style="color:#ef4444;margin:0 0 8px;">Denied</h2>
        <p style="color:#a1a1aa;margin:0;">Denial email sent to <strong style="color:#fff;">${request.email}</strong>.</p>
      </div>
    </body></html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}
