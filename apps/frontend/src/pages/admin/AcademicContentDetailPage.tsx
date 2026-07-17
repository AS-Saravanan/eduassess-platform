/**
 * AcademicContentDetailPage – /admin/library/:id
 */

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sparkles, Menu, Clock } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { AcademicContentDetails } from "../../features/admin/academic-content/components/AcademicContentDetails";
import { useAcademicContent } from "../../features/admin/academic-content/hooks/useAcademicContent";

export const AcademicContentDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id }   = useParams<{ id: string }>();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut]               = useState(false);

  const { content } = useAcademicContent();
  const item        = id ? content.find((c) => c.id === id) : undefined;

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoggingOut(true);
    setTimeout(() => navigate("/"), 1200);
  };

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
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Admin Portal · Academic Library
              </p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">Content Details</p>
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
        <main className="flex-1 py-8 px-6 sm:px-8 lg:px-10 overflow-y-auto max-w-4xl w-full mx-auto">
          {!item ? (
            <div className="text-center py-24 space-y-3">
              <p className="text-lg font-bold text-slate-700">Content item not found</p>
              <p className="text-sm text-slate-400">
                This item may have been removed or the URL is incorrect.
              </p>
              <button
                onClick={() => navigate("/admin/library")}
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                ← Back to Academic Library
              </button>
            </div>
          ) : (
            <AcademicContentDetails
              item={item}
              onBack={() => navigate("/admin/library")}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AcademicContentDetailPage;
