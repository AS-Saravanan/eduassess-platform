import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  User,
  Settings,
  LogOut,
  Compass,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  PlusCircle,
  ChevronRight,
  Calendar,
  AlertCircle,
  Sparkles,
  Menu,
  X,
  Filter
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { 
  studentProfile, 
  mockAssessments, 
  mockRecommendations, 
  mockFeedbackSnippets 
} from "../data";

export default function DashboardPage() {
  const navigate = useNavigate();
  
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sidebar navigation array
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "assessments", label: "My Assessments", icon: <BookOpen className="h-5 w-5" /> },
    { id: "progress", label: "Learning Progress", icon: <TrendingUp className="h-5 w-5" /> },
    { id: "profile", label: "Student Profile", icon: <User className="h-5 w-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ];

  // Handle simulated logout
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoggingOut(true);
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans flex flex-col md:flex-row relative">
      
      {/* Toast Overlay for simulated actions */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center animate-fade-in">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xl text-center space-y-4 max-w-sm mx-4">
            <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Clock className="h-6 w-6 animate-spin" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-slate-950">Logging Out</p>
              <p className="text-slate-500 text-sm mt-1">Safely closing your simulated session...</p>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE DASHBOARD HEADER */}
      <header className="md:hidden bg-white border-b border-slate-100 h-16 px-4 flex items-center justify-between sticky top-0 z-30 shadow-sm w-full">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display font-bold text-slate-950 text-base">EduAssess</span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Open dashboard navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* MOBILE SIDEBAR DRAWER */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/40" 
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          {/* Drawer container */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white border-r border-slate-100 p-6 shadow-2xl animate-[slide-in_0.2s_ease-out]">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-display font-bold text-slate-950">EduAssess</span>
              </div>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none"
                aria-label="Close dashboard navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav List */}
            <nav className="flex-1 py-6 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer
                    ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Logout bottom area */}
            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Logout (UI Only)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 h-screen sticky top-0 px-6 py-8 shadow-sm">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-2.5 pb-8 border-b border-slate-100/80">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold text-slate-950 tracking-tight">
            EduAssess<span className="text-blue-600 font-extrabold">.</span>
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 py-8 space-y-1.5">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50/80 hover:text-slate-950"
                }
              `}
            >
              <span className={activeTab === item.id ? "text-blue-600" : "text-slate-400 group-hover:text-slate-500"}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout container */}
        <div className="pt-6 border-t border-slate-100">
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50/80 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <LogOut className="h-5 w-5" />
            Logout (UI Only)
          </button>
        </div>
      </aside>

      {/* MAIN MAIN CONTENT STAGE */}
      <main className="flex-1 min-w-0 py-8 px-4 sm:px-8 lg:px-10 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* TAB 1: GENERAL OVERVIEW / DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            
            {/* Welcome banner section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
                  Welcome Back, {studentProfile.fullName} <span className="animate-[wave_1.5s_infinite] origin-[70%_70%] inline-block">👋</span>
                </h1>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xl">
                  You are making excellent academic headway. Your diagnostic rating was updated today in connection with your Classical Physics quiz results.
                </p>
                {/* Profile attributes line */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs font-semibold text-slate-400">
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">{studentProfile.schoolName}</span>
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">{studentProfile.gradeLevel}</span>
                  <span className="text-slate-400">ID: {studentProfile.studentId}</span>
                </div>
              </div>

              {/* Top summary diagnostic circle */}
              <div className="shrink-0 flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="relative h-14 w-14 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-900 font-extrabold font-display">
                  <span className="text-sm">81%</span>
                  <svg className="absolute inset-0 transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" stroke="#2563eb" strokeWidth="4" fill="transparent" strokeDasharray="290" strokeDashoffset="55" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Overall Rating</p>
                  <p className="text-sm font-bold text-slate-900">Good standing</p>
                </div>
              </div>
            </div>

            {/* Grid layout for Dashboard Feature Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Card 1: My Assessments Overview */}
              <div className="lg:col-span-8 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Assessments</CardTitle>
                      <CardDescription>Track recent subjective scores and active draft questionnaires.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("assessments")} rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                      {mockAssessments.slice(0, 3).map((ast) => (
                        <div key={ast.id} className="p-5 flex items-center justify-between hover:bg-slate-50/40 transition-colors">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wide">
                              {ast.subject}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900">{ast.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {ast.duration}
                              </span>
                              <span>•</span>
                              <span>{ast.questions} questions</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            {ast.status === "completed" ? (
                              <div className="flex items-center gap-3">
                                <div>
                                  <p className="text-sm font-extrabold text-slate-950">{ast.score}</p>
                                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Score</p>
                                </div>
                                <span className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                  <CheckCircle2 className="h-4 w-4" />
                                </span>
                              </div>
                            ) : (
                              <Button variant="primary" size="sm">
                                Start Quiz
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: AI Subjective Feedback Showcase */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="h-5 w-5 text-indigo-600 animate-pulse" />
                      <CardTitle>Deep AI Feedback Snippet</CardTitle>
                    </div>
                    <CardDescription>Critique of your latest analytical long-answer submission.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockFeedbackSnippets.map((fb, idx) => (
                      <div key={idx} className="space-y-3 bg-slate-50/55 p-4 rounded-xl border border-slate-100 text-xs">
                        <div>
                          <p className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">Assessment Category</p>
                          <p className="text-sm font-bold text-slate-900">{fb.assessment}</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-500 mb-1">Subjective Question:</p>
                          <p className="text-slate-700 italic bg-white p-2.5 rounded border border-slate-100 leading-relaxed font-medium">
                            "{fb.question}"
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-500 mb-1">Your response:</p>
                          <p className="text-slate-600 bg-white p-2.5 rounded border border-slate-100 leading-relaxed font-medium">
                            "{fb.studentResponse}"
                          </p>
                        </div>
                        <div className="border-t border-slate-100 pt-3 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                              {fb.evaluation}
                            </span>
                            <span className="font-bold text-slate-900">Score: {fb.score}</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed font-medium">
                            <strong className="text-slate-900">AI Tutor Remarks: </strong>{fb.feedback}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Cards (Recommendations & Learning Progress Overview) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Card 3: Recommendations Panel */}
                <Card className="bg-gradient-to-b from-white to-blue-50/10">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Compass className="h-5 w-5 text-blue-600" />
                      <CardTitle>Recommendations</CardTitle>
                    </div>
                    <CardDescription>Topics focused on addressing active conceptual gaps.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockRecommendations.map((rec, idx) => (
                      <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-100 space-y-2 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                            {rec.subject}
                          </span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            rec.difficulty === "Hard" 
                              ? "bg-red-50 text-red-600" 
                              : rec.difficulty === "Medium"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}>
                            {rec.difficulty}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-900">{rec.topic}</p>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight">{rec.reason}</p>
                        <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 pt-1.5 focus:outline-none">
                          {rec.action} <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Card 4: Learning Progress summary statistics */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-emerald-600" />
                      <CardTitle>Progress Reports</CardTitle>
                    </div>
                    <CardDescription>Performance trends relative to curriculum topics.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-xs font-semibold">
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-600 font-medium">Advanced Mathematics</span>
                        <span className="text-slate-900 font-extrabold">85% Mastery</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-600 font-medium">Classical Physics</span>
                        <span className="text-slate-900 font-extrabold">72% Mastery</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: "72%" }} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-600 font-medium">Chemistry II</span>
                        <span className="text-slate-900 font-extrabold">45% Mastery</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "45%" }} />
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>Total Time Logged:</span>
                      <span className="font-bold text-slate-700">18.5 Hours</span>
                    </div>
                  </CardContent>
                </Card>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: MY ASSESSMENTS PANEL */}
        {activeTab === "assessments" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h1 className="text-2xl font-display font-extrabold text-slate-950 tracking-tight">
                  My Assessments
                </h1>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Manage syllabus quizzes, start new tests, or analyze previous evaluations.
                </p>
              </div>
              <Button variant="primary" size="sm" leftIcon={<PlusCircle className="h-4 w-4" />}>
                Create Custom Test
              </Button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search assessments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 text-sm bg-slate-50/50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Filter className="h-4 w-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 px-3 border border-slate-200 rounded-lg text-sm font-semibold bg-white text-slate-700 cursor-pointer focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Assessment Cards List */}
            <div className="grid grid-cols-1 gap-4">
              {mockAssessments
                .filter(item => {
                  if (statusFilter !== "all" && item.status !== statusFilter) return false;
                  return item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.subject.toLowerCase().includes(searchQuery.toLowerCase());
                })
                .map((ast) => (
                  <Card key={ast.id} className="hover:border-slate-200 transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase tracking-wider">
                              {ast.subject}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              ast.status === "completed" 
                                ? "bg-emerald-50 text-emerald-700" 
                                : "bg-amber-50 text-amber-700"
                            }`}>
                              {ast.status}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-slate-900 text-lg">{ast.title}</h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-slate-400" />
                              Duration: {ast.duration}
                            </span>
                            <span>•</span>
                            <span>Questions: {ast.questions} (Subjective & Objective Mix)</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-slate-400" />
                              {ast.date}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                          {ast.status === "completed" ? (
                            <div className="flex items-center gap-5">
                              <div className="text-right">
                                <p className="text-xl font-extrabold text-slate-950">{ast.score}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Average Score</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Review AI Critique
                              </Button>
                            </div>
                          ) : (
                            <Button variant="primary" size="sm">
                              Launch Exam Mode
                            </Button>
                          )}
                        </div>
                      </div>

                      {ast.aiVerdict && (
                        <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-start gap-2.5">
                          <AlertCircle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-slate-800">Quick AI Diagnosis:</p>
                            <p className="text-xs text-slate-600 mt-0.5 font-medium leading-relaxed">
                              {ast.aiVerdict}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: LEARNING PROGRESS STATS PANEL */}
        {activeTab === "progress" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-display font-extrabold text-slate-950 tracking-tight">
                Learning Progress
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Deep visual insights illustrating subject coverage metrics and concept mastery curves.
              </p>
            </div>

            {/* Quick Metrics Panels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Streak</p>
                  <p className="text-3xl font-display font-extrabold text-slate-900">12 Days</p>
                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> +2 Days improvement
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Concept Accuracy</p>
                  <p className="text-3xl font-display font-extrabold text-slate-900">82.4%</p>
                  <p className="text-xs text-blue-600 font-semibold">Exceeding average benchmark</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Feedback Count</p>
                  <p className="text-3xl font-display font-extrabold text-slate-900">34 Evaluations</p>
                  <p className="text-xs text-indigo-600 font-semibold">Instant AI assistance generated</p>
                </CardContent>
              </Card>
            </div>

            {/* Simulated graph card */}
            <Card>
              <CardHeader>
                <CardTitle>Continuous Mastery Analysis</CardTitle>
                <CardDescription>Evaluates concept familiarity across critical subject domains over the past month.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64 w-full bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between p-6">
                  {/* Visual simulated graph bars */}
                  <div className="flex-1 flex items-end justify-between gap-4 px-2">
                    <div className="w-1/6 flex flex-col items-center gap-2">
                      <div className="bg-blue-600/20 hover:bg-blue-600/30 w-full rounded-t-lg transition-all" style={{ height: "40%" }} />
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Week 1</span>
                    </div>
                    <div className="w-1/6 flex flex-col items-center gap-2">
                      <div className="bg-blue-600/40 hover:bg-blue-600/50 w-full rounded-t-lg transition-all" style={{ height: "60%" }} />
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Week 2</span>
                    </div>
                    <div className="w-1/6 flex flex-col items-center gap-2">
                      <div className="bg-blue-600/60 hover:bg-blue-600/70 w-full rounded-t-lg transition-all" style={{ height: "75%" }} />
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Week 3</span>
                    </div>
                    <div className="w-1/6 flex flex-col items-center gap-2">
                      <div className="bg-blue-600 w-full rounded-t-lg transition-all" style={{ height: "82%" }} />
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Week 4</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-200/80 pt-4 mt-2 text-center">
                    <p className="text-xs text-slate-500 font-medium">
                      Intelligent tracking estimates <strong>+6% mastery gains</strong> in Advanced Mathematics next week based on current study trajectory.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        )}

        {/* TAB 4: STUDENT PROFILE DETAIL */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-display font-extrabold text-slate-950 tracking-tight">
                Student Profile
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Review your academic enrollment parameters and platform account records.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card left */}
              <Card className="lg:col-span-1">
                <CardContent className="p-8 text-center space-y-5">
                  <div className="h-24 w-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto text-3xl font-extrabold font-display border-4 border-white shadow-md">
                    AM
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-950 text-lg">{studentProfile.fullName}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{studentProfile.gradeLevel}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 text-xs text-slate-500 text-left font-medium">
                    <div className="flex justify-between">
                      <span>Unique ID:</span>
                      <strong className="text-slate-800">{studentProfile.studentId}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Affiliation:</span>
                      <strong className="text-slate-800">{studentProfile.schoolName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Joined:</span>
                      <strong className="text-slate-800">{studentProfile.joinedDate}</strong>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subject Areas and summary detail right */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Enrollment Details</CardTitle>
                    <CardDescription>Syllabus profile configuration mapping.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-xs font-semibold">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Primary Track</p>
                        <p className="text-sm text-slate-800 font-bold">Science & Engineering</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Secondary Track</p>
                        <p className="text-sm text-slate-800 font-bold">Advanced Mathematics (AP/IB)</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">Enrolled Subject Focuses</p>
                      <div className="flex flex-wrap gap-2 pt-1 font-bold">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100/50">Algebra II / Trigonometry</span>
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100/50">Kinematics & Statics</span>
                        <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100/50">Molecular Stoichiometry</span>
                        <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg border border-purple-100/50">Differential Calculus</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: SYSTEM SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-display font-extrabold text-slate-950 tracking-tight">
                Settings
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                Customize user preferences and interactive simulator parameters.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Interface Toggles</CardTitle>
                <CardDescription>Mock preference parameters for client presentation styling.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-sm font-semibold">
                
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div>
                    <p className="text-slate-800 font-bold">Email Notifications</p>
                    <p className="text-xs text-slate-400 font-medium">Receive weekly progress reviews and AI recommendations.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600 rounded cursor-pointer" />
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div>
                    <p className="text-slate-800 font-bold">Accessibility: Focus Ring Hardening</p>
                    <p className="text-xs text-slate-400 font-medium">Enforce high-contrast thick outline borders for keyboard inputs.</p>
                  </div>
                  <input type="checkbox" className="h-5 w-5 text-blue-600 rounded cursor-pointer" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-slate-800 font-bold">Automatic Concept Mapping</p>
                    <p className="text-xs text-slate-400 font-medium">Let AI auto-generate remedial worksheets immediately following quiz completions.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 text-blue-600 rounded cursor-pointer" />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button variant="primary" size="sm" onClick={() => alert("Settings simulation saved successfully.")}>
                    Save Preferences
                  </Button>
                </div>

              </CardContent>
            </Card>

          </div>
        )}

      </main>
    </div>
  );
}
