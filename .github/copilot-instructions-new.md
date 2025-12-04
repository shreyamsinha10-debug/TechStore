<!-- Auto-generated: concise project-specific guidance for AI coding agents -->
# Copilot / AI Agent Instructions

This repository contains minimal static front-end login page demos. Keep changes focused, safe, and constrained to the UI code in `*.html` files unless the user explicitly asks to add a backend.

- **Big picture:** Two distinct single-page static apps, each a complete login flow with inline CSS and JS. No build steps, backend services, or external dependencies. Each page is self-contained and can be served independently.

- **Major components (files):**
  - `index.html`: Clean, minimal login form (username/password) with inline validation. Demo credentials: `admin` / `admin123`.
  - `loginpage.html`: Feature-rich "PetPals" branded login page with glassmorphism design, email/password fields, and left-side marketing copy. Demo credentials: `petparent@example.com` / `petlover123`.

- **Data flow & responsibilities:**
  - User → form inputs → front-end validation → demo credential check (via `DEMO_USER`, `DEMO_PASS` or `DEMO_EMAIL`, `DEMO_PASS` constants) → UI message or redirect.
  - No network requests or persistence. Any changes introducing networking must include README documentation and follow security best practices.

- **Project-specific conventions & patterns:**
  - Keep visual (CSS) and behavioral (JS) code colocated in each HTML file. Both use inline `<style>` and bottom-of-page `<script>` tags.
  - Each page has its own validation logic and error message elements. Form IDs and input IDs are unique per page:
    - `index.html`: `#loginForm`, `#username`, `#password`, `#usernameError`, `#passwordError`, `#formMessage`
    - `loginpage.html`: `#loginForm`, `#email`, `#password`, `#emailError`, `#passwordError`, `#formMessage`
  - Demo credentials are defined as JS constants in each file. Keep them clearly labeled with "demo" comments; never remove demo warnings from the footer.

- **When editing:**
  - Preserve demo warnings and credential comments. If adding real auth, add config placeholders to README — never commit secrets.
  - Prefer minimal, targeted changes within a single page. When modifying validation, keep existing element IDs intact so UX doesn't break.
  - Both pages use responsive design: test with `@media` breakpoints (index.html: 480px; loginpage.html: 900px, 520px).

- **Debugging & local testing (PowerShell):**
  - Each page is static—open directly in a browser or serve locally to avoid `file://` issues:

```powershell
# Python server (serves entire directory)
python -m http.server 8000; Start-Process 'http://localhost:8000/index.html'

# Or Node.js http-server
npm install -g http-server; http-server -c-1 . -p 8000
```

- **Acceptable direct changes:**
  - Tighten validation rules (e.g., password complexity, email format checks in `loginpage.html`).
  - Update demo credentials or UI text while preserving footer demo warnings.
  - Add ARIA labels, accessibility improvements, or CSS tweaks.

- **Changes requiring user confirmation:**
  - Adding a backend API, authentication endpoints, or secrets files.
  - Removing demo warnings, renaming major sections, or major structural refactors.
  - Adding external dependencies (fonts, scripts, libraries).
