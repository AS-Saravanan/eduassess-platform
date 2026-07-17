import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Layers, 
  HelpCircle,
  Monitor, 
  FileText,
  CheckCircle2
} from "lucide-react";

export default function AssessmentModeSelectionPage() {
  const { user, studentProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Extract config state with fallback
  const config = location.state || {
    examId: "sci-9-cbse",
    bookName: "Class 9 CBSE Science (NCERT)",
    examScope: "full",
    selectedChapters: [],
    duration: "2 Hours",
    questionTypes: ["oneWord", "fillInBlanks", "mcq"]
  };

  const boardName = studentProfile?.board || "CBSE";
  const gradeLevel = studentProfile?.grade || "Class 9";

  // Selected Assessment Mode state
  const [selectedMode, setSelectedMode] = useState<"online" | "offline">("online");

  const getFriendlyQuestionType = (type: string) => {
    switch (type) {
      case "oneWord": return "One Word Answers";
      case "fillInBlanks": return "Fill in the Blanks";
      case "mcq": return "Multiple Choice Questions";
      case "twoMark": return "2 Mark Questions (Short)";
      case "fiveMark": return "5 Mark Questions (Long)";
      case "tenMark": return "10 Mark Questions (Essay)";
      default: return type;
    }
  };

  const handleContinue = () => {
    navigate("/assessment-placeholder", {
      state: {
        ...config,
        selectedMode
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-6 flex-1">
        
        {/* Navigation header back link */}
        <div className="flex items-center justify-between">
          <button 
            type="button"
            onClick={() => navigate(`/exam-config?id=${config.examId}`)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Configuration
          </button>
          
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display font-bold text-slate-950 text-sm">EduAssess Mode</span>
          </div>
        </div>

        {/* Hero header */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-2">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950 tracking-tight">
            Choose Your Assessment Mode
          </h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl">
            Select how you would like to undertake this evaluation. You can attempt the exam digitally inside the browser or print an offline test paper.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Selection Options (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              
              {/* Option 1: Online Assessment */}
              <label 
                onClick={() => setSelectedMode("online")}
                className={`flex flex-col sm:flex-row items-start gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer bg-white ${
                  selectedMode === "online" 
                    ? "border-blue-600 ring-2 ring-blue-100/50" 
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className={`p-3 rounded-xl shrink-0 ${
                  selectedMode === "online" ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-400"
                }`}>
                  <Monitor className="h-6 w-6" />
                </div>
                
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-base text-slate-950">
                      Online Assessment
                    </span>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedMode === "online" ? "border-blue-600" : "border-slate-300"
                    }`}>
                      {selectedMode === "online" && <div className="h-2.5 w-2.5 bg-blue-600 rounded-full" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Take your exam directly in the browser. Your answers will be evaluated by our AI assessment engine with live grading dashboards.
                  </p>
                  <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Recommended Mode
                  </span>
                </div>
              </label>

              {/* Option 2: Offline Paper Assessment */}
              <label 
                onClick={() => setSelectedMode("offline")}
                className={`flex flex-col sm:flex-row items-start gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer bg-white ${
                  selectedMode === "offline" 
                    ? "border-blue-600 ring-2 ring-blue-100/50" 
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className={`p-3 rounded-xl shrink-0 ${
                  selectedMode === "offline" ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-400"
                }`}>
                  <FileText className="h-6 w-6" />
                </div>
                
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-base text-slate-950">
                      Offline Paper Assessment
                    </span>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedMode === "offline" ? "border-blue-600" : "border-slate-300"
                    }`}>
                      {selectedMode === "offline" && <div className="h-2.5 w-2.5 bg-blue-600 rounded-full" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Download/print the generated question paper, write your answers manually on a physical sheet, and upload your answer sheets later for AI optical handwriting evaluation.
                  </p>
                  <span className="inline-block text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    Traditional Study Mode
                  </span>
                </div>
              </label>

            </div>

            {/* Navigation buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto px-6 h-11 text-slate-600 border-slate-200 hover:bg-slate-50 font-bold"
                onClick={() => navigate(`/exam-config?id=${config.examId}`)}
              >
                Configure Options
              </Button>
              
              <Button
                type="button"
                className="w-full sm:w-auto px-8 h-11 text-sm font-bold shadow-lg shadow-blue-500/20"
                onClick={handleContinue}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Continue Setup
              </Button>
            </div>
          </div>

          {/* Right Column: Configuration Review Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <Card className="border-slate-100 bg-white shadow-xs">
              <CardHeader className="pb-3 border-b border-slate-50">
                <CardTitle className="text-sm font-display font-extrabold text-slate-950">Exam Configuration Summary</CardTitle>
                <CardDescription className="text-[10px]">Verify your assessment parameters</CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs font-semibold text-slate-600">
                
                {/* Book & Course details */}
                <div className="space-y-1">
                  <span className="text-[9px] uppercase text-slate-400 tracking-wider block">Coursework</span>
                  <span className="text-slate-900 flex items-start gap-1.5 leading-snug">
                    <BookOpen className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                    {config.bookName}
                  </span>
                </div>

                {/* Grade & Board */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase text-slate-400 tracking-wider block">Syllabus Grade</span>
                    <span className="text-slate-900">{gradeLevel}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase text-slate-400 tracking-wider block">Board</span>
                    <span className="text-slate-900">{boardName}</span>
                  </div>
                </div>

                {/* Scope Selection */}
                <div className="space-y-1 pt-2 border-t border-slate-50">
                  <span className="text-[9px] uppercase text-slate-400 tracking-wider block">Syllabus Scope</span>
                  <span className="text-slate-900 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    {config.examScope === "full" ? "Full Book Syllabus" : `${config.selectedChapters?.length || 1} Selected Chapters`}
                  </span>
                </div>

                {/* Duration */}
                <div className="space-y-1 pt-2 border-t border-slate-50">
                  <span className="text-[9px] uppercase text-slate-400 tracking-wider block">Allocated Time</span>
                  <span className="text-slate-900 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    {config.duration}
                  </span>
                </div>

                {/* Question Types */}
                <div className="space-y-2 pt-2 border-t border-slate-50">
                  <span className="text-[9px] uppercase text-slate-400 tracking-wider block">Pattern Structure</span>
                  <div className="flex flex-wrap gap-1">
                    {config.questionTypes && config.questionTypes.length > 0 ? (
                      config.questionTypes.map((t: string) => (
                        <span key={t} className="bg-slate-50 text-slate-700 px-1.5 py-0.5 rounded text-[9px] border border-slate-100">
                          {getFriendlyQuestionType(t)}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 text-[10px]">Standard NCERT Pattern</span>
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
