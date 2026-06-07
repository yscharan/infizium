import { Router } from "express";
import { supabase } from "../db/supabase";

export const chatRouter = Router();

// GET /api/chat/conversations?user_id=
chatRouter.get("/conversations", async (req, res) => {
  const { user_id } = req.query as Record<string, string>;
  if (!user_id) return res.status(400).json({ error: "user_id required" });

  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      user_a:users!user_a_id(id, name, role, phone),
      user_b:users!user_b_id(id, name, role, phone)
    `)
    .or(`user_a_id.eq.${user_id},user_b_id.eq.${user_id}`)
    .order("last_message_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// GET /api/chat/messages?conversation_id=&limit=50
chatRouter.get("/messages", async (req, res) => {
  const { conversation_id, limit = "50" } = req.query as Record<string, string>;
  if (!conversation_id) return res.status(400).json({ error: "conversation_id required" });

  // Get the conversation to derive user IDs
  const { data: convo, error: convoErr } = await supabase
    .from("conversations")
    .select("user_a_id, user_b_id, school_id")
    .eq("id", conversation_id)
    .single();
  if (convoErr || !convo) return res.status(404).json({ error: "Conversation not found" });

  const { data, error } = await supabase
    .from("whatsapp_messages")
    .select("*, from_user:users!from_user_id(id, name, role)")
    .eq("school_id", convo.school_id)
    .or(
      `and(from_user_id.eq.${convo.user_a_id},to_user_id.eq.${convo.user_b_id}),` +
      `and(from_user_id.eq.${convo.user_b_id},to_user_id.eq.${convo.user_a_id})`
    )
    .order("created_at", { ascending: false })
    .limit(parseInt(limit));

  if (error) return res.status(500).json({ error: error.message });
  return res.json((data ?? []).reverse());
});

// POST /api/chat/send — send a message (stores in DB + sends via WhatsApp)
chatRouter.post("/send", async (req, res) => {
  const { from_user_id, to_user_id, school_id, body } = req.body;
  if (!from_user_id || !to_user_id || !school_id || !body) {
    return res.status(400).json({ error: "from_user_id, to_user_id, school_id, body required" });
  }

  // Upsert conversation thread
  const [a, b] = [from_user_id, to_user_id].sort();
  await supabase.from("conversations").upsert(
    {
      school_id,
      user_a_id: a,
      user_b_id: b,
      last_message: body.slice(0, 100),
      last_message_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_a_id,user_b_id" }
  );

  // Store message
  const { data: message, error } = await supabase
    .from("whatsapp_messages")
    .insert({
      school_id,
      from_user_id,
      to_user_id,
      wa_message_id: `local_${Date.now()}`,
      direction: "outbound",
      body,
    })
    .select("*, from_user:users!from_user_id(id, name, role)")
    .single();

  if (error) return res.status(400).json({ error: error.message });

  // Fire WhatsApp delivery in background (non-blocking)
  const { waClient } = await import("../whatsapp/client");
  if (waClient.isReady()) {
    const { data: recipient } = await supabase
      .from("users")
      .select("whatsapp_id")
      .eq("id", to_user_id)
      .single();

    if (recipient?.whatsapp_id) {
      waClient.sendMessage(recipient.whatsapp_id, body).catch(() => {});
    }
  }

  return res.status(201).json(message);
});
