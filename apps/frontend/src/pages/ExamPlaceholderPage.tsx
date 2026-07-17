import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { 
  Sparkles, 
  ArrowLeft, 
  LayoutDashboard, 
  Cpu, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Layers,
  BookOpen
} from "lucide-react";

export default function ExamPlaceholderPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Extract config state if passed
  const config = location.state || {
    bookName: "Class 9 CBSE Science (NCERT)",
    examScope: "full",
    selectedChapters: [],
    duration: "2 Hours",
    questionTypes: ["oneWord", "fillInBlanks", "mcq"]
  };

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

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none" />

      <div className="max-w-2xl mx-auto w-full relative z-10 space-y-6">
        
        {/* Navigation header */}
        <div className="flex items-center justify-between">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Go to Dashboard
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display font-bold text-slate-950 text-sm">EduAssess Engine</span>
          </div>
        </div>

        {/* Placeholder Main Card */}
        <Card className="shadow-2xl shadow-slate-200/80 border-slate-100 overflow-hidden bg-white text-center">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          
          <CardContent className="p-8 sm:p-12 space-y-8">
            {/* Spinning/pulsing AI chip visualizer */}
            <div className="relative h-24 w-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-blue-50 animate-ping opacity-60" />
              <div className="absolute inset-2 rounded-2xl bg-blue-100/60 animate-pulse" />
              <div className="relative h-16 w-16 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Cpu className="h-8 w-8" />
              </div>
            </div>

            {/* Coming Soon Headers */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                Technical Milestone Update
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Exam Engine Coming Soon
              </h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md mx-auto">
                The AI-powered exam generation engine is being configured. It will automatically compile precise syllabus questions once administration uploads reference coursework models and pattern criteria.
              </p>
            </div>

            {/* Saved Configuration Review */}
            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 text-left space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Configured Parameters Verified
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block tracking-wider">Book Name</span>
                  <span className="text-slate-950 flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    {config.bookName}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block tracking-wider">Exam Scope</span>
                  <span className="text-slate-950 flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    {config.examScope === "full" ? "Full Syllabus Book" : `${config.selectedChapters?.length || 1} Custom Chapters Selected`}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block tracking-wider">Assigned Timer</span>
                  <span className="text-slate-950 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    {config.duration}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block tracking-wider">Question Types Requested</span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {config.questionTypes?.length > 0 ? (
                      config.questionTypes.map((t: string) => (
                        <span key={t} className="bg-white border border-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px]">
                          {getFriendlyQuestionType(t)}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400">Standard Pattern</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Back button to return to Student dashboard */}
            <div className="pt-2">
              <Button
                type="button"
                className="w-full sm:w-auto px-8 h-12 text-sm font-bold shadow-md shadow-blue-500/10"
                onClick={() => navigate("/dashboard")}
                leftIcon={<LayoutDashboard className="h-4 w-4" />}
              >
                Back to Dashboard
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
