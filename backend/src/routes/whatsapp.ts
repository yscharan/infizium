import { Router } from "express";
import { waClient } from "../whatsapp/client";
import { supabase } from "../db/supabase";

export const whatsappRouter = Router();

// GET /api/whatsapp/status
whatsappRouter.get("/status", (_req, res) => {
  res.json({ ready: waClient.isReady() });
});

// POST /api/whatsapp/send — direct send from dashboard
whatsappRouter.post("/send", async (req, res) => {
  const { to_phone, message, school_id, from_user_id } = req.body;
  if (!to_phone || !message) {
    return res.status(400).json({ error: "to_phone and message required" });
  }
  if (!waClient.isReady()) {
    return res.status(503).json({ error: "WhatsApp not connected. Run `npm run whatsapp` first." });
  }

  // whatsapp-web.js format: 91XXXXXXXXXX@c.us
  const waId = to_phone.replace(/\D/g, "").replace(/^0/, "91") + "@c.us";

  try {
    await waClient.sendMessage(waId, message);

    // Log it
    if (school_id && from_user_id) {
      const { data: recipient } = await supabase
        .from("users")
        .select("id")
        .eq("whatsapp_id", waId)
        .single();

      await supabase.from("whatsapp_messages").insert({
        school_id,
        from_user_id,
        to_user_id: recipient?.id ?? null,
        wa_message_id: `dash_${Date.now()}`,
        direction: "outbound",
        body: message,
      });
    }

    return res.json({ sent: true, to: waId });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
});

// GET /api/whatsapp/messages?school_id=&limit=50
whatsappRouter.get("/messages", async (req, res) => {
  const { school_id, limit = "50" } = req.query as Record<string, string>;
  if (!school_id) return res.status(400).json({ error: "school_id required" });

  const { data, error } = await supabase
    .from("whatsapp_messages")
    .select("*, from_user:users!from_user_id(name, role), to_user:users!to_user_id(name, role)")
    .eq("school_id", school_id)
    .order("created_at", { ascending: false })
    .limit(parseInt(limit));

  if (error) return res.status(500).json({ error: error.message });
  return res.json((data ?? []).reverse());
});
