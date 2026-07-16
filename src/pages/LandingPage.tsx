import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  BrainCircuit, 
  Clock, 
  TrendingUp, 
  Compass, 
  BarChart3, 
  Mail, 
  User, 
  MessageSquare,
  ShieldAlert,
  Send
} from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

export default function LandingPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simple handler for contact form simulation
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!contactForm.name.trim()) newErrors.name = "Name is required";
    if (!contactForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!contactForm.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const featureCards = [
    {
      title: "Self Assessments",
      description: "Customizable, subject-specific quizzes tailored to your syllabus. Practice anytime and build confidence.",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      tag: "Flexible"
    },
    {
      title: "AI-Based Evaluation",
      description: "Intelligent evaluation engine that reads, analyzes, and understands open-ended subjective answers.",
      icon: <BrainCircuit className="h-6 w-6 text-indigo-600" />,
      tag: "Intelligent"
    },
    {
      title: "Instant Feedback",
      description: "Receive deep insights and model-grade corrected answers immediately after submitting your test.",
      icon: <Clock className="h-6 w-6 text-teal-600" />,
      tag: "Real-time"
    },
    {
      title: "Learning Progress Tracking",
      description: "Track your subject mastery and view detailed historical breakdowns of your learning milestones.",
      icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
      tag: "Analytics"
    },
    {
      title: "Personalized Recommendations",
      description: "Get smart topic suggestions and curated study resources based on your actual performance gaps.",
      icon: <Compass className="h-6 w-6 text-amber-600" />,
      tag: "Customized"
    },
    {
      title: "Performance Insights",
      description: "Diagnostic reports highlighting core strengths, common conceptual mistakes, and improvement areas.",
      icon: <BarChart3 className="h-6 w-6 text-violet-600" />,
      tag: "Insights"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-slate-50/50"
      >
        {/* Subtle decorative background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -top-12 -left-12 w-[300px] h-[300px] bg-indigo-50/50 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Promo Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 tracking-wide uppercase mx-auto lg:mx-0">
                <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                AI-Powered Learning Platform
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.1] sm:leading-[1.15]">
                Learn<span className="text-blue-600">.</span>{" "}
                Practice<span className="text-indigo-500">.</span>{" "}
                Improve<span className="text-emerald-500">.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Assess your knowledge, receive intelligent real-time feedback, and master key concepts through personalized, AI-driven evaluation tools.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-500/15" rightIcon={<ArrowRight className="h-4.5 w-4.5" />}>
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white">
                    Explore Dashboard
                  </Button>
                </Link>
              </div>

              {/* Live Metric Badges */}
              <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl sm:text-3xl font-display font-bold text-slate-950">98%</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-0.5">Success Rate</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-display font-bold text-slate-950">10k+</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-0.5">Tests Cleared</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-display font-bold text-slate-950">24/7</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-0.5">AI Feedback</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive CSS Illustration */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-2xl bg-gradient-to-tr from-blue-100/50 to-indigo-100/30 p-4 border border-white/60 shadow-xl overflow-hidden group">
                
                {/* Floating particles */}
                <div className="absolute top-10 right-10 w-3 h-3 rounded-full bg-blue-500 animate-bounce" />
                <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <div className="absolute top-1/2 left-8 w-4 h-4 rounded-full bg-emerald-400 opacity-60 blur-xs animate-ping" />

                {/* Dashboard mock card */}
                <div className="relative h-full w-full rounded-xl bg-white border border-slate-100 shadow-lg p-5 flex flex-col justify-between overflow-hidden">
                  
                  {/* Decorative card header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">
                        AI
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Dynamic Assistant</p>
                        <p className="text-[10px] text-emerald-500 flex items-center gap-1 font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Online & Ready
                        </p>
                      </div>
                    </div>
                    <div className="h-6 w-16 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-mono font-semibold">
                      VER. 1.0.3
                    </div>
                  </div>

                  {/* Mid illustrative visual: Circular progress loop */}
                  <div className="my-6 flex flex-col items-center justify-center relative py-2">
                    <div className="relative h-28 w-28 rounded-full border-4 border-slate-100 flex items-center justify-center">
                      {/* Active green progress segment */}
                      <svg className="absolute inset-0 transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="46" 
                          stroke="#2563eb" 
                          strokeWidth="4" 
                          fill="transparent" 
                          strokeDasharray="290" 
                          strokeDashoffset="70"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-center">
                        <p className="text-2xl font-display font-extrabold text-slate-900">82%</p>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Concept Fit</p>
                      </div>
                    </div>

                    {/* Mini feedback card absolute placement */}
                    <div className="absolute -right-4 bottom-4 bg-white/95 backdrop-blur-sm border border-slate-100 shadow-md rounded-lg p-2.5 max-w-[150px] transition-transform duration-300 hover:scale-105">
                      <p className="text-[10px] font-bold text-slate-900 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        AI Verified
                      </p>
                      <p className="text-[9px] text-slate-500 mt-0.5">Subjective feedback generated in 0.8 seconds.</p>
                    </div>

                    {/* Mini recommendations card absolute placement */}
                    <div className="absolute -left-4 top-2 bg-white/95 backdrop-blur-sm border border-slate-100 shadow-md rounded-lg p-2.5 max-w-[140px] transition-transform duration-300 hover:scale-105">
                      <p className="text-[10px] font-bold text-slate-900">Recommended</p>
                      <p className="text-[9px] text-blue-600 font-semibold mt-0.5">Revise Algebra II</p>
                    </div>
                  </div>

                  {/* Footer message summary */}
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Assessment Status</span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Completed</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full w-[82%] rounded-full"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Future-Ready Capability
            </h2>
            <p className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
              A Complete Assessment Suite at Your Fingertips
            </p>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-medium">
              We provide tools designed specifically to help you discover gaps in your study plan, gain mastery over core subjects, and track progress effortlessly.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((feat, idx) => (
              <Card key={idx} hoverable className="flex flex-col h-full bg-slate-50/20">
                <CardContent className="p-8 flex flex-col justify-between h-full space-y-5">
                  <div className="space-y-4">
                    {/* Icon container */}
                    <div className="h-12 w-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                      {feat.icon}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-slate-900 text-lg">
                          {feat.title}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wide">
                          {feat.tag}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Column 1: Graphic / Stats */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900">
                  Our Mission
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  We believe traditional rote testing is incomplete. True understanding comes from continuous, low-stakes self-testing combined with immediate, clarifying conceptual critique.
                </p>
                
                <div className="pt-4 border-t border-slate-50 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Targeted Learning Gap Analysis</p>
                      <p className="text-xs text-slate-500">Know exactly why you missed a mark, and what to read next.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Open-Ended Evaluation</p>
                      <p className="text-xs text-slate-500">AI reads and scores paragraph-length concepts, not just multiple choice.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Text Explanation */}
            <div className="lg:col-span-7 space-y-6 lg:pl-6 text-center lg:text-left">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                Why EduAssess
              </h2>
              <p className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight leading-tight">
                Designed for Students Who Want to Master, Not Just Pass
              </p>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                EduAssess bridges the gap between study guides and exam performance. By uploading questions, answering in your own words, and allowing our intelligent feedback engine to grade and analyze, you obtain a personalized dashboard indicating where you're struggling before the actual test occurs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs text-left">
                  <p className="text-sm font-bold text-slate-950">1. Practice</p>
                  <p className="text-xs text-slate-500 mt-1">Simulate authentic question pools built for your school's curriculum outline.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs text-left">
                  <p className="text-sm font-bold text-slate-950">2. Analyze</p>
                  <p className="text-xs text-slate-500 mt-1">Get custom breakdowns detailing precise terminology errors or conceptual slips.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Column 1: Info */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Contact Support
                </h2>
                <p className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
                  Have Any Questions? Get in Touch!
                </p>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
                  We're here to help you get the most out of your self-assessment path. Submit an inquiry or report a technical bug, and our support team will assist you shortly.
                </p>
              </div>

              {/* Quick Info Cards */}
              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Support Email</p>
                    <p className="text-sm font-semibold text-slate-800">support@eduassess.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Response Time</p>
                    <p className="text-sm font-semibold text-slate-800">Typically under 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs">
                
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-950">Inquiry Sent Successfully!</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">
                      Thank you for contacting us. We have received your message and will get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      leftIcon={<User className="h-4 w-4" />}
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      error={errors.name}
                      required
                    />

                    <Input
                      label="Email Address"
                      placeholder="john@example.com"
                      type="email"
                      leftIcon={<Mail className="h-4 w-4" />}
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      error={errors.email}
                      required
                    />

                    <div className="flex flex-col gap-1.5 w-full">
                      <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-0.5">
                        Message <span className="text-red-500 font-bold" aria-hidden="true">*</span>
                      </label>
                      <div className="relative flex items-start">
                        <div className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <textarea
                          id="contact-message"
                          rows={4}
                          placeholder="Tell us how we can help you..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className={`
                            w-full text-sm rounded-lg border bg-white p-3.5 pl-11 transition-all duration-200 outline-none resize-none
                            ${
                              errors.message
                                ? "border-red-300 text-red-900 placeholder-red-300/80 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                : "border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            }
                          `}
                        />
                      </div>
                      {errors.message && (
                        <p className="text-xs text-red-600 font-medium" id="contact-message-error">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" variant="primary" className="w-full" rightIcon={<Send className="h-4 w-4" />}>
                      Send Message
                    </Button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
