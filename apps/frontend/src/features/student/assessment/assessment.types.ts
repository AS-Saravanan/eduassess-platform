/**
 * EduAssess – Student Assessment Types
 *
 * Defines the data model for the assessment-taking experience.
 * Designed to be consumed by the future AI question generator
 * without schema changes.
 */

// ─── Question Types ───────────────────────────────────────────────────────────

export type QuestionType = "multiple-choice" | "short-answer";

export interface MCQOption {
  id: string;    // "a" | "b" | "c" | "d"
  text: string;
}

export interface AssessmentQuestion {
  id: string;
  questionNumber: number;
  type: QuestionType;
  questionText: string;
  marks: number;
  /** Only present for multiple-choice questions */
  options?: MCQOption[];
  /**
   * Reserved for future AI fields:
   * e.g. topicTag, difficultyLevel, curriculumCode
   */
  metadata?: Record<string, unknown>;
}

// ─── Session ─────────────────────────────────────────────────────────────────

export interface AssessmentSession {
  id: string;
  subject: string;
  grade: string;
  academicYear: string;
  durationMinutes: number;
  totalMarks: number;
  questions: AssessmentQuestion[];
}

// ─── Answer State ─────────────────────────────────────────────────────────────

/** Maps questionId → answer string (option id for MCQ, text for short-answer) */
export type AnswerMap = Record<string, string>;

// ─── Submission ───────────────────────────────────────────────────────────────

export interface AssessmentSubmission {
  sessionId: string;
  answers: AnswerMap;
  submittedAt: string;     // ISO timestamp
  timeTakenSeconds: number;
}
