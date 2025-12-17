# Naming Conventions

These conventions help keep the codebase consistent and make it easy for AI agents to predict where to add features.

- Files & folders:
  - Components: `src/components/ComponentName.tsx` and `src/components/ComponentName.css`
  - Pages: `src/pages/ProductsPage.tsx`
  - Hooks: `src/hooks/useProducts.ts` (prefer `use` prefix)
  - Services: `src/services/productService.ts` (verb + resource style; e.g., `fetchAllProducts`)

- Type names: use PascalCase (e.g., `Product`, `ProductFormProps`) and keep domain types in `src/types/`.

- Hooks & Query Keys:
  - Hook names should start with `use` (e.g., `useAllProducts`, `useCreateProduct`).
  - React Query keys are arrays (e.g., `['products']`) — always use array keys rather than string literals.

- Tests: file suffix `.test.tsx` or `.spec.tsx` (e.g., `ProductCard.test.tsx`). Place unit tests next to the file or in `src/__tests__/`.

- Misc:
  - Avoid `any` in exported APIs.
  - Use clear verb-based names for service functions (`getProduct`, `createProduct`, `updateProduct`, `deleteProduct`).
