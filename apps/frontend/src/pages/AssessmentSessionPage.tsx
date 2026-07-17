/**
 * AssessmentSessionPage – /assessment/session
 *
 * Loads the mock assessment session and renders AssessmentPlayer.
 * On submit, navigates to /assessment/results with the submission data.
 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AssessmentPlayer } from "../features/student/assessment/AssessmentPlayer";
import { MOCK_ASSESSMENT_SESSION } from "../features/student/assessment/assessment.mock";
import type { AnswerMap } from "../features/student/assessment/assessment.types";

export default function AssessmentSessionPage() {
  const { user } = useAuth();
  const navigate  = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);

  const handleSubmit = (answers: AnswerMap, timeTakenSeconds: number) => {
    const submission = {
      sessionId:       MOCK_ASSESSMENT_SESSION.id,
      subject:         MOCK_ASSESSMENT_SESSION.subject,
      grade:           MOCK_ASSESSMENT_SESSION.grade,
      totalQuestions:  MOCK_ASSESSMENT_SESSION.questions.length,
      answeredCount:   Object.values(answers).filter((v) => v.trim() !== "").length,
      timeTakenSeconds,
      submittedAt:     new Date().toISOString(),
    };

    navigate("/assessment/results", {
      replace: true,
      state: submission,
    });
  };

  if (!user) return null;

  return (
    <AssessmentPlayer
      session={MOCK_ASSESSMENT_SESSION}
      onSubmit={handleSubmit}
    />
  );
}
