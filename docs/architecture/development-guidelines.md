# EduAssess Development Guidelines

To ensure the repository remains modular, stable, and easy to maintain as it transitions into a full-stack platform, all contributions must follow these development guidelines.

---

## 🛠️ Milestone-Based Development

Development on EduAssess follows a strict, milestone-driven approach where boundaries are set beforehand.

1. **Focused Scope**: Work strictly within the boundaries defined by the current active milestone. Do not pre-implement parts of future milestones out of order.
2. **Review First**: Perform an architectural review before editing or introducing files. Ensure directories match the target layout.
3. **Avoid Technical Accretion**: Do not introduce mock databases, mock servers, or system logging boilerplate to the client code. Interfaces should remain clean, production-ready, and lightweight.

---

## 📂 Separation of Concerns

The repository structure enforces a clean separation of concerns:

- **Frontend (`/frontend`)**: Presentation, user interfaces, routes, client validation, and layout logic.
- **Backend (`/backend`)**: Business logic, Google Gen AI SDK processing, secure API routing, and file streams.
- **Database (`/database`)**: Schema definition, migration tracking, and seed datasets.

### Isolated Code Changes
- Modifying a layout or UI button in `/frontend` **must not** require altering files in `/backend` or `/database`.
- Database schemas in `/database` should be modified alongside Prisma migrations, isolated from live application code.

---

## 📉 Small, Reversible Steps

- Always structure code modifications in logical, granular stages.
- Before committing or advancing milestones, ensure the app is in a valid state:
  - No syntax or type errors.
  - The linter passes cleanly (`npm run lint`).
  - The compiler can build production bundles successfully (`npm run build`).
- If an implementation fails, revert the step rather than accumulating patch files or complex workarounds.

---

## 🔑 Environment Variable Separation

EduAssess relies on separate environments for client-side configuration (e.g., public keys) and server-side operations (e.g., private APIs).

### Client Variables
- Prefixed with `VITE_` (e.g., `VITE_FIREBASE_API_KEY`).
- Loaded by Vite at build time and available to the browser.
- **Strict Rule**: Never place private secrets (such as Google Gen AI API keys, private database connection strings, or cloud storage credentials) in client environment configurations.

### Server Variables
- Stored securely on the deployment host or in root `.env` (not prefixing with `VITE_`).
- Read strictly on the server-side (`process.env`).
- Standardized templates must be declared in the root `.env.example`.
