// Sends transactional email via Resend.
// Set RESEND_API_KEY in .env.local to enable. Falls back to console.log in dev.

const RESEND_API = "https://api.resend.com/emails";
const FROM = "Infizium <onboarding@resend.dev>"; // swap to noreply@infizium.com once domain verified

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[email] RESEND_API_KEY not set — skipping send. Payload:", payload);
    return;
  }
  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: payload.to, subject: payload.subject, html: payload.html }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("[email] Resend error:", err);
  }
}

// ── Templates ─────────────────────────────────────────────────────

export function adminRequestEmail(opts: {
  email: string;
  role: string;
  personaDetail: string;
  message: string;
  schoolName: string;
  approveUrl: string;
  denyUrl: string;
}) {
  const { email, role, personaDetail, message, schoolName, approveUrl, denyUrl } = opts;
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  return `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#09090b;color:#e4e4e7;margin:0;padding:24px;">
  <div style="max-width:520px;margin:auto;background:#18181b;border:1px solid #3f3f46;border-radius:16px;overflow:hidden;">
    <div style="background:#1a1a2e;border-bottom:1px solid #3f3f46;padding:20px 24px;display:flex;align-items:center;gap:12px;">
      <span style="font-weight:700;font-size:18px;color:#fff;">Infizium</span>
      <span style="font-size:11px;font-family:monospace;color:rgba(0,212,255,0.6);letter-spacing:2px;">ACCESS REQUEST</span>
    </div>
    <div style="padding:24px;">
      <h2 style="margin:0 0 16px;font-size:20px;color:#fff;">New Access Request</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#a1a1aa;font-size:13px;width:110px;">Email</td><td style="padding:8px 0;color:#fff;font-size:14px;font-weight:600;">${email}</td></tr>
        <tr><td style="padding:8px 0;color:#a1a1aa;font-size:13px;">Role</td><td style="padding:8px 0;"><span style="background:rgba(124,58,237,0.2);color:#a78bfa;border:1px solid rgba(124,58,237,0.3);border-radius:6px;padding:2px 10px;font-size:13px;font-weight:600;">${roleLabel}</span></td></tr>
        ${personaDetail ? `<tr><td style="padding:8px 0;color:#a1a1aa;font-size:13px;">ID / Detail</td><td style="padding:8px 0;color:#e4e4e7;font-size:13px;">${personaDetail}</td></tr>` : ""}
        ${schoolName ? `<tr><td style="padding:8px 0;color:#a1a1aa;font-size:13px;">School</td><td style="padding:8px 0;color:#e4e4e7;font-size:13px;">${schoolName}</td></tr>` : ""}
      </table>
      ${message ? `<div style="margin-top:16px;padding:12px 16px;background:#27272a;border-radius:8px;font-size:13px;color:#a1a1aa;line-height:1.6;">${message}</div>` : ""}
      <div style="margin-top:28px;display:flex;gap:12px;">
        <a href="${approveUrl}" style="display:inline-block;background:#10b981;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 28px;border-radius:10px;">Approve →</a>
        <a href="${denyUrl}" style="display:inline-block;background:#27272a;color:#a1a1aa;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:10px;border:1px solid #3f3f46;">Deny</a>
      </div>
      <p style="margin-top:20px;font-size:11px;color:#52525b;">Clicking Approve sends ${email} an invite link to set their password. Clicking Deny sends them a polite rejection.</p>
    </div>
  </div>
</body>
</html>`;
}

export function approvalEmail(opts: { email: string; role: string; inviteUrl: string }) {
  const roleLabel = opts.role.charAt(0).toUpperCase() + opts.role.slice(1);
  return `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#09090b;color:#e4e4e7;margin:0;padding:24px;">
  <div style="max-width:520px;margin:auto;background:#18181b;border:1px solid #3f3f46;border-radius:16px;overflow:hidden;">
    <div style="background:#1a1a2e;border-bottom:1px solid #3f3f46;padding:20px 24px;">
      <span style="font-weight:700;font-size:18px;color:#fff;">Infizium</span>
    </div>
    <div style="padding:24px;">
      <h2 style="margin:0 0 8px;font-size:20px;color:#fff;">You're approved! 🎉</h2>
      <p style="margin:0 0 20px;color:#a1a1aa;font-size:14px;">Your <strong style="color:#fff;">${roleLabel}</strong> account on Infizium has been approved. Click below to set your password and get started.</p>
      <a href="${opts.inviteUrl}" style="display:inline-block;background:#10b981;color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;">Set my password →</a>
      <p style="margin-top:20px;font-size:11px;color:#52525b;">This link expires in 24 hours. If it does, request access again from the app.</p>
    </div>
  </div>
</body>
</html>`;
}

export function denialEmail(opts: { email: string }) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#09090b;color:#e4e4e7;margin:0;padding:24px;">
  <div style="max-width:520px;margin:auto;background:#18181b;border:1px solid #3f3f46;border-radius:16px;overflow:hidden;">
    <div style="background:#1a1a2e;border-bottom:1px solid #3f3f46;padding:20px 24px;">
      <span style="font-weight:700;font-size:18px;color:#fff;">Infizium</span>
    </div>
    <div style="padding:24px;">
      <h2 style="margin:0 0 8px;font-size:20px;color:#fff;">Access request update</h2>
      <p style="margin:0 0 20px;color:#a1a1aa;font-size:14px;">We weren't able to verify the details of your request at this time. If you believe this is an error, please contact your school admin or reply to this email.</p>
      <p style="font-size:12px;color:#52525b;">infizium@outlook.com</p>
    </div>
  </div>
</body>
</html>`;
}
