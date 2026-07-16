import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { mockExams, MockExam } from "../data/mockExams";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { 
  Sparkles, 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Layers, 
  ArrowRight, 
  HelpCircle, 
  AlertCircle,
  GraduationCap
} from "lucide-react";

export default function StudentExamsPage() {
  const { user, studentProfile } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const boardName = studentProfile?.board || "CBSE";
  const gradeLevel = studentProfile?.grade || "Class 9";

  // Filter exams
  const filteredExams = mockExams.filter(exam => {
    const matchesSearch = exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exam.bookName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === "all" || exam.subject.toLowerCase() === subjectFilter.toLowerCase();
    
    return matchesSearch && matchesSubject;
  });

  const subjectsList = Array.from(new Set(mockExams.map(exam => exam.subject)));

  const handleConfigureExam = (examId: string) => {
    navigate(`/exam-config?id=${examId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Top ambient color spot */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-8 flex-1">
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display font-bold text-slate-950 text-sm">EduAssess Catalog</span>
          </div>
        </div>

        {/* Hero Welcome banner */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950 tracking-tight">
              Exam Discovery Catalog
            </h1>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl">
              Discover and select your coursework files. Configure dynamic practice examinations mapped specifically to your academic board syllabus parameters.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-semibold text-slate-400">
              <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5" />
                Targeting: {gradeLevel} ({boardName})
              </span>
            </div>
          </div>
        </div>

        {/* Prototype Alert Note */}
        <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-2xl flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Prototype Catalog Notice</h4>
            <p className="text-amber-700/90 text-xs font-semibold leading-relaxed">
              This catalog operates as a frontend mock demonstration representing simulated academic coursework. Since actual books have not been uploaded by administrators in this deployment milestone, certain catalogs appear under Coming Soon status.
            </p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              id="search-exam"
              placeholder="Search by subject or book name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-slate-400" />}
            />
          </div>
          <div className="relative w-full sm:w-48">
            <select
              id="subject-select"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full h-11 text-sm rounded-lg border border-slate-200 bg-white px-3.5 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none text-slate-900 font-medium"
            >
              <option value="all">All Subjects</option>
              {subjectsList.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Layers className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Coursework Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.length > 0 ? (
            filteredExams.map((exam) => {
              const isAvailable = exam.status === "available";
              return (
                <Card 
                  key={exam.id} 
                  className={`flex flex-col h-full overflow-hidden transition-all duration-200 border-slate-100 shadow-xs hover:shadow-md ${
                    !isAvailable ? "opacity-75" : ""
                  }`}
                >
                  <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-100 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
                          {exam.subject}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          isAvailable 
                            ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                            : "text-slate-500 bg-slate-100 border border-slate-200"
                        }`}>
                          {isAvailable ? "Active Catalog" : "Coming Soon"}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-display font-extrabold text-slate-950 tracking-tight leading-snug">
                        {exam.bookName}
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500 line-clamp-2">
                        {exam.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 bg-white space-y-5">
                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase text-slate-400 tracking-wider">Syllabus Class</span>
                        <span className="text-slate-800">{exam.grade}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase text-slate-400 tracking-wider">Education Board</span>
                        <span className="text-slate-800">{exam.board}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 col-span-2">
                        <span className="text-[10px] uppercase text-slate-400 tracking-wider">Coursework Scope</span>
                        <span className="text-slate-800 flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                          {exam.chaptersCount} Registered NCERT Chapters
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      {isAvailable ? (
                        <Button 
                          type="button"
                          className="w-full text-xs font-bold"
                          onClick={() => handleConfigureExam(exam.id)}
                          rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                        >
                          Configure Assessment
                        </Button>
                      ) : (
                        <Button 
                          type="button"
                          variant="outline"
                          className="w-full text-xs font-semibold text-slate-400 border-slate-100 bg-slate-50/50 cursor-not-allowed hover:bg-slate-50/50"
                          disabled
                        >
                          Unlock In Future Release
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center bg-white border border-slate-100 rounded-3xl space-y-4 shadow-xs">
              <div className="h-12 w-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-slate-900 font-bold text-lg">No Exam Catalogs Found</p>
                <p className="text-slate-500 text-sm">We couldn't find any coursework matching "{searchQuery}" under {gradeLevel} ({boardName}) parameters.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
