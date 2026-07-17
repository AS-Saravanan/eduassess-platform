import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  CheckCircle2,
  Chrome,
  AlertCircle,
  GraduationCap,
  ShieldCheck
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { signInWithGoogle, user, studentProfile } = useAuth();
  const navigate = useNavigate();

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<"student" | "admin">("student");

  // If already authenticated as student, transition to appropriate page
  useEffect(() => {
    if (user && selectedRole === "student") {
      const timer = setTimeout(() => {
        if (!studentProfile) {
          navigate("/student-profile-setup", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user, navigate, selectedRole, studentProfile]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signInWithGoogle();
      // On successful authentication, AuthContext updates state.
    } catch (err: any) {
      if (err?.code === "auth/popup-closed-by-user") {
        console.warn("Login failed: Google Sign-In popup closed by user.");
        setError("The sign-in window was closed before completing. Please try again.");
      } else {
        console.error("Login failed:", err);
        // User-friendly mapping of common Firebase auth errors
        if (err.code === "auth/popup-blocked") {
          setError("The sign-in window was blocked by your browser. Please allow popups for this site.");
        } else if (err.code === "auth/network-request-failed") {
          setError("A network error occurred. Please verify your internet connection.");
        } else {
          setError("An unexpected error occurred during authentication. Please try again.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-12 -left-12 w-[250px] h-[250px] bg-indigo-50/50 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Top Brand Logo Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link
          to="/"
          className="inline-flex font-display text-2xl font-bold text-slate-900 tracking-tight items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg px-2 py-1"
        >
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <span>
            EduAssess<span className="text-blue-600 font-extrabold">.</span>
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card className="shadow-xl shadow-slate-100/80 border-slate-100/80">
          <CardContent className="p-8">

            {user ? (
              selectedRole === "admin" ? (
                <div className="py-8 text-center space-y-5 animate-fade-in">
                  <div className="h-16 w-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                    <ShieldCheck className="h-10 w-10 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-display text-2xl font-bold text-slate-950">
                      Welcome, {user.displayName || "Admin"}!
                    </h2>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium">
                      {user.email}
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-2xl">
                    <p className="text-amber-800 text-sm font-semibold leading-relaxed">
                      Admin access verification will be implemented in a future milestone.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="text-slate-600 border-slate-200 hover:bg-slate-50"
                      onClick={() => window.location.reload()}
                    >
                      Return to Selection
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-slate-950">
                    Welcome, {user.displayName || "Student"}!
                  </h2>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium leading-relaxed">
                    Successfully authenticated via Google. Your identity has been verified.
                  </p>
                  <div className="pt-2 flex justify-center">
                    <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 animate-[pulse_1s_infinite] w-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <>
                {/* Form header */}
                <div className="text-center mb-8 space-y-2">
                  <h1 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                    Welcome to EduAssess
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">
                    Assess your skills and receive instant AI grading feedback.
                  </p>
                </div>

                {/* Error message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 text-sm animate-slide-in">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-500" />
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {/* Role Selector UI */}
                <div className="space-y-3 mb-6">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
                    Choose your access type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRole("student")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        selectedRole === "student"
                          ? "border-blue-600 bg-blue-50/50 text-blue-700"
                          : "border-slate-100 bg-white hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      <GraduationCap className={`h-6 w-6 mb-1 ${selectedRole === "student" ? "text-blue-600" : "text-slate-400"}`} />
                      <span className="text-sm font-bold">Student</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedRole("admin")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        selectedRole === "admin"
                          ? "border-blue-600 bg-blue-50/50 text-blue-700"
                          : "border-slate-100 bg-white hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      <ShieldCheck className={`h-6 w-6 mb-1 ${selectedRole === "admin" ? "text-blue-600" : "text-slate-400"}`} />
                      <span className="text-sm font-bold">Admin</span>
                    </button>
                  </div>
                </div>

                {/* Identity Provider Buttons */}
                <div className="space-y-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full relative flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs h-12 text-sm font-semibold transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    onClick={handleGoogleLogin}
                    isLoading={isLoading}
                    disabled={isLoading}
                    leftIcon={!isLoading ? <Chrome className="h-5 w-5 text-red-500 shrink-0" /> : undefined}
                  >
                    Continue with Google
                  </Button>
                </div>

                {/* Subtle helper note */}
                <p className="mt-6 text-center text-xs text-slate-400 font-medium leading-relaxed px-2">
                  By continuing, you are accessing your secure institution dashboard verified via your Google Single-Sign-On credentials.
                </p>
              </>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

