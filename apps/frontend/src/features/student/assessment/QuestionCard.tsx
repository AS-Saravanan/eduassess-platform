/**
 * QuestionCard
 *
 * Renders one question at a time.
 * - Multiple Choice: option buttons with selection highlight
 * - Short Answer: textarea for free-form input
 */

import React from "react";
import type { AssessmentQuestion } from "./assessment.types";

interface QuestionCardProps {
  question: AssessmentQuestion;
  answer: string;
  onChange: (value: string) => void;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onChange,
  totalQuestions,
}) => {
  return (
    <div className="space-y-6">
      {/* Question header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-8 w-8 rounded-lg bg-blue-600 text-white text-sm font-extrabold flex items-center justify-center shrink-0">
            {question.questionNumber}
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Question {question.questionNumber} of {totalQuestions}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              question.type === "multiple-choice"
                ? "bg-blue-50 text-blue-700 border-blue-100"
                : "bg-violet-50 text-violet-700 border-violet-100"
            }`}
          >
            {question.type === "multiple-choice" ? "Multiple Choice" : "Short Answer"}
          </span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {question.marks} {question.marks === 1 ? "mark" : "marks"}
          </span>
        </div>
      </div>

      {/* Question text */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <p className="text-slate-900 font-semibold text-base leading-relaxed">
          {question.questionText}
        </p>
      </div>

      {/* Answer area */}
      {question.type === "multiple-choice" && question.options ? (
        <div className="space-y-3">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            Select one answer
          </p>
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option) => {
              const isSelected = answer === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => onChange(option.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white border-slate-200 text-slate-800 hover:border-blue-300 hover:bg-blue-50/40"
                  }`}
                  id={`option-${question.id}-${option.id}`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-extrabold uppercase shrink-0 ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {option.id}
                  </span>
                  <span className="font-semibold text-sm">{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            Write your answer
          </p>
          <textarea
            value={answer}
            onChange={(e) => onChange(e.target.value)}
            rows={6}
            placeholder="Type your answer here..."
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none leading-relaxed"
            id={`answer-${question.id}`}
            aria-label={`Answer for question ${question.questionNumber}`}
          />
          <p className="text-[11px] text-slate-400 font-medium text-right">
            {answer.length} characters
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
