# Unit Testing Documentation

## Overview
This project uses **Vitest** as the testing framework with **React Testing Library** for component testing. All tests are configured to run in a jsdom environment.

## Test Setup

### Dependencies
- `vitest`: ^4.0.16 - Fast unit testing framework
- `@testing-library/react`: React component testing utilities
- `@testing-library/user-event`: User interaction simulation
- `@testing-library/jest-dom`: Custom Jest matchers
- `jsdom`: JavaScript DOM implementation

### Configuration Files
- `vitest.config.ts`: Main Vitest configuration
- `src/test/setup.ts`: Global test setup and mocks

## Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once (CI mode)
npm run test:run

# Run tests with interactive UI dashboard
npm run test:ui
```

## Test Coverage

### 1. Product Service Tests (`src/services/productService.test.ts`)
**10 tests** covering all API operations:

- `fetchAllProducts()` - Fetch all products from API
  - ✓ Successfully fetches products
  - ✓ Throws error on failure

- `getProduct(id)` - Fetch single product
  - ✓ Fetches product by ID
  - ✓ Throws error when not found

- `createProduct(body)` - Create new product
  - ✓ Creates and returns new product
  - ✓ Throws error on creation failure

- `updateProduct(id, body)` - Update existing product
  - ✓ Updates and returns modified product
  - ✓ Throws error on update failure

- `deleteProduct(id)` - Delete product
  - ✓ Successfully deletes product
  - ✓ Throws error on deletion failure

### 2. ProductCard Component Tests (`src/components/ProductCard.test.tsx`)
**5 tests** for product card UI:

- ✓ Renders product information (title, price, description)
- ✓ Renders product image with correct alt text
- ✓ Calls onEdit callback when edit button clicked
- ✓ Calls onDelete callback when delete button clicked
- ✓ Renders with optional fields missing

### 3. Pagination Component Tests (`src/components/Pagination.test.tsx`)
**6 tests** for pagination functionality:

- ✓ Renders correct number of page buttons
- ✓ Marks current page as active
- ✓ Doesn't mark other pages as active
- ✓ Calls onChange callback when page button clicked
- ✓ Calculates correct number of pages
- ✓ Handles single page correctly

## Test Results
```
✓ Test Files  3 passed (3)
✓ Tests      21 passed (21)
```

## Mocking Strategy

### API Calls
All fetch calls to the external API are mocked using Vitest's `vi.fn()` to:
- Avoid network requests during testing
- Control response data
- Test error scenarios
- Verify correct API endpoint usage

### DOM APIs
- `window.matchMedia` is mocked in test setup for responsive queries

## Best Practices

1. **Test Isolation**: Each test is independent and doesn't affect others
2. **User-Centric**: Tests simulate real user interactions using `@testing-library/user-event`
3. **Accessibility**: Tests use accessible queries (getByRole, getByText, etc.)
4. **Cleanup**: DOM is automatically cleaned up after each test

## Adding New Tests

To add tests for new components or functions:

1. Create a new test file next to the component/function with `.test.tsx` or `.test.ts` extension
2. Import necessary testing utilities:
   ```typescript
   import { describe, it, expect, vi } from 'vitest';
   import { render, screen } from '@testing-library/react';
   import userEvent from '@testing-library/user-event';
   ```

3. Write test cases following the pattern:
   ```typescript
   describe('ComponentName', () => {
     it('should do something', () => {
       // Arrange
       // Act
       // Assert
     });
   });
   ```

## CI/CD Integration

The `npm run test:run` command is suitable for CI/CD pipelines as it:
- Runs tests once (no watch mode)
- Exits with proper status codes
- Provides clear output
- Can be integrated into build processes

## Troubleshooting

### Tests not finding elements
- Ensure component renders the expected DOM elements
- Use `screen.debug()` to inspect rendered output
- Use `{ hidden: true }` option for accessibility queries when needed

### Async test failures
- Always use `userEvent.setup()` for user interactions
- Use `async/await` properly in test functions
- Let Vitest handle async operations automatically

### Mock issues
- Clear mocks between tests using `vi.clearAllMocks()`
- Ensure mocks are set up before component render
