import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { 
  Sparkles, 
  GraduationCap, 
  School, 
  Calendar, 
  BookOpen, 
  User, 
  ArrowRight 
} from "lucide-react";

export default function StudentProfileSetupPage() {
  const { user, setStudentProfile, studentProfile } = useAuth();
  const navigate = useNavigate();

  // Redirect if they somehow end up here without being logged in
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else if (studentProfile) {
      // If profile is already complete, send them to dashboard
      navigate("/dashboard", { replace: true });
    }
  }, [user, studentProfile, navigate]);

  // Form State
  const [fullName, setFullName] = useState(user?.displayName || "");
  const [board, setBoard] = useState("CBSE");
  const [grade, setGrade] = useState("Class 11");
  const [schoolName, setSchoolName] = useState("");
  const [academicYear, setAcademicYear] = useState("2026-2027");

  // Error States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize Name from Firebase user when it loads
  useEffect(() => {
    if (user?.displayName && !fullName) {
      setFullName(user.displayName);
    }
  }, [user, fullName]);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!fullName.trim()) tempErrors.fullName = "Full Name is required";
    if (!board) tempErrors.board = "Education Board is required";
    if (!grade) tempErrors.grade = "Grade/Class is required";
    if (!schoolName.trim()) tempErrors.schoolName = "School/College Name is required";
    if (!academicYear) tempErrors.academicYear = "Academic Year is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate short network verification delay
    setTimeout(() => {
      setStudentProfile({
        fullName,
        board,
        grade,
        schoolName,
        academicYear
      });
      setIsSubmitting(false);
      navigate("/dashboard", { replace: true });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>
        <h2 className="text-center font-display text-3xl font-extrabold text-slate-950 tracking-tight">
          Welcome, {user?.displayName?.split(" ")[0] || "Student"}!
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium max-w-sm mx-auto">
          Complete your learning profile to personalize your assessment experience.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Card className="shadow-xl shadow-slate-100/80 border-slate-100/80">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <Input
                id="fullName"
                label="Full Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
                placeholder="Enter your full name"
                leftIcon={<User className="h-5 w-5 text-slate-400" />}
              />

              {/* Board and Grade in a 2-column grid on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Board Dropdown */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="board-select" className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-0.5">
                    Education Board <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="board-select"
                      value={board}
                      onChange={(e) => setBoard(e.target.value)}
                      className="w-full h-11 text-sm rounded-lg border border-slate-200 bg-white px-3.5 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none text-slate-900 font-medium"
                    >
                      <option value="CBSE">CBSE</option>
                      <option value="Others">Others</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <BookOpen className="h-4 w-4" />
                    </div>
                  </div>
                  {board === "Others" && (
                    <div className="mt-1.5 p-2.5 bg-blue-50/80 border border-blue-100 rounded-lg text-blue-800 text-[11px] font-semibold leading-relaxed">
                      Support for additional education boards will be incorporated in future releases.
                    </div>
                  )}
                </div>

                {/* Grade Dropdown */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="grade-select" className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-0.5">
                    Grade / Class <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="grade-select"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full h-11 text-sm rounded-lg border border-slate-200 bg-white px-3.5 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none text-slate-900 font-medium"
                    >
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* School / College Name */}
              <Input
                id="schoolName"
                label="School / College Name"
                required
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                error={errors.schoolName}
                placeholder="Enter school or college name"
                leftIcon={<School className="h-5 w-5 text-slate-400" />}
              />

              {/* Academic Year Dropdown */}
              <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor="year-select" className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-0.5">
                  Academic Year <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <select
                    id="year-select"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full h-11 text-sm rounded-lg border border-slate-200 bg-white px-3.5 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none text-slate-900 font-medium"
                  >
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Calendar className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-sm font-bold shadow-md shadow-blue-500/10 focus:ring-2 focus:ring-blue-500"
                isLoading={isSubmitting}
                disabled={board === "Others"}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Continue to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
