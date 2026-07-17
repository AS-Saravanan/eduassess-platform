/**
 * AcademicContentList
 *
 * Renders the full collection of academic content items using AcademicContentCard.
 * Includes a header with count breakdown and an empty state.
 */

import React from "react";
import { BookOpen } from "lucide-react";
import { AcademicContentCard } from "./AcademicContentCard";
import type { AcademicContent } from "./academicContent.types";

interface AcademicContentListProps {
  items: AcademicContent[];
}

export const AcademicContentList: React.FC<AcademicContentListProps> = ({ items }) => {
  const bookCount    = items.filter((i) => i.contentType === "Full Book").length;
  const chapterCount = items.filter((i) => i.contentType === "Chapter").length;

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
          Content Catalog ({items.length} items)
        </h2>
        <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
          <span>{bookCount} Full Book{bookCount !== 1 ? "s" : ""}</span>
          <span className="text-slate-200">·</span>
          <span>{chapterCount} Chapter{chapterCount !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
          <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-700">No content uploaded yet</p>
            <p className="text-sm text-slate-400 mt-1">
              Use the Upload button to add your first academic content.
            </p>
          </div>
        </div>
      )}

      {/* Grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <AcademicContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AcademicContentList;
