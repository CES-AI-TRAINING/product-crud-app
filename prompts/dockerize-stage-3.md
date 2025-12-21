# Stage 3 — GitHub Actions workflow (CI)

## Goal

Add a GitHub Actions workflow that runs install / tests / build and (optionally) builds the Docker image and smoke-tests it.

## Role

You are a CI engineer responsible for implementing this stage.

## Deliverables

- Add `.github/workflows/docker-image.yml` (or similar) to:
  - Run on `pull_request` and `push` to `main`.
  - Steps: checkout, setup Node (latest), `npm ci`, `npm test`, `npm run build`.
  - build Docker image, run it on an ephemeral port and execute `curl -sf http://localhost/` to validate it serves the app.
- Use Aqua Security Trivy to perform a comprehensive security vulnerability scan on the built Docker image:
  - Install Trivy in the workflow (use `aquasecurity/trivy-action@master` or install via apt/brew)
  - Scan the image for vulnerabilities in OS packages and application dependencies
  - Configure severity thresholds:
    - **CRITICAL**: Fail the build immediately (exit code 1)
    - **HIGH**: Generate warnings but allow the build to continue (use `--exit-code 0` with conditional logic)
    - **MEDIUM**, **LOW**, **UNKNOWN**: Ignore completely (filter out from results)
  - Output scan results in both table format (for logs) and JSON format (for artifact storage)
  - Save the scan report as a workflow artifact for later review
  - Example command: `trivy image --severity CRITICAL,HIGH --exit-code 1 product-crud-app:ci`
  - Consider adding `--ignore-unfixed` flag to exclude vulnerabilities without available fixes
  - Add a timeout (e.g., 10 minutes) to prevent hanging on slow scans

## Acceptance criteria ✅

- Workflow completes successfully on PRs and pushes; if the smoke-test step is enabled it verifies the built image returns HTTP 200 for `/`.

## Example workflow (condensed)

```yaml
name: Build & Test & Smoke
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "latest"
      - run: npm ci
      - run: npm test
      - run: npm run build

  # optional smoke test job that builds the docker image and verifies it serves the app
  smoke-test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: crazy-max/ghaction-docker-buildx@v4
        with:
          push: false
          tags: product-crud-app:ci
      - name: Run container
        run: |
          docker run -d --rm -p 8080:80 product-crud-app:ci
          sleep 5
          curl -f http://localhost:8080/ || (docker ps -a && exit 1)
```

Notes: pin Node or image tags in the workflow if your org requires exact reproducibility; use `latest` for convenience and faster updates otherwise.
