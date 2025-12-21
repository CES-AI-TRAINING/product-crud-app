# Stage 2 — Create docker-compose (dev + optional prod)

## Goal

Provide a `docker-compose.yml` to simplify local development (Vite dev server with HMR) and optionally run the production image for testing.

## Role

You are a DevOps engineer responsible for implementing this stage: Generate a repository-level docker-compose.yml that automates local dev and optional prod smoke-testing.

## Deliverables

- Add `docker-compose.yml` (root) with at least `dev` service:
  - `dev` service:
    - Image: `node:latest` (or `node:latest-alpine`)
    - `working_dir: /app`
    - mounts: `.:/app` and persistent `/app/node_modules`
    - ports: `5173:5173`
    - command: `sh -c "npm ci && npm run dev -- --host 0.0.0.0"`
    - env: `CHOKIDAR_USEPOLLING=true`
  - Optional `prod` service that builds the production Dockerfile image and exposes it on port 80 for local smoke tests.

## Acceptance criteria ✅

- `docker compose up dev` starts Vite and the app is reachable at `http://localhost:5173` with working HMR.
- `docker compose up prod` (if included) builds the image and serves the app on `http://localhost` for quick verification.

## Example `docker-compose.yml`

```yaml
services:
  dev:
    image: node:latest
    working_dir: /app
    volumes:
      - ./:/app
      - /app/node_modules
    ports:
      - "5173:5173"
    command: sh -c "npm ci && npm run dev -- --host 0.0.0.0"
    environment:
      - CHOKIDAR_USEPOLLING=true

  prod:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:80"
```

Notes: prefer `node:latest` for local dev images; pin versions in CI where reproducibility matters.
Do not include version in the docker-compose file.
