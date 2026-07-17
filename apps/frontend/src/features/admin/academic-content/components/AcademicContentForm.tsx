/**
 * AcademicContentForm
 *
 * Upload form for academic content (Full Book or Chapter).
 * Rendered as a modal on /admin/library.
 * Mock only — stores filename in local state, no actual file processing.
 *
 * Renamed from UploadContentModal → AcademicContentForm to align with
 * the feature's scalable component naming convention.
 */

import React, { useState, useRef } from "react";
import { X, Upload, ChevronDown, FileText, AlertCircle } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";
import type { AcademicContentDraft, ContentType } from "../types/academicContent.types";
import {
  CONTENT_TYPES,
  GRADE_OPTIONS,
  SUBJECT_OPTIONS,
  ACADEMIC_YEAR_OPTIONS,
} from "../types/academicContent.types";

interface AcademicContentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (draft: AcademicContentDraft) => void;
}

const EMPTY_FORM = {
  contentType: "Full Book" as ContentType,
  grade: GRADE_OPTIONS[4],              // Grade 10
  subject: SUBJECT_OPTIONS[0],          // Mathematics
  academicYear: ACADEMIC_YEAR_OPTIONS[2], // 2025-2026
  title: "",
  chapterName: "",
  fileName: "",
  processingStatus: "Uploaded" as const,
};

export const AcademicContentForm: React.FC<AcademicContentFormProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef        = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const isChapter = form.contentType === "Chapter";

  const setField = <K extends keyof typeof EMPTY_FORM>(
    key: K,
    value: (typeof EMPTY_FORM)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setField("fileName", file.name);
  };

  const validate = (): boolean => {
    const next: Partial<Record<string, string>> = {};
    if (!form.title.trim())    next.title    = "Book name is required.";
    if (isChapter && !form.chapterName.trim())
                               next.chapterName = "Chapter name is required.";
    if (!form.fileName)        next.fileName = "Please select a PDF file.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const draft: AcademicContentDraft = {
        title:           isChapter ? `Chapter – ${form.chapterName}` : form.title,
        grade:           form.grade,
        subject:         form.subject,
        academicYear:    form.academicYear,
        contentType:     form.contentType,
        fileName:        form.fileName,
        processingStatus: "Uploaded",
        ...(isChapter && {
          chapterName:      form.chapterName,
          parentBookTitle:  form.title,
        }),
      };
      onUploadSuccess(draft);
      setForm(EMPTY_FORM);
      setErrors({});
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="font-display font-extrabold text-slate-950 text-lg">
              Upload Academic Content
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Add a textbook or chapter to the AI knowledge library.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>

          {/* Content Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">
              Content Type
            </label>
            <div className="flex gap-3">
              {CONTENT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setField("contentType", type)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    form.contentType === type
                      ? type === "Full Book"
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-violet-50 border-violet-200 text-violet-700"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                  id={`content-type-${type.replace(" ", "-").toLowerCase()}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Grade + Subject */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="content-grade">
                Grade
              </label>
              <div className="relative">
                <select
                  id="content-grade"
                  value={form.grade}
                  onChange={(e) => setField("grade", e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 cursor-pointer"
                >
                  {GRADE_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="content-subject">
                Subject
              </label>
              <div className="relative">
                <select
                  id="content-subject"
                  value={form.subject}
                  onChange={(e) => setField("subject", e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 cursor-pointer"
                >
                  {SUBJECT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Academic Year */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="content-year">
              Academic Year
            </label>
            <div className="relative">
              <select
                id="content-year"
                value={form.academicYear}
                onChange={(e) => setField("academicYear", e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 cursor-pointer"
              >
                {ACADEMIC_YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Book Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="content-title">
              Book Name <span className="text-red-400">*</span>
            </label>
            <Input
              id="content-title"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g. Advanced Mathematics Textbook"
              error={errors.title}
            />
          </div>

          {/* Chapter Name — conditional */}
          {isChapter && (
            <div className="animate-fade-in">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="content-chapter">
                Chapter Name <span className="text-red-400">*</span>
              </label>
              <Input
                id="content-chapter"
                value={form.chapterName}
                onChange={(e) => setField("chapterName", e.target.value)}
                placeholder="e.g. Chapter 3 – Laws of Motion"
                error={errors.chapterName}
              />
            </div>
          )}

          {/* PDF File Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              PDF File <span className="text-red-400">*</span>
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-colors ${
                errors.fileName
                  ? "border-red-200 bg-red-50/30"
                  : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/20"
              }`}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
            >
              <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                <Upload className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                {form.fileName ? (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800 truncate">
                      {form.fileName}
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-slate-600">Click to select PDF</p>
                    <p className="text-xs text-slate-400 mt-0.5">Mock upload — no actual processing</p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {errors.fileName && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                <p className="text-xs text-red-500 font-semibold">{errors.fileName}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 text-slate-600"
              id="cancel-upload-content"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="flex-1"
              id="submit-upload-content"
            >
              {isSubmitting ? "Uploading…" : "Upload Content"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcademicContentForm;
