# Testing & CI

Practical guidance for tests and continuous integration in this repo.

- Current state & recommendation
  - `docs/ARCHITECTURE.md` documents the test strategy (Vitest + React Testing Library, MSW, optional Playwright for e2e).
  - This repo does not contain a dedicated `test` script yet — if you add a runner, add `test`/`test:watch` scripts to `package.json` and a CI job that runs them.

- Unit & integration tests
  - Unit tests: use Vitest + React Testing Library to assert render and interactions.
  - Integration tests: use MSW to mock network responses for `src/services/*` and to test data flows through hooks and pages.
  - Place tests next to files or in a `__tests__` folder (e.g., `src/components/ProductCard.test.tsx`).

- Example test wrapper

Create `src/test-utils.tsx` that wraps components with `QueryClientProvider` and `BrowserRouter` to mirror `src/main.tsx`'s providers — this simplifies component tests.

- End-to-end tests
  - E2E tools like Playwright or Cypress are optional but recommended for primary flows (create → view → edit → delete).
  - Put E2E tests under `e2e/` or `tests/e2e/` and add `npm` scripts for `e2e:run` / `e2e:open`.

- CI expectations
  - CI should run: linting, typecheck (`tsc -b`), and tests.
  - Failing lint/typecheck/tests should block merges.
