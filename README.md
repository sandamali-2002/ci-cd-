# ci-cd-

This project is a simple Student Management demo (React + Vite frontend, Express backend) used for a CI/CD and testing assignment.

## Overview

- Frontend: React + Vite (src/)
- Backend: Express (server/index.js)
- Tests: Jest (API/unit), Mocha + selenium-webdriver (E2E)
- CI: GitHub Actions workflow in `.github/workflows/ci.yml`

## Development

Start the backend:

```powershell
npm run start:api
```

Start the frontend (dev):

```powershell
npm run dev
```

Run API tests:

```powershell
npm run test:api
```

Run Selenium E2E tests (ensure frontend dev server is running and set APP_URL if needed):

```powershell
# Set APP_URL in PowerShell like this (uncomment and adjust port if needed):
# $env:APP_URL='http://localhost:5175'
npm run test:selenium
```

--
Project scaffolded and extended with backend, tests, and CI workflow for the assignment.
<<<<<<< HEAD
# ci-cd-
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> fd816b4 (chore: initial commit — project scaffold, backend, tests, CI workflow)
