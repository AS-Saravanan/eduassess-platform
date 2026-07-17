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
import AssessmentSessionPage from "./pages/AssessmentSessionPage";
import AssessmentResultsPage from "./pages/AssessmentResultsPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AcademicLibraryPage from "./pages/admin/AcademicLibraryPage";
import AcademicContentDetailPage from "./pages/admin/AcademicContentDetailPage";
import ExamPatternsPage from "./pages/admin/ExamPatternsPage";
import ExamPatternCreatePage from "./pages/admin/ExamPatternCreatePage";
import ExamPatternDetailPage from "./pages/admin/ExamPatternDetailPage";
import ExamPatternEditPage from "./pages/admin/ExamPatternEditPage";
import { ExamPatternProvider } from "./features/admin/exam-patterns/ExamPatternContext";

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
            path="/assessment/session"
            element={
              <ProtectedRoute>
                <AssessmentSessionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessment/results"
            element={
              <ProtectedRoute>
                <AssessmentResultsPage />
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
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/library" element={<AcademicLibraryPage />} />
          <Route path="/admin/library/:id" element={<AcademicContentDetailPage />} />
          {/* Exam Patterns – single provider instance wraps all child routes */}
          <Route
            path="/admin/exam-patterns"
            element={
              <ExamPatternProvider>
                <ExamPatternsPage />
              </ExamPatternProvider>
            }
          />
          <Route
            path="/admin/exam-patterns/create"
            element={
              <ExamPatternProvider>
                <ExamPatternCreatePage />
              </ExamPatternProvider>
            }
          />
          <Route
            path="/admin/exam-patterns/:id"
            element={
              <ExamPatternProvider>
                <ExamPatternDetailPage />
              </ExamPatternProvider>
            }
          />
          <Route
            path="/admin/exam-patterns/:id/edit"
            element={
              <ExamPatternProvider>
                <ExamPatternEditPage />
              </ExamPatternProvider>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

