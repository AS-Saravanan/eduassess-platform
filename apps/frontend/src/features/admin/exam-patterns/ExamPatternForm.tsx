/**
 * ExamPatternForm
 *
 * Full form for creating and editing exam patterns.
 * Used by both ExamPatternCreatePage (blank) and ExamPatternEditPage (pre-filled).
 *
 * Parent provides:
 *   - initialData?: ExamPatternDraft  (undefined = create mode)
 *   - onSubmit(draft): void
 *   - onCancel(): void
 *   - isEditMode: boolean
 */

import React, { useState } from "react";
import { Save, X, ChevronDown } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { ExamSectionBuilder } from "./ExamSectionBuilder";
import { SamplePaperUpload } from "./SamplePaperUpload";
import type { ExamPatternDraft, ExamSection, SamplePaper } from "./examPattern.types";
import {
  GRADE_OPTIONS,
  SUBJECT_OPTIONS,
  ACADEMIC_YEAR_OPTIONS,
} from "./examPattern.types";

interface ExamPatternFormProps {
  initialData?: ExamPatternDraft;
  onSubmit: (draft: ExamPatternDraft) => void;
  onCancel: () => void;
  isEditMode?: boolean;
}

const EMPTY_DRAFT: ExamPatternDraft = {
  name: "",
  grade: GRADE_OPTIONS[4], // Grade 10 default
  subject: SUBJECT_OPTIONS[0],
  academicYear: ACADEMIC_YEAR_OPTIONS[2], // 2025-2026 default
  duration: "",
  status: "Draft",
  sections: [],
  samplePapers: [],
};

export const ExamPatternForm: React.FC<ExamPatternFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditMode = false,
}) => {
  const [form, setForm] = useState<ExamPatternDraft>(initialData ?? EMPTY_DRAFT);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived: total marks live-calculated from sections
  const computedTotalMarks = form.sections.reduce(
    (sum, s) => sum + s.numberOfQuestions * s.marksPerQuestion,
    0
  );

  const setField = <K extends keyof ExamPatternDraft>(
    key: K,
    value: ExamPatternDraft[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};
    if (!form.name.trim()) newErrors.name = "Exam name is required.";
    if (!form.duration.trim()) newErrors.duration = "Duration is required.";
    if (form.sections.length === 0)
      newErrors.sections = "At least one section is required.";
    for (const s of form.sections) {
      if (!s.name.trim()) {
        newErrors.sections = "All sections must have a name.";
        break;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Slight delay for perceived responsiveness
    setTimeout(() => {
      onSubmit(form);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>

      {/* ── Basic Information ────────────────────────────────────── */}
      <Card className="bg-white">
        <CardHeader className="px-6 pt-6 pb-0">
          <CardTitle className="text-base font-display font-extrabold text-slate-950">
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">

          {/* Exam Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="exam-name">
              Exam Name <span className="text-red-400">*</span>
            </label>
            <Input
              id="exam-name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="e.g. Grade 10 Mathematics Final Examination"
              error={errors.name}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Grade */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="grade-select">
                Grade
              </label>
              <div className="relative">
                <select
                  id="grade-select"
                  value={form.grade}
                  onChange={(e) => setField("grade", e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 cursor-pointer"
                >
                  {GRADE_OPTIONS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="subject-select">
                Subject
              </label>
              <div className="relative">
                <select
                  id="subject-select"
                  value={form.subject}
                  onChange={(e) => setField("subject", e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 cursor-pointer"
                >
                  {SUBJECT_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="academic-year-select">
                Academic Year
              </label>
              <div className="relative">
                <select
                  id="academic-year-select"
                  value={form.academicYear}
                  onChange={(e) => setField("academicYear", e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 cursor-pointer"
                >
                  {ACADEMIC_YEAR_OPTIONS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Status
              </label>
              <div className="flex gap-3">
                {(["Active", "Draft"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setField("status", s)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      form.status === s
                        ? s === "Active"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-amber-50 border-amber-200 text-amber-700"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                    id={`status-${s.toLowerCase()}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Exam Details ─────────────────────────────────────────── */}
      <Card className="bg-white">
        <CardHeader className="px-6 pt-6 pb-0">
          <CardTitle className="text-base font-display font-extrabold text-slate-950">
            Exam Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Marks — computed */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Total Marks
              </label>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-extrabold text-slate-950">
                {computedTotalMarks}
                <span className="text-xs font-semibold text-slate-400 ml-1">
                  (auto)
                </span>
              </div>
            </div>

            {/* Duration */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="duration-input">
                Duration <span className="text-red-400">*</span>
              </label>
              <Input
                id="duration-input"
                value={form.duration}
                onChange={(e) => setField("duration", e.target.value)}
                placeholder="e.g. 3 Hours, 2 Hours 30 Minutes"
                error={errors.duration}
              />
            </div>

            {/* Number of sections — derived */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Sections
              </label>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-extrabold text-slate-950">
                {form.sections.length}
                <span className="text-xs font-semibold text-slate-400 ml-1">
                  (auto)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Section Configuration ─────────────────────────────────── */}
      <Card className="bg-white">
        <CardHeader className="px-6 pt-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base font-display font-extrabold text-slate-950">
                Section Configuration
              </CardTitle>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Define the question types, counts, and marks for each section.
              </p>
            </div>
            {computedTotalMarks > 0 && (
              <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full shrink-0">
                {computedTotalMarks} total marks
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ExamSectionBuilder
            sections={form.sections}
            onChange={(sections: ExamSection[]) => setField("sections", sections)}
          />
          {errors.sections && (
            <p className="text-xs text-red-500 font-semibold mt-2">{errors.sections}</p>
          )}
        </CardContent>
      </Card>

      {/* ── Sample Papers ─────────────────────────────────────────── */}
      <Card className="bg-white">
        <CardHeader className="px-6 pt-6 pb-0">
          <CardTitle className="text-base font-display font-extrabold text-slate-950">
            Sample Papers
          </CardTitle>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Upload previous year papers or model assessments (mock — no actual processing).
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <SamplePaperUpload
            papers={form.samplePapers}
            onChange={(papers: SamplePaper[]) => setField("samplePapers", papers)}
          />
        </CardContent>
      </Card>

      {/* ── Form Actions ────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pt-2 pb-8">
        <Button
          type="button"
          variant="outline"
          leftIcon={<X className="h-4 w-4" />}
          onClick={onCancel}
          className="text-slate-600"
          id="cancel-pattern-form"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          leftIcon={<Save className="h-4 w-4" />}
          disabled={isSubmitting}
          id="submit-pattern-form"
        >
          {isSubmitting
            ? "Saving…"
            : isEditMode
            ? "Save Changes"
            : "Create Pattern"}
        </Button>
      </div>
    </form>
  );
};

export default ExamPatternForm;
