export type Role = "student" | "parent" | "teacher" | "admin";
export type AttendanceStatus = "present" | "absent" | "late";
export type MessageDirection = "inbound" | "outbound";
export type HomeworkStatus = "pending" | "submitted" | "graded";

export interface Database {
  public: {
    Tables: {
      schools: {
        Row: School;
        Insert: Omit<School, "id" | "created_at">;
        Update: Partial<Omit<School, "id">>;
      };
      users: {
        Row: User;
        Insert: Omit<User, "id" | "created_at">;
        Update: Partial<Omit<User, "id">>;
      };
      students: {
        Row: Student;
        Insert: Omit<Student, "id" | "created_at">;
        Update: Partial<Omit<Student, "id">>;
      };
      attendance: {
        Row: Attendance;
        Insert: Omit<Attendance, "id" | "created_at">;
        Update: Partial<Omit<Attendance, "id">>;
      };
      homework: {
        Row: Homework;
        Insert: Omit<Homework, "id" | "created_at">;
        Update: Partial<Omit<Homework, "id">>;
      };
      announcements: {
        Row: Announcement;
        Insert: Omit<Announcement, "id" | "created_at">;
        Update: Partial<Omit<Announcement, "id">>;
      };
      whatsapp_messages: {
        Row: WhatsAppMessage;
        Insert: Omit<WhatsAppMessage, "id" | "created_at">;
        Update: Partial<Omit<WhatsAppMessage, "id">>;
      };
      conversations: {
        Row: Conversation;
        Insert: Omit<Conversation, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Conversation, "id">>;
      };
    };
  };
}

export interface School {
  id: string;
  name: string;
  district: string;
  state: string;
  phone: string | null;
  whatsapp_number: string | null;
  created_at: string;
}

export interface User {
  id: string;
  school_id: string;
  role: Role;
  name: string;
  phone: string;
  whatsapp_id: string | null;
  email: string | null;
  created_at: string;
}

export interface Student {
  id: string;
  user_id: string;
  school_id: string;
  grade: string;
  section: string;
  roll_number: string;
  parent_user_id: string | null;
  created_at: string;
}

export interface Attendance {
  id: string;
  student_id: string;
  school_id: string;
  date: string;
  status: AttendanceStatus;
  marked_by: string;
  created_at: string;
}

export interface Homework {
  id: string;
  school_id: string;
  teacher_id: string;
  grade: string;
  section: string;
  subject: string;
  title: string;
  description: string | null;
  due_date: string;
  status: HomeworkStatus;
  created_at: string;
}

export interface Announcement {
  id: string;
  school_id: string;
  author_id: string;
  title: string;
  body: string;
  target_grades: string[] | null;
  whatsapp_sent: boolean;
  whatsapp_sent_at: string | null;
  read_count: number;
  created_at: string;
}

export interface WhatsAppMessage {
  id: string;
  school_id: string;
  from_user_id: string | null;
  to_user_id: string | null;
  wa_message_id: string;
  direction: MessageDirection;
  body: string;
  media_url: string | null;
  delivered: boolean;
  read: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  school_id: string;
  user_a_id: string;
  user_b_id: string;
  last_message: string | null;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
}
