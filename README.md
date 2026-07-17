# EduAssess

EduAssess is a premium, modern Student Self-Assessment Platform designed to help students practice and self-assess academic skills, receiving immediate, high-fidelity AI-driven feedback on open-ended subjective questions.

This repository currently houses the **Phase 1 UI/UX Prototype**, establishing a robust, fully responsive design system, mock interactive dashboards, client-side validation logic, and cohesive mock datasets.

---

## 🚀 Phase 1 Project Status

Phase 1 is successfully compiled and fully functional as an interactive client-side application. No backend databases, session structures, or real authentication services are integrated at this stage. All data flows and state validations operate safely within local React states.

### Core Implemented Features
* **Landing Page**: Visually stunning, high-contrast overview displaying key value propositions, interactive feature modules, and CTA pathways.
* **Student Registration (`/register`)**: Fully validated input fields (Name, Email, Password, College) with simulated server lag (1500ms) and dynamic success state before redirection.
* **Student Sign-In (`/login`)**: Custom field validations, interactive password show/hide, active "Remember Me" toggle, and a dummy "Forgot Password" dialog.
* **Welcome Dashboard (`/dashboard`)**: Features responsive left-sidebar navigation on desktop alongside an elegant mobile overlay drawer. Contains diagnostic performance summaries, upcoming assessments lists, interactive recommended topics, and examples of deep subjective-text AI grading snippets.

---

## 🛠️ Technology Stack

* **React 19** (`^19.0.1` Library & `^19.0.1` DOM)
* **Vite 6** (`^6.2.3` Build Tooling & Bundler)
* **TypeScript 5.8** (`~5.8.2` Strict Static Type Checking)
* **Tailwind CSS v4** (`^4.1.14` Unified Engine with Vite Integration)
* **React Router v7** (`^7.18.1` Dynamic Client Routing)
* **Lucide React** (`^0.546.0` Vector SVG Iconography)

---

## 📁 Project Structure

```text
├── apps/
│   ├── frontend/
│   │   ├── src/               # React frontend source files
│   │   ├── index.html         # Frontend HTML entry point
│   │   ├── package.json       # Frontend module dependency manager
│   │   ├── vite.config.ts     # Vite configuration
│   │   └── tsconfig.json      # TypeScript configuration
│   └── backend/               # Reserved for future backend services
├── packages/                  # Reserved for future shared library packages
├── database/                  # Reserved for future database schemas and scripts
├── docs/
│   └── PHASE_1_HANDOFF.md     # Deep Phase 1 Architecture & Integration Guidelines
├── package.json               # Root monorepo workspace configuration
├── .env.example               # Root template for environment variables
└── README.md                  # This file
```

For a comprehensive review of the design systems, layout decisions, and future integration guidelines, please see the [Phase 1 Handoff Documentation](./docs/PHASE_1_HANDOFF.md).

---

## 💻 Development & Deployment Commands

Run these standard scripts from the project root:

### Installation
```bash
npm install
```

### Run Local Dev Server
Runs the frontend development server on port 3000 from the workspace root:
```bash
npm run dev
```

### Run Linter & TypeScript Compilation Validation
Verifies syntax correctness, typescript typings, and basic lint formatting:
```bash
npm run lint
```

### Production Build
Compiles, optimizes, and bundles your application assets into `apps/frontend/dist/` for static hosting:
```bash
# From the repository root:
npm run build

# Or directly from the frontend directory:
cd apps/frontend
npm run build
```

---

## 🗺️ Future Roadmap (Phase 2 & Beyond)

* **Robust Authentication**: Connect Firebase Authentication or standard secure JWT session tokens to proxy backends.
* **Database Synchronization**: Integrate Cloud Firestore or Cloud SQL (PostgreSQL) databases using the custom models detailed in `src/data.ts`.
* **Stateful Assessment Engine**: Build subjective-text form submissions powered by server-side Google Gemini SDK models (`@google/genai`) to provide real-time, personalized evaluations and grading rubrics.
