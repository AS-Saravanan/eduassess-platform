import React from "react";
import { Book, FileText, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { AcademicSubject } from "../../data/mockAcademicData";

interface AcademicBookCardProps {
  subject: AcademicSubject;
}

export const AcademicBookCard: React.FC<AcademicBookCardProps> = ({ subject }) => {
  return (
    <Card hoverable className="border border-slate-100 bg-white">
      <CardContent className="p-6 space-y-4">
        {/* Card Header Info */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-blue-50 text-blue-700 uppercase tracking-wider">
              Grade {subject.grade}
            </span>
            <h3 className="font-display font-extrabold text-slate-900 text-lg pt-1">
              {subject.subject}
            </h3>
            <p className="text-xs text-slate-400 font-semibold">
              Academic Year: {subject.academicYear}
            </p>
          </div>
          
          {/* Status Badge */}
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
            subject.status === "Uploaded"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
              : "bg-amber-50 text-amber-700 border border-amber-100"
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${subject.status === "Uploaded" ? "bg-emerald-500" : "bg-amber-500"}`} />
            {subject.status}
          </span>
        </div>

        {/* Books List Section */}
        <div className="space-y-2 pt-2 border-t border-slate-50">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
            Uploaded Books ({subject.books.length})
          </p>
          <ul className="space-y-2">
            {subject.books.map((book, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2.5 text-xs text-slate-600 font-medium bg-slate-50/50 p-2.5 rounded-lg border border-slate-100"
              >
                <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="truncate">{book}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicBookCard;
