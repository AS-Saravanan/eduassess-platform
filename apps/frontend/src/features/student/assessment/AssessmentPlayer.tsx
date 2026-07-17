/**
 * AssessmentPlayer
 *
 * Orchestrates the full exam-taking session.
 * Owns: currentIndex, answers map, submit confirmation state.
 */

import React, { useState, useCallback } from "react";
import { Send } from "lucide-react";
import { AssessmentTimer } from "./AssessmentTimer";
import { QuestionCard } from "./QuestionCard";
import { QuestionNavigation } from "./QuestionNavigation";
import { AssessmentSummary } from "./AssessmentSummary";
import type { AssessmentSession, AnswerMap } from "./assessment.types";

interface AssessmentPlayerProps {
  session: AssessmentSession;
  onSubmit: (answers: AnswerMap, timeTakenSeconds: number) => void;
}

export const AssessmentPlayer: React.FC<AssessmentPlayerProps> = ({
  session,
  onSubmit,
}) => {
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [answers, setAnswers]             = useState<AnswerMap>({});
  const [showSummary, setShowSummary]     = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const { questions } = session;
  const currentQuestion = questions[currentIndex];
  const answeredCount   = Object.values(answers).filter((v) => v.trim() !== "").length;
  const progressPct     = Math.round((answeredCount / questions.length) * 100);

  const handleAnswerChange = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    },
    [currentQuestion.id]
  );

  const handleTimeUp = useCallback(() => {
    // Auto-submit when timer expires
    onSubmit(answers, session.durationMinutes * 60);
  }, [answers, onSubmit, session.durationMinutes]);

  const handleConfirmSubmit = () => {
    onSubmit(answers, elapsedSeconds);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* ── Top Header Bar ─────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Session info */}
          <div className="min-w-0">
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              {session.grade} · {session.subject}
            </p>
            <p className="text-sm font-bold text-slate-900 mt-0.5 truncate">
              Assessment in Progress
            </p>
          </div>

          {/* Timer */}
          <AssessmentTimer
            durationMinutes={session.durationMinutes}
            onTimeUp={handleTimeUp}
            onTick={setElapsedSeconds}
          />

          {/* Submit button */}
          <button
            onClick={() => setShowSummary(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0"
            id="open-submit-modal"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Submit</span>
          </button>
        </div>
      </header>

      {/* ── Progress Bar ───────────────────────────────────────── */}
      <div className="h-1.5 bg-slate-200 w-full">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${answeredCount} of ${questions.length} questions answered`}
        />
      </div>

      {/* ── Main Content ───────────────────────────────────────── */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Question area — grows */}
          <div className="flex-1 min-w-0">
            <QuestionCard
              question={currentQuestion}
              answer={answers[currentQuestion.id] ?? ""}
              onChange={handleAnswerChange}
              totalQuestions={questions.length}
            />
          </div>

          {/* Navigation panel — fixed width sidebar on lg+ */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs sticky top-24">
              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">
                Question Navigator
              </p>
              <QuestionNavigation
                questions={questions}
                currentIndex={currentIndex}
                answers={answers}
                onJump={setCurrentIndex}
                onPrevious={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                onNext={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Submit Confirmation Modal ───────────────────────────── */}
      {showSummary && (
        <AssessmentSummary
          totalQuestions={questions.length}
          answeredCount={answeredCount}
          onConfirm={handleConfirmSubmit}
          onCancel={() => setShowSummary(false)}
        />
      )}
    </div>
  );
};

export default AssessmentPlayer;
