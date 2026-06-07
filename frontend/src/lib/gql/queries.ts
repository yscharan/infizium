import { gql } from "graphql-request";

// ── Attendance ─────────────────────────────────────────────────
export const GET_ATTENDANCE_SUMMARY = gql`
  query GetAttendanceSummary($studentId: UUID!, $fromDate: Date!) {
    attendanceCollection(
      filter: { student_id: { eq: $studentId }, date: { gte: $fromDate } }
      orderBy: { date: DescNullsLast }
    ) {
      edges {
        node {
          id
          date
          status
        }
      }
    }
  }
`;

export const GET_CLASS_ATTENDANCE = gql`
  query GetClassAttendance($schoolId: UUID!, $date: Date!) {
    attendanceCollection(
      filter: { school_id: { eq: $schoolId }, date: { eq: $date } }
    ) {
      edges {
        node {
          status
          students {
            grade
            section
            roll_number
            users {
              name
            }
          }
        }
      }
    }
  }
`;

// ── Homework ───────────────────────────────────────────────────
export const GET_HOMEWORK = gql`
  query GetHomework($schoolId: UUID!, $grade: String!, $section: String!, $fromDate: Date!) {
    homeworkCollection(
      filter: {
        school_id: { eq: $schoolId }
        grade: { eq: $grade }
        section: { eq: $section }
        due_date: { gte: $fromDate }
      }
      orderBy: { due_date: AscNullsLast }
    ) {
      edges {
        node {
          id
          subject
          title
          description
          due_date
          status
          users {
            name
          }
        }
      }
    }
  }
`;

// ── Announcements ──────────────────────────────────────────────
export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements($schoolId: UUID!, $first: Int!) {
    announcementsCollection(
      filter: { school_id: { eq: $schoolId } }
      orderBy: { created_at: DescNullsLast }
      first: $first
    ) {
      edges {
        node {
          id
          title
          body
          created_at
          whatsapp_sent
          read_count
          target_grades
          users {
            name
          }
        }
      }
    }
  }
`;

// ── Students ───────────────────────────────────────────────────
export const GET_STUDENTS_BY_GRADE = gql`
  query GetStudentsByGrade($schoolId: UUID!, $grade: String!, $section: String!) {
    studentsCollection(
      filter: {
        school_id: { eq: $schoolId }
        grade: { eq: $grade }
        section: { eq: $section }
      }
      orderBy: { roll_number: AscNullsLast }
    ) {
      edges {
        node {
          id
          roll_number
          grade
          section
          users {
            id
            name
            phone
          }
        }
      }
    }
  }
`;

// ── Conversations ──────────────────────────────────────────────
export const GET_CONVERSATIONS = gql`
  query GetConversations($userId: UUID!) {
    conversationsCollection(
      filter: {
        or: [{ user_a_id: { eq: $userId } }, { user_b_id: { eq: $userId } }]
      }
      orderBy: { last_message_at: DescNullsLast }
    ) {
      edges {
        node {
          id
          last_message
          last_message_at
          usersByUserAId {
            id
            name
            role
          }
          usersByUserBId {
            id
            name
            role
          }
        }
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($fromId: UUID!, $toId: UUID!, $schoolId: UUID!, $first: Int!) {
    whatsappMessagesCollection(
      filter: {
        school_id: { eq: $schoolId }
        or: [
          { and: [{ from_user_id: { eq: $fromId } }, { to_user_id: { eq: $toId } }] }
          { and: [{ from_user_id: { eq: $toId } }, { to_user_id: { eq: $fromId } }] }
        ]
      }
      orderBy: { created_at: AscNullsLast }
      first: $first
    ) {
      edges {
        node {
          id
          body
          direction
          created_at
          delivered
          read
          usersByFromUserId {
            name
            role
          }
        }
      }
    }
  }
`;
