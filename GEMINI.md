# EduAssess Platform - Instructional Context

EduAssess is an AI-powered student self-assessment platform. This project currently serves as a fully functional Phase 1 UI/UX prototype focusing exclusively on the Student journey.

## Project Overview

- **Purpose**: Bridge the gap between traditional textbook learning and personalized AI-driven evaluation.
- **Current State**: Phase 1 Prototype (Client-side interactive UI/UX). No real backend or database integrated yet.
- **Tech Stack**:
  - **Framework**: React 19, TypeScript 5.8
  - **Build Tool**: Vite 6
  - **Styling**: Tailwind CSS v4
  - **Routing**: React Router v7
  - **Auth**: Firebase (initialized, preparing for full integration)

## Directory Structure

```text
├── apps/
│   ├── frontend/            # Main React application source
│   │   ├── src/
│   │   │   ├── components/  # Atomic UI components
│   │   │   ├── context/     # AuthContext (Firebase auth)
│   │   │   ├── features/    # Student feature logic
│   │   │   ├── pages/       # Route controllers
│   │   │   └── data/        # Mock data/types
│   │   └── vite.config.ts   # Vite configuration
│   └── backend/             # Reserved for Phase 2+ (Empty)
├── packages/                # Reserved for shared packages (Empty)
├── database/                # Reserved for schemas (Empty)
└── docs/                    # Architecture and progress documentation
```

## Building and Running

Run all commands from the repository root:

- **Install Dependencies**: `npm install`
- **Run Development Server**: `npm run dev` (Frontend on port 3000)
- **Lint/TypeScript Check**: `npm run lint`
- **Production Build**: `npm run build` (Builds to `apps/frontend/dist/`)

## Development Conventions

- **Component Structure**: Atomic UI components (`components/ui/`) use `React.forwardRef` and `Lucide` icons.
- **Styling**: Pure Tailwind CSS classes (defined in `src/index.css`). No extra CSS libraries.
- **State Management**: React Context (`AuthProvider`) for global auth state; Feature-specific context for student assessment flows.
- **Type Safety**: Strict TypeScript (`tsconfig.json`). Ensure all new components and data models have explicit type definitions.
- **Accessibility**: Follow accessibility standards (ARIA attributes, keyboard navigation support).
- **Environment**: Firebase credentials are injected via environment variables from the root `.env` file (configured in `apps/frontend/vite.config.ts`).
