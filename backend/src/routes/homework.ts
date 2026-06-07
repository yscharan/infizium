import { Router } from "express";
import { supabase } from "../db/supabase";

export const homeworkRouter = Router();

// GET /api/homework?school_id=&grade=&section=
homeworkRouter.get("/", async (req, res) => {
  const { school_id, grade, section } = req.query as Record<string, string>;
  if (!school_id) return res.status(400).json({ error: "school_id required" });

  let query = supabase
    .from("homework")
    .select("*, users!teacher_id(name)")
    .eq("school_id", school_id);

  if (grade) query = query.eq("grade", grade);
  if (section) query = query.eq("section", section);

  const { data, error } = await query.order("due_date");
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// POST /api/homework
homeworkRouter.post("/", async (req, res) => {
  const { school_id, teacher_id, grade, section, subject, title, description, due_date } = req.body;
  if (!school_id || !teacher_id || !grade || !section || !subject || !title || !due_date) {
    return res.status(400).json({ error: "school_id, teacher_id, grade, section, subject, title, due_date required" });
  }

  const { data, error } = await supabase
    .from("homework")
    .insert({ school_id, teacher_id, grade, section, subject, title, description, due_date })
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json(data);
});

// PATCH /api/homework/:id
homeworkRouter.patch("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("homework")
    .update(req.body)
    .eq("id", req.params.id)
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});
