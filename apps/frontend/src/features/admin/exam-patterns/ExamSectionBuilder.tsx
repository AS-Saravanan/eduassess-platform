/**
 * ExamSectionBuilder
 *
 * Controlled component for building exam sections.
 * Accepts sections[] + onChange — parent owns state.
 */

import React from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import type { ExamSection, QuestionType } from "./examPattern.types";
import { QUESTION_TYPES } from "./examPattern.types";

interface ExamSectionBuilderProps {
  sections: ExamSection[];
  onChange: (sections: ExamSection[]) => void;
}

function generateSectionId(): string {
  return `sec-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

const DEFAULT_SECTION: Omit<ExamSection, "id"> = {
  name: "",
  questionType: "Multiple Choice",
  numberOfQuestions: 1,
  marksPerQuestion: 1,
};

export const ExamSectionBuilder: React.FC<ExamSectionBuilderProps> = ({
  sections,
  onChange,
}) => {
  const addSection = () => {
    onChange([
      ...sections,
      {
        ...DEFAULT_SECTION,
        id: generateSectionId(),
        name: `Section ${String.fromCharCode(65 + sections.length)}`,
      },
    ]);
  };

  const updateSection = (
    id: string,
    field: keyof Omit<ExamSection, "id">,
    value: string | number
  ) => {
    onChange(
      sections.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const removeSection = (id: string) => {
    onChange(sections.filter((s) => s.id !== id));
  };

  const sectionTotalMarks = (s: ExamSection) =>
    s.numberOfQuestions * s.marksPerQuestion;

  return (
    <div className="space-y-4">
      {sections.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-sm text-slate-400 font-medium">
            No sections added yet. Add a section to define the exam structure.
          </p>
        </div>
      )}

      {sections.map((section, idx) => (
        <div
          key={section.id}
          className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 space-y-4"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              Section {idx + 1}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                {sectionTotalMarks(section)} marks
              </span>
              <button
                type="button"
                onClick={() => removeSection(section.id)}
                className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors focus:outline-none"
                aria-label={`Remove section ${idx + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Fields grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Section Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Section Name
              </label>
              <Input
                value={section.name}
                onChange={(e) => updateSection(section.id, "name", e.target.value)}
                placeholder="e.g. Section A – Multiple Choice"
              />
            </div>

            {/* Question Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Question Type
              </label>
              <div className="relative">
                <select
                  value={section.questionType}
                  onChange={(e) =>
                    updateSection(section.id, "questionType", e.target.value as QuestionType)
                  }
                  className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 cursor-pointer"
                >
                  {QUESTION_TYPES.map((qt) => (
                    <option key={qt} value={qt}>
                      {qt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Number of Questions
              </label>
              <Input
                type="number"
                min={1}
                value={section.numberOfQuestions}
                onChange={(e) =>
                  updateSection(
                    section.id,
                    "numberOfQuestions",
                    Math.max(1, parseInt(e.target.value) || 1)
                  )
                }
              />
            </div>

            {/* Marks Per Question */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Marks per Question
              </label>
              <Input
                type="number"
                min={1}
                value={section.marksPerQuestion}
                onChange={(e) =>
                  updateSection(
                    section.id,
                    "marksPerQuestion",
                    Math.max(1, parseInt(e.target.value) || 1)
                  )
                }
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Section Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addSection}
        leftIcon={<Plus className="h-4 w-4" />}
        className="w-full border-dashed border-slate-300 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50"
      >
        Add Section
      </Button>
    </div>
  );
};

export default ExamSectionBuilder;
