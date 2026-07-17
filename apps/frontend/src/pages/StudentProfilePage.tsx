import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { 
  Sparkles, 
  GraduationCap, 
  School, 
  Calendar, 
  BookOpen, 
  User, 
  ArrowLeft, 
  Edit3, 
  Check, 
  Mail 
} from "lucide-react";

export default function StudentProfilePage() {
  const { user, studentProfile, setStudentProfile } = useAuth();
  const navigate = useNavigate();

  // If not logged in, redirect
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // If profile is not set, redirect to setup
  useEffect(() => {
    if (user && !studentProfile) {
      navigate("/student-profile-setup", { replace: true });
    }
  }, [user, studentProfile, navigate]);

  // Edit Mode state
  const [isEditing, setIsEditing] = useState(false);
  
  // Form fields for editing
  const [fullName, setFullName] = useState("");
  const [board, setBoard] = useState("");
  const [grade, setGrade] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  
  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize editable fields when entering edit mode or when profile data changes
  useEffect(() => {
    if (studentProfile) {
      setFullName(studentProfile.fullName);
      setBoard(studentProfile.board);
      setGrade(studentProfile.grade);
      setSchoolName(studentProfile.schoolName);
      setAcademicYear(studentProfile.academicYear);
    }
  }, [studentProfile, isEditing]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const tempErrors: { [key: string]: string } = {};
    if (!fullName.trim()) tempErrors.fullName = "Full name is required";
    if (!schoolName.trim()) tempErrors.schoolName = "School name is required";
    
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setStudentProfile({
        fullName,
        board,
        grade,
        schoolName,
        academicYear
      });
      setIsEditing(false);
      setIsSubmitting(false);
    }, 1000);
  };

  if (!studentProfile) {
    return (
      <div className="min-h-screen bg-slate-50/60 flex items-center justify-center">
        <p className="text-slate-500 font-medium">Redirecting to setup...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none" />

      <div className="max-w-2xl mx-auto w-full relative z-10 space-y-6">
        {/* Navigation Link Back to Dashboard */}
        <div className="flex items-center justify-between">
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
            <span className="font-display font-bold text-slate-950 text-sm">EduAssess Profile</span>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="shadow-xl shadow-slate-100/80 border-slate-100/80 overflow-hidden">
          <CardHeader className="bg-slate-950 text-white p-8 relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Avatar"}
                  referrerPolicy="no-referrer"
                  className="h-20 w-20 rounded-full border-4 border-slate-800 shadow-xl object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold border-4 border-slate-800 shadow-xl">
                  {studentProfile.fullName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                </div>
              )}
              <div className="text-center sm:text-left space-y-1">
                <h2 className="font-display text-2xl font-extrabold tracking-tight">{studentProfile.fullName}</h2>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-sm text-slate-300 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {!isEditing ? (
              // View Mode
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="font-display font-bold text-slate-950 text-lg">Academic Information</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 text-slate-700 font-bold text-xs"
                    onClick={() => setIsEditing(true)}
                    leftIcon={<Edit3 className="h-3.5 w-3.5" />}
                  >
                    Edit Profile
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Board */}
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Education Board</span>
                    <div className="flex items-center gap-2.5 text-slate-800 font-semibold text-sm">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      {studentProfile.board}
                    </div>
                  </div>

                  {/* Grade */}
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Grade / Class</span>
                    <div className="flex items-center gap-2.5 text-slate-800 font-semibold text-sm">
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                      {studentProfile.grade}
                    </div>
                  </div>

                  {/* School Name */}
                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">School / College Name</span>
                    <div className="flex items-center gap-2.5 text-slate-800 font-semibold text-sm">
                      <School className="h-4 w-4 text-blue-600" />
                      {studentProfile.schoolName}
                    </div>
                  </div>

                  {/* Academic Year */}
                  <div className="space-y-1 col-span-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Academic Year</span>
                    <div className="flex items-center gap-2.5 text-slate-800 font-semibold text-sm">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      {studentProfile.academicYear}
                    </div>
                  </div>
                </div>

                {/* Additional simulated telemetry detail */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl mt-4">
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">
                    This profile information is loaded from temporary React state memory. Since this application is currently in its frontend prototype phase, refreshing your page will reset these local values.
                  </p>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleSave} className="space-y-6">
                <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-display font-bold text-slate-950 text-lg">Modify Academic Info</h3>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-500 hover:text-slate-900 font-semibold text-xs"
                    onClick={() => setIsEditing(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>

                <div className="space-y-5">
                  <Input
                    id="edit-fullName"
                    label="Full Name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={errors.fullName}
                    placeholder="Enter full name"
                    leftIcon={<User className="h-5 w-5 text-slate-400" />}
                    disabled={isSubmitting}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Board dropdown */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label htmlFor="edit-board-select" className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-0.5">
                        Education Board <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="edit-board-select"
                          value={board}
                          onChange={(e) => setBoard(e.target.value)}
                          className="w-full h-11 text-sm rounded-lg border border-slate-200 bg-white px-3.5 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none text-slate-900 font-medium"
                          disabled={isSubmitting}
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

                    {/* Grade dropdown */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <label htmlFor="edit-grade-select" className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-0.5">
                        Grade / Class <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="edit-grade-select"
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          className="w-full h-11 text-sm rounded-lg border border-slate-200 bg-white px-3.5 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none text-slate-900 font-medium"
                          disabled={isSubmitting}
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

                  <Input
                    id="edit-schoolName"
                    label="School / College Name"
                    required
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    error={errors.schoolName}
                    placeholder="Enter school name"
                    leftIcon={<School className="h-5 w-5 text-slate-400" />}
                    disabled={isSubmitting}
                  />

                  {/* Academic Year Dropdown */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label htmlFor="edit-year-select" className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-0.5">
                      Academic Year <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="edit-year-select"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                        className="w-full h-11 text-sm rounded-lg border border-slate-200 bg-white px-3.5 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none text-slate-900 font-medium"
                        disabled={isSubmitting}
                      >
                        <option value="2025-2026">2025-2026</option>
                        <option value="2026-2027">2026-2027</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <Calendar className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 h-11 text-sm font-bold shadow-md shadow-blue-500/10"
                    isLoading={isSubmitting}
                    disabled={board === "Others"}
                    leftIcon={<Check className="h-4 w-4" />}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
