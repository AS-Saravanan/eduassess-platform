/**
 * EduAssess – Academic Content Types
 *
 * Models individual academic source documents (books, chapters)
 * that the admin uploads as input to the future AI pipeline.
 *
 * Extensibility: `aiMetadata` field is reserved for future AI processing
 * results (chapter list, embeddings, topic index, etc.) without schema changes.
 */

// ─── Core Enums ──────────────────────────────────────────────────────────────

export const CONTENT_TYPES = ["Full Book", "Chapter"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const PROCESSING_STATUSES = [
  "Uploaded",
  "Processing",
  "Completed",
  "Failed",
] as const;
export type ProcessingStatus = (typeof PROCESSING_STATUSES)[number];

// ─── AI Processing Pipeline ───────────────────────────────────────────────────

export type AiStepStatus = "Pending" | "In Progress" | "Done" | "Failed";

export interface AiProcessingSteps {
  textExtraction: AiStepStatus;
  chapterDetection: AiStepStatus;
  knowledgeIndexing: AiStepStatus;
}

// ─── Main Entity ─────────────────────────────────────────────────────────────

export interface AcademicContent {
  id: string;
  title: string;        // Book name or chapter name
  grade: string;
  subject: string;
  academicYear: string;
  contentType: ContentType;
  fileName: string;
  uploadDate: string;   // ISO date string
  processingStatus: ProcessingStatus;

  /** Only present when contentType === "Chapter" */
  chapterName?: string;
  /** Only present when contentType === "Chapter" */
  parentBookTitle?: string;

  /** Reserved for future AI pipeline output – never mutated directly */
  aiProcessingSteps: AiProcessingSteps;

  /**
   * Open-ended metadata bucket.
   * Future fields: topicIndex, embeddingId, curriculumCode, pageCount, etc.
   */
  metadata?: Record<string, unknown>;
}

// ─── Form Draft ───────────────────────────────────────────────────────────────

export type AcademicContentDraft = Omit<
  AcademicContent,
  "id" | "uploadDate" | "aiProcessingSteps"
>;

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
