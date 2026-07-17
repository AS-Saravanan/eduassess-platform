/**
 * QuestionNavigation
 *
 * Numbered grid for direct question jumping.
 * Each button shows answered / unanswered / current state.
 * Previous / Next buttons for sequential navigation.
 */

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AssessmentQuestion, AnswerMap } from "./assessment.types";

interface QuestionNavigationProps {
  questions: AssessmentQuestion[];
  currentIndex: number;
  answers: AnswerMap;
  onJump: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questions,
  currentIndex,
  answers,
  onJump,
  onPrevious,
  onNext,
}) => {
  const answeredCount = Object.values(answers).filter((v) => v.trim() !== "").length;

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-blue-600 inline-block" />
          Current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-emerald-500 inline-block" />
          Answered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-slate-200 inline-block" />
          Not answered
        </span>
      </div>

      {/* Number grid */}
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => {
          const isCurrent  = idx === currentIndex;
          const isAnswered = Boolean(answers[q.id]?.trim());

          const btnCls = isCurrent
            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
            : isAnswered
            ? "bg-emerald-500 text-white border-emerald-500"
            : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50";

          return (
            <button
              key={q.id}
              onClick={() => onJump(idx)}
              className={`h-9 w-9 rounded-lg border text-xs font-extrabold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${btnCls}`}
              id={`nav-q${q.questionNumber}`}
              aria-label={`Go to question ${q.questionNumber}`}
              aria-current={isCurrent ? "true" : undefined}
            >
              {q.questionNumber}
            </button>
          );
        })}
      </div>

      {/* Progress summary */}
      <p className="text-xs font-semibold text-slate-400">
        {answeredCount} of {questions.length} answered
      </p>

      {/* Previous / Next */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          id="nav-previous"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={currentIndex === questions.length - 1}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          id="nav-next"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default QuestionNavigation;
