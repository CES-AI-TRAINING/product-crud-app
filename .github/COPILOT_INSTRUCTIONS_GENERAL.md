# General — Product CRUD App

Purpose: Short, practical orientation for agents starting work in this repo.

Quick start (developer commands)

- Dev server: `npm run dev` (Vite — HMR)
- Build: `npm run build` (runs `tsc -b` then `vite build`)
- Preview production build: `npm run preview`
- Lint: `npm run lint` (ESLint)

Big picture

- Frontend-only React + TypeScript app (Vite). No server in this repo — it talks to a REST API.
- Primary data flow: UI components → hooks (`src/hooks/*`) → service layer (`src/services/*`) → external API (currently `https://fakestoreapi.com`).
- Routing & providers are wired in `src/main.tsx` (React Router + React Query).

Where to look first

- `src/main.tsx` — Query client + Router providers.
- `src/App.tsx` — layout and route entry points (`/products`).
- `src/types/product.ts` — canonical `Product` shape used across code.
- `src/services/productService.ts` — API wrapper (change `BASE` to point to a different backend).
- `src/hooks/useProducts.ts` — query and mutation hooks (invalidate `['products']`).
- `src/pages/ProductsPage.tsx` and `src/components/*` — primary UI for create/read/update/delete flows.

If you are an agent: make small, focused changes and add tests for any behavior you change. When unsure, open a draft PR referencing `src/services/productService.ts`, `src/hooks/useProducts.ts`, and `src/pages/ProductsPage.tsx`.
