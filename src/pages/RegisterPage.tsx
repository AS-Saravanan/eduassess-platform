import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  School, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export default function RegisterPage() {
  const navigate = useNavigate();
  
  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    schoolName: ""
  });

  // UI state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Validate on input or submit
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // Map element ids (like input-full-name) back to form state keys
    let key = id;
    if (id.includes("full-name")) key = "fullName";
    if (id.includes("email-address")) key = "email";
    if (id.includes("password") && !id.includes("confirm")) key = "password";
    if (id.includes("confirm-password")) key = "confirmPassword";
    if (id.includes("school-college-name")) key = "schoolName";

    setFormData(prev => ({
      ...prev,
      [key]: value
    }));

    // Clear error dynamically as the user types
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

    // Simulate standard professional authentication server round-trip delay
    setTimeout(() => {
      setIsLoading(false);
      setRegistrationSuccess(true);
      
      // Direct page navigation after a short success-state display
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
            
            {registrationSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-950">Registration Complete!</h2>
                <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium leading-relaxed">
                  Welcome to EduAssess. Preparing your custom learning workspace now...
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
                    Create Your Account
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">
                    Start practicing and evaluating your skills with AI.
                  </p>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Full Name"
                    placeholder="Jane Doe"
                    type="text"
                    required
                    leftIcon={<User className="h-4 w-4" />}
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    disabled={isLoading}
                  />

                  <Input
                    label="Email Address"
                    placeholder="jane@example.com"
                    type="email"
                    required
                    leftIcon={<Mail className="h-4 w-4" />}
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    disabled={isLoading}
                  />

                  <Input
                    id="school-college-name"
                    label="School / College Name"
                    placeholder="Oxford University (Optional)"
                    type="text"
                    leftIcon={<School className="h-4 w-4" />}
                    value={formData.schoolName}
                    onChange={handleChange}
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

                  <div className="relative">
                    <Input
                      label="Confirm Password"
                      placeholder="••••••••"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      leftIcon={<Lock className="h-4 w-4" />}
                      rightIcon={
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-slate-400 hover:text-slate-600 focus:outline-none focus:text-slate-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      }
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-2"
                    isLoading={isLoading}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Register Account
                  </Button>
                </form>

                {/* Footer login link */}
                <div className="mt-6 text-center border-t border-slate-100 pt-5">
                  <p className="text-sm text-slate-500 font-medium">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                    >
                      Sign In
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
