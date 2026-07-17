/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StudentProfileSetupPage from "./pages/StudentProfileSetupPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import StudentExamsPage from "./pages/StudentExamsPage";
import ExamConfigurationPage from "./pages/ExamConfigurationPage";
import ExamPlaceholderPage from "./pages/ExamPlaceholderPage";
import AssessmentModeSelectionPage from "./pages/AssessmentModeSelectionPage";
import AssessmentModePlaceholderPage from "./pages/AssessmentModePlaceholderPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/student-profile-setup" 
            element={
              <ProtectedRoute>
                <StudentProfileSetupPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student-profile" 
            element={
              <ProtectedRoute>
                <StudentProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/exams" 
            element={
              <ProtectedRoute>
                <StudentExamsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/exam-config" 
            element={
              <ProtectedRoute>
                <ExamConfigurationPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assessment-mode" 
            element={
              <ProtectedRoute>
                <AssessmentModeSelectionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assessment-placeholder" 
            element={
              <ProtectedRoute>
                <AssessmentModePlaceholderPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/exam-placeholder" 
            element={
              <ProtectedRoute>
                <ExamPlaceholderPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

