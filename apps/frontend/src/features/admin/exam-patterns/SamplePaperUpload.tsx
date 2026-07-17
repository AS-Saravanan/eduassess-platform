/**
 * SamplePaperUpload
 *
 * Controlled component for mock file upload.
 * Reads file.name + timestamp and adds to local list.
 * No actual file processing — frontend prototype only.
 */

import React, { useRef } from "react";
import { Upload, FileText, X, Paperclip } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import type { SamplePaper } from "./examPattern.types";

interface SamplePaperUploadProps {
  papers: SamplePaper[];
  onChange: (papers: SamplePaper[]) => void;
}

function generatePaperId(): string {
  return `sp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function formatUploadDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export const SamplePaperUpload: React.FC<SamplePaperUploadProps> = ({
  papers,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const newPapers: SamplePaper[] = files.map((file) => ({
      id: generatePaperId(),
      fileName: file.name,
      uploadedDate: formatUploadDate(new Date()),
    }));

    onChange([...papers, ...newPapers]);

    // Reset input so the same file can be re-selected if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePaper = (id: string) => {
    onChange(papers.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Drop zone / Upload trigger */}
      <div
        className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center space-y-3 hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer group"
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        aria-label="Click to upload sample papers"
      >
        <div className="h-10 w-10 rounded-full bg-slate-100 group-hover:bg-blue-100 text-slate-400 group-hover:text-blue-500 flex items-center justify-center mx-auto transition-colors">
          <Upload className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">
            Click to upload sample papers
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            PDF, DOCX, or image files. Mock upload — no actual processing.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon={<Paperclip className="h-3.5 w-3.5" />}
          className="pointer-events-none text-xs border-slate-200 text-slate-600"
        >
          Choose Files
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Uploaded files list */}
      {papers.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            Uploaded Files ({papers.length})
          </p>
          <ul className="space-y-2">
            {papers.map((paper) => (
              <li
                key={paper.id}
                className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3"
              >
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {paper.fileName}
                  </p>
                  {paper.label && (
                    <p className="text-xs text-slate-400 font-medium">
                      {paper.label}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400">
                    Uploaded {paper.uploadedDate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removePaper(paper.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors focus:outline-none"
                  aria-label={`Remove ${paper.fileName}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SamplePaperUpload;
