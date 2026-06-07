"use client";

import { useEffect, useState } from "react";
import { gqlClient } from "./client";
import {
  GET_ATTENDANCE_SUMMARY,
  GET_CLASS_ATTENDANCE,
  GET_HOMEWORK,
  GET_ANNOUNCEMENTS,
  GET_STUDENTS_BY_GRADE,
  GET_CONVERSATIONS,
  GET_MESSAGES,
} from "./queries";

function useGql<T>(query: string, variables: Record<string, unknown>, enabled = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    setLoading(true);
    gqlClient
      .request<T>(query, variables)
      .then(setData)
      .catch(e => setError(e?.message ?? "GraphQL error"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(variables), enabled]);

  return { data, loading, error };
}

export function useAttendanceSummary(studentId: string, fromDate: string) {
  return useGql(GET_ATTENDANCE_SUMMARY, { studentId, fromDate }, !!studentId);
}

export function useClassAttendance(schoolId: string, date: string) {
  return useGql(GET_CLASS_ATTENDANCE, { schoolId, date }, !!schoolId);
}

export function useHomework(schoolId: string, grade: string, section: string) {
  const today = new Date().toISOString().slice(0, 10);
  return useGql(GET_HOMEWORK, { schoolId, grade, section, fromDate: today }, !!schoolId);
}

export function useAnnouncements(schoolId: string, first = 10) {
  return useGql(GET_ANNOUNCEMENTS, { schoolId, first }, !!schoolId);
}

export function useStudents(schoolId: string, grade: string, section: string) {
  return useGql(GET_STUDENTS_BY_GRADE, { schoolId, grade, section }, !!schoolId);
}

export function useConversations(userId: string) {
  return useGql(GET_CONVERSATIONS, { userId }, !!userId);
}

export function useMessages(fromId: string, toId: string, schoolId: string, first = 50) {
  return useGql(GET_MESSAGES, { fromId, toId, schoolId, first }, !!(fromId && toId));
}
