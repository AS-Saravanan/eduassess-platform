/**
 * EduAssess – Assessment Mock Data
 *
 * One mock session: Grade 10 Mathematics, 10 questions.
 * 7 × Multiple Choice, 3 × Short Answer.
 *
 * Future: replace with API call from AI question generator.
 */

import type { AssessmentSession } from "./assessment.types";

export const MOCK_ASSESSMENT_SESSION: AssessmentSession = {
  id: "session-math-gr10-001",
  subject: "Mathematics",
  grade: "Grade 10",
  academicYear: "2025-2026",
  durationMinutes: 45,
  totalMarks: 40,
  questions: [
    // ── Multiple Choice (Q1–Q7) ──────────────────────────────────
    {
      id: "q1",
      questionNumber: 1,
      type: "multiple-choice",
      questionText:
        "If 2x + 5 = 17, what is the value of x?",
      marks: 2,
      options: [
        { id: "a", text: "4" },
        { id: "b", text: "5" },
        { id: "c", text: "6" },
        { id: "d", text: "7" },
      ],
    },
    {
      id: "q2",
      questionNumber: 2,
      type: "multiple-choice",
      questionText:
        "The sum of the angles of a triangle is:",
      marks: 2,
      options: [
        { id: "a", text: "90°" },
        { id: "b", text: "180°" },
        { id: "c", text: "270°" },
        { id: "d", text: "360°" },
      ],
    },
    {
      id: "q3",
      questionNumber: 3,
      type: "multiple-choice",
      questionText:
        "Which of the following is a prime number?",
      marks: 2,
      options: [
        { id: "a", text: "15" },
        { id: "b", text: "21" },
        { id: "c", text: "29" },
        { id: "d", text: "33" },
      ],
    },
    {
      id: "q4",
      questionNumber: 4,
      type: "multiple-choice",
      questionText:
        "What is the area of a circle with radius 7 cm? (Use π = 22/7)",
      marks: 3,
      options: [
        { id: "a", text: "144 cm²" },
        { id: "b", text: "154 cm²" },
        { id: "c", text: "164 cm²" },
        { id: "d", text: "174 cm²" },
      ],
    },
    {
      id: "q5",
      questionNumber: 5,
      type: "multiple-choice",
      questionText:
        "The HCF of 12 and 18 is:",
      marks: 2,
      options: [
        { id: "a", text: "2" },
        { id: "b", text: "4" },
        { id: "c", text: "6" },
        { id: "d", text: "9" },
      ],
    },
    {
      id: "q6",
      questionNumber: 6,
      type: "multiple-choice",
      questionText:
        "A polynomial of degree 2 is called a:",
      marks: 2,
      options: [
        { id: "a", text: "Linear polynomial" },
        { id: "b", text: "Quadratic polynomial" },
        { id: "c", text: "Cubic polynomial" },
        { id: "d", text: "Constant polynomial" },
      ],
    },
    {
      id: "q7",
      questionNumber: 7,
      type: "multiple-choice",
      questionText:
        "If tan θ = 1, then θ equals:",
      marks: 3,
      options: [
        { id: "a", text: "30°" },
        { id: "b", text: "45°" },
        { id: "c", text: "60°" },
        { id: "d", text: "90°" },
      ],
    },

    // ── Short Answer (Q8–Q10) ────────────────────────────────────
    {
      id: "q8",
      questionNumber: 8,
      type: "short-answer",
      questionText:
        "Solve for x: 3x² − 12 = 0. Show your working.",
      marks: 5,
    },
    {
      id: "q9",
      questionNumber: 9,
      type: "short-answer",
      questionText:
        "Prove that the diagonal of a rectangle divides it into two congruent right-angled triangles.",
      marks: 7,
    },
    {
      id: "q10",
      questionNumber: 10,
      type: "short-answer",
      questionText:
        "A bag contains 3 red, 5 blue, and 2 green balls. A ball is drawn at random. What is the probability that it is not red? Express your answer as a fraction in its simplest form.",
      marks: 5,
    },
  ],
};
