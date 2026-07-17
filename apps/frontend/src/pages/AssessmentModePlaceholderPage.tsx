import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { 
  Sparkles, 
  LayoutDashboard, 
  Cpu, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Layers,
  Monitor,
  FileText,
  Play
} from "lucide-react";

export default function AssessmentModePlaceholderPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Extract complete state parameters
  const config = location.state || {
    bookName: "Class 9 CBSE Science (NCERT)",
    examScope: "full",
    selectedChapters: [],
    duration: "2 Hours",
    questionTypes: ["oneWord", "fillInBlanks", "mcq"],
    selectedMode: "online"
  };

  const isOnline = config.selectedMode === "online";

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
      {/* Top ambient color backdrop */}
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

        {/* Confirmation Content Card */}
        <Card className="shadow-2xl shadow-slate-200/80 border-slate-100 overflow-hidden bg-white text-center">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          
          <CardContent className="p-8 sm:p-12 space-y-8">
            
            {/* Pulsing selection visual badge */}
            <div className="relative h-24 w-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-blue-50 animate-ping opacity-60" />
              <div className="absolute inset-2 rounded-2xl bg-blue-100/60 animate-pulse" />
              <div className="relative h-16 w-16 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                {isOnline ? <Monitor className="h-7 w-7" /> : <FileText className="h-7 w-7" />}
              </div>
            </div>

            {/* Selection Confirmation headers */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                Assessment Mode Confirmed
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Your assessment mode has been selected.
              </h2>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl mt-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Selected Mode:</span>
                <strong className="text-xs text-blue-700 font-extrabold font-display">
                  {isOnline ? "Online Assessment" : "Offline Paper Assessment"}
                </strong>
              </div>
            </div>

            {/* Future Releases Announcement Notice */}
            <div className="p-4 rounded-2xl border bg-blue-50/30 border-blue-100 text-blue-800 text-xs font-semibold leading-relaxed max-w-md mx-auto">
              <div className="flex items-center justify-center gap-1.5 mb-1 text-blue-900 font-bold">
                <Cpu className="h-4 w-4 animate-spin-slow" />
                <span>AI Milestone Announcement</span>
              </div>
              {isOnline ? (
                <span>"Online exam engine and AI evaluation will be introduced in a future milestone."</span>
              ) : (
                <span>"Question paper generation, answer sheet scanning and AI handwriting evaluation will be introduced in a future milestone."</span>
              )}
            </div>

            {/* Configured parameters tracking breakdown */}
            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 text-left space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Verified Configuration Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block tracking-wider">Reference Syllabus Book</span>
                  <span className="text-slate-950 flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    {config.bookName}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block tracking-wider">Scope Selection</span>
                  <span className="text-slate-950 flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    {config.examScope === "full" ? "Full Syllabus Book" : `${config.selectedChapters?.length || 1} Chapters Custom Selection`}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block tracking-wider">Requested Timing</span>
                  <span className="text-slate-950 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    {config.duration}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block tracking-wider">Pattern Specification</span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {config.questionTypes?.length > 0 ? (
                      config.questionTypes.map((t: string) => (
                        <span key={t} className="bg-white border border-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px]">
                          {getFriendlyQuestionType(t)}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400">Standard NCERT Pattern</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Button
                type="button"
                className="w-full sm:w-auto px-8 h-12 text-sm font-bold shadow-md shadow-blue-500/10"
                onClick={() => navigate("/assessment/session")}
                leftIcon={<Play className="h-4 w-4" />}
              >
                Begin Assessment
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto px-8 h-12 text-sm font-bold"
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
