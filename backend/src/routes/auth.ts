import { Router } from "express";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../db/supabase";

export const authRouter = Router();

const supabaseAuth = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── POST /api/auth/otp/send ────────────────────────────────────
// Send OTP to phone — works for parents (WhatsApp OTP via backend) + email for teachers/admin
authRouter.post("/otp/send", async (req, res) => {
  const { phone, email } = req.body;

  if (!phone && !email) {
    return res.status(400).json({ error: "phone or email required" });
  }

  if (phone) {
    const e164 = "+91" + phone.replace(/\D/g, "").slice(-10);
    const { error } = await supabaseAuth.auth.signInWithOtp({ phone: e164 });
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ sent: true, method: "sms", to: e164 });
  }

  const { error } = await supabaseAuth.auth.signInWithOtp({ email });
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ sent: true, method: "email", to: email });
});

// ── POST /api/auth/otp/verify ──────────────────────────────────
// Verify OTP → returns session tokens
authRouter.post("/otp/verify", async (req, res) => {
  const { phone, email, token } = req.body;

  if (!token) return res.status(400).json({ error: "token required" });

  let result;
  if (phone) {
    const e164 = "+91" + phone.replace(/\D/g, "").slice(-10);
    result = await supabaseAuth.auth.verifyOtp({ phone: e164, token, type: "sms" });
  } else if (email) {
    result = await supabaseAuth.auth.verifyOtp({ email, token, type: "email" });
  } else {
    return res.status(400).json({ error: "phone or email required" });
  }

  if (result.error || !result.data.user) {
    return res.status(401).json({ error: result.error?.message ?? "Verification failed" });
  }

  // Look up Infizium profile
  const { data: profile } = await supabase
    .from("users")
    .select("id, name, role, school_id, schools(name)")
    .eq("phone", phone?.replace(/\D/g, "").slice(-10) ?? "")
    .single();

  return res.json({
    session: result.data.session,
    user: result.data.user,
    profile: profile ?? null,
  });
});

// ── POST /api/auth/login/email ─────────────────────────────────
// Email + password for school admins and teachers
authRouter.post("/login/email", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

  const { data, error } = await supabaseAuth.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });

  const { data: profile } = await supabase
    .from("users")
    .select("id, name, role, school_id, schools(name)")
    .eq("email", email)
    .single();

  return res.json({ session: data.session, user: data.user, profile });
});

// ── POST /api/auth/register ────────────────────────────────────
// Admin creates a new user (teacher, parent, student) with Supabase Auth
authRouter.post("/register", async (req, res) => {
  const { email, phone, password, name, role, school_id } = req.body;
  if (!name || !role || !school_id) {
    return res.status(400).json({ error: "name, role, school_id required" });
  }

  // Create Supabase Auth user
  let authUser;
  if (email && password) {
    const { data, error } = await supabaseAuth.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role, school_id },
      email_confirm: true,
    });
    if (error) return res.status(400).json({ error: error.message });
    authUser = data.user;
  } else if (phone) {
    const e164 = "+91" + phone.replace(/\D/g, "").slice(-10);
    const { data, error } = await supabaseAuth.auth.admin.createUser({
      phone: e164,
      user_metadata: { name, role, school_id },
      phone_confirm: true,
    });
    if (error) return res.status(400).json({ error: error.message });
    authUser = data.user;
  } else {
    return res.status(400).json({ error: "email+password or phone required" });
  }

  // Create Infizium user profile
  const { data: profile, error: profileErr } = await supabase
    .from("users")
    .insert({ school_id, role, name, phone: phone?.replace(/\D/g, "").slice(-10), email })
    .select()
    .single();

  if (profileErr) return res.status(400).json({ error: profileErr.message });
  return res.status(201).json({ auth_id: authUser?.id, profile });
});

// ── POST /api/auth/logout ──────────────────────────────────────
authRouter.post("/logout", async (req, res) => {
  const token = req.headers.authorization?.slice(7);
  if (token) await supabaseAuth.auth.admin.signOut(token);
  return res.json({ ok: true });
});

// ── GET /api/auth/me ───────────────────────────────────────────
authRouter.get("/me", async (req, res) => {
  const token = req.headers.authorization?.slice(7);
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const { data: { user }, error } = await supabaseAuth.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: "Invalid token" });

  const { data: profile } = await supabase
    .from("users")
    .select("id, name, role, school_id, schools(name)")
    .eq("email", user.email ?? "")
    .single();

  return res.json({ user, profile });
});
