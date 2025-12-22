# Functional Test Cases for CES-13: View Product Info

**Epic**: Product Information Access (CES-12)  
**User Story**: View Product Info (CES-13)  
**Generated**: 2025-12-19  
**Version**: 1.0

---

## Test Summary for CES-13

| Test Type   | Critical | High   | Medium | Low   | Total  |
| ----------- | -------- | ------ | ------ | ----- | ------ |
| Positive    | 3        | 4      | 2      | 1     | 10     |
| Negative    | 2        | 3      | 2      | 0     | 7      |
| Edge Case   | 2        | 3      | 1      | 0     | 6      |
| Integration | 1        | 2      | 1      | 0     | 4      |
| UI/UX       | 0        | 3      | 2      | 1     | 6      |
| Performance | 1        | 2      | 0      | 0     | 3      |
| **Total**   | **9**    | **17** | **8**  | **2** | **36** |

---

## Traceability Matrix

| Test Case ID | Epic   | User Story | Requirement Reference              | Priority |
| ------------ | ------ | ---------- | ---------------------------------- | -------- |
| TC_VIEW_001  | CES-12 | CES-13     | Display Requirements - Title       | Critical |
| TC_VIEW_002  | CES-12 | CES-13     | Display Requirements - Price       | Critical |
| TC_VIEW_003  | CES-12 | CES-13     | Display Requirements - Description | High     |
| TC_VIEW_004  | CES-12 | CES-13     | Display Requirements - Image       | High     |
| TC_VIEW_005  | CES-12 | CES-13     | Validation - Price Format          | High     |
| TC_VIEW_006  | CES-12 | CES-13     | Validation - Title Length          | High     |
| TC_VIEW_007  | CES-12 | CES-13     | User Access Control                | Critical |
| TC_VIEW_008  | CES-12 | CES-13     | Error Handling - Loading           | Critical |
| TC_VIEW_009  | CES-12 | CES-13     | Error Handling - Network           | Critical |
| TC_VIEW_010  | CES-12 | CES-13     | Performance - Caching              | Critical |
| TC_VIEW_011  | CES-12 | CES-13     | Image Fallback                     | High     |
| TC_VIEW_012  | CES-12 | CES-13     | XSS Protection                     | Critical |
| TC_VIEW_013  | CES-12 | CES-13     | Lazy Loading                       | High     |
| TC_VIEW_014  | CES-12 | CES-13     | Text Truncation                    | Medium   |
| TC_VIEW_015  | CES-12 | CES-13     | Null/Undefined Handling            | High     |
| TC_VIEW_016  | CES-12 | CES-13     | Retry Mechanism                    | High     |
| TC_VIEW_017  | CES-12 | CES-13     | Negative Price                     | High     |
| TC_VIEW_018  | CES-12 | CES-13     | Invalid URL                        | High     |
| TC_VIEW_019  | CES-12 | CES-13     | Description Length                 | Medium   |
| TC_VIEW_020  | CES-12 | CES-13     | Empty Product List                 | Medium   |
| TC_VIEW_021  | CES-12 | CES-13     | Concurrent Requests                | Medium   |
| TC_VIEW_022  | CES-12 | CES-13     | API Timeout                        | High     |
| TC_VIEW_023  | CES-12 | CES-13     | Large Dataset                      | High     |
| TC_VIEW_024  | CES-12 | CES-13     | Broken Image URL                   | High     |
| TC_VIEW_025  | CES-12 | CES-13     | Guest User Access                  | High     |
| TC_VIEW_026  | CES-12 | CES-13     | Authenticated User Access          | High     |
| TC_VIEW_027  | CES-12 | CES-13     | Missing Fields                     | Medium   |
| TC_VIEW_028  | CES-12 | CES-13     | Special Characters                 | Medium   |
| TC_VIEW_029  | CES-12 | CES-13     | Unicode Characters                 | Low      |
| TC_VIEW_030  | CES-12 | CES-13     | Responsive Display                 | Medium   |
| TC_VIEW_031  | CES-12 | CES-13     | Hover State                        | Low      |
| TC_VIEW_032  | CES-12 | CES-13     | Loading Skeleton                   | Medium   |
| TC_VIEW_033  | CES-12 | CES-13     | Error State Display                | High     |
| TC_VIEW_034  | CES-12 | CES-13     | React Query Cache                  | Critical |
| TC_VIEW_035  | CES-12 | CES-13     | Exponential Backoff                | High     |
| TC_VIEW_036  | CES-12 | CES-13     | Stale While Revalidate             | High     |

---

## Test Cases

### Category 1: Display Requirements (Positive Tests)

#### TC_VIEW_001: Display Product Title Correctly

| Field                | Value                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_001                                                                                                                                             |
| **Priority**         | Critical                                                                                                                                                |
| **Type**             | Positive                                                                                                                                                |
| **Epic**             | Product Information Access (CES-12)                                                                                                                     |
| **Story**            | View Product Info (CES-13)                                                                                                                              |
| **Preconditions**    | - User is on products page<br>- API returns product with title<br>- Product title is within 200 characters                                              |
| **Test Steps**       | 1. Navigate to products page<br>2. Wait for products to load<br>3. Observe product card display                                                         |
| **Expected Results** | - Product title is displayed in the card<br>- Title is visible and readable<br>- Title uses proper HTML escaping<br>- Full title shown on hover tooltip |
| **Test Data**        | `{"id": 1, "title": "Test Product", "price": 19.99, "description": "Description", "image": "https://example.com/img.jpg"}`                              |
| **Actual Results**   | [To be filled]                                                                                                                                          |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                     |
| **Notes**            | Tests acceptance criteria: Product title displayed (max 200 characters, required field)                                                                 |

---

#### TC_VIEW_002: Display Product Price with Currency Formatting

| Field                | Value                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_002                                                                                                                         |
| **Priority**         | Critical                                                                                                                            |
| **Type**             | Positive                                                                                                                            |
| **Epic**             | Product Information Access (CES-12)                                                                                                 |
| **Story**            | View Product Info (CES-13)                                                                                                          |
| **Preconditions**    | - User is on products page<br>- API returns product with valid price<br>- Price is a positive number                                |
| **Test Steps**       | 1. Navigate to products page<br>2. Load product with price 19.99<br>3. Observe price display                                        |
| **Expected Results** | - Price displays as "$19.99"<br>- Two decimal places shown<br>- Currency symbol ($) prefix present<br>- Price is properly formatted |
| **Test Data**        | `{"id": 1, "title": "Test Product", "price": 19.99}`                                                                                |
| **Actual Results**   | [To be filled]                                                                                                                      |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                 |
| **Notes**            | Tests acceptance criteria: Product price displayed with proper currency formatting (e.g., $XX.XX)                                   |

---

#### TC_VIEW_003: Display Product Description for Authenticated Users

| Field                | Value                                                                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_003                                                                                                                                                |
| **Priority**         | High                                                                                                                                                       |
| **Type**             | Positive                                                                                                                                                   |
| **Epic**             | Product Information Access (CES-12)                                                                                                                        |
| **Story**            | View Product Info (CES-13)                                                                                                                                 |
| **Preconditions**    | - User is authenticated<br>- User is on products page<br>- Product has description field                                                                   |
| **Test Steps**       | 1. Login as authenticated user<br>2. Navigate to products page<br>3. Observe product card                                                                  |
| **Expected Results** | - Description is displayed<br>- Line breaks preserved<br>- Text is properly escaped<br>- Description truncated to 1000 chars with ellipsis if longer       |
| **Test Data**        | `{"id": 1, "title": "Product", "price": 10, "description": "This is a detailed product description with proper formatting.", "userRole": "authenticated"}` |
| **Actual Results**   | [To be filled]                                                                                                                                             |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                        |
| **Notes**            | Tests acceptance criteria: Product description rendered with proper line breaks (max 1000 characters)                                                      |

---

#### TC_VIEW_004: Display Product Image with Lazy Loading

| Field                | Value                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Test Case ID**     | TC_VIEW_004                                                                                                                                                              |
| **Priority**         | High                                                                                                                                                                     |
| **Type**             | Positive                                                                                                                                                                 |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                      |
| **Story**            | View Product Info (CES-13)                                                                                                                                               |
| **Preconditions**    | - User is on products page<br>- Product has valid image URL<br>- Network is available                                                                                    |
| **Test Steps**       | 1. Navigate to products page<br>2. Scroll to product card<br>3. Observe image loading                                                                                    |
| **Expected Results** | - Image loads successfully<br>- Lazy loading attribute present (loading="lazy")<br>- Alt text displays product title<br>- Image skeleton/placeholder shown while loading |
| **Test Data**        | `{"id": 1, "title": "Product", "price": 10, "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"}`                                                        |
| **Actual Results**   | [To be filled]                                                                                                                                                           |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                      |
| **Notes**            | Tests acceptance criteria: Images lazy-loaded for better performance                                                                                                     |

---

#### TC_VIEW_005: Price Validation for Zero Value

| Field                | Value                                                                                |
| -------------------- | ------------------------------------------------------------------------------------ |
| **Test Case ID**     | TC_VIEW_005                                                                          |
| **Priority**         | High                                                                                 |
| **Type**             | Positive                                                                             |
| **Epic**             | Product Information Access (CES-12)                                                  |
| **Story**            | View Product Info (CES-13)                                                           |
| **Preconditions**    | - Product has price set to 0                                                         |
| **Test Steps**       | 1. Navigate to products page<br>2. View product with price 0                         |
| **Expected Results** | - Price displays as "$0.00"<br>- No error shown<br>- Valid display format maintained |
| **Test Data**        | `{"id": 1, "title": "Free Product", "price": 0}`                                     |
| **Actual Results**   | [To be filled]                                                                       |
| **Status**           | [Pass/Fail/Blocked]                                                                  |
| **Notes**            | Tests validation constraint: Price must be >= 0                                      |

---

#### TC_VIEW_006: Title Truncation at 200 Characters

| Field                | Value                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_006                                                                                                            |
| **Priority**         | High                                                                                                                   |
| **Type**             | Positive                                                                                                               |
| **Epic**             | Product Information Access (CES-12)                                                                                    |
| **Story**            | View Product Info (CES-13)                                                                                             |
| **Preconditions**    | - Product title exceeds 200 characters                                                                                 |
| **Test Steps**       | 1. Load product with 250-character title<br>2. Observe display                                                         |
| **Expected Results** | - Title truncated at 200 characters<br>- Ellipsis (...) appended<br>- Full title visible on hover<br>- No layout break |
| **Test Data**        | `{"id": 1, "title": "` + "A".repeat(250) + `", "price": 10}`                                                           |
| **Actual Results**   | [To be filled]                                                                                                         |
| **Status**           | [Pass/Fail/Blocked]                                                                                                    |
| **Notes**            | Tests validation constraint: Title max 200 characters with truncation                                                  |

---

#### TC_VIEW_007: Guest User Limited Access

| Field                | Value                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_007                                                                                                                               |
| **Priority**         | Critical                                                                                                                                  |
| **Type**             | Positive                                                                                                                                  |
| **Epic**             | Product Information Access (CES-12)                                                                                                       |
| **Story**            | View Product Info (CES-13)                                                                                                                |
| **Preconditions**    | - User is not authenticated (guest)<br>- User is on products page                                                                         |
| **Test Steps**       | 1. Access products page without authentication<br>2. Observe product card display                                                         |
| **Expected Results** | - Title displayed<br>- Price displayed<br>- Image displayed<br>- Description NOT displayed (hidden for guests)<br>- No access error shown |
| **Test Data**        | `{"id": 1, "title": "Product", "price": 19.99, "description": "Secret info", "image": "url", "userRole": "guest"}`                        |
| **Actual Results**   | [To be filled]                                                                                                                            |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                       |
| **Notes**            | Tests acceptance criteria: Guests/unauthenticated users can view basic info (title, price, image)                                         |

---

#### TC_VIEW_008: Loading State Display

| Field                | Value                                                                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_008                                                                                                                                                |
| **Priority**         | Critical                                                                                                                                                   |
| **Type**             | Positive                                                                                                                                                   |
| **Epic**             | Product Information Access (CES-12)                                                                                                                        |
| **Story**            | View Product Info (CES-13)                                                                                                                                 |
| **Preconditions**    | - API has not yet responded<br>- Products are being fetched                                                                                                |
| **Test Steps**       | 1. Navigate to products page<br>2. Observe UI during data fetch                                                                                            |
| **Expected Results** | - Loading spinner displayed<br>- "Loading products..." message shown<br>- Spinner animates (rotation)<br>- No error shown<br>- UI blocked from interaction |
| **Test Data**        | N/A (UI state)                                                                                                                                             |
| **Actual Results**   | [To be filled]                                                                                                                                             |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                        |
| **Notes**            | Tests acceptance criteria: Loading state displayed during data fetch (spinner or skeleton)                                                                 |

---

#### TC_VIEW_009: Authenticated User Full Access

| Field                | Value                                                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_009                                                                                                                              |
| **Priority**         | High                                                                                                                                     |
| **Type**             | Positive                                                                                                                                 |
| **Epic**             | Product Information Access (CES-12)                                                                                                      |
| **Story**            | View Product Info (CES-13)                                                                                                               |
| **Preconditions**    | - User is authenticated<br>- User is on products page                                                                                    |
| **Test Steps**       | 1. Login as authenticated user<br>2. Navigate to products page<br>3. View product details                                                |
| **Expected Results** | - All fields displayed: title, price, description, image<br>- Full description visible (not hidden)<br>- Edit and Delete buttons visible |
| **Test Data**        | `{"id": 1, "title": "Product", "price": 10, "description": "Full details", "image": "url", "userRole": "authenticated"}`                 |
| **Actual Results**   | [To be filled]                                                                                                                           |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                      |
| **Notes**            | Tests acceptance criteria: Authenticated users can view full details including description                                               |

---

#### TC_VIEW_010: React Query Data Caching

| Field                | Value                                                                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_010                                                                                                                            |
| **Priority**         | Critical                                                                                                                               |
| **Type**             | Positive - Performance                                                                                                                 |
| **Epic**             | Product Information Access (CES-12)                                                                                                    |
| **Story**            | View Product Info (CES-13)                                                                                                             |
| **Preconditions**    | - Products loaded once<br>- React Query cache populated                                                                                |
| **Test Steps**       | 1. Load products page (first load)<br>2. Navigate away<br>3. Return to products page within 5 minutes<br>4. Monitor network requests   |
| **Expected Results** | - No new API request made on return<br>- Data served from cache<br>- Display is instant<br>- Cache expires after 5 minutes (staleTime) |
| **Test Data**        | N/A (caching behavior)                                                                                                                 |
| **Actual Results**   | [To be filled]                                                                                                                         |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                    |
| **Notes**            | Tests performance requirement: Product data cached to reduce API calls (5-minute stale time)                                           |

---

### Category 2: Negative Tests

#### TC_VIEW_011: Broken Image URL Fallback

| Field                | Value                                                                                                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_011                                                                                                                                                                              |
| **Priority**         | High                                                                                                                                                                                     |
| **Type**             | Negative                                                                                                                                                                                 |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                                      |
| **Story**            | View Product Info (CES-13)                                                                                                                                                               |
| **Preconditions**    | - Product has invalid/broken image URL                                                                                                                                                   |
| **Test Steps**       | 1. Load product with broken image URL<br>2. Observe image display                                                                                                                        |
| **Expected Results** | - Placeholder image displayed (https://via.placeholder.com/300x200?text=No+Image)<br>- No broken image icon<br>- Alt text still present<br>- No JavaScript error<br>- Card layout intact |
| **Test Data**        | `{"id": 1, "title": "Product", "price": 10, "image": "https://invalid-url-broken.com/404.jpg"}`                                                                                          |
| **Actual Results**   | [To be filled]                                                                                                                                                                           |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                                      |
| **Notes**            | Tests acceptance criteria: Graceful degradation when image URLs are broken/invalid                                                                                                       |

---

#### TC_VIEW_012: API Request Failure with Error State

| Field                | Value                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Test Case ID**     | TC_VIEW_012                                                                                                                                                                          |
| **Priority**         | Critical                                                                                                                                                                             |
| **Type**             | Negative                                                                                                                                                                             |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                                  |
| **Story**            | View Product Info (CES-13)                                                                                                                                                           |
| **Preconditions**    | - API is unavailable or returns error<br>- Network connection exists                                                                                                                 |
| **Test Steps**       | 1. Mock API to return 500 error<br>2. Navigate to products page<br>3. Observe error handling                                                                                         |
| **Expected Results** | - Error message displayed: "Failed to load products"<br>- Retry button visible and functional<br>- Error message includes error details<br>- No infinite loading<br>- User can retry |
| **Test Data**        | API Mock: `500 Internal Server Error`                                                                                                                                                |
| **Actual Results**   | [To be filled]                                                                                                                                                                       |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                                  |
| **Notes**            | Tests acceptance criteria: Error state shown if product fetch fails with retry option                                                                                                |

---

#### TC_VIEW_013: Negative Price Value Handling

| Field                | Value                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Test Case ID**     | TC_VIEW_013                                                                                                                          |
| **Priority**         | High                                                                                                                                 |
| **Type**             | Negative                                                                                                                             |
| **Epic**             | Product Information Access (CES-12)                                                                                                  |
| **Story**            | View Product Info (CES-13)                                                                                                           |
| **Preconditions**    | - API returns product with negative price                                                                                            |
| **Test Steps**       | 1. Load product with price -10<br>2. Observe display                                                                                 |
| **Expected Results** | - Price displays as "$-10.00" OR "Price N/A"<br>- No application crash<br>- Validation warning may be logged<br>- Card still renders |
| **Test Data**        | `{"id": 1, "title": "Invalid Product", "price": -10}`                                                                                |
| **Actual Results**   | [To be filled]                                                                                                                       |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                  |
| **Notes**            | Tests validation constraint: Price must be >= 0 (defensive handling)                                                                 |

---

#### TC_VIEW_014: Invalid Image URL Format

| Field                | Value                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_014                                                                                               |
| **Priority**         | High                                                                                                      |
| **Type**             | Negative                                                                                                  |
| **Epic**             | Product Information Access (CES-12)                                                                       |
| **Story**            | View Product Info (CES-13)                                                                                |
| **Preconditions**    | - Product has non-HTTP/HTTPS image URL                                                                    |
| **Test Steps**       | 1. Load product with ftp:// or invalid protocol image URL<br>2. Observe handling                          |
| **Expected Results** | - Placeholder image displayed<br>- No security warning<br>- URL validation logged<br>- Application stable |
| **Test Data**        | `{"id": 1, "title": "Product", "price": 10, "image": "ftp://example.com/image.jpg"}`                      |
| **Actual Results**   | [To be filled]                                                                                            |
| **Status**           | [Pass/Fail/Blocked]                                                                                       |
| **Notes**            | Tests validation constraint: Image URLs must be valid HTTP/HTTPS URLs or empty                            |

---

#### TC_VIEW_015: Null or Undefined Field Handling

| Field                | Value                                                                                                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_015                                                                                                                                                                                                           |
| **Priority**         | High                                                                                                                                                                                                                  |
| **Type**             | Negative                                                                                                                                                                                                              |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                                                                   |
| **Story**            | View Product Info (CES-13)                                                                                                                                                                                            |
| **Preconditions**    | - API returns product with null/undefined fields                                                                                                                                                                      |
| **Test Steps**       | 1. Load product with missing description and image<br>2. Observe display                                                                                                                                              |
| **Expected Results** | - Title displays (or "Untitled Product" if null)<br>- Price displays (or "Price N/A" if null)<br>- Description section empty or hidden<br>- Placeholder image shown<br>- No console errors<br>- Card renders properly |
| **Test Data**        | `{"id": 1, "title": null, "price": null, "description": undefined, "image": undefined}`                                                                                                                               |
| **Actual Results**   | [To be filled]                                                                                                                                                                                                        |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                                                                   |
| **Notes**            | Tests validation constraint: Handle null/undefined values gracefully with appropriate defaults                                                                                                                        |

---

#### TC_VIEW_016: API Timeout Handling

| Field                | Value                                                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_016                                                                                                                                                           |
| **Priority**         | High                                                                                                                                                                  |
| **Type**             | Negative                                                                                                                                                              |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                   |
| **Story**            | View Product Info (CES-13)                                                                                                                                            |
| **Preconditions**    | - API response delayed beyond 5 seconds                                                                                                                               |
| **Test Steps**       | 1. Mock API with 6-second delay<br>2. Navigate to products page<br>3. Observe behavior                                                                                |
| **Expected Results** | - Loading state shown<br>- Request retries with exponential backoff<br>- After retry attempts, error state shown<br>- Retry button available<br>- No infinite loading |
| **Test Data**        | API Mock: Delay 6000ms                                                                                                                                                |
| **Actual Results**   | [To be filled]                                                                                                                                                        |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                   |
| **Notes**            | Tests acceptance criteria: Timeout handling for slow API responses (>5 seconds)                                                                                       |

---

#### TC_VIEW_017: XSS Protection for Product Fields

| Field                | Value                                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_017                                                                                                                                                         |
| **Priority**         | Critical                                                                                                                                                            |
| **Type**             | Negative - Security                                                                                                                                                 |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                 |
| **Story**            | View Product Info (CES-13)                                                                                                                                          |
| **Preconditions**    | - Product contains malicious script in fields                                                                                                                       |
| **Test Steps**       | 1. Load product with `<script>alert('XSS')</script>` in title<br>2. Observe rendering<br>3. Check if script executes                                                |
| **Expected Results** | - Script does NOT execute<br>- HTML is properly escaped<br>- Text displays as plain text with &lt;script&gt; visible<br>- No alert popup<br>- No console XSS errors |
| **Test Data**        | `{"id": 1, "title": "<script>alert('XSS')</script>Product", "price": 10, "description": "<img src=x onerror=alert('XSS')>"}`                                        |
| **Actual Results**   | [To be filled]                                                                                                                                                      |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                 |
| **Notes**            | Tests acceptance criteria: All fields must be properly escaped to prevent XSS attacks                                                                               |

---

### Category 3: Edge Cases

#### TC_VIEW_018: Empty Product List

| Field                | Value                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_018                                                                                                                                 |
| **Priority**         | Medium                                                                                                                                      |
| **Type**             | Edge Case                                                                                                                                   |
| **Epic**             | Product Information Access (CES-12)                                                                                                         |
| **Story**            | View Product Info (CES-13)                                                                                                                  |
| **Preconditions**    | - API returns empty array []                                                                                                                |
| **Test Steps**       | 1. Mock API to return empty product list<br>2. Navigate to products page                                                                    |
| **Expected Results** | - No products displayed<br>- Empty state message shown<br>- No error displayed<br>- Pagination hidden<br>- Add Product button still visible |
| **Test Data**        | API Mock: `[]`                                                                                                                              |
| **Actual Results**   | [To be filled]                                                                                                                              |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                         |
| **Notes**            | Edge case: API returns no products                                                                                                          |

---

#### TC_VIEW_019: Very Long Description Truncation

| Field                | Value                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_019                                                                                                                               |
| **Priority**         | Medium                                                                                                                                    |
| **Type**             | Edge Case                                                                                                                                 |
| **Epic**             | Product Information Access (CES-12)                                                                                                       |
| **Story**            | View Product Info (CES-13)                                                                                                                |
| **Preconditions**    | - Product description exceeds 1000 characters<br>- User is authenticated                                                                  |
| **Test Steps**       | 1. Load product with 1500-character description<br>2. Observe display                                                                     |
| **Expected Results** | - Description truncated at 1000 characters<br>- Ellipsis (...) appended<br>- Full text available on hover/tooltip<br>- No layout overflow |
| **Test Data**        | `{"id": 1, "title": "Product", "price": 10, "description": "` + "Lorem ipsum ".repeat(150) + `"}`                                         |
| **Actual Results**   | [To be filled]                                                                                                                            |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                       |
| **Notes**            | Tests validation constraint: Description max 1000 characters                                                                              |

---

#### TC_VIEW_020: Special Characters in Product Fields

| Field                | Value                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_020                                                                                                                           |
| **Priority**         | Medium                                                                                                                                |
| **Type**             | Edge Case                                                                                                                             |
| **Epic**             | Product Information Access (CES-12)                                                                                                   |
| **Story**            | View Product Info (CES-13)                                                                                                            |
| **Preconditions**    | - Product contains special characters                                                                                                 |
| **Test Steps**       | 1. Load product with special chars: `& < > " '` in title<br>2. Observe rendering                                                      |
| **Expected Results** | - Characters properly escaped<br>- Display shows: &amp; &lt; &gt; &quot; &#x27;<br>- No rendering issues<br>- Tooltip works correctly |
| **Test Data**        | `{"id": 1, "title": "Product & <Test> \"Quote\" 'Single'", "price": 10}`                                                              |
| **Actual Results**   | [To be filled]                                                                                                                        |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                   |
| **Notes**            | Edge case: Special HTML characters handling                                                                                           |

---

#### TC_VIEW_021: Unicode and Emoji Characters

| Field                | Value                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_021                                                                                               |
| **Priority**         | Low                                                                                                       |
| **Type**             | Edge Case                                                                                                 |
| **Epic**             | Product Information Access (CES-12)                                                                       |
| **Story**            | View Product Info (CES-13)                                                                                |
| **Preconditions**    | - Product contains unicode/emoji characters                                                               |
| **Test Steps**       | 1. Load product with emoji: "Product 🎉 🚀" in title<br>2. Observe display                                |
| **Expected Results** | - Emojis render correctly<br>- No character encoding issues<br>- Layout intact<br>- Text alignment proper |
| **Test Data**        | `{"id": 1, "title": "Awesome Product 🎉🚀💯", "price": 19.99, "description": "Great deal! 你好 مرحبا"}`   |
| **Actual Results**   | [To be filled]                                                                                            |
| **Status**           | [Pass/Fail/Blocked]                                                                                       |
| **Notes**            | Edge case: International characters and emojis                                                            |

---

#### TC_VIEW_022: Large Dataset Performance

| Field                | Value                                                                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_022                                                                                                                                                |
| **Priority**         | High                                                                                                                                                       |
| **Type**             | Edge Case - Performance                                                                                                                                    |
| **Epic**             | Product Information Access (CES-12)                                                                                                                        |
| **Story**            | View Product Info (CES-13)                                                                                                                                 |
| **Preconditions**    | - API returns 100+ products                                                                                                                                |
| **Test Steps**       | 1. Load page with 200 products<br>2. Measure render time<br>3. Test pagination                                                                             |
| **Expected Results** | - Only 6 products per page rendered<br>- Initial render < 2 seconds<br>- Pagination controls visible<br>- Smooth scrolling<br>- No performance degradation |
| **Test Data**        | API Mock: Array of 200 products                                                                                                                            |
| **Actual Results**   | [To be filled]                                                                                                                                             |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                        |
| **Notes**            | Performance test: Large dataset handling with pagination                                                                                                   |

---

#### TC_VIEW_023: Empty Image URL

| Field                | Value                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_023                                                                                               |
| **Priority**         | High                                                                                                      |
| **Type**             | Edge Case                                                                                                 |
| **Epic**             | Product Information Access (CES-12)                                                                       |
| **Story**            | View Product Info (CES-13)                                                                                |
| **Preconditions**    | - Product image URL is empty string                                                                       |
| **Test Steps**       | 1. Load product with image: ""<br>2. Observe display                                                      |
| **Expected Results** | - Placeholder image displayed<br>- No broken image<br>- Alt text shows product title<br>- No error logged |
| **Test Data**        | `{"id": 1, "title": "Product", "price": 10, "image": ""}`                                                 |
| **Actual Results**   | [To be filled]                                                                                            |
| **Status**           | [Pass/Fail/Blocked]                                                                                       |
| **Notes**            | Edge case: Empty image URL handling                                                                       |

---

### Category 4: Integration Tests

#### TC_VIEW_024: React Query and API Integration

| Field                | Value                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Test Case ID**     | TC_VIEW_024                                                                                                                                                              |
| **Priority**         | Critical                                                                                                                                                                 |
| **Type**             | Integration                                                                                                                                                              |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                      |
| **Story**            | View Product Info (CES-13)                                                                                                                                               |
| **Preconditions**    | - React Query configured<br>- API endpoint available                                                                                                                     |
| **Test Steps**       | 1. Navigate to products page<br>2. Monitor network tab<br>3. Check React Query DevTools                                                                                  |
| **Expected Results** | - GET /products API called<br>- React Query caches response<br>- queryKey: ['products'] set<br>- staleTime: 5 minutes<br>- gcTime: 10 minutes<br>- Query status: success |
| **Test Data**        | API: GET https://fakestoreapi.com/products                                                                                                                               |
| **Actual Results**   | [To be filled]                                                                                                                                                           |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                      |
| **Notes**            | Integration: React Query + API service                                                                                                                                   |

---

#### TC_VIEW_025: Retry Logic with Exponential Backoff

| Field                | Value                                                                                                                                                                |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_025                                                                                                                                                          |
| **Priority**         | High                                                                                                                                                                 |
| **Type**             | Integration                                                                                                                                                          |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                  |
| **Story**            | View Product Info (CES-13)                                                                                                                                           |
| **Preconditions**    | - API fails initially<br>- Network available                                                                                                                         |
| **Test Steps**       | 1. Mock API to fail first 2 times<br>2. Load products page<br>3. Monitor retry attempts                                                                              |
| **Expected Results** | - First attempt fails<br>- Retry after ~1 second<br>- Second retry after ~2 seconds<br>- Third attempt succeeds<br>- Exponential backoff applied<br>- Max retries: 2 |
| **Test Data**        | API Mock: Fail count = 2, then success                                                                                                                               |
| **Actual Results**   | [To be filled]                                                                                                                                                       |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                  |
| **Notes**            | Tests performance requirement: Exponential backoff for failed requests                                                                                               |

---

#### TC_VIEW_026: Cache Invalidation After CRUD

| Field                | Value                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_026                                                                                                                   |
| **Priority**         | High                                                                                                                          |
| **Type**             | Integration                                                                                                                   |
| **Epic**             | Product Information Access (CES-12)                                                                                           |
| **Story**            | View Product Info (CES-13)                                                                                                    |
| **Preconditions**    | - Products cached<br>- CRUD operation performed                                                                               |
| **Test Steps**       | 1. Load products (cached)<br>2. Create/Update/Delete a product<br>3. Observe product list update                              |
| **Expected Results** | - Cache invalidated after mutation<br>- Fresh data fetched<br>- UI updates automatically<br>- New product visible immediately |
| **Test Data**        | N/A (integration flow)                                                                                                        |
| **Actual Results**   | [To be filled]                                                                                                                |
| **Status**           | [Pass/Fail/Blocked]                                                                                                           |
| **Notes**            | Integration: Cache invalidation on mutations                                                                                  |

---

#### TC_VIEW_027: Window Focus Refetch

| Field                | Value                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_027                                                                                                    |
| **Priority**         | Medium                                                                                                         |
| **Type**             | Integration                                                                                                    |
| **Epic**             | Product Information Access (CES-12)                                                                            |
| **Story**            | View Product Info (CES-13)                                                                                     |
| **Preconditions**    | - Products page loaded<br>- React Query refetchOnWindowFocus: true                                             |
| **Test Steps**       | 1. Load products page<br>2. Switch to another tab/window<br>3. Return to products page<br>4. Monitor network   |
| **Expected Results** | - API refetch triggered on window focus<br>- Fresh data retrieved<br>- Cache updated<br>- UI shows latest data |
| **Test Data**        | N/A (integration behavior)                                                                                     |
| **Actual Results**   | [To be filled]                                                                                                 |
| **Status**           | [Pass/Fail/Blocked]                                                                                            |
| **Notes**            | Integration: Refetch on window focus feature                                                                   |

---

### Category 5: UI/UX Tests

#### TC_VIEW_028: Loading Skeleton Display

| Field                | Value                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_028                                                                                                                      |
| **Priority**         | Medium                                                                                                                           |
| **Type**             | UI/UX                                                                                                                            |
| **Epic**             | Product Information Access (CES-12)                                                                                              |
| **Story**            | View Product Info (CES-13)                                                                                                       |
| **Preconditions**    | - Products are being fetched<br>- Image not yet loaded                                                                           |
| **Test Steps**       | 1. Navigate to products page<br>2. Observe image area during load                                                                |
| **Expected Results** | - Image skeleton displayed<br>- "Loading..." text visible<br>- Gray placeholder background<br>- Skeleton hidden when image loads |
| **Test Data**        | N/A (UI state)                                                                                                                   |
| **Actual Results**   | [To be filled]                                                                                                                   |
| **Status**           | [Pass/Fail/Blocked]                                                                                                              |
| **Notes**            | UI test: Image loading skeleton                                                                                                  |

---

#### TC_VIEW_029: Hover Effects and Tooltips

| Field                | Value                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_029                                                                                                                                       |
| **Priority**         | Low                                                                                                                                               |
| **Type**             | UI/UX                                                                                                                                             |
| **Epic**             | Product Information Access (CES-12)                                                                                                               |
| **Story**            | View Product Info (CES-13)                                                                                                                        |
| **Preconditions**    | - Products displayed<br>- Text truncated                                                                                                          |
| **Test Steps**       | 1. Load products page<br>2. Hover over truncated title<br>3. Hover over truncated description                                                     |
| **Expected Results** | - Full title shown in tooltip on hover<br>- Full description shown in tooltip<br>- Tooltip appears within 500ms<br>- Tooltip positioned correctly |
| **Test Data**        | Long title/description product                                                                                                                    |
| **Actual Results**   | [To be filled]                                                                                                                                    |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                               |
| **Notes**            | UI test: Tooltip functionality                                                                                                                    |

---

#### TC_VIEW_030: Responsive Card Layout

| Field                | Value                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_030                                                                                                                                                               |
| **Priority**         | Medium                                                                                                                                                                    |
| **Type**             | UI/UX                                                                                                                                                                     |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                       |
| **Story**            | View Product Info (CES-13)                                                                                                                                                |
| **Preconditions**    | - Products displayed on page                                                                                                                                              |
| **Test Steps**       | 1. View page at 1920px width<br>2. Resize to 768px (tablet)<br>3. Resize to 375px (mobile)                                                                                |
| **Expected Results** | - Desktop: 3 cards per row<br>- Tablet: 2 cards per row<br>- Mobile: 1 card per row<br>- Images scale proportionally<br>- Text remains readable<br>- No horizontal scroll |
| **Test Data**        | N/A (responsive design)                                                                                                                                                   |
| **Actual Results**   | [To be filled]                                                                                                                                                            |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                       |
| **Notes**            | UI test: Responsive grid layout                                                                                                                                           |

---

#### TC_VIEW_031: Error State Display with Retry Button

| Field                | Value                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_031                                                                                                                                                                                               |
| **Priority**         | High                                                                                                                                                                                                      |
| **Type**             | UI/UX                                                                                                                                                                                                     |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                                                       |
| **Story**            | View Product Info (CES-13)                                                                                                                                                                                |
| **Preconditions**    | - API request failed                                                                                                                                                                                      |
| **Test Steps**       | 1. Mock API failure<br>2. Navigate to products page<br>3. Observe error display<br>4. Click retry button                                                                                                  |
| **Expected Results** | - Error message displayed in red<br>- "Failed to load products" heading<br>- Error details shown<br>- Blue "Retry" button visible<br>- Button click triggers new API request<br>- Error clears on success |
| **Test Data**        | API Mock: 500 error                                                                                                                                                                                       |
| **Actual Results**   | [To be filled]                                                                                                                                                                                            |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                                                       |
| **Notes**            | UI test: Error state and retry interaction                                                                                                                                                                |

---

#### TC_VIEW_032: Loading Spinner Animation

| Field                | Value                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_032                                                                                                                                                               |
| **Priority**         | Medium                                                                                                                                                                    |
| **Type**             | UI/UX                                                                                                                                                                     |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                       |
| **Story**            | View Product Info (CES-13)                                                                                                                                                |
| **Preconditions**    | - Page is loading products                                                                                                                                                |
| **Test Steps**       | 1. Navigate to products page<br>2. Observe loading animation                                                                                                              |
| **Expected Results** | - Circular spinner visible<br>- Smooth rotation animation (1s per rotation)<br>- Blue color (#3498db)<br>- Centered on page<br>- "Loading products..." text below spinner |
| **Test Data**        | N/A (CSS animation)                                                                                                                                                       |
| **Actual Results**   | [To be filled]                                                                                                                                                            |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                       |
| **Notes**            | UI test: Loading spinner animation                                                                                                                                        |

---

#### TC_VIEW_033: Image Alt Text Accessibility

| Field                | Value                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_033                                                                                                                                             |
| **Priority**         | High                                                                                                                                                    |
| **Type**             | UI/UX - Accessibility                                                                                                                                   |
| **Epic**             | Product Information Access (CES-12)                                                                                                                     |
| **Story**            | View Product Info (CES-13)                                                                                                                              |
| **Preconditions**    | - Products with images displayed                                                                                                                        |
| **Test Steps**       | 1. Load products page<br>2. Inspect image elements<br>3. Test with screen reader                                                                        |
| **Expected Results** | - All images have alt attribute<br>- Alt text = product title<br>- Screen reader announces image description<br>- Placeholder images also have alt text |
| **Test Data**        | Any product with title                                                                                                                                  |
| **Actual Results**   | [To be filled]                                                                                                                                          |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                     |
| **Notes**            | Accessibility test: Alt text for images                                                                                                                 |

---

### Category 6: Performance Tests

#### TC_VIEW_034: Stale-While-Revalidate Strategy

| Field                | Value                                                                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_034                                                                                                                                                                   |
| **Priority**         | High                                                                                                                                                                          |
| **Type**             | Performance                                                                                                                                                                   |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                           |
| **Story**            | View Product Info (CES-13)                                                                                                                                                    |
| **Preconditions**    | - Products cached but stale (>5 minutes old)                                                                                                                                  |
| **Test Steps**       | 1. Load products (fresh cache)<br>2. Wait 6 minutes<br>3. Revisit products page<br>4. Monitor behavior                                                                        |
| **Expected Results** | - Stale data shown immediately<br>- Background refetch initiated<br>- UI updates when fresh data arrives<br>- No loading spinner for stale data<br>- Seamless user experience |
| **Test Data**        | N/A (caching strategy)                                                                                                                                                        |
| **Actual Results**   | [To be filled]                                                                                                                                                                |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                           |
| **Notes**            | Tests performance requirement: Stale-while-revalidate strategy for cached data                                                                                                |

---

#### TC_VIEW_035: Image Lazy Loading Performance

| Field                | Value                                                                                                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_035                                                                                                                                                                                           |
| **Priority**         | High                                                                                                                                                                                                  |
| **Type**             | Performance                                                                                                                                                                                           |
| **Epic**             | Product Information Access (CES-12)                                                                                                                                                                   |
| **Story**            | View Product Info (CES-13)                                                                                                                                                                            |
| **Preconditions**    | - Multiple products with images<br>- Page requires scrolling                                                                                                                                          |
| **Test Steps**       | 1. Load products page<br>2. Monitor network requests<br>3. Scroll down page                                                                                                                           |
| **Expected Results** | - Only visible images load initially<br>- Images load as scrolled into view<br>- loading="lazy" attribute present<br>- Network waterfall shows sequential loading<br>- Initial page load time reduced |
| **Test Data**        | 20+ products with images                                                                                                                                                                              |
| **Actual Results**   | [To be filled]                                                                                                                                                                                        |
| **Status**           | [Pass/Fail/Blocked]                                                                                                                                                                                   |
| **Notes**            | Tests performance requirement: Images lazy-loaded for better performance                                                                                                                              |

---

#### TC_VIEW_036: Cache Garbage Collection

| Field                | Value                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Test Case ID**     | TC_VIEW_036                                                                                                                  |
| **Priority**         | Medium                                                                                                                       |
| **Type**             | Performance                                                                                                                  |
| **Epic**             | Product Information Access (CES-12)                                                                                          |
| **Story**            | View Product Info (CES-13)                                                                                                   |
| **Preconditions**    | - Data cached<br>- gcTime configured (10 minutes)                                                                            |
| **Test Steps**       | 1. Load products page<br>2. Navigate away<br>3. Wait 11 minutes<br>4. Check React Query cache                                |
| **Expected Results** | - Cache data removed after 10 minutes of inactivity<br>- Memory freed<br>- Next visit fetches fresh data<br>- No memory leak |
| **Test Data**        | N/A (cache management)                                                                                                       |
| **Actual Results**   | [To be filled]                                                                                                               |
| **Status**           | [Pass/Fail/Blocked]                                                                                                          |
| **Notes**            | Performance test: Cache garbage collection (gcTime)                                                                          |

---

## Test Execution Notes

### Prerequisites

- React application running on http://localhost:5173 (or configured port)
- API available at https://fakestoreapi.com/products
- Modern browser (Chrome/Firefox/Safari latest)
- React Query DevTools installed (for integration tests)
- Network throttling capability for performance tests

### Test Data Setup

```json
// Standard test product
{
  "id": 1,
  "title": "Test Product",
  "price": 19.99,
  "description": "A test product description",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "category": "electronics"
}

// Edge case products
{
  "id": 2,
  "title": "Very Long Title That Exceeds Two Hundred Characters... [continues for 250 chars]",
  "price": 0,
  "description": null,
  "image": ""
}

{
  "id": 3,
  "title": "<script>alert('XSS')</script>Malicious Product",
  "price": -10,
  "description": "<img src=x onerror=alert('xss')>",
  "image": "ftp://invalid-protocol.com/image.jpg"
}
```

### Execution Order

1. **Positive Tests** (TC_VIEW_001 - TC_VIEW_010): Verify happy paths first
2. **Negative Tests** (TC_VIEW_011 - TC_VIEW_017): Test error handling
3. **Edge Cases** (TC_VIEW_018 - TC_VIEW_023): Boundary conditions
4. **Integration Tests** (TC_VIEW_024 - TC_VIEW_027): API + React Query
5. **UI/UX Tests** (TC_VIEW_028 - TC_VIEW_033): Visual and interaction tests
6. **Performance Tests** (TC_VIEW_034 - TC_VIEW_036): Caching and optimization

### Pass Criteria

- All Critical tests: 100% pass rate
- All High tests: 95% pass rate
- All Medium tests: 90% pass rate
- All Low tests: 80% pass rate

### Defect Reporting

Link defects to:

- JIRA Story: CES-13
- Epic: CES-12
- Component: Frontend/ProductCard
- Labels: bug, ces-13, product-view

---

## Automation Recommendations

### High Priority for Automation

- TC_VIEW_001, TC_VIEW_002 (Critical display)
- TC_VIEW_010 (Caching)
- TC_VIEW_012 (Error handling)
- TC_VIEW_017 (XSS protection)
- TC_VIEW_024 (API integration)

### Tools Suggested

- **E2E**: Playwright or Cypress
- **Component**: React Testing Library + Vitest
- **API Mocking**: MSW (Mock Service Worker)
- **Visual**: Percy or Chromatic

---

**Document Version**: 1.0  
**Last Updated**: 2025-12-19  
**Approved By**: [QA Lead]  
**Next Review**: After CES-13 implementation complete
