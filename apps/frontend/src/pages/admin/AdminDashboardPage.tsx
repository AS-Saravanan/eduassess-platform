import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  Menu, 
  BookOpen, 
  FileSpreadsheet, 
  Users, 
  Settings as SettingsIcon,
  ArrowRight,
  Clock
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import AdminSidebar from "../../components/admin/AdminSidebar";

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoggingOut(true);
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  const adminShortcuts = [
    {
      title: "Academic Library",
      description: "Manage textbook PDFs, grades, subjects, and curriculum content used to train AI models.",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      actionText: "Open Library",
      href: "/admin/library"
    },
    {
      title: "Exam Patterns",
      description: "Define real examination structures, question patterns, weightages, and grading guidelines.",
      icon: <FileSpreadsheet className="h-6 w-6 text-violet-500" />,
      actionText: "Configure Patterns",
      href: "/admin/exam-patterns",
      disabled: false
    },
    {
      title: "Student Progress",
      description: "Monitor school diagnostics, subject mastery performance, and AI custom assessments logs.",
      icon: <Users className="h-6 w-6 text-slate-450" />,
      actionText: "View Diagnostics (Coming Soon)",
      href: "#",
      disabled: true
    }
  ];

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

      {/* Admin Sidebar Navigation */}
      <AdminSidebar 
        isMobileOpen={isMobileSidebarOpen} 
        onCloseMobile={() => setIsMobileSidebarOpen(false)} 
      />

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER */}
        <header className="bg-white border-b border-slate-100 h-16 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          {/* Logo / Mobile menu trigger */}
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
            
            {/* Desktop breadcrumbs / titles */}
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Admin Portal</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">Control Center</p>
            </div>
          </div>

          {/* Right Area: Profile / Logout */}
          <div className="flex items-center gap-4">
            {/* Admin Profile Placeholder */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-slate-100 text-slate-700 font-display font-extrabold text-sm flex items-center justify-center border border-slate-200">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">System Admin</p>
                <p className="text-[10px] text-slate-400 font-semibold leading-none uppercase mt-0.5">Mock Access</p>
              </div>
            </div>

            {/* Logout Placeholder */}
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors focus:outline-none"
            >
              Logout
            </button>
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main className="flex-1 py-8 px-6 sm:px-8 lg:px-10 overflow-y-auto max-w-7xl w-full mx-auto">
          <div className="space-y-8">
            
            {/* Welcome banner */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
                  Academic Command Console
                </h1>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl">
                  Welcome to the EduAssess Admin Space. Here you can configure subject syllabi, upload course PDF materials, specify examination weightage, and manage automated AI-driven assessment criteria.
                </p>
              </div>
            </div>

            {/* Short-cut options section */}
            <div>
              <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">
                Management Modules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {adminShortcuts.map((shortcut, idx) => (
                  <Card key={idx} hoverable={!shortcut.disabled} className={shortcut.disabled ? "opacity-60 bg-white" : "bg-white"}>
                    <CardContent className="p-6 h-full flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <div className="h-10 w-10 rounded-lg bg-slate-55 flex items-center justify-center border border-slate-100">
                          {shortcut.icon}
                        </div>
                        <h3 className="font-display font-extrabold text-slate-900 text-base">
                          {shortcut.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                          {shortcut.description}
                        </p>
                      </div>

                      {shortcut.disabled ? (
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                          {shortcut.actionText}
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(shortcut.href)}
                          className="text-blue-600 hover:text-blue-750 font-extrabold text-xs p-0 justify-start"
                          rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                        >
                          {shortcut.actionText}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
