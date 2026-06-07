import { Router } from "express";
import { supabase } from "../db/supabase";
import { waClient } from "../whatsapp/client";

export const announcementsRouter = Router();

// GET /api/announcements?school_id=
announcementsRouter.get("/", async (req, res) => {
  const { school_id } = req.query as Record<string, string>;
  if (!school_id) return res.status(400).json({ error: "school_id required" });

  const { data, error } = await supabase
    .from("announcements")
    .select("*, users!author_id(name, role)")
    .eq("school_id", school_id)
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// POST /api/announcements — creates and optionally blasts via WhatsApp
announcementsRouter.post("/", async (req, res) => {
  const { school_id, author_id, title, body, target_grades, send_whatsapp } = req.body;
  if (!school_id || !author_id || !title || !body) {
    return res.status(400).json({ error: "school_id, author_id, title, body required" });
  }

  const { data: announcement, error } = await supabase
    .from("announcements")
    .insert({ school_id, author_id, title, body, target_grades: target_grades ?? null })
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  // Optionally blast to all parent WhatsApp numbers for the school
  if (send_whatsapp && waClient.isReady()) {
    try {
      const { data: parents } = await supabase
        .from("users")
        .select("whatsapp_id, name")
        .eq("school_id", school_id)
        .eq("role", "parent")
        .not("whatsapp_id", "is", null);

      const msg = `📢 *${title}*\n\n${body}\n\n— ${announcement.id ? "St. Joseph's High School" : "School"}`;
      const results: { name: string; sent: boolean }[] = [];

      for (const parent of parents ?? []) {
        try {
          await waClient.sendMessage(parent.whatsapp_id!, msg);
          results.push({ name: parent.name, sent: true });
        } catch {
          results.push({ name: parent.name, sent: false });
        }
      }

      await supabase
        .from("announcements")
        .update({ whatsapp_sent: true, whatsapp_sent_at: new Date().toISOString() })
        .eq("id", announcement.id);

      return res.status(201).json({ announcement, whatsapp: results });
    } catch (waErr) {
      return res.status(201).json({ announcement, whatsapp_error: String(waErr) });
    }
  }

  return res.status(201).json({ announcement });
});
