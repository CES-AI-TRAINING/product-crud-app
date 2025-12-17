# Product CRUD App

A small React + TypeScript + Vite frontend for managing products via a REST API. This repository demonstrates a minimal CRUD UI, TypeScript best practices, and standard development scripts.

## Features

- List, create, update and delete products
- TypeScript + React (Vite)
- Fetching from a REST API (configurable base URL)
- Linting and tests (if included in project)

## Tech stack

- React + TypeScript
- Vite
- (Optional) React Query / Fetch API / Axios for HTTP

## Prerequisites

- Node.js LTS (>= 16)
- npm, yarn, or pnpm

## Setup

1. Clone repository:

   git clone <repo-url>

2. Install dependencies:

   npm install

   # or

   yarn

   # or

   pnpm install

## Environment

The app expects an API base URL set via environment variables. Create a `.env` file in the project root if necessary:

Vite example: `VITE_API_BASE_URL=http://localhost:3000`

(Adjust the variable name if your project uses a different env key; see your code for the exact name.)

## Common scripts

Check `package.json` for the exact scripts in this repo. Typical commands:

- `npm run dev` — Start development server (HMR)
- `npm run build` — Build production artifacts
- `npm run preview` — Preview production build locally
- `npm run lint` — Run linter
- `npm run test` — Run tests
- `npm run typecheck` — Run TypeScript type checks

## Development

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` (or the port shown in the terminal) to view the app.

## Build & Preview

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Testing & Linting

Run tests and linters via their respective scripts:

```bash
npm run test
npm run lint
```

## Troubleshooting

- If the API requests fail, verify `VITE_API_BASE_URL` (or project's API env var) and that the backend is running.
- If ports collide or HMR fails, restart the dev server.

## Contributing

Small focused PRs are preferred. Run lint and tests locally before submitting.

## Links

- Vite: <https://vitejs.dev>
- React: <https://reactjs.org>
