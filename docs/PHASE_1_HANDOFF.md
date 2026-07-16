# EduAssess - Phase 1 Developer Handoff Document
## Student Self-Assessment Platform UI Prototype

This document provides a comprehensive overview of the Phase 1 implementation of **EduAssess**, a premium AI-powered student self-assessment platform. Phase 1 delivers a highly polished, fully responsive, and accessible UI/UX prototype. All state and routing flows are simulated locally on the client to demonstrate correct behavioral ergonomics before transitioning to stateful backends.

---

## 1. Project Overview

### Purpose
EduAssess is designed to empower students to practice and self-assess academic skills, receiving immediate, high-fidelity AI feedback on structured and subjective (long-answer) questions. The platform bridges the gap between conventional multiple-choice tests and subjective open-ended analysis.

### Phase 1 Scope Boundary
Phase 1 focuses exclusively on establishing a world-class design system, foundational navigation pathways, client-side validation logic, and aesthetic mock representations of the primary workspace environments. 
* **Intentionally Excluded**: Real authentication systems (Firebase Auth, JWTs, sessions), database integration (Cloud Firestore/SQL), and live API requests (Google Gemini, grading microservices). All behaviors are modeled cleanly inside interactive UI states.

---

## 2. Technology Stack

The platform is engineered on a modern, fast, and type-safe front-end architecture:
* **React 19 & Vite 6**: React (`^19.0.1`) paired with Vite (`^6.2.3`) for lightning-fast builds, optimized static asset loading, and robust state orchestration.
* **TypeScript 5.8**: Strict static type definitions (`~5.8.2`) for application parameters and simulated data structures to ensure compile-time contract safety.
* **Tailwind CSS v4**: Unified next-generation utility styling engine (`^4.1.14`) with seamless native Vite compilation.
* **React Router v7**: Modern navigation handling (`^7.18.1`) supporting modular routing paths and nested view rendering.
* **Lucide React**: Vector SVG iconography (`^0.546.0`) ensuring sleek, high-contrast, and scalable visual UI details.

---

## 3. Application Architecture

### Folder Structure
The workspace is organized to promote modular separation of concerns and high maintainability:

```text
/src
├── components/          # Reusable structural and atomic UI components
│   ├── layout/          # Global layout units (Navbar, Footer, MobileMenu)
│   └── ui/              # Atomically designed form controls (Button, Card, Input)
├── pages/               # Primary screen controllers and view routes
│   ├── LandingPage.tsx  # Marketing landing, features, and call-to-actions
│   ├── LoginPage.tsx    # Accessible login portal with validation
│   ├── RegisterPage.tsx # Student registration with dynamic input checks
│   └── DashboardPage.tsx# Core student workspace, recommendations, and metrics
├── data.ts              # Centrally managed static mock data and types
├── App.tsx              # Main entry point, layout context, and route tree mapping
├── index.css            # Tailwinds imports, display typography imports, global styles
└── main.tsx             # React DOM root bootstrapping layer
```

### Component Organization & Reusability
Components follow an atomic structure:
1. **`Input.tsx`**: Dynamic label injection, keyboard action triggers, support for vector icons (`leftIcon`, `rightIcon`), standard focus rings, and inline error text fields.
2. **`Button.tsx`**: Consistent active hover scales, distinct structural styles (`primary`, `secondary`, `outline`), and safe asynchronous loading states (`isLoading`).
3. **`Card.tsx`**: Premium high-contrast container boxes styled with subtle off-white borders, shadow depth offsets, and structured layout sections (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`).

---

## 4. Implemented Features

### Landing Page
* **Concept**: Interactive marketing homepage presenting the core value proposition of AI-driven evaluation.
* **UI Features**: Hero CTA buttons, animated workflow steps, features bento grid, and testimonials.

### Registration Page (`RegisterPage.tsx`)
* **Required Fields**: Full Name, Email, Password, Confirm Password, and School/College Name (optional).
* **Validation**:
  * Real-time field presence assertion.
  * Formatted regex verification for RFC 5322 compliant emails.
  * Dynamic, instant clear of error messages as the student overrides invalid input.
* **Simulated Behavior**: A 1500ms network round-trip loading delay, displaying an elegant green checkmark success state before navigating to the student workspace.

### Login Page (`LoginPage.tsx`)
* **Fields**: Email and Password.
* **Validation**: Prevents submitting empty inputs, verifies email pattern structures, and outputs localized alert messaging below the respective controls.
* **Interactive Toggles**: Functional eye/eye-off visibility switcher for hidden credentials. Interactive (UI-only) "Remember Me" checkbox.
* **Simulated Behavior**: Multi-phase state machine detailing loading, verification success, and automated dashboard navigation.

### Welcome Dashboard UI (`DashboardPage.tsx`)
* **Responsive Architecture**: Collapsible mobile navigation drawer paired with a permanent left-sidebar layout for desktop monitors.
* **Workspace Panels**:
  * **Welcome Section**: Renders personalized greetings, educational institute parameters, and a dynamic circular overall competency score.
  * **Recent Assessments**: Detailed progress rows separating completed tasks from upcoming tests.
  * **AI Subjective Feedback**: Real example of advanced subjective-text grading detailing a student's answer paired with an AI rubric evaluation and constructive suggestions.
  * **Recommendations Panel**: Smart, contextual topics suggested for study based on simulated historic gaps.
  * **Learning Progress Stats**: Micro progress bars outlining syllabus topic coverage alongside continuous learning timeline graphs.

---

## 5. Mock Data Structure (`data.ts`)

To keep views highly clean and decoupled, mock data models have been centralized into `/src/data.ts` using strict TypeScript interfaces:

* **`StudentProfile`**: Maps student parameters (e.g., `fullName`, `schoolName`, `gradeLevel`).
* **`Assessment`**: Defines analytical test parameters, including item counts, duration scales, status flags (`completed` | `pending`), and mock grading strings (`aiVerdict`).
* **`Recommendation`**: Models targeted learning interventions including difficulty indicators (`Easy` | `Medium` | `Hard`).
* **`FeedbackSnippet`**: Illustrates real AI review objects featuring specific prompt challenges, user answers, and modular score criteria.

---

## 6. Future Phase Integration Guide

When transitioning to **Phase 2 (Stateful Integration)**, use the following integration blueprint:

### Authentication
* **Replacement Point**: Modify state structures in `LoginPage.tsx` and `RegisterPage.tsx` inside the `handleSubmit` functions.
* **Implementation Plan**: Replace current `setTimeout` actions with asynchronous Firebase SDK triggers (e.g., `signInWithEmailAndPassword` or OAuth provider popups). Protect routes inside `App.tsx` using a stateful React Context provider checking for authenticated session states.

### Database Integration (Firestore/Cloud SQL)
* **Replacement Point**: `/src/data.ts`
* **Implementation Plan**: Replace imports of static variables with custom hooks querying a Cloud database. Map the document queries directly into the pre-configured interfaces (`StudentProfile`, `Assessment`) to guarantee seamless, zero-error dashboard rendering.

### Subjective Assessment Engine & AI Evaluation
* **Replacement Point**: Dashboard/Assessments Tab
* **Implementation Plan**: Introduce an active testing mode page with a multi-line subjective textbox component. On submission, dispatch the response to an API endpoint proxying a server-side Gemini call (using `@google/genai` on the backend for API key safety). The response must return a JSON payload matching the `FeedbackSnippet` interface structure for direct visualization.

---

## 7. Development Commands

Execute standard development tasks from the root directory:

```bash
# Install required dependencies
npm install

# Start the local development server (bound to port 3000)
npm run dev

# Run TypeScript compilation checks and ESLint verification
npm run lint

# Compile and bundle the application for production deployment
npm run build
```

---

## 8. Architectural Decisions & Constraints

1. **State Isolation**: No `localStorage` or browser cookie storage was utilized. This ensures a clean slate for secure authentication state engines in Phase 2, avoiding stale storage conflicts or unauthorized client-side storage of mock credentials.
2. **Component Abstraction**: Form controls leverage standard HTML inputs wrapped inside accessible `<label>` and `aria-describedby` error associations, facilitating simple future integration with form state libraries like React Hook Form.
3. **No External CSS Libraries**: Relying strictly on `@import "tailwindcss";` in `src/index.css` preserves a unified build pipe, guaranteeing fast loading times and predictable cross-browser appearance.

---

## 9. Future Developer Notes

* **Accessibility Compliance**: Ensure any future interactive elements maintain a minimum target size of `44px` on mobile layouts, and enforce that focus styles remain visible (`focus-visible:ring-2`) during keyboard navigation.
* **API Key Security**: If adding direct external API interactions, ensure secret key tokens remain exclusively on a secure backend proxy server to prevent leakage to public client-side browser bundles.
