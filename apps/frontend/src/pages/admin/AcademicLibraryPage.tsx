/**
 * AcademicLibraryPage – /admin/library
 *
 * Enhanced to display individual AcademicContent items (Full Books + Chapters)
 * with type and processing status badges, using the useAcademicContent hook.
 *
 * The original AcademicBookCard and UploadBookModal components remain in the
 * codebase but are no longer rendered here — preserved for reference.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Menu,
  PlusCircle,
  BookOpen,
  Layers,
  Book,
  BrainCircuit,
  Clock,
  CheckCircle,
  X,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { AcademicContentList } from "../../features/admin/academic-content/AcademicContentList";
import { UploadContentModal } from "../../features/admin/academic-content/UploadContentModal";
import { useAcademicContent } from "../../features/admin/academic-content/useAcademicContent";
import type { AcademicContentDraft } from "../../features/admin/academic-content/academicContent.types";

export const AcademicLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut]               = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen]     = useState(false);
  const [toastMessage, setToastMessage]               = useState<string | null>(null);

  const { content, addContent } = useAcademicContent();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoggingOut(true);
    setTimeout(() => navigate("/"), 1200);
  };

  const handleUploadSuccess = (draft: AcademicContentDraft) => {
    addContent(draft);
    setToastMessage(`"${draft.title}" uploaded successfully for ${draft.grade} ${draft.subject}!`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Derived stats from actual content
  const uniqueGrades    = new Set(content.map((c) => c.grade)).size;
  const uniqueSubjects  = new Set(content.map((c) => c.subject)).size;
  const totalBooks      = content.filter((c) => c.contentType === "Full Book").length;
  const completedCount  = content.filter((c) => c.processingStatus === "Completed").length;

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans flex flex-col md:flex-row relative">

      {/* Logout overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center animate-fade-in">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xl text-center space-y-4 max-w-sm mx-4">
            <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Clock className="h-6 w-6 animate-spin" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-slate-950">Exiting Admin Workspace</p>
              <p className="text-slate-500 text-sm mt-1">Safely closing your simulated admin session...</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-emerald-600 text-white rounded-xl shadow-2xl p-4 flex items-start gap-3 animate-fade-in border border-emerald-500/25">
          <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider">Upload Successful</p>
            <p className="text-xs font-medium mt-0.5 leading-relaxed text-emerald-50">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-0.5 rounded text-emerald-100 hover:bg-emerald-700/50"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 h-16 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50 focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="md:hidden flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-display font-bold text-slate-950 text-base">EduAssess Admin</span>
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Workspace</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">Academic Content Library</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-slate-100 text-slate-700 font-display font-extrabold text-sm flex items-center justify-center border border-slate-200">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">System Admin</p>
                <p className="text-[10px] text-slate-400 font-semibold leading-none uppercase mt-0.5">Mock Access</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors focus:outline-none"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 py-8 px-6 sm:px-8 lg:px-10 overflow-y-auto max-w-7xl w-full mx-auto">
          <div className="space-y-6">

            {/* Page title + Upload action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h1 className="text-2xl font-display font-extrabold text-slate-950 tracking-tight">
                  Academic Library
                </h1>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Manage academic books and chapters. Content uploaded here will feed the AI assessment pipeline.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<PlusCircle className="h-4 w-4" />}
                onClick={() => setIsUploadModalOpen(true)}
                className="shadow-md shadow-blue-500/10 text-xs font-bold shrink-0"
                id="upload-content-btn"
              >
                Upload Content
              </Button>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  label: "Grades",
                  value: uniqueGrades,
                  sub: "Configured",
                  icon: <Layers className="h-4 w-4 text-blue-600" />,
                },
                {
                  label: "Subjects",
                  value: uniqueSubjects,
                  sub: "Subject Domains",
                  icon: <BookOpen className="h-4 w-4 text-indigo-600" />,
                },
                {
                  label: "Full Books",
                  value: totalBooks,
                  sub: "PDF Textbooks",
                  icon: <Book className="h-4 w-4 text-emerald-600" />,
                },
                {
                  label: "AI Ready",
                  value: completedCount,
                  sub: "Knowledge Indexed",
                  icon: <BrainCircuit className="h-4 w-4 text-slate-400" />,
                },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-5 sm:p-6 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                      {stat.icon}
                    </div>
                    <p className="text-3xl font-display font-extrabold text-slate-900">{stat.value}</p>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">{stat.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Content list */}
            <AcademicContentList items={content} />

          </div>
        </main>
      </div>

      {/* Upload Modal */}
      <UploadContentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default AcademicLibraryPage;
