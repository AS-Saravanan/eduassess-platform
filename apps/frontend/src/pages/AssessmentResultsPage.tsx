/**
 * AssessmentResultsPage – /assessment/results
 *
 * Post-submission placeholder. No evaluation logic.
 * Displays submission summary and a link back to the dashboard.
 */

import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  CheckCircle2,
  LayoutDashboard,
  Clock,
  BookOpen,
  Sparkles,
  BrainCircuit,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

interface SubmissionState {
  sessionId: string;
  subject: string;
  grade: string;
  totalQuestions: number;
  answeredCount: number;
  timeTakenSeconds: number;
  submittedAt: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export default function AssessmentResultsPage() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);

  const state = location.state as SubmissionState | null;

  // Fallback if navigated here directly without state
  const submission: SubmissionState = state ?? {
    sessionId:        "unknown",
    subject:          "Mathematics",
    grade:            "Grade 10",
    totalQuestions:   10,
    answeredCount:    0,
    timeTakenSeconds: 0,
    submittedAt:      new Date().toISOString(),
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-slate-100 h-16 px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display font-bold text-slate-950">EduAssess</span>
        </div>
        <Link
          to="/dashboard"
          className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          Back to Dashboard
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg space-y-6">

          {/* Success banner */}
          <div className="text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-extrabold text-slate-950">
                Assessment Submitted!
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1.5">
                Your answers have been recorded successfully.
              </p>
            </div>
          </div>

          {/* Submission summary */}
          <Card className="bg-white">
            <CardContent className="p-6 space-y-4">
              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                Submission Summary
              </p>

              <div className="space-y-3">
                {[
                  {
                    icon: <BookOpen className="h-4 w-4 text-blue-500" />,
                    label: "Subject",
                    value: `${submission.grade} · ${submission.subject}`,
                  },
                  {
                    icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
                    label: "Questions Answered",
                    value: `${submission.answeredCount} / ${submission.totalQuestions}`,
                  },
                  {
                    icon: <Clock className="h-4 w-4 text-violet-500" />,
                    label: "Time Taken",
                    value: formatTime(submission.timeTakenSeconds),
                  },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-500">
                      {icon}
                      {label}
                    </div>
                    <span className="text-sm font-bold text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI evaluation placeholder */}
          <Card className="bg-white border-dashed border-2 border-slate-200">
            <CardContent className="p-6 text-center space-y-3">
              <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">
                  AI Evaluation Pending
                </p>
                <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
                  Your answers will be intelligently evaluated by the AI engine once 
                  the backend pipeline is active. Detailed feedback and scores will 
                  appear here.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action */}
          <Button
            variant="primary"
            onClick={() => navigate("/dashboard")}
            leftIcon={<LayoutDashboard className="h-4 w-4" />}
            className="w-full"
            id="results-back-to-dashboard"
          >
            Return to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
