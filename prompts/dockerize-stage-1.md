# Stage 1 — Create Dockerfile (builder + runtime)

## Goal

Create a multi-stage Dockerfile that builds the Vite React TypeScript app and produces a minimal runtime image that serves the built static files with nginx.

## Role

You are a DevOps engineer responsible for implementing this stage: produce a secure, minimal multi-stage Dockerfile (builder + runtime), add a repository-level .dockerignore and a production-ready nginx.conf, and include concise local verification commands to build, run, and health-check the image. Prefer minimal, non-root runtime configuration, copy only necessary files, and pin versions in CI for reproducibility.

## Deliverables

- Add `Dockerfile` (root):
  - Builder: `node:latest-alpine`, `WORKDIR /app`, copy `package.json` and lockfile(s) (package-lock.json / pnpm-lock.yaml / yarn.lock), run `npm ci`, copy source, run `npm run build`.
  - Runtime: `nginx:latest-alpine`, copy `/app/dist` → `/usr/share/nginx/html`, copy `nginx.conf` to `/etc/nginx/conf.d/default.conf`, `EXPOSE 80`, add `HEALTHCHECK` (`curl -f http://localhost/ || exit 1`) and `CMD ["nginx","-g","daemon off;"]`.
- Add `.dockerignore` at repo root to exclude `node_modules`, `dist`, `.git`, `.vscode`, `.env*`, `coverage`, `**/*.log`.
- Add `nginx.conf` (root) with a minimal SPA config (fallback to `index.html`, long cache for static assets).

## Acceptance criteria ✅

- `docker build -t product-crud-app:prod -f Dockerfile .` completes successfully.
- `docker run --rm -p 8080:80 product-crud-app:prod` serves the app and `curl -sf http://localhost:8080/` returns HTTP 200.

## Example snippets

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

`nginx.conf` minimal SPA:

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

---

Notes: use `node:latest-alpine` and `nginx:latest-alpine` by default, but pin exact versions in CI if you require strict reproducibility.
