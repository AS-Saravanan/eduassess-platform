/**
 * EduAssess – Academic Content Seed Data
 *
 * Immutable initial dataset. State mutations happen in useAcademicContent only.
 * Mirrors the existing mockAcademicData subjects so the library transition feels natural.
 */

import type { AcademicContent } from "./academicContent.types";

const PENDING_STEPS = {
  textExtraction: "Pending" as const,
  chapterDetection: "Pending" as const,
  knowledgeIndexing: "Pending" as const,
};

export const ACADEMIC_CONTENT_SEED: readonly AcademicContent[] = [
  // ── Grade 10 Mathematics ──────────────────────────────────────
  {
    id: "ac-001",
    title: "Mathematics Volume 1",
    grade: "Grade 10",
    subject: "Mathematics",
    academicYear: "2025-2026",
    contentType: "Full Book",
    fileName: "Math_Grade10_Vol1.pdf",
    uploadDate: "2025-06-01",
    processingStatus: "Uploaded",
    aiProcessingSteps: PENDING_STEPS,
  },
  {
    id: "ac-002",
    title: "Mathematics Volume 2",
    grade: "Grade 10",
    subject: "Mathematics",
    academicYear: "2025-2026",
    contentType: "Full Book",
    fileName: "Math_Grade10_Vol2.pdf",
    uploadDate: "2025-06-01",
    processingStatus: "Uploaded",
    aiProcessingSteps: PENDING_STEPS,
  },
  // ── Grade 10 Science ──────────────────────────────────────────
  {
    id: "ac-003",
    title: "Physics",
    grade: "Grade 10",
    subject: "Science",
    academicYear: "2025-2026",
    contentType: "Full Book",
    fileName: "Physics_Grade10.pdf",
    uploadDate: "2025-06-05",
    processingStatus: "Uploaded",
    aiProcessingSteps: PENDING_STEPS,
  },
  {
    id: "ac-004",
    title: "Chapter 3 – Laws of Motion",
    grade: "Grade 10",
    subject: "Science",
    academicYear: "2025-2026",
    contentType: "Chapter",
    chapterName: "Laws of Motion",
    parentBookTitle: "Physics",
    fileName: "Physics_Grade10_Ch3_LawsOfMotion.pdf",
    uploadDate: "2025-06-10",
    processingStatus: "Uploaded",
    aiProcessingSteps: PENDING_STEPS,
  },
  {
    id: "ac-005",
    title: "Chemistry",
    grade: "Grade 10",
    subject: "Science",
    academicYear: "2025-2026",
    contentType: "Full Book",
    fileName: "Chemistry_Grade10.pdf",
    uploadDate: "2025-06-05",
    processingStatus: "Uploaded",
    aiProcessingSteps: PENDING_STEPS,
  },
  // ── Grade 12 Physics ──────────────────────────────────────────
  {
    id: "ac-006",
    title: "Core Physics Volume I",
    grade: "Grade 12",
    subject: "Physics",
    academicYear: "2025-2026",
    contentType: "Full Book",
    fileName: "CorePhysics_Grade12_Vol1.pdf",
    uploadDate: "2025-06-08",
    processingStatus: "Uploaded",
    aiProcessingSteps: PENDING_STEPS,
  },
  {
    id: "ac-007",
    title: "Chapter 1 – Electrostatics",
    grade: "Grade 12",
    subject: "Physics",
    academicYear: "2025-2026",
    contentType: "Chapter",
    chapterName: "Electrostatics",
    parentBookTitle: "Core Physics Volume I",
    fileName: "CorePhysics_Grade12_Vol1_Ch1_Electrostatics.pdf",
    uploadDate: "2025-06-12",
    processingStatus: "Uploaded",
    aiProcessingSteps: PENDING_STEPS,
  },
  // ── Grade 11 Chemistry ────────────────────────────────────────
  {
    id: "ac-008",
    title: "Organic Chemistry",
    grade: "Grade 11",
    subject: "Chemistry",
    academicYear: "2025-2026",
    contentType: "Full Book",
    fileName: "OrganicChem_Grade11.pdf",
    uploadDate: "2025-06-03",
    processingStatus: "Uploaded",
    aiProcessingSteps: PENDING_STEPS,
  },
  // ── Grade 9 English ───────────────────────────────────────────
  {
    id: "ac-009",
    title: "English Reader",
    grade: "Grade 9",
    subject: "English",
    academicYear: "2025-2026",
    contentType: "Full Book",
    fileName: "EnglishReader_Grade9.pdf",
    uploadDate: "2025-06-02",
    processingStatus: "Uploaded",
    aiProcessingSteps: PENDING_STEPS,
  },
  {
    id: "ac-010",
    title: "Chapter 5 – Poetry Analysis",
    grade: "Grade 9",
    subject: "English",
    academicYear: "2025-2026",
    contentType: "Chapter",
    chapterName: "Poetry Analysis",
    parentBookTitle: "English Reader",
    fileName: "EnglishReader_Grade9_Ch5_Poetry.pdf",
    uploadDate: "2025-06-14",
    processingStatus: "Uploaded",
    aiProcessingSteps: PENDING_STEPS,
  },
];
