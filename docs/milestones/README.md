# EduAssess Development Milestones & Roadmap

This document outlines the engineering progress of EduAssess, charting completed achievements and upcoming milestones.

---

## ✅ Completed Milestones

### 🟢 Phase 1: Authentication & Client Onboarding
- **Firebase Provisioning**: Bootstrap Firebase Auth and Firestore capabilities inside the Google Cloud ecosystem.
- **Google Authentication**: Seamless student sign-in with live routing states using standard React context providers (`AuthContext`).
- **Protected Routing**: Established client navigation guards preventing unauthenticated access to system dashboards.
- **Student Onboarding UI**: Custom-designed profile forms capturing Student Name, Board (CBSE/ICSE), and Grade level (Class 9 - 12) with state preservation.
- **Exam Discovery UI**: Interactive visual lists displaying available syllabus books mapping to NCERT standards.

### 🟢 Phase 2: Configuration & Navigation Relayout
- **Exam Configuration UI**: Advanced configurations allowing students to specify exam scope (Full Book vs. Selected Chapters), duration limits, and pattern structures (e.g., MCQs, short answers, essay questions).
- **Assessment Mode Selection UI**: Option screens allowing users to choose between:
  - *Online Assessment*: Direct in-browser evaluation with live AI grading.
  - *Offline Paper Assessment*: Physical question paper printing and handwriting sheet uploads.
- **Repository Restructuring**: Transitioned from a single-app framework to a modular workspace, relocating React + Vite codebase into the dedicated `/frontend` folder and creating empty boundaries for future services.

---

## 📅 Future Milestones

### 🟡 Phase 3: Relational Backend Foundation
- **Express API Bootstrap**: Stand up the Node.js API server to expose RESTful endpoints under `/api`.
- **Database Schema & ORM**: Model logical schemas in Prisma (PostgreSQL), generating migrations, seeding scripts, and default coursework records.
- **Auth Bridging**: Validate client bearer JWTs on Express routes using firebase-admin SDK helpers.

### 🟡 Phase 4: Admin Portal & Management
- **Coursework Uploader**: Interface allowing administrator accounts to ingest custom syllabus PDFs, textbook chapters, and sample answer keys.
- **Evaluation Dashboards**: Teacher tools to review class averages, analyze individual performance metrics, and override AI grades.

### 🟡 Phase 5: Intelligent Evaluation Engine (AI)
- **AI Question Synthesis**: Implement dynamic prompts using `@google/genai` to synthesize contextual exams matching requested parameters.
- **Subjective AI Grading**: Stream and evaluate textual, open-ended student responses with structural diagnostic reports.
- **Handwritten Document Processing (OCR)**: Integrate computer vision models to read uploaded paper sheets, processing handwritten student submissions.
