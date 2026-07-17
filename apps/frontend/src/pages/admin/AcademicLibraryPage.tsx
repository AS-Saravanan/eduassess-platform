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
  X
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AcademicBookCard from "../../components/admin/AcademicBookCard";
import UploadBookModal from "../../components/admin/UploadBookModal";
import { mockAcademicSubjects, AcademicSubject } from "../../data/mockAcademicData";

export const AcademicLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Local state for interactive mockup database
  const [subjects, setSubjects] = useState<AcademicSubject[]>(mockAcademicSubjects);
  
  // Modal toggle state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // Custom toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoggingOut(true);
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  const handleUploadSuccess = (bookData: {
    grade: string;
    subject: string;
    academicYear: string;
    bookName: string;
  }) => {
    // Dynamically append new book to the mock subjects array
    setSubjects((prevSubjects) => {
      const matchIdx = prevSubjects.findIndex(
        (sub) => sub.grade === bookData.grade && sub.subject.toLowerCase() === bookData.subject.toLowerCase()
      );
      
      if (matchIdx >= 0) {
        // Subject exists, update its books
        const updated = [...prevSubjects];
        updated[matchIdx] = {
          ...updated[matchIdx],
          books: [...updated[matchIdx].books, bookData.bookName],
          status: "Uploaded" // Ensure it displays as Uploaded
        };
        return updated;
      } else {
        // Create new subject card
        const newSub: AcademicSubject = {
          id: Math.random().toString(36).substring(2, 9),
          grade: bookData.grade,
          subject: bookData.subject,
          books: [bookData.bookName],
          status: "Uploaded",
          academicYear: bookData.academicYear
        };
        return [...prevSubjects, newSub];
      }
    });

    // Fire premium notification toast
    setToastMessage(`"${bookData.bookName}" uploaded successfully for Grade ${bookData.grade} ${bookData.subject}!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Derived counts for summary cards
  const totalUploadedBooks = subjects.reduce((sum, item) => sum + item.books.length, 0);
  const totalSubjectsCount = subjects.length;
  const uniqueGrades = Array.from(new Set(subjects.map(item => item.grade))).length;

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans flex flex-col md:flex-row relative">
      
      {/* Toast Overlay for simulated logout */}
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

      {/* Success Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-55 max-w-md bg-emerald-600 text-white rounded-xl shadow-2xl p-4 flex items-start gap-3 animate-[slide-in_0.2s_ease-out] border border-emerald-500/25">
          <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider">Book Upload Success</p>
            <p className="text-xs font-medium mt-0.5 leading-relaxed text-emerald-50">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="p-0.5 rounded text-emerald-100 hover:bg-emerald-700/50"
            aria-label="Dismiss toast"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Admin Sidebar Panel */}
      <AdminSidebar 
        isMobileOpen={isMobileSidebarOpen} 
        onCloseMobile={() => setIsMobileSidebarOpen(false)} 
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER */}
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

        {/* MAIN STAGE */}
        <main className="flex-1 py-8 px-6 sm:px-8 lg:px-10 overflow-y-auto max-w-7xl w-full mx-auto">
          <div className="space-y-6">
            
            {/* Title / Action Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h1 className="text-2xl font-display font-extrabold text-slate-950 tracking-tight">
                  Academic Library
                </h1>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Upload textbooks and manage curricular books to train simulated AI assessment models.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<PlusCircle className="h-4 w-4" />}
                onClick={() => setIsUploadModalOpen(true)}
                className="shadow-md shadow-blue-500/10 text-xs font-bold"
              >
                Upload Academic Book
              </Button>
            </div>

            {/* Summary Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-5 sm:p-6 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Grades</p>
                    <Layers className="h-4.5 w-4.5 text-blue-600" />
                  </div>
                  {/* Dynamic offsets to represent mockup base inputs */}
                  <p className="text-3xl font-display font-extrabold text-slate-900">
                    {10 + (uniqueGrades > 4 ? uniqueGrades - 4 : 0)}
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Currently Configured</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5 sm:p-6 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Subjects</p>
                    <BookOpen className="h-4.5 w-4.5 text-indigo-600" />
                  </div>
                  <p className="text-3xl font-display font-extrabold text-slate-900">
                    {25 + (totalSubjectsCount > 5 ? totalSubjectsCount - 5 : 0)}
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Subject Domains</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5 sm:p-6 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Uploaded Books</p>
                    <Book className="h-4.5 w-4.5 text-emerald-600" />
                  </div>
                  <p className="text-3xl font-display font-extrabold text-slate-900">
                    {120 + (totalUploadedBooks > 11 ? totalUploadedBooks - 11 : 0)}
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">PDF Textbooks</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5 sm:p-6 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Ready Content</p>
                    <BrainCircuit className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <p className="text-3xl font-display font-extrabold text-slate-900">0</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Knowledge Embeddings</p>
                </CardContent>
              </Card>
            </div>

            {/* Academic Content Listing */}
            <div>
              <h2 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest mb-4">
                Academic Catalog ({subjects.length} Subjects Configured)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((sub) => (
                  <AcademicBookCard key={sub.id} subject={sub} />
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Conditionally Rendered Upload Book Modal */}
      <UploadBookModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default AcademicLibraryPage;
