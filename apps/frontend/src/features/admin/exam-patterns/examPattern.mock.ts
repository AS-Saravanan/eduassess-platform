/**
 * EduAssess – Exam Pattern Seed Data
 *
 * This file exports ONLY immutable seed data used to initialise the
 * useExamPatterns hook. It is never mutated directly — all state
 * mutations happen inside the hook.
 *
 * Future migration: replace EXAM_PATTERN_SEED_DATA with an API fetch
 * inside useExamPatterns without touching this file.
 */

import type { ExamPattern } from "./examPattern.types";

export const EXAM_PATTERN_SEED_DATA: readonly ExamPattern[] = [
  {
    id: "ep-001",
    name: "Grade 10 Mathematics Final Examination",
    grade: "Grade 10",
    subject: "Mathematics",
    academicYear: "2025-2026",
    duration: "3 Hours",
    status: "Active",
    totalMarks: 100,
    sections: [
      {
        id: "s-001-a",
        name: "Section A",
        questionType: "Multiple Choice",
        numberOfQuestions: 20,
        marksPerQuestion: 1,
      },
      {
        id: "s-001-b",
        name: "Section B",
        questionType: "Short Answer",
        numberOfQuestions: 10,
        marksPerQuestion: 3,
      },
      {
        id: "s-001-c",
        name: "Section C",
        questionType: "Long Answer",
        numberOfQuestions: 5,
        marksPerQuestion: 6,
      },
    ],
    samplePapers: [
      {
        id: "sp-001-a",
        fileName: "Math_Grade10_Board_2024.pdf",
        uploadedDate: "2025-06-10",
        label: "2024 Board Paper",
      },
      {
        id: "sp-001-b",
        fileName: "Math_Grade10_Model_Paper_1.pdf",
        uploadedDate: "2025-06-15",
        label: "Model Paper 1",
      },
    ],
  },
  {
    id: "ep-002",
    name: "Grade 10 Science Mid-Term Assessment",
    grade: "Grade 10",
    subject: "Science",
    academicYear: "2025-2026",
    duration: "2 Hours 30 Minutes",
    status: "Active",
    totalMarks: 80,
    sections: [
      {
        id: "s-002-a",
        name: "Section A",
        questionType: "Multiple Choice",
        numberOfQuestions: 20,
        marksPerQuestion: 1,
      },
      {
        id: "s-002-b",
        name: "Section B",
        questionType: "Short Answer",
        numberOfQuestions: 8,
        marksPerQuestion: 3,
      },
      {
        id: "s-002-c",
        name: "Section C",
        questionType: "Long Answer",
        numberOfQuestions: 4,
        marksPerQuestion: 5,
      },
    ],
    samplePapers: [
      {
        id: "sp-002-a",
        fileName: "Science_Grade10_MidTerm_Sample.pdf",
        uploadedDate: "2025-07-01",
        label: "Sample Assessment",
      },
    ],
  },
  {
    id: "ep-003",
    name: "Grade 12 English Literature Final",
    grade: "Grade 12",
    subject: "English",
    academicYear: "2025-2026",
    duration: "3 Hours",
    status: "Active",
    totalMarks: 100,
    sections: [
      {
        id: "s-003-a",
        name: "Section A – Reading Comprehension",
        questionType: "Short Answer",
        numberOfQuestions: 10,
        marksPerQuestion: 3,
      },
      {
        id: "s-003-b",
        name: "Section B – Grammar & Usage",
        questionType: "Multiple Choice",
        numberOfQuestions: 20,
        marksPerQuestion: 1,
      },
      {
        id: "s-003-c",
        name: "Section C – Essay Writing",
        questionType: "Long Answer",
        numberOfQuestions: 2,
        marksPerQuestion: 15,
      },
    ],
    samplePapers: [],
  },
  {
    id: "ep-004",
    name: "Grade 9 Mathematics Quarterly Test",
    grade: "Grade 9",
    subject: "Mathematics",
    academicYear: "2025-2026",
    duration: "1 Hour 30 Minutes",
    status: "Draft",
    totalMarks: 50,
    sections: [
      {
        id: "s-004-a",
        name: "Section A",
        questionType: "Multiple Choice",
        numberOfQuestions: 10,
        marksPerQuestion: 1,
      },
      {
        id: "s-004-b",
        name: "Section B",
        questionType: "Short Answer",
        numberOfQuestions: 8,
        marksPerQuestion: 5,
      },
    ],
    samplePapers: [
      {
        id: "sp-004-a",
        fileName: "Math_Grade9_Q3_Sample.pdf",
        uploadedDate: "2025-07-10",
        label: "Q3 Sample",
      },
    ],
  },
];
