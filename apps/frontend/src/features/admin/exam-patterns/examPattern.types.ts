/**
 * EduAssess – Exam Pattern Types
 *
 * These types define the data model for Admin Exam Pattern Management.
 * The model is designed to be extensible — future fields such as
 * difficulty distribution, topic weightage, and curriculum alignment
 * can be added to ExamPattern and ExamSection without breaking existing consumers.
 */

// ─── Question Types ───────────────────────────────────────────────────────────

export const QUESTION_TYPES = [
  "Multiple Choice",
  "Short Answer",
  "Long Answer",
  "Fill in the Blank",
  "True / False",
] as const;

export type QuestionType = (typeof QUESTION_TYPES)[number];

// ─── Core Entities ────────────────────────────────────────────────────────────

export interface ExamSection {
  id: string;
  name: string;
  questionType: QuestionType;
  numberOfQuestions: number;
  marksPerQuestion: number;

  // Extensible fields — add future configuration here without touching callers
  // e.g. difficultyDistribution?: DifficultyDistribution;
  // e.g. topicWeightage?: TopicWeightage[];
  // e.g. curriculumAlignment?: string[];
  metadata?: Record<string, unknown>;
}

export interface SamplePaper {
  id: string;
  fileName: string;
  uploadedDate: string; // ISO date string
  label?: string; // e.g. "2024 Board Paper", "Model Paper"
}

export type ExamPatternStatus = "Active" | "Draft";

export interface ExamPattern {
  id: string;
  name: string;
  grade: string;
  subject: string;
  academicYear: string;
  duration: string;
  status: ExamPatternStatus;
  sections: ExamSection[];
  samplePapers: SamplePaper[];

  // Derived / computed — kept for display; recalculated from sections in the hook
  totalMarks: number;

  // Extensible fields — reserved for future AI/curriculum integration
  // e.g. curriculumCode?: string;
  // e.g. boardAlignment?: string;
  // e.g. tags?: string[];
  metadata?: Record<string, unknown>;
}

// ─── Form State ───────────────────────────────────────────────────────────────

/** Partial version used while building a new pattern in the form */
export type ExamPatternDraft = Omit<ExamPattern, "id" | "totalMarks">;

// ─── Options ─────────────────────────────────────────────────────────────────

export const GRADE_OPTIONS = [
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
] as const;

export const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
] as const;

export const ACADEMIC_YEAR_OPTIONS = [
  "2023-2024",
  "2024-2025",
  "2025-2026",
  "2026-2027",
] as const;
