/**
 * ExamPatternList
 *
 * Renders the collection of exam patterns as a rich card grid with
 * status badges, summary stats, and View/Edit actions.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Pencil, Clock, BookOpen, BarChart3 } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent } from "../../../components/ui/Card";
import type { ExamPattern } from "./examPattern.types";

interface ExamPatternListProps {
  patterns: ExamPattern[];
}

const StatusBadge: React.FC<{ status: ExamPattern["status"] }> = ({ status }) => {
  const styles =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : "bg-amber-50 text-amber-700 border-amber-100";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Active" ? "bg-emerald-500" : "bg-amber-400"
        }`}
      />
      {status}
    </span>
  );
};

export const ExamPatternList: React.FC<ExamPatternListProps> = ({ patterns }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-extrabold text-slate-950">
            Exam Patterns
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            {patterns.length} pattern{patterns.length !== 1 ? "s" : ""} configured
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => navigate("/admin/exam-patterns/create")}
          id="create-exam-pattern-btn"
        >
          Create New Pattern
        </Button>
      </div>

      {/* Empty state */}
      {patterns.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
          <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-700">No exam patterns yet</p>
            <p className="text-sm text-slate-400 mt-1">
              Create your first exam pattern to get started.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => navigate("/admin/exam-patterns/create")}
          >
            Create Pattern
          </Button>
        </div>
      )}

      {/* Pattern Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {patterns.map((pattern) => {
          const totalQuestions = pattern.sections.reduce(
            (sum, s) => sum + s.numberOfQuestions,
            0
          );
          return (
            <Card key={pattern.id} hoverable className="bg-white">
              <CardContent className="p-6 space-y-4">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-extrabold text-slate-950 text-base leading-tight line-clamp-2">
                      {pattern.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      {pattern.grade} · {pattern.subject}
                    </p>
                  </div>
                  <StatusBadge status={pattern.status} />
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="h-3.5 w-3.5 text-slate-400" />
                    {pattern.totalMarks} marks
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {pattern.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                    {pattern.sections.length} section{pattern.sections.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Section chips */}
                {pattern.sections.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {pattern.sections.map((s) => (
                      <span
                        key={s.id}
                        className="inline-block text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full"
                      >
                        {s.name}: {s.numberOfQuestions}Q × {s.marksPerQuestion}m
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer: year + actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    AY {pattern.academicYear} · {totalQuestions} questions
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Eye className="h-3.5 w-3.5" />}
                      onClick={() => navigate(`/admin/exam-patterns/${pattern.id}`)}
                      className="text-slate-600 hover:text-slate-950 text-xs px-3"
                      id={`view-pattern-${pattern.id}`}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Pencil className="h-3.5 w-3.5" />}
                      onClick={() => navigate(`/admin/exam-patterns/${pattern.id}/edit`)}
                      className="text-blue-600 border-blue-100 hover:bg-blue-50 text-xs px-3"
                      id={`edit-pattern-${pattern.id}`}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ExamPatternList;
