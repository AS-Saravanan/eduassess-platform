import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Sparkles } from "lucide-react";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/60 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm mx-auto animate-pulse">
          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
            <Sparkles className="h-6 w-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-lg font-bold text-slate-950">Verifying session</h3>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">
              Please wait while we verify your institutional Single-Sign-On identity...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
