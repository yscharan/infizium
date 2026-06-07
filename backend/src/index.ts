import "dotenv/config";
import express from "express";
import cors from "cors";
import { attendanceRouter } from "./routes/attendance";
import { homeworkRouter } from "./routes/homework";
import { announcementsRouter } from "./routes/announcements";
import { usersRouter } from "./routes/users";
import { chatRouter } from "./routes/chat";
import { whatsappRouter } from "./routes/whatsapp";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:3000" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", version: "0.1.0", ts: new Date().toISOString() });
});

app.use("/api/users", usersRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/homework", homeworkRouter);
app.use("/api/announcements", announcementsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/whatsapp", whatsappRouter);

app.listen(PORT, () => {
  console.log(`\n🚀 Infizium backend running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health\n`);
});
