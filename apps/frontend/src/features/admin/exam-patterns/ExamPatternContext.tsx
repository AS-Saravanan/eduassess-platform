/**
 * ExamPatternContext
 *
 * Provides a single shared useExamPatterns instance across all
 * admin exam-pattern pages, so create/edit/delete operations persist
 * across route navigation without a global store.
 *
 * Migration path: swap useExamPatterns internals for API calls —
 * no changes needed here or in the pages.
 */

import React, { createContext, useContext } from "react";
import {
  useExamPatterns,
  UseExamPatternsReturn,
} from "./useExamPatterns";

const ExamPatternContext = createContext<UseExamPatternsReturn | null>(null);

export const ExamPatternProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = useExamPatterns();
  return (
    <ExamPatternContext.Provider value={value}>
      {children}
    </ExamPatternContext.Provider>
  );
};

export function useExamPatternContext(): UseExamPatternsReturn {
  const ctx = useContext(ExamPatternContext);
  if (!ctx) {
    throw new Error(
      "useExamPatternContext must be used within <ExamPatternProvider>"
    );
  }
  return ctx;
}
