/**
 * EduAssess – useExamPatterns Hook
 *
 * Feature-level state hook that owns the exam pattern collection.
 * All CRUD operations go through this hook — components never mutate data directly.
 *
 * Migration path:
 *   Current  → initialises from EXAM_PATTERN_SEED_DATA (mock)
 *   Future   → replace seed initialisation with an API fetch:
 *              const [patterns, setPatterns] = useState<ExamPattern[]>([]);
 *              useEffect(() => { apiService.getPatterns().then(setPatterns); }, []);
 */

import { useState, useCallback } from "react";
import type { ExamPattern, ExamPatternDraft } from "./examPattern.types";
import { EXAM_PATTERN_SEED_DATA } from "./examPattern.mock";

/** Compute totalMarks from sections so it is always consistent. */
function computeTotalMarks(pattern: ExamPatternDraft): number {
  return pattern.sections.reduce(
    (sum, s) => sum + s.numberOfQuestions * s.marksPerQuestion,
    0
  );
}

/** Generate a lightweight unique id (sufficient for mock state). */
function generateId(): string {
  return `ep-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export interface UseExamPatternsReturn {
  patterns: ExamPattern[];
  getById: (id: string) => ExamPattern | undefined;
  createPattern: (draft: ExamPatternDraft) => ExamPattern;
  updatePattern: (id: string, draft: ExamPatternDraft) => void;
  deletePattern: (id: string) => void;
}

export function useExamPatterns(): UseExamPatternsReturn {
  // Deep-copy seed data so the immutable seed is never mutated.
  const [patterns, setPatterns] = useState<ExamPattern[]>(() =>
    EXAM_PATTERN_SEED_DATA.map((p) => ({ ...p }))
  );

  const getById = useCallback(
    (id: string) => patterns.find((p) => p.id === id),
    [patterns]
  );

  const createPattern = useCallback((draft: ExamPatternDraft): ExamPattern => {
    const newPattern: ExamPattern = {
      ...draft,
      id: generateId(),
      totalMarks: computeTotalMarks(draft),
    };
    setPatterns((prev) => [newPattern, ...prev]);
    return newPattern;
  }, []);

  const updatePattern = useCallback(
    (id: string, draft: ExamPatternDraft) => {
      setPatterns((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...draft, id, totalMarks: computeTotalMarks(draft) }
            : p
        )
      );
    },
    []
  );

  const deletePattern = useCallback((id: string) => {
    setPatterns((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { patterns, getById, createPattern, updatePattern, deletePattern };
}
