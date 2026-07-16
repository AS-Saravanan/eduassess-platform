import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ArrowRight,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export default function LoginPage() {
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [rememberMe, setRememberMe] = useState(false);

  // UI States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Client-side validations
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 1) {
      newErrors.password = "Password cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let key = id;
    if (id.includes("email-address")) key = "email";
    if (id.includes("password")) key = "password";

    setFormData(prev => ({
      ...prev,
      [key]: value
    }));

    // Clear dynamic validation error on type
    if (errors[key]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate standard authentic network delay
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);

      // Temporary success state transition to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    }, 1500);
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

            {loginSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-950">Welcome Back!</h2>
                <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium leading-relaxed">
                  Authentication successful. Loading your personal student dashboard...
                </p>
                <div className="pt-2 flex justify-center">
                  <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-[pulse_1s_infinite] w-full"></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Form header */}
                <div className="text-center mb-8 space-y-2">
                  <h1 className="text-2xl font-display font-bold text-slate-950 tracking-tight">
                    Sign In to EduAssess
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">
                    Assess your skills and receive instant AI grading feedback.
                  </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Email Address"
                    placeholder="student@example.com"
                    type="email"
                    required
                    leftIcon={<Mail className="h-4 w-4" />}
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    disabled={isLoading}
                  />

                  <div className="relative">
                    <Input
                      label="Password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      required
                      leftIcon={<Lock className="h-4 w-4" />}
                      rightIcon={
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-slate-400 hover:text-slate-600 focus:outline-none focus:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      }
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Remember Me & Forgot Password placeholders */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={isLoading}
                        className="h-4.5 w-4.5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer transition-colors"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2.5 block text-xs font-semibold text-slate-600 select-none uppercase tracking-wider cursor-pointer"
                      >
                        Remember Me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Forgot Password recovery is a placeholder UI element for Phase 1.");
                        }}
                        className="text-xs font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-700 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-4"
                    isLoading={isLoading}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Sign In
                  </Button>
                </form>

                {/* Footer sign up link */}
                <div className="mt-6 text-center border-t border-slate-100 pt-5">
                  <p className="text-sm text-slate-500 font-medium">
                    Don't have an account yet?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
