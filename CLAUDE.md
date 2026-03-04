# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Architecture

React 19 + Vite 7 SPA. No routing library, no state management library — currently a blank slate.

- `src/main.jsx` — Entry point, mounts `<App />` into `#root`
- `src/App.jsx` — Root component
- `src/index.css` — Global styles (imported in main.jsx)

## Tech Stack

- **React 19** (JSX, `.jsx` files)
- **Vite 7** with `@vitejs/plugin-react` (Babel transform)
- **ESLint 9** flat config — rules: `eslint:recommended`, `react-hooks`, `react-refresh`

## ESLint Notes

- Config: `eslint.config.js` (flat config format)
- `no-unused-vars` ignores names matching `/^[A-Z_]/` (constants/components pattern)
- No TypeScript — plain `.js`/`.jsx` only
