# EduAssess — Intelligent Self-Assessment Platform

EduAssess is a premium, modern Student Self-Assessment Platform designed to help students practice and self-assess academic skills, receiving immediate, high-fidelity AI-driven feedback on open-ended subjective questions.

This repository is structured to scale into a robust full-stack application containing Student/Admin portals, AI-powered generation engines, and secure persistence layers.

---

## 🏛️ Overall Repository Architecture

EduAssess is organized as a modular monorepo to separate presentation, business logic, persistent data models, and documentation assets.

```text
EduAssess/
│
├── frontend/           # React + Vite application (Student Portal, UI Pages)
│   ├── src/            # Components, pages, mock data, and global state
│   ├── package.json    # Frontend dependency configurations
│   └── vite.config.ts  # Vite build & plugin settings
│
├── backend/            # Future Node.js + Express API server (AI Question Gen, OCR, Grading)
│   └── README.md       # Backend blueprint details
│
├── database/           # PostgreSQL configuration, Prisma schemas, and migrations
│   ├── prisma/         # Prisma Schema mapping files
│   ├── migrations/     # Generated SQL migration history
│   ├── seed/           # Seeding scripts for default NCERT textbooks & mock datasets
│   └── design/         # Relational schema ERDs and design plans
│
├── docs/               # System blueprints and architectural handoffs
│   ├── architecture/   # Structural diagrams and design decisions
│   ├── api/            # API endpoints & data contract definitions
│   ├── milestones/     # Development timeline and roadmap summaries
│   └── database-design/# Relational DB normalization specs
│
├── .gitignore          # Repository-wide build and cache ignore rules
├── .env.example        # Reference environment variables list
├── package.json        # Delegating scripts for root-level orchestration
└── README.md           # Main project overview and starting guides
```

---

## 📁 Folder Directory Purposes

### 1. `/frontend`
Holds the complete client-side SPA built with **React 19**, **Vite 6**, and **Tailwind CSS v4**. Implements the fully interactive Student Assessment lifecycle—including Sign-In, Onboarding, Syllabus Configuration, Mode Selection, and Mock Test Dashboards.

### 2. `/backend`
Planned to house the Express + TypeScript backend. This server will securely handle Google Gemini AI integrations, manage coursework uploads, process physical handwritten answer sheet scanning (OCR), and evaluate text answers safely behind API gateways.

### 3. `/database`
Consolidates all database configurations. Uses **Prisma ORM** to connect with a relational **PostgreSQL** instance. Tracks local migrations, seeding routines (e.g. NCERT book tables), and relational layout schema definitions.

### 4. `/docs`
Centralized repository documentation. Stores system blueprints, Phase 1 handoff metrics, REST API specs, and logical database diagrams to ensure onboarding clarity.

---

## 💻 Quick Start & Commands

Commands can be run directly from the **repository root** for seamless developer onboarding:

### 1. Installation
Install all dependencies for the entire project (automatically runs the frontend post-install script):
```bash
npm install
```

### 2. Start Frontend Development Server
Runs the interactive React + Vite platform on port `3000`:
```bash
npm run dev
```

### 3. Build Frontend Application
Compiles, optimizes, and bundles the client application, outputting directly to the root `/dist` folder for production-ready deployment:
```bash
npm run build
```

### 4. Code Quality & Linting
Validate TypeScript static typing and React rules across the frontend scope:
```bash
npm run lint
```

---

## 🚀 Future Scalability Scope
EduAssess is engineered to scale gracefully towards:
- **Student Portal**: Immersive digital testing modes, performance charts, and learning diagnostics.
- **Admin Portal**: Interface for teachers and admins to upload textbook material, audit AI grading parameters, and review student progress.
- **PostgreSQL**: Hardened database to support complex relation structures (Users, Submissions, Question Banks).
- **Firebase Authentication**: Robust user authentication with social logins.
- **AI Question Generation & OCR**: Live streaming AI models from the `@google/genai` SDK to dynamically synthesize contextually sound exams and read physical handwritten answer sheets.
