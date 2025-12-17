# E2E Testing with Playwright

This document explains how to set up and run end-to-end (E2E) tests using Playwright in this repository, and how to collect/report coverage from E2E runs (optional instrumentation steps).

## Overview ✅

- E2E tests use **Playwright Test** and live under the `e2e/` directory.
- A basic config is at `playwright.config.ts` and a sample test is `e2e/home.spec.ts`.

## Prerequisites 🧾

- Node.js (project uses the workspace Node version)
- npm
- Dev dependencies installed (`@playwright/test`) and Playwright browsers installed (Chromium, Firefox, WebKit)

## Install & browser setup 🛠️

```bash
npm install
# Install Playwright browsers (mandatory)
npx playwright install --with-deps
```

## Run the app and E2E tests ▶️

1. Start the dev server in one terminal (this project provides a convenient script):

```bash
npm run e2e:dev
# or directly: vite
```

2. Run Playwright tests in another terminal:

```bash
npm run e2e
# or: npx playwright test
```

### Useful variants

- Run tests headed (visible browser):

```bash
npx playwright test --headed
```

- Run a single test file:

```bash
npx playwright test e2e/home.spec.ts
```

- Re-run failed tests with trace/videos enabled (useful for debugging):

```bash
npx playwright test --trace on --retries 1
```

- Show the HTML Playwright report after a run:

```bash
npx playwright show-report
```

Generated artifacts (traces, screenshots, videos and reports) are stored in the `playwright-report/` or `test-results/` directories depending on configuration.

## Collecting Coverage from E2E runs (optional) 📊

Playwright itself does not automatically generate client-side coverage for your instrumented JS; to collect coverage for the front-end exercised in E2E tests, follow one of the options below.

### Option A (recommended): Instrument app with `vite-plugin-istanbul`

1. Install the plugin:

```bash
npm install -D vite-plugin-istanbul istanbul-lib-coverage
```

2. Add the plugin to `vite.config.ts` (only enable in a test/dev mode):

```ts
import istanbul from "vite-plugin-istanbul";

export default defineConfig({
  plugins: [
    react(),
    istanbul({ include: "src/*", extension: [".ts", ".tsx"], cypress: true }),
  ],
});
```

3. During tests, after exercising the app, read `window.__coverage__` from the page (via `page.evaluate`) and write it to a file. After all tests, merge coverage files and generate an lcov/html report using `nyc`/`istanbul`.

This method preserves accurate client-side line/branch coverage for the actual browser code.

### Option B: Use Playwright's built-in profiling (limited)

Playwright exposes browser debugging APIs and can collect coverage information using the Chrome DevTools Protocol, but this approach is more involved and dependent on the runtime. If you prefer this route I can implement it for you.

If you'd like, I can implement Option A (add the plugin, collect coverage during tests, and add a script to merge and generate HTML coverage) and wire it into CI.

## CI Suggestions 🔧

- Add a GitHub Actions workflow that:
  - Installs dependencies and Playwright browsers
  - Starts the dev server (`npm run e2e:dev`) in the background
  - Runs `npx playwright test --reporter=html`
  - Uploads the Playwright HTML report as an artifact
  - Optionally collects and publishes coverage artifacts if you choose to instrument the app

## Troubleshooting / Debugging Tips 💡

- If tests fail locally, run with `--headed --debug` to interact with the browser.
- Use `--trace on` to capture a trace and then open it using `npx playwright show-trace <trace>`.
- Use `npx playwright show-report` to open the last HTML report in the browser.

---

If you want, I can now:

- Add instrumentation (Option A) and an automated coverage collection step, or
- Add a GitHub Actions workflow to run Playwright e2e tests and publish reports on PRs.

Tell me which one you'd like me to do next.
