/**
 * AssessmentTimer
 *
 * Counts down from durationMinutes.
 * - Normal: slate colour
 * - ≤ 5 min: amber warning
 * - ≤ 1 min: red urgent + pulse
 * - Zero: calls onTimeUp()
 */

import React, { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";

interface AssessmentTimerProps {
  durationMinutes: number;
  onTimeUp: () => void;
  /** Expose elapsed seconds to parent for submission metadata */
  onTick?: (elapsedSeconds: number) => void;
}

export const AssessmentTimer: React.FC<AssessmentTimerProps> = ({
  durationMinutes,
  onTimeUp,
  onTick,
}) => {
  const totalSeconds           = durationMinutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const onTimeUpRef            = useRef(onTimeUp);
  const onTickRef              = useRef(onTick);

  // Keep refs current so effects don't stale-close over callbacks
  useEffect(() => { onTimeUpRef.current = onTimeUp; }, [onTimeUp]);
  useEffect(() => { onTickRef.current = onTick; }, [onTick]);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeUpRef.current();
      return;
    }
    const id = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        onTickRef.current?.(totalSeconds - next);
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [remaining, totalSeconds]);

  const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
  const secs = String(remaining % 60).padStart(2, "0");

  const isUrgent  = remaining <= 60;
  const isWarning = remaining <= 300 && !isUrgent;

  const colourCls = isUrgent
    ? "text-red-600 bg-red-50 border-red-200"
    : isWarning
    ? "text-amber-600 bg-amber-50 border-amber-200"
    : "text-slate-700 bg-white border-slate-200";

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-sm transition-colors ${colourCls} ${
        isUrgent ? "animate-pulse" : ""
      }`}
      aria-label={`Time remaining: ${mins} minutes ${secs} seconds`}
      role="timer"
    >
      <Clock className="h-4 w-4 shrink-0" />
      {mins}:{secs}
    </div>
  );
};

export default AssessmentTimer;
