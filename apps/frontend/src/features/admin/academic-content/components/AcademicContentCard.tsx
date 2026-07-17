/**
 * AcademicContentCard
 *
 * Displays a single academic content item (Full Book or Chapter)
 * with type badge, processing status badge, and a View Details action.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, BookMarked, Eye, FileText } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import { Card, CardContent } from "../../../../components/ui/Card";
import type { AcademicContent } from "../types/academicContent.types";

interface AcademicContentCardProps {
  item: AcademicContent;
}

const ContentTypeBadge: React.FC<{ type: AcademicContent["contentType"] }> = ({ type }) => {
  const isChapter = type === "Chapter";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
        isChapter
          ? "bg-violet-50 text-violet-700 border-violet-100"
          : "bg-blue-50 text-blue-700 border-blue-100"
      }`}
    >
      {isChapter ? (
        <BookMarked className="h-3 w-3" />
      ) : (
        <BookOpen className="h-3 w-3" />
      )}
      {type}
    </span>
  );
};

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
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
};

export const AcademicContentCard: React.FC<AcademicContentCardProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card hoverable className="bg-white">
      <CardContent className="p-5 space-y-4">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          <ContentTypeBadge type={item.contentType} />
          <StatusBadge status={item.processingStatus} />
        </div>

        {/* Title & metadata */}
        <div>
          <h3 className="font-display font-extrabold text-slate-950 text-sm leading-tight line-clamp-2">
            {item.title}
          </h3>
          {item.contentType === "Chapter" && item.parentBookTitle && (
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
              From: {item.parentBookTitle}
            </p>
          )}
          <p className="text-xs text-slate-500 font-semibold mt-1.5">
            Grade {item.grade.replace("Grade ", "")} · {item.subject} · AY {item.academicYear}
          </p>
        </div>

        {/* File info */}
        <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
          <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="text-[11px] text-slate-500 font-medium truncate">
            {item.fileName}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
            {item.uploadDate}
          </span>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Eye className="h-3.5 w-3.5" />}
            onClick={() => navigate(`/admin/library/${item.id}`)}
            className="text-blue-600 hover:text-blue-800 text-xs px-3"
            id={`view-content-${item.id}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicContentCard;
