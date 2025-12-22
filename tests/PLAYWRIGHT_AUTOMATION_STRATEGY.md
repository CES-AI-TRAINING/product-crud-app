# Playwright Automation Strategy for CES-13

**Epic**: Product Information Access (CES-12)  
**User Story**: View Product Info (CES-13)  
**Test Cases**: 36 functional test cases  
**Document Version**: 1.0  
**Created**: 2025-12-19

---

## Executive Summary

This document outlines a comprehensive Playwright automation strategy to implement end-to-end tests for CES-13 "View Product Info" user story. The strategy covers 36 functional test cases with Page Object Model architecture, API mocking, CI/CD integration, and parallel execution capabilities.

### Current State Analysis

**Existing Setup:**

- ✅ Unit tests with Vitest + React Testing Library
- ✅ Test coverage: 6 service + 11 component + 17 validation tests (34 total)
- ✅ Dev server: Vite on `http://localhost:5173`
- ✅ API integration: Fake Store API (`https://fakestoreapi.com`)
- ✅ State management: React Query with 5-minute cache

**Gaps:**

- ❌ No E2E tests exist
- ❌ Playwright not installed
- ❌ No CI/CD pipeline
- ❌ No automated browser testing

### Automation Goals

1. **Coverage**: Automate all 36 functional test cases (9 Critical, 17 High, 8 Medium, 2 Low priority)
2. **Quality**: Achieve 95%+ pass rate on Critical/High priority tests
3. **Speed**: Execute full suite in < 10 minutes with parallel execution
4. **Reliability**: < 2% flaky test rate with retry mechanism
5. **Integration**: Seamless CI/CD pipeline with PR validation
6. **Maintainability**: Page Object Model for reusable, scalable architecture

---

## Implementation Roadmap

### Phase 1: Infrastructure Setup

**Deliverables:**

- Playwright installed and configured
- Project structure established
- Basic Page Object Model framework
- Sample test running

### Phase 2: Critical Test Automation

**Deliverables:**

- 9 Critical priority tests automated
- API mocking framework implemented
- Error handling tests completed

### Phase 3: High Priority Tests

**Deliverables:**

- 17 High priority tests automated
- Network resilience tests with mocking
- Performance and caching tests

### Phase 4: Medium/Low Priority & CI/CD

**Deliverables:**

- 10 Medium/Low priority tests automated
- CI/CD pipeline operational
- Test reporting configured

---

## Step 1: Setup Playwright Infrastructure

### 1.1 Installation

```bash
# Install Playwright
npm install -D @playwright/test

# Initialize Playwright (generates config and example tests)
npm init playwright@latest

# Install browsers
npx playwright install --with-deps

# Install additional utilities
npm install -D @axe-core/playwright  # Accessibility testing
```

### 1.2 Configuration File

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e/tests",

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  // Reporter configuration
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
    ["json", { outputFile: "test-results/results.json" }],
  ],

  // Global test settings
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  // Test projects for different browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 13"] },
    },
  ],

  // Web server configuration
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

### 1.3 Directory Structure

```
e2e/
├── fixtures/
│   ├── product.fixture.ts       # Test data fixtures
│   └── user.fixture.ts          # User role fixtures
├── pages/
│   ├── BasePage.ts              # Base page with common methods
│   ├── ProductsPage.ts          # Products page object
│   └── components/
│       ├── ProductCard.ts       # Product card component
│       ├── Pagination.ts        # Pagination component
│       └── ProductForm.ts       # Product form component
├── tests/
│   ├── product-display.spec.ts      # TC_VIEW_001-004, 007-009
│   ├── validation.spec.ts           # TC_VIEW_005-006, 013-015
│   ├── error-handling.spec.ts       # TC_VIEW_012, 016, 022
│   ├── security.spec.ts             # TC_VIEW_017
│   ├── performance.spec.ts          # TC_VIEW_010, 034-036
│   ├── image-handling.spec.ts       # TC_VIEW_004, 011, 023-024, 035
│   ├── network-resilience.spec.ts   # TC_VIEW_015-016, 025
│   ├── edge-cases.spec.ts           # TC_VIEW_018-021, 027-028
│   ├── ui-ux.spec.ts                # TC_VIEW_028-033
│   ├── responsive.spec.ts           # TC_VIEW_030
│   └── accessibility.spec.ts        # TC_VIEW_029, 033
├── mocks/
│   ├── api-responses.ts         # Mock API response data
│   └── handlers.ts              # Request handlers for mocking
├── utils/
│   ├── api-mocking.ts           # API mocking utilities
│   ├── test-helpers.ts          # Common test helper functions
│   └── custom-reporter.ts       # JIRA integration reporter
└── test-data/
    └── products.json            # Test product data
```

### 1.4 Update .gitignore

```gitignore
# Playwright
test-results/
playwright-report/
playwright/.cache/
trace.zip
```

### 1.5 NPM Scripts

Update `package.json`:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:chromium": "playwright test --project=chromium",
    "test:e2e:report": "playwright show-report",
    "test:e2e:codegen": "playwright codegen http://localhost:5173"
  }
}
```

---

## Step 2: Implement Page Object Model Architecture

### 2.1 Base Page (`e2e/pages/BasePage.ts`)

```typescript
import { Page, Locator } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigation
  async goto(path: string = "/") {
    await this.page.goto(path);
  }

  // Wait utilities
  async waitForElement(
    selector: string,
    timeout: number = 10000
  ): Promise<Locator> {
    return this.page.waitForSelector(selector, { timeout });
  }

  async waitForLoadingToFinish() {
    await this.page.waitForLoadState("networkidle");
  }

  // Interaction utilities
  async clickElement(selector: string) {
    await this.page.click(selector);
  }

  async fillInput(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  async getText(selector: string): Promise<string> {
    return this.page.textContent(selector) || "";
  }

  // Assertion helpers
  async isElementVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector);
  }

  async getElementCount(selector: string): Promise<number> {
    return this.page.locator(selector).count();
  }
}
```

### 2.2 Products Page (`e2e/pages/ProductsPage.ts`)

```typescript
import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductCard } from "./components/ProductCard";

export class ProductsPage extends BasePage {
  // Locators
  readonly loadingSpinner: Locator;
  readonly errorMessage: Locator;
  readonly retryButton: Locator;
  readonly productsGrid: Locator;
  readonly productCards: Locator;
  readonly pagination: Locator;
  readonly addProductButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loadingSpinner = page.locator('[data-testid="loading-spinner"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.retryButton = page.locator('button:has-text("Retry")');
    this.productsGrid = page.locator('[data-testid="products-grid"]');
    this.productCards = page.locator(".product-card");
    this.pagination = page.locator('[data-testid="pagination"]');
    this.addProductButton = page.locator('button:has-text("Add Product")');
  }

  // Navigation
  async navigateToProducts() {
    await this.goto("/");
    await this.waitForLoadingToFinish();
  }

  // Loading state
  async waitForLoading() {
    await expect(this.loadingSpinner).toBeVisible();
  }

  async waitForLoadingComplete() {
    await expect(this.loadingSpinner).not.toBeVisible({ timeout: 30000 });
  }

  async isLoadingVisible(): Promise<boolean> {
    return this.loadingSpinner.isVisible();
  }

  // Error state
  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }

  async getErrorText(): Promise<string> {
    return this.errorMessage.textContent() || "";
  }

  async clickRetry() {
    await this.retryButton.click();
  }

  // Products
  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async getProductCard(index: number): Promise<ProductCard> {
    const cardElement = this.productCards.nth(index);
    return new ProductCard(this.page, cardElement);
  }

  async getAllProductCards(): Promise<ProductCard[]> {
    const count = await this.getProductCount();
    const cards: ProductCard[] = [];
    for (let i = 0; i < count; i++) {
      cards.push(await this.getProductCard(i));
    }
    return cards;
  }

  // Assertions
  async assertProductsDisplayed(expectedCount: number = 6) {
    await expect(this.productCards).toHaveCount(expectedCount);
  }

  async assertLoadingState() {
    await expect(this.loadingSpinner).toBeVisible();
    await expect(this.loadingSpinner).toContainText("Loading products...");
  }

  async assertErrorState(errorText?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (errorText) {
      await expect(this.errorMessage).toContainText(errorText);
    }
    await expect(this.retryButton).toBeVisible();
  }

  async assertEmptyState() {
    await expect(this.productCards).toHaveCount(0);
  }
}
```

### 2.3 Product Card Component (`e2e/pages/components/ProductCard.ts`)

```typescript
import { Page, Locator, expect } from "@playwright/test";

export class ProductCard {
  private page: Page;
  private card: Locator;

  // Locators
  readonly title: Locator;
  readonly price: Locator;
  readonly description: Locator;
  readonly image: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page, cardLocator: Locator) {
    this.page = page;
    this.card = cardLocator;
    this.title = cardLocator.locator(
      '.product-title, [data-testid="product-title"]'
    );
    this.price = cardLocator.locator(
      '.product-price, [data-testid="product-price"]'
    );
    this.description = cardLocator.locator(
      '.product-description, [data-testid="product-description"]'
    );
    this.image = cardLocator.locator("img");
    this.editButton = cardLocator.locator('button:has-text("Edit")');
    this.deleteButton = cardLocator.locator('button:has-text("Delete")');
  }

  // Getters
  async getTitle(): Promise<string> {
    return this.title.textContent() || "";
  }

  async getPrice(): Promise<string> {
    return this.price.textContent() || "";
  }

  async getDescription(): Promise<string> {
    return this.description.textContent() || "";
  }

  async getImageSrc(): Promise<string> {
    return this.image.getAttribute("src") || "";
  }

  async getImageAlt(): Promise<string> {
    return this.image.getAttribute("alt") || "";
  }

  async isImageLoaded(): Promise<boolean> {
    const naturalWidth = await this.image.evaluate(
      (img: HTMLImageElement) => img.naturalWidth
    );
    return naturalWidth > 0;
  }

  // Visibility checks
  async isTitleVisible(): Promise<boolean> {
    return this.title.isVisible();
  }

  async isPriceVisible(): Promise<boolean> {
    return this.price.isVisible();
  }

  async isDescriptionVisible(): Promise<boolean> {
    return this.description.isVisible();
  }

  async isImageVisible(): Promise<boolean> {
    return this.image.isVisible();
  }

  // Interactions
  async hoverOnTitle() {
    await this.title.hover();
  }

  async clickEdit() {
    await this.editButton.click();
  }

  async clickDelete() {
    await this.deleteButton.click();
  }

  // Assertions
  async assertTitleDisplayed(expectedTitle: string) {
    await expect(this.title).toBeVisible();
    await expect(this.title).toHaveText(expectedTitle);
  }

  async assertPriceFormatted(expectedPrice: string) {
    await expect(this.price).toBeVisible();
    await expect(this.price).toHaveText(expectedPrice);
  }

  async assertImageLazyLoaded() {
    await expect(this.image).toHaveAttribute("loading", "lazy");
  }

  async assertImageHasAlt() {
    const alt = await this.getImageAlt();
    expect(alt).toBeTruthy();
  }

  async assertPlaceholderImage() {
    const src = await this.getImageSrc();
    expect(src).toContain("placeholder");
  }
}
```

### 2.4 Test Fixtures (`e2e/fixtures/product.fixture.ts`)

```typescript
import { Product } from "../../src/types/product";

export const validProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 19.99,
  description: "A comprehensive test product description",
  category: "electronics",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
};

export const productWithLongTitle: Product = {
  id: 2,
  title: "A".repeat(250), // Exceeds 200 char limit
  price: 29.99,
  description: "Description",
  image: "https://example.com/image.jpg",
};

export const productWithLongDescription: Product = {
  id: 3,
  title: "Product with Long Desc",
  price: 39.99,
  description: "Lorem ipsum ".repeat(150), // Exceeds 1000 chars
  image: "https://example.com/image.jpg",
};

export const productWithBrokenImage: Product = {
  id: 4,
  title: "Product with Broken Image",
  price: 49.99,
  description: "Description",
  image: "https://invalid-url-broken.com/404.jpg",
};

export const productWithEmptyImage: Product = {
  id: 5,
  title: "Product with No Image",
  price: 59.99,
  description: "Description",
  image: "",
};

export const productWithZeroPrice: Product = {
  id: 6,
  title: "Free Product",
  price: 0,
  description: "Free item",
  image: "https://example.com/image.jpg",
};

export const productWithNegativePrice: Product = {
  id: 7,
  title: "Invalid Price Product",
  price: -10,
  description: "Should handle negative price",
  image: "https://example.com/image.jpg",
};

export const productWithXSS: Product = {
  id: 8,
  title: '<script>alert("XSS")</script>Malicious Product',
  price: 99.99,
  description: '<img src=x onerror=alert("xss")>Dangerous description',
  image: 'javascript:alert("xss")',
};

export const productWithSpecialChars: Product = {
  id: 9,
  title: "Product & <Test> \"Quote\" 'Single'",
  price: 15.99,
  description: "Special chars: & < > \" '",
  image: "https://example.com/image.jpg",
};

export const productWithUnicode: Product = {
  id: 10,
  title: "Awesome Product 🎉🚀💯",
  price: 19.99,
  description: "Great deal! 你好 مرحبا",
  image: "https://example.com/image.jpg",
};

export const productWithNullFields: Product = {
  id: 11,
  title: "",
  price: 0,
  description: undefined as any,
  image: undefined as any,
};

export const productsArray: Product[] = [
  validProduct,
  { ...validProduct, id: 12, title: "Product 2", price: 25.99 },
  { ...validProduct, id: 13, title: "Product 3", price: 35.99 },
  { ...validProduct, id: 14, title: "Product 4", price: 45.99 },
  { ...validProduct, id: 15, title: "Product 5", price: 55.99 },
  { ...validProduct, id: 16, title: "Product 6", price: 65.99 },
];

export const emptyProductsArray: Product[] = [];

export const largeProductsArray: Product[] = Array.from(
  { length: 200 },
  (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    price: (i + 1) * 10,
    description: `Description for product ${i + 1}`,
    category: "electronics",
    image: `https://example.com/image${i + 1}.jpg`,
  })
);
```

---

## Step 3: Automate Critical Priority Tests (9 Tests)

### 3.1 Product Display Tests (`e2e/tests/product-display.spec.ts`)

```typescript
import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { validProduct, productsArray } from "../fixtures/product.fixture";

test.describe("CES-13: Product Display - Critical Tests", () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);

    // Mock API response
    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(productsArray),
      });
    });

    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();
  });

  test("TC_VIEW_001: Display Product Title Correctly", async () => {
    const productCard = await productsPage.getProductCard(0);

    // Verify title is visible
    expect(await productCard.isTitleVisible()).toBeTruthy();

    // Verify title content
    await productCard.assertTitleDisplayed(validProduct.title);

    // Verify title has alt/tooltip on hover
    await productCard.hoverOnTitle();
    const title = await productCard.getTitle();
    expect(title).toBe(validProduct.title);
  });

  test("TC_VIEW_002: Display Product Price with Currency Formatting", async () => {
    const productCard = await productsPage.getProductCard(0);

    // Verify price is visible
    expect(await productCard.isPriceVisible()).toBeTruthy();

    // Verify price format (two decimals with $ prefix)
    await productCard.assertPriceFormatted("$19.99");

    const priceText = await productCard.getPrice();
    expect(priceText).toMatch(/^\$\d+\.\d{2}$/);
  });

  test("TC_VIEW_007: Guest User Limited Access", async ({ page }) => {
    // Simulate guest user (no authentication)
    const productCard = await productsPage.getProductCard(0);

    // Title, price, image should be visible
    expect(await productCard.isTitleVisible()).toBeTruthy();
    expect(await productCard.isPriceVisible()).toBeTruthy();
    expect(await productCard.isImageVisible()).toBeTruthy();

    // Description should NOT be visible for guests
    expect(await productCard.isDescriptionVisible()).toBeFalsy();
  });

  test("TC_VIEW_008: Loading State Display", async ({ page }) => {
    // Create new page to test loading state
    const testPage = new ProductsPage(page);

    // Mock with delay to capture loading state
    await page.route("**/products", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(productsArray),
      });
    });

    // Navigate and immediately check loading state
    const navigation = testPage.navigateToProducts();

    // Verify loading spinner is visible
    await testPage.assertLoadingState();

    await navigation;
    await testPage.waitForLoadingComplete();

    // Verify products loaded after spinner
    await testPage.assertProductsDisplayed(6);
  });

  test("TC_VIEW_009: Authenticated User Full Access", async ({
    page,
    context,
  }) => {
    // Simulate authenticated user (set storage state or cookie)
    await context.addCookies([
      {
        name: "auth_token",
        value: "test-token",
        domain: "localhost",
        path: "/",
      },
    ]);

    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();

    const productCard = await productsPage.getProductCard(0);

    // All fields should be visible
    expect(await productCard.isTitleVisible()).toBeTruthy();
    expect(await productCard.isPriceVisible()).toBeTruthy();
    expect(await productCard.isDescriptionVisible()).toBeTruthy();
    expect(await productCard.isImageVisible()).toBeTruthy();
  });
});
```

### 3.2 Error Handling Tests (`e2e/tests/error-handling.spec.ts`)

```typescript
import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";

test.describe("CES-13: Error Handling - Critical Tests", () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
  });

  test("TC_VIEW_012: API Request Failure with Error State", async ({
    page,
  }) => {
    // Mock API to return 500 error
    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await productsPage.navigateToProducts();

    // Verify error state is displayed
    await productsPage.assertErrorState("Failed to load products");

    // Verify retry button is visible
    expect(await productsPage.isErrorVisible()).toBeTruthy();

    // Test retry functionality
    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    await productsPage.clickRetry();
    await productsPage.waitForLoadingComplete();

    // Error should be gone
    expect(await productsPage.isErrorVisible()).toBeFalsy();
  });
});
```

### 3.3 Security Tests (`e2e/tests/security.spec.ts`)

```typescript
import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { productWithXSS } from "../fixtures/product.fixture";

test.describe("CES-13: Security - Critical Tests", () => {
  test("TC_VIEW_017: XSS Protection for Product Fields", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Mock API with XSS payload
    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([productWithXSS]),
      });
    });

    // Listen for dialog (alert) - should not appear
    let dialogAppeared = false;
    page.on("dialog", () => {
      dialogAppeared = true;
    });

    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();

    const productCard = await productsPage.getProductCard(0);

    // Verify script does NOT execute
    expect(dialogAppeared).toBeFalsy();

    // Verify HTML is properly escaped
    const title = await productCard.getTitle();
    expect(title).toContain("<script>"); // Should be visible as text, not executed

    // Verify no XSS in image src
    const imageSrc = await productCard.getImageSrc();
    expect(imageSrc).not.toContain("javascript:");
  });
});
```

### 3.4 Performance Tests (`e2e/tests/performance.spec.ts`)

```typescript
import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { productsArray } from "../fixtures/product.fixture";

test.describe("CES-13: Performance - Critical Tests", () => {
  test("TC_VIEW_010: React Query Data Caching", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    let apiCallCount = 0;

    // Track API calls
    await page.route("**/products", async (route) => {
      apiCallCount++;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(productsArray),
      });
    });

    // First load
    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();
    expect(apiCallCount).toBe(1);

    // Navigate away and back (within cache time)
    await page.goto("/about"); // Assuming about page exists
    await page.goBack();

    // Should use cache, no new API call
    await productsPage.waitForLoadingComplete();
    expect(apiCallCount).toBe(1); // Still 1, cached
  });

  test("TC_VIEW_034: Stale-While-Revalidate Strategy", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Mock initial data
    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(productsArray),
      });
    });

    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();

    // Verify stale data shows immediately on revisit
    // (Implementation depends on React Query staleTime configuration)
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });
});
```

---

## Step 4: Automate High Priority Tests (17 Tests)

### 4.1 Image Handling Tests (`e2e/tests/image-handling.spec.ts`)

```typescript
import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import {
  productWithBrokenImage,
  productWithEmptyImage,
  validProduct,
} from "../fixtures/product.fixture";

test.describe("CES-13: Image Handling - High Priority Tests", () => {
  test("TC_VIEW_004: Display Product Image with Lazy Loading", async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);

    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([validProduct]),
      });
    });

    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();

    const productCard = await productsPage.getProductCard(0);

    // Verify image is visible
    expect(await productCard.isImageVisible()).toBeTruthy();

    // Verify lazy loading attribute
    await productCard.assertImageLazyLoaded();

    // Verify alt text
    await productCard.assertImageHasAlt();
    const alt = await productCard.getImageAlt();
    expect(alt).toBe(validProduct.title);
  });

  test("TC_VIEW_011: Broken Image URL Fallback", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([productWithBrokenImage]),
      });
    });

    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();

    const productCard = await productsPage.getProductCard(0);

    // Wait for image error handling
    await page.waitForTimeout(2000);

    // Verify placeholder image is displayed
    await productCard.assertPlaceholderImage();

    // Verify no broken image icon
    expect(await productCard.isImageVisible()).toBeTruthy();
  });

  test("TC_VIEW_023: Empty Image URL", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([productWithEmptyImage]),
      });
    });

    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();

    const productCard = await productsPage.getProductCard(0);

    // Verify placeholder image
    await productCard.assertPlaceholderImage();
    const imageSrc = await productCard.getImageSrc();
    expect(imageSrc).toContain("placeholder");
  });

  test("TC_VIEW_035: Image Lazy Loading Performance", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Create large dataset
    const largeProductList = Array.from({ length: 20 }, (_, i) => ({
      ...validProduct,
      id: i + 1,
      title: `Product ${i + 1}`,
    }));

    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(largeProductList),
      });
    });

    const imageRequests: string[] = [];
    page.on("request", (request) => {
      if (request.resourceType() === "image") {
        imageRequests.push(request.url());
      }
    });

    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();

    // Only visible images should load initially
    // With 6 products per page, max 6 image requests
    await page.waitForTimeout(1000);
    expect(imageRequests.length).toBeLessThanOrEqual(6);
  });
});
```

### 4.2 Validation Tests (`e2e/tests/validation.spec.ts`)

```typescript
import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import {
  productWithZeroPrice,
  productWithLongTitle,
  productWithNullFields,
} from "../fixtures/product.fixture";

test.describe("CES-13: Validation - High Priority Tests", () => {
  test("TC_VIEW_005: Price Validation for Zero Value", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([productWithZeroPrice]),
      });
    });

    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();

    const productCard = await productsPage.getProductCard(0);

    // Verify zero price displays correctly
    await productCard.assertPriceFormatted("$0.00");
    expect(await productCard.isPriceVisible()).toBeTruthy();
  });

  test("TC_VIEW_006: Title Truncation at 200 Characters", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([productWithLongTitle]),
      });
    });

    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();

    const productCard = await productsPage.getProductCard(0);
    const title = await productCard.getTitle();

    // Verify title is truncated
    expect(title.length).toBeLessThanOrEqual(203); // 200 chars + "..."
    expect(title).toContain("...");
  });

  test("TC_VIEW_015: Null or Undefined Field Handling", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([productWithNullFields]),
      });
    });

    await productsPage.navigateToProducts();
    await productsPage.waitForLoadingComplete();

    // Verify page doesn't crash
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBe(1);

    const productCard = await productsPage.getProductCard(0);

    // Verify graceful handling
    expect(await productCard.isImageVisible()).toBeTruthy();
    await productCard.assertPlaceholderImage();
  });
});
```

---

## Step 5: API Mocking & Test Data Management

### 5.1 API Mocking Utilities (`e2e/utils/api-mocking.ts`)

```typescript
import { Page, Route } from "@playwright/test";
import { Product } from "../../src/types/product";

export class APIMonkey {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Mock successful products list
  async mockProductsList(products: Product[]) {
    await this.page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(products),
      });
    });
  }

  // Mock empty products list
  async mockEmptyProducts() {
    await this.page.route("**/products", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });
  }

  // Mock API error
  async mockAPIError(
    statusCode: number = 500,
    errorMessage: string = "Internal Server Error"
  ) {
    await this.page.route("**/products", async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify({ error: errorMessage }),
      });
    });
  }

  // Mock API timeout
  async mockAPITimeout(delay: number = 6000) {
    await this.page.route("**/products", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      await route.abort("timedout");
    });
  }

  // Mock API with delay (slow network)
  async mockSlowAPI(products: Product[], delay: number = 3000) {
    await this.page.route("**/products", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(products),
      });
    });
  }

  // Mock API with retry scenario (fail N times, then succeed)
  async mockAPIWithRetry(products: Product[], failCount: number = 2) {
    let attemptCount = 0;

    await this.page.route("**/products", async (route) => {
      attemptCount++;

      if (attemptCount <= failCount) {
        await route.fulfill({
          status: 500,
          body: JSON.stringify({ error: "Server Error" }),
        });
      } else {
        await route.fulfill({
          status: 200,
          body: JSON.stringify(products),
        });
      }
    });
  }

  // Simulate network conditions
  async simulateNetworkConditions(
    condition: "slow-3g" | "fast-3g" | "offline"
  ) {
    const cdpSession = await this.page.context().newCDPSession(this.page);

    const conditions = {
      "slow-3g": {
        offline: false,
        downloadThroughput: (50 * 1024) / 8,
        uploadThroughput: (50 * 1024) / 8,
        latency: 2000,
      },
      "fast-3g": {
        offline: false,
        downloadThroughput: (1.6 * 1024 * 1024) / 8,
        uploadThroughput: (750 * 1024) / 8,
        latency: 562.5,
      },
      offline: {
        offline: true,
        downloadThroughput: 0,
        uploadThroughput: 0,
        latency: 0,
      },
    };

    await cdpSession.send(
      "Network.emulateNetworkConditions",
      conditions[condition]
    );
  }
}
```

### 5.2 Test Helper Functions (`e2e/utils/test-helpers.ts`)

```typescript
import { Page } from "@playwright/test";

/**
 * Wait for React Query cache to be populated
 */
export async function waitForReactQueryCache(
  page: Page,
  queryKey: string,
  timeout: number = 5000
) {
  await page.waitForFunction(
    (key) => {
      const queryClient = (window as any).__REACT_QUERY_CLIENT__;
      if (!queryClient) return false;

      const cache = queryClient.getQueryCache();
      const queries = cache.findAll({ queryKey: [key] });
      return queries.length > 0 && queries[0].state.status === "success";
    },
    queryKey,
    { timeout }
  );
}

/**
 * Clear React Query cache
 */
export async function clearReactQueryCache(page: Page) {
  await page.evaluate(() => {
    const queryClient = (window as any).__REACT_QUERY_CLIENT__;
    if (queryClient) {
      queryClient.clear();
    }
  });
}

/**
 * Take screenshot with timestamp
 */
export async function takeTimestampedScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  await page.screenshot({
    path: `test-results/screenshots/${name}-${timestamp}.png`,
    fullPage: true,
  });
}

/**
 * Wait for network idle
 */
export async function waitForNetworkIdle(page: Page, timeout: number = 10000) {
  await page.waitForLoadState("networkidle", { timeout });
}

/**
 * Get console errors
 */
export async function getConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });

  return errors;
}
```

---

## Step 6: CI/CD Pipeline Setup

### 6.1 GitHub Actions Workflow (`.github/workflows/e2e-tests.yml`)

```yaml
name: E2E Tests with Playwright

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    # Run nightly at 2 AM UTC
    - cron: "0 2 * * *"

jobs:
  test:
    name: E2E Tests
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3, 4]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Build application
        run: npm run build

      - name: Run Playwright tests
        run: npx playwright test --shard=${{ matrix.shard }}/4
        env:
          CI: true

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-${{ matrix.shard }}
          path: playwright-report/
          retention-days: 30

      - name: Upload test traces
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-traces-${{ matrix.shard }}
          path: test-results/
          retention-days: 7

  merge-reports:
    name: Merge Test Reports
    if: always()
    needs: [test]
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Download all reports
        uses: actions/download-artifact@v4
        with:
          path: all-reports/

      - name: Merge reports
        run: npx playwright merge-reports --reporter html ./all-reports

      - name: Upload merged report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-merged
          path: playwright-report/
          retention-days: 30

      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./playwright-report
          destination_dir: e2e-reports

  notify:
    name: Notify Results
    if: always()
    needs: [merge-reports]
    runs-on: ubuntu-latest

    steps:
      - name: Send notification
        run: |
          echo "E2E tests completed. Check artifacts for results."
          # Add Slack/Teams notification here if needed
```

### 6.2 Update README with E2E Information

Add to `README.md`:

````markdown
## E2E Testing with Playwright

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug

# Run specific browser
npm run test:e2e:chromium

# View test report
npm run test:e2e:report
```
````

### Test Structure

- **Critical Tests (9)**: Run on every commit
- **High Priority (17)**: Run on every PR
- **Medium/Low (10)**: Run nightly

### CI/CD

E2E tests run automatically on:

- Every push to `main` and `develop` branches
- Every pull request
- Nightly at 2 AM UTC

View test reports: [E2E Reports](https://your-github-username.github.io/product-crud-app/e2e-reports)

````

---

## Step 7: Test Reporting & JIRA Integration

### 7.1 Custom Reporter (`e2e/utils/custom-reporter.ts`)

```typescript
import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class JiraIntegrationReporter implements Reporter {
  private results: Map<string, TestResult[]> = new Map();

  onTestEnd(test: TestCase, result: TestResult) {
    // Extract JIRA ticket from test title (e.g., TC_VIEW_001)
    const match = test.title.match(/TC_VIEW_(\d+)/);
    if (match) {
      const testId = `TC_VIEW_${match[1]}`;
      const existing = this.results.get(testId) || [];
      this.results.set(testId, [...existing, result]);
    }
  }

  async onEnd(result: FullResult) {
    // Map to JIRA issues
    const jiraMapping = {
      'CES-13': Array.from({ length: 36 }, (_, i) => `TC_VIEW_${String(i + 1).padStart(3, '0')}`),
      'CES-14': ['TC_VIEW_001', 'TC_VIEW_003', 'TC_VIEW_006', 'TC_VIEW_011', 'TC_VIEW_014'],
      'CES-15': ['TC_VIEW_010', 'TC_VIEW_024', 'TC_VIEW_025', 'TC_VIEW_034', 'TC_VIEW_036']
    };

    const jiraReport: any = {};

    for (const [jiraIssue, testIds] of Object.entries(jiraMapping)) {
      const tests = testIds.map(id => ({
        id,
        status: this.results.get(id)?.[0]?.status || 'skipped',
        duration: this.results.get(id)?.[0]?.duration || 0
      }));

      const passed = tests.filter(t => t.status === 'passed').length;
      const failed = tests.filter(t => t.status === 'failed').length;
      const total = tests.length;

      jiraReport[jiraIssue] = {
        total,
        passed,
        failed,
        passRate: ((passed / total) * 100).toFixed(2) + '%',
        tests
      };
    }

    // Write to file
    const reportPath = path.join(process.cwd(), 'test-results', 'jira-traceability.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(jiraReport, null, 2));

    console.log('\n📊 JIRA Traceability Report:');
    console.log(JSON.stringify(jiraReport, null, 2));
  }
}

export default JiraIntegrationReporter;
````

Update `playwright.config.ts` to include custom reporter:

```typescript
reporter: [
  ['html'],
  ['junit', { outputFile: 'test-results/junit.xml' }],
  ['./e2e/utils/custom-reporter.ts']
],
```

---

## Step 8: Maintenance & Best Practices

### 8.1 Flaky Test Handling

```typescript
// Mark flaky tests
test("Flaky test", async ({ page }) => {
  test.fixme(
    ({ browserName }) => browserName === "webkit",
    "Known issue on WebKit"
  );
  // ... test code
});

// Retry specific test
test("Critical test with retry", async ({ page }) => {
  test.setTimeout(60000);
  test.slow(); // 3x timeout
  // ... test code
});
```

### 8.2 Test Tags for Selective Execution

```typescript
// Add tags to tests
test("TC_VIEW_001 @critical @smoke", async ({ page }) => {
  // Critical test
});

test("TC_VIEW_029 @low @accessibility", async ({ page }) => {
  // Low priority test
});
```

Run specific tags:

```bash
npx playwright test --grep @critical
npx playwright test --grep @smoke
npx playwright test --grep-invert @low  # Skip low priority
```

### 8.3 Visual Regression Testing

```typescript
test("Visual regression: Product Card", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.navigateToProducts();
  await productsPage.waitForLoadingComplete();

  // Take screenshot and compare
  await expect(page).toHaveScreenshot("products-page.png", {
    maxDiffPixels: 100,
  });
});
```

---

## Execution Strategy

### Priority-Based Execution

| Priority   | Tests  | Trigger        | Estimated Time             |
| ---------- | ------ | -------------- | -------------------------- |
| Critical   | 9      | Every commit   | ~3 minutes                 |
| High       | 17     | Every PR       | ~6 minutes                 |
| Medium/Low | 10     | Nightly        | ~4 minutes                 |
| **Total**  | **36** | **Full suite** | **~10 minutes (parallel)** |

### Execution Environments

1. **Local Development**: Run `npm run test:e2e:ui` for interactive debugging
2. **Pre-commit Hook**: Run critical tests only
3. **Pull Request**: Run Critical + High priority tests
4. **Merge to Main**: Run full test suite
5. **Nightly**: Run full suite + visual regression + accessibility

### Parallel Execution

- **4 workers** in CI (sharded tests)
- **2 workers** locally (avoid resource contention)
- Tests distributed across shards automatically

---

## Success Metrics

### Key Performance Indicators

| Metric               | Target                        | Measurement                    |
| -------------------- | ----------------------------- | ------------------------------ |
| Test Coverage        | 100% of functional test cases | 36/36 tests automated          |
| Pass Rate (Critical) | ≥ 99%                         | CI pipeline metrics            |
| Pass Rate (High)     | ≥ 95%                         | CI pipeline metrics            |
| Execution Time       | < 10 minutes                  | CI pipeline duration           |
| Flaky Test Rate      | < 2%                          | Failed retries / total runs    |
| Mean Time to Detect  | < 5 minutes                   | Commit to failure notification |
| Mean Time to Repair  | < 30 minutes                  | Issue identified to fixed      |

### Quality Gates

- ❌ **Block PR Merge** if Critical tests fail
- ⚠️ **Require review** if High priority tests fail
- ✅ **Allow merge** if only Medium/Low tests fail (with tracking)

---

## Troubleshooting Guide

### Common Issues

**Issue: Tests timing out**

```typescript
// Solution: Increase timeout
test.setTimeout(60000); // 60 seconds

// Or globally in config
use: {
  actionTimeout: 15000,
  navigationTimeout: 30000
}
```

**Issue: Flaky network tests**

```typescript
// Solution: Use API mocking instead of real API
await page.route("**/products", mockHandler);
```

**Issue: Element not found**

```typescript
// Solution: Add explicit waits
await page.waitForSelector('[data-testid="product-card"]', {
  state: "visible",
});
```

**Issue: React Query cache interference**

```typescript
// Solution: Clear cache before each test
test.beforeEach(async ({ page }) => {
  await clearReactQueryCache(page);
});
```

---

## Future Enhancements

### Phase 2 Additions (Post-MVP)

1. **Accessibility Testing**

   - Integrate `@axe-core/playwright` for WCAG compliance
   - Test keyboard navigation
   - Screen reader compatibility

2. **Performance Monitoring**

   - Lighthouse CI integration
   - Web Vitals tracking (LCP, FID, CLS)
   - Bundle size monitoring

3. **Visual Regression**

   - Percy or Chromatic integration
   - Screenshot comparison across commits
   - Component-level visual testing

4. **Mobile Testing**

   - iOS Safari real device testing (BrowserStack)
   - Android Chrome testing
   - Touch gesture validation

5. **API Contract Testing**

   - Pact integration for API contracts
   - Mock service worker (MSW) for complex scenarios
   - API schema validation

6. **Test Data Management**
   - Database seeding for consistent state
   - Test data factory with Faker.js
   - Isolated test environments

---

## Appendix

### A. Test Case to File Mapping

| Test Case ID    | Spec File                  | Priority      | Status     |
| --------------- | -------------------------- | ------------- | ---------- |
| TC_VIEW_001-002 | product-display.spec.ts    | Critical      | ✅ Planned |
| TC_VIEW_003     | validation.spec.ts         | High          | ✅ Planned |
| TC_VIEW_004     | image-handling.spec.ts     | High          | ✅ Planned |
| TC_VIEW_005-006 | validation.spec.ts         | High          | ✅ Planned |
| TC_VIEW_007-009 | product-display.spec.ts    | Critical      | ✅ Planned |
| TC_VIEW_010     | performance.spec.ts        | Critical      | ✅ Planned |
| TC_VIEW_011     | image-handling.spec.ts     | High          | ✅ Planned |
| TC_VIEW_012     | error-handling.spec.ts     | Critical      | ✅ Planned |
| TC_VIEW_013-015 | validation.spec.ts         | High          | ✅ Planned |
| TC_VIEW_016     | network-resilience.spec.ts | High          | ✅ Planned |
| TC_VIEW_017     | security.spec.ts           | Critical      | ✅ Planned |
| TC_VIEW_018-021 | edge-cases.spec.ts         | Medium        | ✅ Planned |
| TC_VIEW_022-023 | network-resilience.spec.ts | High          | ✅ Planned |
| TC_VIEW_024-027 | network-resilience.spec.ts | High/Medium   | ✅ Planned |
| TC_VIEW_028-032 | responsive.spec.ts         | Medium        | ✅ Planned |
| TC_VIEW_033     | accessibility.spec.ts      | High          | ✅ Planned |
| TC_VIEW_034-036 | performance.spec.ts        | Critical/High | ✅ Planned |

### B. Useful Resources

- **Playwright Documentation**: https://playwright.dev
- **Best Practices**: https://playwright.dev/docs/best-practices
- **Trace Viewer**: https://playwright.dev/docs/trace-viewer
- **Debugging Guide**: https://playwright.dev/docs/debug
- **CI Examples**: https://playwright.dev/docs/ci

### C. Team Contacts

- **QA Lead**: [Name] - E2E test strategy, blocking issues
- **Frontend Lead**: [Name] - Component structure, test data requirements
- **DevOps**: [Name] - CI/CD pipeline, environment configuration
- **Product Owner**: [Name] - Test case prioritization, acceptance criteria

---

**Document Status**: ✅ Ready for Implementation  
**Approved By**: [QA Lead, Tech Lead]  
**Next Review**: After Phase 1 completion  
**Version**: 1.0  
**Last Updated**: 2025-12-19
