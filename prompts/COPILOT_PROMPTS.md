# Prompt: Dockerize product-crud-app (Vite + React + TypeScript)

## Goal

Create a reproducible, production-ready containerization for the `product-crud-app` (Vite + React + TypeScript SPA) and provide a developer-friendly Docker Compose workflow for local development.

## Repository facts (confirm before changing)

- Project root contains `package.json` with scripts: `dev`, `build`, `preview`, `test`.
- Dev server default port: 5173 (Vite). Use `npm run dev -- --host 0.0.0.0` for containerized dev.
- Build command: `npm run build` (ensure `tsc -b` and `vite build` run as defined).
- Node >= 18 is recommended.

## Deliverables

Split the work into three focused stages. For each stage create a branch `chore/dockerize-stage-<n>`, add the files, and open a PR that includes verification steps and acceptance criteria.

Stage 1 — Create `Dockerfile` (branch `chore/dockerize-stage-1`) 🧩

- Deliverables:
  - Add `Dockerfile` (multi-stage):
    - Builder: use `node:latest-alpine` as base, `WORKDIR /app`, copy `package.json` and lockfile(s), run `npm ci`, copy source, run `npm run build`.
    - Runtime: use `nginx:latest-alpine`, copy `/app/dist` into `/usr/share/nginx/html`, copy `nginx.conf` to `/etc/nginx/conf.d/default.conf`, `EXPOSE 80`, add a `HEALTHCHECK` (`curl -f http://localhost/ || exit 1`) and `CMD ["nginx","-g","daemon off;"]`.
  - Add `.dockerignore` (exclude `node_modules`, `dist`, `.git`, `.vscode`, `.env*`, `coverage`, logs).
- Acceptance criteria:
  - `docker build -t product-crud-app:prod -f Dockerfile .` completes successfully.
  - `docker run --rm -p 8080:80 product-crud-app:prod` serves the app and `curl -sf http://localhost:8080/` returns index HTML (200).

Stage 2 — Create `docker-compose.yml` (branch `chore/dockerize-stage-2`) ⚙️

- Deliverables:
  - Add `docker-compose.yml` with a `dev` service that:
    - Uses `node:latest` (or `node:latest-alpine`) image,
    - Mounts `.:/app`, preserves `/app/node_modules`, maps `5173:5173`, runs `sh -c "npm ci && npm run dev -- --host 0.0.0.0"`, and sets `CHOKIDAR_USEPOLLING=true`.
  - Optional `prod` service that builds the `Dockerfile` image and exposes port 80 for testing.
- Acceptance criteria:
  - `docker compose up dev` starts Vite dev server reachable at `http://localhost:5173` with HMR.
  - `docker compose up prod` builds the production image and serves the app on `http://localhost`.

Stage 3 — Create GitHub Actions workflow (branch `chore/dockerize-stage-3`) 🔁

- Deliverables:
  - Add `.github/workflows/docker-image.yml` that on PRs and pushes to `main` runs:
    - checkout, use Node (latest), `npm ci`, `npm test`, `npm run build`.
    - Optionally build Docker image and run a smoke test by starting the container on an ephemeral port and running `curl -sf http://localhost/`.
- Acceptance criteria:
  - Workflow passes on PRs; if smoke-test enabled, it verifies the built image serves the app.

Notes & guidance

- Use the latest official images by default (`node:latest-alpine`, `node:latest`, `nginx:latest-alpine`) to follow your preference; add a short note that CI can pin exact versions (e.g., `node:24.12-alpine`, `nginx:1.29.4-alpine`) for reproducibility if desired.
- Keep existing best practices: use `npm ci`, avoid baking runtime env vars into the production image, add healthchecks and CI smoke-tests, and keep the final image lean.
- Update example snippets and README sections in the relevant stage PRs rather than all at once—link between PRs in descriptions if helpful.

## Constraints & Best Practices

- Use `node:latest-alpine` for builder stage (or pin a specific version for reproducible CI, e.g., `node:24.12-alpine`).
- Use `npm ci` for reproducible installs.
- Use `nginx:latest-alpine` as runtime for serving the SPA (or pin a specific version for reproducible CI, e.g., `nginx:1.29.4-alpine`).
- Avoid baking runtime env vars into the image. If runtime env is needed for the SPA, prefer build-time substitution with Vite env vars (`VITE_` prefix) or a tiny server that injects env (only if necessary).
- Keep image lean and secure; don't include source or dev deps in the final image.
- Add a healthcheck to Dockerfile and a CI smoke test for the running container.

## Example snippets to include in your changes (copy-and-use)

Dockerfile (multi-stage):

```dockerfile
# builder
FROM node:latest-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# runtime
FROM nginx:latest-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1
CMD ["nginx","-g","daemon off;"]
```

`.dockerignore`:

```
node_modules
dist
.git
.vscode
.env
.env.*
coverage
**/*.log
```

`nginx.conf` minimal SPA example:

```
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
  location ~* \.(?:css|js|svg|png|jpg|jpeg|gif|ico)$ {
    expires 1y;
    add_header Cache-Control "public";
  }
}
```

`docker-compose.yml` dev service example:

```yaml
version: "3.8"
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
```

## PR checklist

- [ ] Add `Dockerfile`, `.dockerignore`, `nginx.conf`, `docker-compose.yml` to repo root
- [ ] Add `.github/workflows/docker-image.yml` for CI steps (run tests + build)
- [ ] Update `README.md` with Docker usage examples
- [ ] Add verification steps and smoke tests in CI
- [ ] Open PR `chore/dockerize` with clear description of changes and verification steps

## Notes for the implementer

- Confirm actual `package.json` script names before using any command — if the repo uses `pnpm`/`yarn`, adapt install commands accordingly.
- If any runtime env vars are required (not prefixed with `VITE_`), discuss an approach (e.g., tiny express static server that injects env into `index.html`, or use runtime substitution tools).

## Acceptance criteria

- `docker build -t product-crud-app:prod .` succeeds and the resulting container serves the application with `curl -sf http://localhost/` returning the index HTML.
- `docker compose up dev` runs Vite dev server accessible at `http://localhost:5173` and HMR works.
- CI runs `npm ci`, `npm test`, `npm run build` and (optionally) builds and smoke-tests the container.

---

If you'd like, after the PR is opened I can run the verification steps locally and report back with any fixes or follow-up improvements.
