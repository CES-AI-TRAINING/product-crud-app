# Unit Testing & Coverage

This file documents how unit tests and coverage are set up for this project and shows the commands you can use to run tests and inspect coverage locally.

## Overview ✅
- Tests use **Vitest** and **@testing-library/react**.
- Test files live next to components/services inside `src/.../__tests__/`.
- A basic setup file is provided at `src/setupTests.ts` which imports `@testing-library/jest-dom`.

## Prerequisites 🧾
- Node >= 18 (or your project's supported Node version)
- npm (or yarn)
- Repo branch: `unit-testing` (this README was added to that branch)

## Install dependencies 🛠️

```bash
npm install
```

## Run tests 🧪

- Run once:

```bash
npm test
```

- Run in watch mode:

```bash
npm run test:watch
```

## Coverage report 📊

- Generate coverage report (HTML + coverage artifacts):

```bash
npm run coverage
```

- Generate and open the HTML report (macOS):

```bash
npm run coverage:open
```

- Manually open the generated report:

```bash
open coverage/index.html
```

Coverage output is written to the `coverage/` directory; open `coverage/index.html` to view a navigable report.

## Notes & Testing Tips 💡

- Service functions that use `fetch` are tested by stubbing the global `fetch`, e.g. `vi.stubGlobal('fetch', vi.fn().mockResolvedValue({...}))`.
- Use `@testing-library/react` utilities (`render`, `screen`, `userEvent`) for component tests.
- Prefer testing behavior (DOM interactions, callbacks) over implementation details.

## CI suggestion 🔧

Add a GitHub Actions workflow to run `npm test -- --run --coverage` on pull requests and optionally fail if coverage drops below a threshold. If you'd like, I can add a sample workflow file for the repository.

---

If you want, I can also:
- Add a GitHub Actions workflow to run tests and publish coverage on PRs
- Add coverage thresholds or a failing rule when coverage decreases

Tell me which one you'd like me to do next.