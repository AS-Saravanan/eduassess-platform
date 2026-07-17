/**
 * AssessmentSummary
 *
 * Pre-submit confirmation modal.
 * Shows answered / unanswered counts and asks for final confirmation.
 */

import React from "react";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface AssessmentSummaryProps {
  totalQuestions: number;
  answeredCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AssessmentSummary: React.FC<AssessmentSummaryProps> = ({
  totalQuestions,
  answeredCount,
  onConfirm,
  onCancel,
}) => {
  const unansweredCount = totalQuestions - answeredCount;
  const allAnswered     = unansweredCount === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="font-display font-extrabold text-slate-950 text-lg">
            Submit Assessment?
          </h2>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-emerald-700">{answeredCount}</p>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mt-1">Answered</p>
            </div>
            <div className={`${unansweredCount > 0 ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100"} border rounded-xl p-4 text-center`}>
              <p className={`text-2xl font-extrabold ${unansweredCount > 0 ? "text-amber-700" : "text-slate-400"}`}>
                {unansweredCount}
              </p>
              <p className={`text-xs font-bold uppercase tracking-wide mt-1 ${unansweredCount > 0 ? "text-amber-600" : "text-slate-400"}`}>
                Unanswered
              </p>
            </div>
          </div>

          {/* Warning if unanswered */}
          {!allAnswered && (
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl p-3.5">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-amber-700 leading-relaxed">
                You have {unansweredCount} unanswered question{unansweredCount > 1 ? "s" : ""}. 
                Unanswered questions will receive no marks.
              </p>
            </div>
          )}

          {allAnswered && (
            <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl p-3.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <p className="text-xs font-semibold text-emerald-700">
                All questions answered. You're ready to submit!
              </p>
            </div>
          )}

          <p className="text-xs text-slate-400 font-medium text-center">
            Once submitted, you cannot change your answers.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 text-slate-600"
            id="summary-cancel"
          >
            Go Back
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            className="flex-1"
            id="summary-confirm"
          >
            Confirm Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSummary;
