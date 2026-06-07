import { Router } from "express";
import { supabase } from "../db/supabase";

export const usersRouter = Router();

// GET /api/users?school_id=&role=
usersRouter.get("/", async (req, res) => {
  const { school_id, role } = req.query as Record<string, string>;
  let query = supabase.from("users").select("*");
  if (school_id) query = query.eq("school_id", school_id);
  if (role) query = query.eq("role", role);
  const { data, error } = await query.order("name");
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// GET /api/users/:id
usersRouter.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("*, students(*)")
    .eq("id", req.params.id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  return res.json(data);
});

// POST /api/users
usersRouter.post("/", async (req, res) => {
  const { school_id, role, name, phone, email } = req.body;
  if (!school_id || !role || !name || !phone) {
    return res.status(400).json({ error: "school_id, role, name, phone required" });
  }
  const { data, error } = await supabase
    .from("users")
    .insert({ school_id, role, name, phone, email })
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json(data);
});
