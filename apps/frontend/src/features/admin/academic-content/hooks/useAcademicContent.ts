/**
 * EduAssess – useAcademicContent Hook
 *
 * Feature-level state hook owning the academic content collection.
 * Components never mutate data directly — all changes go through this hook.
 *
 * Migration path:
 *   Current  → initialises from ACADEMIC_CONTENT_SEED (mock)
 *   Future   → replace initialisation with API fetch:
 *              useEffect(() => { api.getContent().then(setContent) }, []);
 */

import { useState, useCallback } from "react";
import type { AcademicContent, AcademicContentDraft } from "../types/academicContent.types";
import { ACADEMIC_CONTENT_SEED } from "../data/academicContent.mock";

function generateId(): string {
  return `ac-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export interface UseAcademicContentReturn {
  content: AcademicContent[];
  getById: (id: string) => AcademicContent | undefined;
  addContent: (draft: AcademicContentDraft) => AcademicContent;
  removeContent: (id: string) => void;
}

export function useAcademicContent(): UseAcademicContentReturn {
  const [content, setContent] = useState<AcademicContent[]>(() =>
    ACADEMIC_CONTENT_SEED.map((c) => ({ ...c }))
  );

  const getById = useCallback(
    (id: string) => content.find((c) => c.id === id),
    [content]
  );

  const addContent = useCallback(
    (draft: AcademicContentDraft): AcademicContent => {
      const newItem: AcademicContent = {
        ...draft,
        id: generateId(),
        uploadDate: todayISO(),
        aiProcessingSteps: {
          textExtraction: "Pending",
          chapterDetection: "Pending",
          knowledgeIndexing: "Pending",
        },
      };
      setContent((prev) => [newItem, ...prev]);
      return newItem;
    },
    []
  );

  const removeContent = useCallback((id: string) => {
    setContent((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { content, getById, addContent, removeContent };
}
