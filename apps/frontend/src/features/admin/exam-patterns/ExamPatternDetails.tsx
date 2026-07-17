/**
 * ExamPatternDetails
 *
 * Read-only view of a single ExamPattern showing:
 *  - Exam metadata
 *  - Section distribution table
 *  - Marks distribution summary
 *  - Uploaded sample papers
 */

import React from "react";
import { ArrowLeft, Pencil, Clock, BookOpen, FileText, BarChart3 } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import type { ExamPattern } from "./examPattern.types";

interface ExamPatternDetailsProps {
  pattern: ExamPattern;
  onEdit: () => void;
  onBack: () => void;
}

const StatusBadge: React.FC<{ status: ExamPattern["status"] }> = ({ status }) => {
  const styles =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : "bg-amber-50 text-amber-700 border-amber-100";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          status === "Active" ? "bg-emerald-500" : "bg-amber-400"
        }`}
      />
      {status}
    </span>
  );
};

export const ExamPatternDetails: React.FC<ExamPatternDetailsProps> = ({
  pattern,
  onEdit,
  onBack,
}) => {
  const totalQuestions = pattern.sections.reduce(
    (sum, s) => sum + s.numberOfQuestions,
    0
  );

  return (
    <div className="space-y-6">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={onBack}
          className="text-slate-500 hover:text-slate-900 shrink-0 mt-0.5"
          id="back-to-patterns"
        >
          Back
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-xl font-display font-extrabold text-slate-950 leading-tight">
                {pattern.name}
              </h1>
              <p className="text-sm text-slate-500 font-semibold mt-1">
                {pattern.grade} · {pattern.subject} · AY {pattern.academicYear}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge status={pattern.status} />
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Pencil className="h-3.5 w-3.5" />}
                onClick={onEdit}
                className="text-blue-600 border-blue-100 hover:bg-blue-50"
                id="edit-pattern-details-btn"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Exam Overview ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Marks",
            value: pattern.totalMarks,
            icon: <BarChart3 className="h-4 w-4 text-blue-500" />,
            bg: "bg-blue-50",
          },
          {
            label: "Duration",
            value: pattern.duration,
            icon: <Clock className="h-4 w-4 text-violet-500" />,
            bg: "bg-violet-50",
          },
          {
            label: "Sections",
            value: pattern.sections.length,
            icon: <BookOpen className="h-4 w-4 text-emerald-500" />,
            bg: "bg-emerald-50",
          },
          {
            label: "Total Questions",
            value: totalQuestions,
            icon: <FileText className="h-4 w-4 text-amber-500" />,
            bg: "bg-amber-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-slate-100 rounded-2xl p-4 space-y-2"
          >
            <div
              className={`h-8 w-8 rounded-lg ${stat.bg} flex items-center justify-center`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-950">{stat.value}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Assessment Blueprint / Section Distribution ────────── */}
      <Card className="bg-white">
        <CardHeader className="px-6 pt-6 pb-0">
          <CardTitle className="text-base font-display font-extrabold text-slate-950">
            Assessment Blueprint
          </CardTitle>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Section-level breakdown of question types, counts, and mark allocation.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          {pattern.sections.length === 0 ? (
            <p className="text-sm text-slate-400 font-medium text-center py-6">
              No sections defined for this exam pattern.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left text-xs font-extrabold text-slate-400 uppercase tracking-wider pb-3 pr-4">
                      Section
                    </th>
                    <th className="text-left text-xs font-extrabold text-slate-400 uppercase tracking-wider pb-3 pr-4">
                      Question Type
                    </th>
                    <th className="text-right text-xs font-extrabold text-slate-400 uppercase tracking-wider pb-3 pr-4">
                      Questions
                    </th>
                    <th className="text-right text-xs font-extrabold text-slate-400 uppercase tracking-wider pb-3 pr-4">
                      Marks Each
                    </th>
                    <th className="text-right text-xs font-extrabold text-slate-400 uppercase tracking-wider pb-3">
                      Section Marks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {pattern.sections.map((section) => {
                    const sectionMarks =
                      section.numberOfQuestions * section.marksPerQuestion;
                    const pct = pattern.totalMarks
                      ? Math.round((sectionMarks / pattern.totalMarks) * 100)
                      : 0;
                    return (
                      <tr key={section.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 pr-4 font-semibold text-slate-800">
                          {section.name}
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className="inline-block text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                            {section.questionType}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 text-right font-bold text-slate-800">
                          {section.numberOfQuestions}
                        </td>
                        <td className="py-3.5 pr-4 text-right font-bold text-slate-800">
                          {section.marksPerQuestion}
                        </td>
                        <td className="py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="hidden sm:block w-16 bg-slate-100 rounded-full h-1.5">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="font-extrabold text-slate-950">
                              {sectionMarks}
                            </span>
                            <span className="text-xs text-slate-400">({pct}%)</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200">
                    <td colSpan={4} className="pt-3 font-extrabold text-slate-950 text-sm">
                      Total
                    </td>
                    <td className="pt-3 text-right font-extrabold text-blue-600 text-base">
                      {pattern.totalMarks}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Sample Papers ───────────────────────────────────────── */}
      <Card className="bg-white">
        <CardHeader className="px-6 pt-6 pb-0">
          <CardTitle className="text-base font-display font-extrabold text-slate-950">
            Sample Papers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {pattern.samplePapers.length === 0 ? (
            <p className="text-sm text-slate-400 font-medium text-center py-6">
              No sample papers uploaded for this pattern.
            </p>
          ) : (
            <ul className="space-y-2">
              {pattern.samplePapers.map((paper) => (
                <li
                  key={paper.id}
                  className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                >
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {paper.fileName}
                    </p>
                    {paper.label && (
                      <p className="text-xs text-slate-400 font-medium">{paper.label}</p>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold shrink-0">
                    {paper.uploadedDate}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default ExamPatternDetails;
