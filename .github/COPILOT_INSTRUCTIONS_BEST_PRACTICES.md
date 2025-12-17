# Best practices — TypeScript & React (project-specific)

Focused, discoverable guidance tailored to this repo.

- TypeScript configuration:
  - Keep `strict` enabled (`tsconfig.json`). Run `npm run build` to catch type errors (`tsc -b`).
  - Prefer explicit return types on public functions (e.g., `async function fetchAllProducts(): Promise<Product[]>`).

- Types & models:
  - Centralize domain types in `src/types/` (e.g., `src/types/product.ts`). Use `Partial<Product>` for update payloads.
  - Avoid `any`; use `unknown` or well-scoped union types and utility types (Pick/Omit/Partial) when shaping data.

- Component & hooks patterns:
  - Use functional components with typed `Props` interfaces. Keep components small (see `ProductCard.tsx`, `ProductForm.tsx`).
  - Use controlled form inputs (example: `ProductForm.tsx`) unless there's a clear reason to introduce React Hook Form.
  - Put data access in `src/hooks/` (React Query hooks) and UI-only logic in components.

- React Query rules:
  - Use array-based query keys (e.g., `['products']`).
  - Type query functions and mutation functions. Example: `useQuery<Product[], Error>({ queryKey: ['products'], queryFn: fetchAllProducts })`.
  - Use `invalidateQueries({ queryKey: ['products'] })` on successful create/update/delete to keep cache consistent (see `useProducts.ts`).

- Error handling & UX:
  - Surface user-friendly error messages in the UI. For production code prefer error components instead of `alert()`.
  - Log or capture errors where appropriate (leave hooks to return `error` objects to the caller).

- Testing & developer ergonomics:
  - Wrap component tests with the same providers as `src/main.tsx` (QueryClientProvider + BrowserRouter). Consider adding `src/test-utils.tsx` to encapsulate this.
  - Use MSW for network mocking in service and integration tests. Assert both success and error responses.

- Accessibility:
  - Ensure `alt` text for images and labels for inputs (examples: `ProductCard`, `ProductForm`). Verify keyboard accessibility for interactive elements.

- Lint & format:
  - Run `npm run lint` before PRs. Maintain strict lint rules to catch common mistakes early.
