import "dotenv/config";
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { supabase } from "../db/supabase";

class WhatsAppClient {
  private client: Client;
  private ready = false;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth({ dataPath: ".wwebjs_auth" }),
      puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });

    this.client.on("qr", (qr) => {
      console.log("\n📱 Scan this QR with your WhatsApp:\n");
      qrcode.generate(qr, { small: true });
    });

    this.client.on("authenticated", () => {
      console.log("✅ WhatsApp authenticated");
    });

    this.client.on("ready", () => {
      this.ready = true;
      console.log("💬 WhatsApp client ready — listening for messages");
    });

    this.client.on("message", async (msg) => {
      await this.handleInbound(msg);
    });

    this.client.on("disconnected", (reason) => {
      this.ready = false;
      console.warn("⚠️ WhatsApp disconnected:", reason);
    });
  }

  async initialize() {
    await this.client.initialize();
  }

  isReady() {
    return this.ready;
  }

  async sendMessage(to: string, body: string) {
    if (!this.ready) throw new Error("WhatsApp client not ready");
    return this.client.sendMessage(to, body);
  }

  private async handleInbound(msg: { from: string; body: string; id: { id: string } }) {
    if (msg.from === "status@broadcast") return;

    console.log(`📩 [${msg.from}] ${msg.body}`);

    // Look up sender in users table
    const waId = msg.from; // format: 91XXXXXXXXXX@c.us
    const { data: user } = await supabase
      .from("users")
      .select("id, school_id, name, role")
      .eq("whatsapp_id", waId)
      .single();

    if (!user) {
      // Unknown sender — optionally auto-reply
      await this.sendMessage(waId, "Hi! You're not registered on Infizium yet. Please ask your school admin to add you.");
      return;
    }

    // Store inbound message
    await supabase.from("whatsapp_messages").insert({
      school_id: user.school_id,
      from_user_id: user.id,
      wa_message_id: msg.id.id,
      direction: "inbound",
      body: msg.body,
    });

    // Look up student linked to this parent
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("parent_user_id", user.id)
      .single();

    // Hand off to AI — no more command codes
    try {
      const { handleWithAI } = await import("./ai-handler");
      const reply = await handleWithAI({
        message: msg.body,
        parentUser: { id: user.id, name: user.name, school_id: user.school_id },
        studentId: student?.id ?? null,
      });
      await this.sendMessage(waId, reply);

      // Log the AI reply
      await supabase.from("whatsapp_messages").insert({
        school_id: user.school_id,
        to_user_id: user.id,
        wa_message_id: `ai_${Date.now()}`,
        direction: "outbound",
        body: reply,
      });
    } catch (err) {
      console.error("AI handler error:", err);
      await this.sendMessage(waId, `Hi ${user.name}! I'm having trouble right now. Please try again in a moment.`);
    }
  }

  private async sendMenu(waId: string, name: string, role: string) {
    const menus: Record<string, string> = {
      parent: `👋 Hi ${name}!\n\nReply with:\n*1* or *attendance* — Today's attendance\n*2* or *homework* — Pending homework\n*3* — Announcements\n\n_Infizium School OS_`,
      teacher: `👋 Hi ${name}!\n\nReply with:\n*1* — Mark today's attendance\n*2* — Post homework\n*3* — Send announcement\n\n_Infizium School OS_`,
      student: `👋 Hi ${name}!\n\nReply with:\n*1* — My attendance\n*2* — Pending homework\n\n_Infizium School OS_`,
      admin: `👋 Hi ${name}!\n\nReply with:\n*1* — Today's school attendance summary\n*3* — Send school-wide announcement\n\n_Infizium School OS_`,
    };
    await this.sendMessage(waId, menus[role] ?? menus.parent);
  }

  private async handleAttendanceQuery(waId: string, userId: string, schoolId: string) {
    const today = new Date().toISOString().slice(0, 10);

    // Check if this user is a parent — get their child
    const { data: student } = await supabase
      .from("students")
      .select("id, grade, section, users!user_id(name)")
      .eq("parent_user_id", userId)
      .single();

    if (!student) {
      await this.sendMessage(waId, "No student linked to your account. Contact your school admin.");
      return;
    }

    const { data: record } = await supabase
      .from("attendance")
      .select("status")
      .eq("student_id", student.id)
      .eq("date", today)
      .single();

    const studentName = Array.isArray(student.users) ? student.users[0]?.name : (student.users as { name: string } | null)?.name ?? "your child";
    const statusEmoji = { present: "✅", absent: "❌", late: "⚠️" };
    const status = record?.status ?? "not marked yet";
    const emoji = statusEmoji[status as keyof typeof statusEmoji] ?? "❓";

    await this.sendMessage(
      waId,
      `${emoji} *${studentName}* — ${today}\nAttendance: *${status}*\n\n_Grade ${student.grade}-${student.section}_`
    );
  }

  private async handleHomeworkQuery(waId: string, schoolId: string, userId: string) {
    const { data: student } = await supabase
      .from("students")
      .select("grade, section")
      .eq("parent_user_id", userId)
      .single();

    if (!student) {
      await this.sendMessage(waId, "No student linked to your account.");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const { data: hw } = await supabase
      .from("homework")
      .select("subject, title, due_date")
      .eq("school_id", schoolId)
      .eq("grade", student.grade)
      .eq("section", student.section)
      .gte("due_date", today)
      .order("due_date")
      .limit(5);

    if (!hw?.length) {
      await this.sendMessage(waId, "✅ No pending homework! Have a great day.");
      return;
    }

    const list = hw.map(h => `• *${h.subject}* — ${h.title} _(due ${h.due_date})_`).join("\n");
    await this.sendMessage(waId, `📚 *Pending homework*\n\n${list}`);
  }
}

export const waClient = new WhatsAppClient();

// If run directly: node src/whatsapp/client.ts
if (require.main === module) {
  waClient.initialize().catch(console.error);
}
