import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { mockExams } from "../data/mockExams";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { 
  Sparkles, 
  ArrowLeft, 
  BookOpen, 
  CheckSquare, 
  Square, 
  HelpCircle, 
  Clock, 
  Play, 
  Layers,
  GraduationCap
} from "lucide-react";

export default function ExamConfigurationPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Find coursework details from URL params
  const examId = searchParams.get("id") || "sci-9-cbse";
  const currentExam = mockExams.find(e => e.id === examId) || mockExams[0];

  // Configuration States
  const [examScope, setExamScope] = useState<"full" | "chapters">("full");
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  
  // Question Types States
  const [questionTypes, setQuestionTypes] = useState({
    oneWord: true,
    fillInBlanks: true,
    mcq: true,
    twoMark: false,
    fiveMark: false,
    tenMark: false
  });

  // Exam Duration State
  const [duration, setDuration] = useState("2 Hours");

  // Error validations
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Toggle chapter selection
  const handleToggleChapter = (chapter: string) => {
    if (examScope !== "chapters") return;
    
    if (selectedChapters.includes(chapter)) {
      setSelectedChapters(prev => prev.filter(ch => ch !== chapter));
    } else {
      setSelectedChapters(prev => [...prev, chapter]);
    }
  };

  // Toggle question types
  const handleToggleQuestionType = (key: keyof typeof questionTypes) => {
    setQuestionTypes(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      // Check if at least one question type is selected
      const noneSelected = Object.values(updated).every(val => val === false);
      if (noneSelected) {
        setErrorMessage("Please select at least one question type option.");
      } else {
        setErrorMessage(null);
      }
      return updated;
    });
  };

  // Handle scope change
  const handleScopeChange = (scope: "full" | "chapters") => {
    setExamScope(scope);
    if (scope === "full") {
      setSelectedChapters([]);
    } else if (selectedChapters.length === 0 && currentExam) {
      // Pre-select the first couple of chapters for UX helper
      setSelectedChapters([currentExam.chapters[0]]);
    }
  };

  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (examScope === "chapters" && selectedChapters.length === 0) {
      setErrorMessage("Please select at least one chapter to construct your syllabus.");
      return;
    }

    const hasAnyQuestionType = Object.values(questionTypes).some(val => val === true);
    if (!hasAnyQuestionType) {
      setErrorMessage("Please select at least one question type parameter.");
      return;
    }

    setErrorMessage(null);
    // Proceed to assessment mode selection page passing selected configurations via state
    navigate("/assessment-mode", {
      state: {
        examId: currentExam.id,
        bookName: currentExam.bookName,
        examScope,
        selectedChapters,
        duration,
        questionTypes: Object.keys(questionTypes).filter(k => questionTypes[k as keyof typeof questionTypes])
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Background gradient spot */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-6 flex-1">
        
        {/* Navigation header back link */}
        <div className="flex items-center justify-between">
          <Link 
            to="/exams" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display font-bold text-slate-950 text-sm">EduAssess Config</span>
          </div>
        </div>

        {/* Selected exam header card */}
        <Card className="border-slate-100 overflow-hidden shadow-xs bg-slate-950 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <CardContent className="p-6 sm:p-8 relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-300 bg-blue-900/50 border border-blue-800/60 px-2.5 py-0.5 rounded uppercase tracking-wider">
                {currentExam.subject}
              </span>
              <span className="text-[10px] font-bold text-slate-300 bg-slate-800/50 px-2.5 py-0.5 rounded uppercase tracking-wider">
                {currentExam.board}
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
              Configure Your Assessment: {currentExam.bookName}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
              Specify your study boundaries, choose question types, and adjust timing options. EduAssess will construct a customized syllabus paper for you.
            </p>
          </CardContent>
        </Card>

        {/* Configuration main form card */}
        <form onSubmit={handleStartExam}>
          <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-white">
            <CardContent className="p-6 sm:p-8 space-y-8">
              
              {/* Validation errors */}
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 text-xs font-semibold leading-relaxed">
                  {errorMessage}
                </div>
              )}

              {/* SECTION 1: Exam Scope */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">1</span>
                  <h3 className="font-display text-base font-bold text-slate-950 tracking-tight">Syllabus Scope Selection</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Radio 1: Full Book */}
                  <label 
                    onClick={() => handleScopeChange("full")}
                    className={`flex flex-col p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      examScope === "full" 
                        ? "border-blue-600 bg-blue-50/40 text-blue-900" 
                        : "border-slate-100 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        examScope === "full" ? "border-blue-600" : "border-slate-300"
                      }`}>
                        {examScope === "full" && <div className="h-2.5 w-2.5 bg-blue-600 rounded-full" />}
                      </div>
                      <span className="font-bold text-sm">Full Curriculum Exam</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium pl-8 pt-1">
                      Includes questions spanning all {currentExam.chaptersCount} chapters of the NCERT book.
                    </span>
                  </label>

                  {/* Radio 2: Custom chapters selection */}
                  <label 
                    onClick={() => handleScopeChange("chapters")}
                    className={`flex flex-col p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      examScope === "chapters" 
                        ? "border-blue-600 bg-blue-50/40 text-blue-900" 
                        : "border-slate-100 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        examScope === "chapters" ? "border-blue-600" : "border-slate-300"
                      }`}>
                        {examScope === "chapters" && <div className="h-2.5 w-2.5 bg-blue-600 rounded-full" />}
                      </div>
                      <span className="font-bold text-sm">Select Chapters</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium pl-8 pt-1">
                      Target specific test modules by picking individual sub-chapters.
                    </span>
                  </label>
                </div>

                {/* Chapter pick list (rendered only when Select Chapters is chosen) */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  examScope === "chapters" ? "max-h-[500px] opacity-100 border-t border-slate-100 pt-4" : "max-h-0 opacity-0 pointer-events-none"
                }`}>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Available NCERT Chapters ({selectedChapters.length} Selected)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    {currentExam.chapters.map((chapter) => {
                      const isSelected = selectedChapters.includes(chapter);
                      return (
                        <button
                          key={chapter}
                          type="button"
                          onClick={() => handleToggleChapter(chapter)}
                          className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                            isSelected 
                              ? "border-blue-200 bg-blue-50/20 text-blue-900 font-semibold"
                              : "border-slate-100 hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          {isSelected ? (
                            <CheckSquare className="h-4 w-4 text-blue-600 shrink-0" />
                          ) : (
                            <Square className="h-4 w-4 text-slate-300 shrink-0" />
                          )}
                          <span className="text-xs truncate">{chapter}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Question Types */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">2</span>
                  <h3 className="font-display text-base font-bold text-slate-950 tracking-tight">Question Types & Assessment Design</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Option 1: One Word */}
                  <button
                    type="button"
                    onClick={() => handleToggleQuestionType("oneWord")}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      questionTypes.oneWord 
                        ? "border-blue-200 bg-blue-50/20 text-blue-900 font-semibold"
                        : "border-slate-100 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {questionTypes.oneWord ? (
                      <CheckSquare className="h-4 w-4 text-blue-600 shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-300 shrink-0" />
                    )}
                    <span className="text-xs">One Word Answers</span>
                  </button>

                  {/* Option 2: Fill in blanks */}
                  <button
                    type="button"
                    onClick={() => handleToggleQuestionType("fillInBlanks")}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      questionTypes.fillInBlanks 
                        ? "border-blue-200 bg-blue-50/20 text-blue-900 font-semibold"
                        : "border-slate-100 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {questionTypes.fillInBlanks ? (
                      <CheckSquare className="h-4 w-4 text-blue-600 shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-300 shrink-0" />
                    )}
                    <span className="text-xs">Fill in the Blanks</span>
                  </button>

                  {/* Option 3: MCQs */}
                  <button
                    type="button"
                    onClick={() => handleToggleQuestionType("mcq")}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      questionTypes.mcq 
                        ? "border-blue-200 bg-blue-50/20 text-blue-900 font-semibold"
                        : "border-slate-100 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {questionTypes.mcq ? (
                      <CheckSquare className="h-4 w-4 text-blue-600 shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-300 shrink-0" />
                    )}
                    <span className="text-xs">Multiple Choice Questions</span>
                  </button>

                  {/* Option 4: 2 Mark Questions */}
                  <button
                    type="button"
                    onClick={() => handleToggleQuestionType("twoMark")}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      questionTypes.twoMark 
                        ? "border-blue-200 bg-blue-50/20 text-blue-900 font-semibold"
                        : "border-slate-100 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {questionTypes.twoMark ? (
                      <CheckSquare className="h-4 w-4 text-blue-600 shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-300 shrink-0" />
                    )}
                    <span className="text-xs">2 Mark Questions (Short)</span>
                  </button>

                  {/* Option 5: 5 Mark Questions */}
                  <button
                    type="button"
                    onClick={() => handleToggleQuestionType("fiveMark")}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      questionTypes.fiveMark 
                        ? "border-blue-200 bg-blue-50/20 text-blue-900 font-semibold"
                        : "border-slate-100 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {questionTypes.fiveMark ? (
                      <CheckSquare className="h-4 w-4 text-blue-600 shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-300 shrink-0" />
                    )}
                    <span className="text-xs">5 Mark Questions (Long)</span>
                  </button>

                  {/* Option 6: 10 Mark Questions */}
                  <button
                    type="button"
                    onClick={() => handleToggleQuestionType("tenMark")}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      questionTypes.tenMark 
                        ? "border-blue-200 bg-blue-50/20 text-blue-900 font-semibold"
                        : "border-slate-100 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {questionTypes.tenMark ? (
                      <CheckSquare className="h-4 w-4 text-blue-600 shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-300 shrink-0" />
                    )}
                    <span className="text-xs">10 Mark Questions (Essay)</span>
                  </button>
                </div>
              </div>

              {/* SECTION 3: Exam Duration */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">3</span>
                  <h3 className="font-display text-base font-bold text-slate-950 tracking-tight">Exam Duration</h3>
                </div>

                <div className="relative w-full sm:w-64">
                  <select
                    id="duration-select"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full h-11 text-sm rounded-lg border border-slate-200 bg-white px-3.5 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none text-slate-900 font-medium"
                  >
                    <option value="1 Hour">1 Hour (Quick Practice)</option>
                    <option value="2 Hours">2 Hours (Standard Exam)</option>
                    <option value="3 Hours">3 Hours (Comprehensive Exam)</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto px-6 h-11 text-slate-600 border-slate-200 hover:bg-slate-50 font-bold"
                  onClick={() => navigate("/exams")}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-8 h-11 text-sm font-bold shadow-lg shadow-blue-500/20"
                  rightIcon={<Play className="h-4 w-4" />}
                >
                  Start Exam
                </Button>
              </div>

            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
