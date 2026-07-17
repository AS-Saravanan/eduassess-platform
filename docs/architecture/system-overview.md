# EduAssess System Overview

This document describes the high-level architecture of **EduAssess**, an intelligent self-assessment platform designed to provide high-fidelity AI-driven evaluation and feedback on student academic coursework.

---

## 🏛️ Intended System Architecture

EduAssess is organized as a multi-tier, full-stack platform designed to separate client experiences, business logic, persistence layers, and external processing engines.

```text
       [ Student / Admin Browser ]
                    │
                    ▼
              ┌───────────┐
              │  Frontend │  <--- React 19 / Vite 6 / Tailwind CSS
              └─────┬─────┘
                    │
                    ▼  (Secure API Requests)
              ┌───────────┐
              │  Backend  │  <--- Node.js / Express / TypeScript
              └─────┬─────┘
                    │
      ┌─────────────┼─────────────┐
      ▼             ▼             ▼
┌───────────┐ ┌───────────┐ ┌───────────┐
│ Database  │ │    Auth   │ │AI Services│
│ PostgreSQL│ │ Firebase  │ │Gemini API │
└───────────┘ └───────────┘ └───────────┘
```

---

## 🧩 Architectural Responsibilities

### 1. Frontend Scope (Current Focus)
- **Framework**: React 19, TypeScript, Tailwind CSS v4, Vite 6.
- **Responsibility**: Single Page Application (SPA) serving as the Student Portal.
- **Core Interfaces**: Google Authentication, Student Profile Onboarding, Syllabus/Textbook Selection, Exam Parameter Configuration, and Exam Assessment Mode dashboards.
- **Client State**: Light client-side state managers and context wrappers (e.g., `AuthContext`) for tracking credentials and onboarding progression.

### 2. Backend API Layer (Future Milestone)
- **Framework**: Node.js, Express, TypeScript.
- **Responsibility**: Gateway routing, business logic orchestration, OCR/image payload extraction, and secure database mutation channels.
- **Security**: Validates incoming Authorization Headers against Firebase Auth tokens.
- **Proxy**: Masks and proxies Gemini API keys, executing server-side API requests to prevent exposing credentials to the client browser.

### 3. Database & Storage Layer (Future Milestone)
- **Database Engine**: PostgreSQL.
- **Object Relational Mapper**: Prisma ORM.
- **Responsibility**: Durable relational persistence.
- **Key Schemas**:
  - **Users / Profiles**: Permanent records of registered student and admin cohorts.
  - **Syllabus Content**: Indexed chapters, textbook mappings, and structured learning indexes.
  - **Exam Instances**: Generated question papers, allocated time limits, and associated patterns.
  - **Evaluation Records**: Recorded student answers, handwritten image uploads, and AI evaluation summaries.

### 4. Authentication (Firebase)
- **Mechanism**: Google Sign-In and email-password credential mapping managed entirely client-side for immediate session generation.
- **Scope**: Authenticates students, verifies onboarding progression, and supplies JSON Web Tokens (JWT) to secure future backend API routes.

### 5. AI Question Generation & Evaluation (Future Milestone)
- **SDK**: `@google/genai` TypeScript SDK.
- **Capabilities**:
  - **Dynamic Generation**: Synthesize rigorous question sheets mapped to selected chapters and cognitive difficulty matrices.
  - **Evaluation Engine**: Grade open-ended, short-form, and essay-type answers with precise structural scoring guides, comparing answers to expected NCERT solutions.
  - **Optical Handwriting Recognition**: Process uploaded canvas images or handwriting sheets using multimodal visual processing.
