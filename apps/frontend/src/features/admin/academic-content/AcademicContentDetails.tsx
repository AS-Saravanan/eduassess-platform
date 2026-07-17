/**
 * AcademicContentDetails
 *
 * Read-only detail view for a single academic content item.
 * Shows metadata, file info, processing status, and AI pipeline placeholders.
 */

import React from "react";
import { ArrowLeft, FileText, BookOpen, BookMarked, BrainCircuit, Clock } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import type { AcademicContent, AiStepStatus } from "./academicContent.types";

interface AcademicContentDetailsProps {
  item: AcademicContent;
  onBack: () => void;
}

const StatusBadge: React.FC<{ status: AcademicContent["processingStatus"] }> = ({ status }) => {
  const styles: Record<AcademicContent["processingStatus"], string> = {
    Uploaded:   "bg-amber-50 text-amber-700 border-amber-100",
    Processing: "bg-blue-50 text-blue-700 border-blue-100",
    Completed:  "bg-emerald-50 text-emerald-700 border-emerald-100",
    Failed:     "bg-red-50 text-red-700 border-red-100",
  };
  const dots: Record<AcademicContent["processingStatus"], string> = {
    Uploaded:   "bg-amber-400",
    Processing: "bg-blue-500 animate-pulse",
    Completed:  "bg-emerald-500",
    Failed:     "bg-red-500",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
      <span className={`h-2 w-2 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
};

const AiStepRow: React.FC<{ label: string; status: AiStepStatus }> = ({ label, status }) => {
  const styles: Record<AiStepStatus, string> = {
    Pending:     "bg-slate-50 text-slate-400 border-slate-100",
    "In Progress": "bg-blue-50 text-blue-600 border-blue-100",
    Done:        "bg-emerald-50 text-emerald-700 border-emerald-100",
    Failed:      "bg-red-50 text-red-600 border-red-100",
  };
  const icons: Record<AiStepStatus, React.ReactNode> = {
    Pending:     <Clock className="h-4 w-4" />,
    "In Progress": <BrainCircuit className="h-4 w-4 animate-pulse" />,
    Done:        <BrainCircuit className="h-4 w-4" />,
    Failed:      <BrainCircuit className="h-4 w-4" />,
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    </div>
  );
};

export const AcademicContentDetails: React.FC<AcademicContentDetailsProps> = ({
  item,
  onBack,
}) => {
  const isChapter = item.contentType === "Chapter";

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={onBack}
          className="text-slate-500 hover:text-slate-900 shrink-0 mt-0.5"
          id="back-to-library"
        >
          Back
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 flex-wrap justify-between">
            <div>
              <h1 className="text-xl font-display font-extrabold text-slate-950 leading-tight">
                {item.title}
              </h1>
              <p className="text-sm text-slate-500 font-semibold mt-1">
                {item.grade} · {item.subject} · AY {item.academicYear}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                isChapter
                  ? "bg-violet-50 text-violet-700 border-violet-100"
                  : "bg-blue-50 text-blue-700 border-blue-100"
              }`}>
                {isChapter ? <BookMarked className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                {item.contentType}
              </span>
              <StatusBadge status={item.processingStatus} />
            </div>
          </div>
        </div>
      </div>

      {/* Academic Metadata */}
      <Card className="bg-white">
        <CardHeader className="px-6 pt-6 pb-0">
          <CardTitle className="text-base font-display font-extrabold text-slate-950">
            Academic Metadata
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
            {[
              { label: "Grade",         value: item.grade },
              { label: "Subject",       value: item.subject },
              { label: "Academic Year", value: item.academicYear },
              { label: "Content Type",  value: item.contentType },
              ...(isChapter && item.chapterName
                ? [{ label: "Chapter",  value: item.chapterName }]
                : []),
              ...(isChapter && item.parentBookTitle
                ? [{ label: "Source Book", value: item.parentBookTitle }]
                : []),
              { label: "Upload Date",   value: item.uploadDate },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{label}</dt>
                <dd className="text-sm font-bold text-slate-900 mt-0.5">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {/* Uploaded File */}
      <Card className="bg-white">
        <CardHeader className="px-6 pt-6 pb-0">
          <CardTitle className="text-base font-display font-extrabold text-slate-950">
            Uploaded File
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3.5 border border-slate-100">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{item.fileName}</p>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                Uploaded {item.uploadDate} · Mock file reference
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Processing Pipeline */}
      <Card className="bg-white">
        <CardHeader className="px-6 pt-6 pb-0">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-slate-400" />
            <CardTitle className="text-base font-display font-extrabold text-slate-950">
              AI Processing Pipeline
            </CardTitle>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            These steps will be executed automatically when the backend pipeline is active.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-slate-50/60 rounded-xl border border-slate-100 px-5 divide-y divide-slate-100">
            <AiStepRow label="Text Extraction"    status={item.aiProcessingSteps.textExtraction} />
            <AiStepRow label="Chapter Detection"  status={item.aiProcessingSteps.chapterDetection} />
            <AiStepRow label="Knowledge Indexing" status={item.aiProcessingSteps.knowledgeIndexing} />
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-3 text-center">
            AI processing will begin automatically once the backend pipeline is connected.
          </p>
        </CardContent>
      </Card>

    </div>
  );
};

export default AcademicContentDetails;
