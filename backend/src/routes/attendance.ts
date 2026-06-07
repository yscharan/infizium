import { Router } from "express";
import { supabase } from "../db/supabase";

export const attendanceRouter = Router();

// GET /api/attendance?school_id=&date=&grade=
attendanceRouter.get("/", async (req, res) => {
  const { school_id, date, grade } = req.query as Record<string, string>;
  if (!school_id) return res.status(400).json({ error: "school_id required" });

  let query = supabase
    .from("attendance")
    .select("*, students(grade, section, roll_number, users(name, phone))")
    .eq("school_id", school_id);

  if (date) query = query.eq("date", date);
  if (grade) query = query.eq("students.grade", grade);

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// POST /api/attendance — mark single student
attendanceRouter.post("/", async (req, res) => {
  const { student_id, school_id, date, status, marked_by } = req.body;
  if (!student_id || !school_id || !date || !status || !marked_by) {
    return res.status(400).json({ error: "student_id, school_id, date, status, marked_by required" });
  }

  const { data, error } = await supabase
    .from("attendance")
    .upsert({ student_id, school_id, date, status, marked_by }, { onConflict: "student_id,date" })
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json(data);
});

// POST /api/attendance/bulk — mark entire class at once
attendanceRouter.post("/bulk", async (req, res) => {
  const { records } = req.body as {
    records: { student_id: string; school_id: string; date: string; status: string; marked_by: string }[];
  };
  if (!records?.length) return res.status(400).json({ error: "records array required" });

  const { data, error } = await supabase
    .from("attendance")
    .upsert(records, { onConflict: "student_id,date" })
    .select();
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ inserted: data?.length ?? 0 });
});

// GET /api/attendance/summary/:student_id?from=&to=
attendanceRouter.get("/summary/:student_id", async (req, res) => {
  const { from, to } = req.query as Record<string, string>;
  let query = supabase
    .from("attendance")
    .select("date, status")
    .eq("student_id", req.params.student_id);
  if (from) query = query.gte("date", from);
  if (to) query = query.lte("date", to);

  const { data, error } = await query.order("date");
  if (error) return res.status(500).json({ error: error.message });

  const present = data?.filter(r => r.status === "present").length ?? 0;
  const absent = data?.filter(r => r.status === "absent").length ?? 0;
  const late = data?.filter(r => r.status === "late").length ?? 0;
  const total = data?.length ?? 0;

  return res.json({ present, absent, late, total, records: data });
});
