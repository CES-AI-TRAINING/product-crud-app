# JIRA Issues for Product CRUD App Functional Requirements

This document converts the high-level functional requirements from [`docs/FUNCTIONAL_REQUIREMENTS.md`](docs/FUNCTIONAL_REQUIREMENTS.md) into JIRA issues structured as Epics -> User Stories -> Subtasks. Each feature section is mapped to an Epic, with User Stories derived from the user stories and acceptance criteria in the requirements. Subtasks are decomposed from the acceptance criteria and edge cases, with estimated effort in story points (assuming a standard agile team; 1-2 points for small tasks, 3-5 for medium, 8+ for complex). Priorities are set based on core functionality (High for CRUD, Medium for UI, Low for enhancements). Assignees are placeholders; assign based on team roles.

**Note:** In the CES AI Training JIRA project, the hierarchy is Epic → Story → Subtask. Epics don't have a story points field in JIRA; the Estimate column for Epics is left blank (—) to avoid attempting to set story points on Epics. Record planning totals in the Epic description or a separate planning note; set story points on Stories and Subtasks only.

## 1. Product Listing with Pagination

### Epic: Product Catalog Navigation

| Issue Type | Summary                    | Description                                         | Acceptance Criteria                                                                                                                                                        | Priority | Assignee      | Estimate |
| ---------- | -------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | -------- |
| Epic       | Product Catalog Navigation | Enable efficient browsing of large product catalogs | - Products displayed in grid (up to 6 per page).<br>- Pagination controls for navigation.<br>- Auto-refresh after CRUD operations.<br>- Loading states and error handling. | High     | Product Owner | —        |

#### User Story: View Product List

| Issue Type | Summary           | Description                                                                           | Acceptance Criteria                                                                                                 | Priority | Assignee           | Estimate |
| ---------- | ----------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- | ------------------ | -------- |
| Story      | View Product List | As a user, I want to view a list of products so that I can see the available catalog. | - Grid layout with title, price, description, image.<br>- Fetches data on load.<br>- Handles empty list gracefully. | High     | Frontend Developer | 5        |

##### Subtasks

| Issue Type | Summary                      | Description                                                  | Acceptance Criteria                                                     | Priority | Assignee           | Estimate |
| ---------- | ---------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------- | -------- | ------------------ | -------- |
| Subtask    | Create ProductCard Component | Implement ProductCard to display individual product details. | - Renders title, price, description, image.<br>- Handles missing image. | High     | Frontend Developer | 2        |
| Subtask    | Implement Grid Layout        | Set up grid container for product cards.                     | - Responsive grid for 6 items max.<br>- CSS for alignment.              | Medium   | Frontend Developer | 2        |
| Subtask    | Add Loading State            | Show loading indicator during fetch.                         | - Spinner or placeholder during API call.                               | Medium   | Frontend Developer | 1        |

#### User Story: Navigate with Pagination

| Issue Type | Summary                  | Description                                                                                                  | Acceptance Criteria                                                                     | Priority | Assignee           | Estimate |
| ---------- | ------------------------ | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | -------- | ------------------ | -------- |
| Story      | Navigate with Pagination | As a user, I want pagination controls so that I can navigate through large lists without performance issues. | - Buttons for page navigation.<br>- Highlights current page.<br>- Hides if <6 products. | High     | Frontend Developer | 5        |

##### Subtasks

| Issue Type | Summary                     | Description                              | Acceptance Criteria                                                     | Priority | Assignee           | Estimate |
| ---------- | --------------------------- | ---------------------------------------- | ----------------------------------------------------------------------- | -------- | ------------------ | -------- |
| Subtask    | Create Pagination Component | Build Pagination component with buttons. | - Calculates total pages from product count.<br>- Handles click events. | High     | Frontend Developer | 3        |
| Subtask    | Integrate Pagination Logic  | Slice products array for current page.   | - State management for current page.<br>- Updates on page change.       | Medium   | Frontend Developer | 2        |

## 2. Create New Product

### Epic: Product Catalog Expansion

| Issue Type | Summary                   | Description                                            | Acceptance Criteria                                                                        | Priority | Assignee      | Estimate |
| ---------- | ------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------ | -------- | ------------- | -------- |
| Epic       | Product Catalog Expansion | Support catalog expansion through new product addition | - Form with validation.<br>- API POST on submit.<br>- Error handling and success feedback. | High     | Product Owner | —        |

#### User Story: Add New Product

| Issue Type | Summary         | Description                                                              | Acceptance Criteria                                                                                                        | Priority | Assignee           | Estimate |
| ---------- | --------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------ | -------- |
| Story      | Add New Product | As a user, I want to add a new product so that I can expand the catalog. | - Form fields: title (required), price, description, image URL.<br>- Validates title.<br>- Submits to API, refreshes list. | High     | Frontend Developer | 8        |

##### Subtasks

| Issue Type | Summary                     | Description                         | Acceptance Criteria                                         | Priority | Assignee           | Estimate |
| ---------- | --------------------------- | ----------------------------------- | ----------------------------------------------------------- | -------- | ------------------ | -------- |
| Subtask    | Build ProductForm Component | Create form with controlled inputs. | - Fields for all product attributes.<br>- State management. | High     | Frontend Developer | 3        |
| Subtask    | Add Form Validation         | Implement title required check.     | - Blocks submit if invalid.<br>- Error messages.            | Medium   | Frontend Developer | 2        |
| Subtask    | Integrate Create API        | Call POST /products on submit.      | - Uses React Query mutation.<br>- Handles success/error.    | High     | Frontend Developer | 3        |

## 3. Read/View Products

### Epic: Product Information Access

| Issue Type | Summary                    | Description                                      | Acceptance Criteria                                                                      | Priority | Assignee      | Estimate |
| ---------- | -------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------- | -------- | ------------- | -------- |
| Epic       | Product Information Access | Provide comprehensive product information access | - Details visible in grid.<br>- Images load correctly.<br>- Cached data for performance. | High     | Product Owner | —        |

#### User Story: View Product Details

| Issue Type | Summary              | Description                                                                                 | Acceptance Criteria                                                                          | Priority | Assignee           | Estimate |
| ---------- | -------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------- | ------------------ | -------- |
| Story      | View Product Details | As a user, I want to view product details so that I can understand each item's information. | - Title, price, description, image displayed.<br>- Handles broken URLs.<br>- Loading states. | High     | Frontend Developer | 5        |

##### Subtasks

| Issue Type | Summary                         | Description                        | Acceptance Criteria                               | Priority | Assignee           | Estimate |
| ---------- | ------------------------------- | ---------------------------------- | ------------------------------------------------- | -------- | ------------------ | -------- |
| Subtask    | Enhance ProductCard for Details | Ensure all fields render.          | - Displays full description.<br>- Image fallback. | Medium   | Frontend Developer | 2        |
| Subtask    | Implement Data Fetching         | Use React Query for GET /products. | - Caches data.<br>- Error handling.               | High     | Frontend Developer | 3        |

## 4. Update Existing Product

### Epic: Product Information Maintenance

| Issue Type | Summary                         | Description                                        | Acceptance Criteria                                                     | Priority | Assignee      | Estimate |
| ---------- | ------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------- | -------- | ------------- | -------- |
| Epic       | Product Information Maintenance | Enable product information maintenance and updates | - Pre-filled form on edit.<br>- API PUT on submit.<br>- Refreshes list. | High     | Product Owner | —        |

#### User Story: Edit Product

| Issue Type | Summary      | Description                                                           | Acceptance Criteria                                                                     | Priority | Assignee           | Estimate |
| ---------- | ------------ | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------- | ------------------ | -------- |
| Story      | Edit Product | As a user, I want to edit a product so that I can update its details. | - Edit button opens pre-filled form.<br>- Submits changes via API.<br>- Handles errors. | High     | Frontend Developer | 8        |

##### Subtasks

| Issue Type | Summary                        | Description                       | Acceptance Criteria                            | Priority | Assignee           | Estimate |
| ---------- | ------------------------------ | --------------------------------- | ---------------------------------------------- | -------- | ------------------ | -------- |
| Subtask    | Add Edit Button to ProductCard | Trigger edit mode.                | - Passes product data to form.                 | Medium   | Frontend Developer | 1        |
| Subtask    | Pre-fill Form for Edit         | Populate form with existing data. | - useEffect to sync state.                     | Medium   | Frontend Developer | 2        |
| Subtask    | Integrate Update API           | Call PUT /products/:id.           | - Mutation for update.<br>- Invalidates cache. | High     | Frontend Developer | 3        |
| Subtask    | Handle Form Reset              | Cancel reverts changes.           | - Resets state on cancel.                      | Low      | Frontend Developer | 2        |

## 5. Delete Product

### Epic: Catalog Maintenance

| Issue Type | Summary             | Description                                         | Acceptance Criteria                                                     | Priority | Assignee      | Estimate |
| ---------- | ------------------- | --------------------------------------------------- | ----------------------------------------------------------------------- | -------- | ------------- | -------- |
| Epic       | Catalog Maintenance | Support catalog maintenance through product removal | - Confirmation dialog.<br>- API DELETE on confirm.<br>- Refreshes list. | High     | Product Owner | —        |

#### User Story: Delete Product

| Issue Type | Summary        | Description                                                                | Acceptance Criteria                                                                          | Priority | Assignee           | Estimate |
| ---------- | -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------- | ------------------ | -------- |
| Story      | Delete Product | As a user, I want to delete a product so that I can remove outdated items. | - Delete button shows confirmation.<br>- Sends DELETE request.<br>- Updates list on success. | High     | Frontend Developer | 5        |

##### Subtasks

| Issue Type | Summary                       | Description                      | Acceptance Criteria             | Priority | Assignee           | Estimate |
| ---------- | ----------------------------- | -------------------------------- | ------------------------------- | -------- | ------------------ | -------- |
| Subtask    | Add Delete Button             | Include in ProductCard.          | - Triggers confirmation.        | Medium   | Frontend Developer | 1        |
| Subtask    | Implement Confirmation Dialog | Browser confirm or custom modal. | - Yes/No options.               | Medium   | Frontend Developer | 2        |
| Subtask    | Integrate Delete API          | Call DELETE /products/:id.       | - Mutation with error handling. | High     | Frontend Developer | 2        |

## 6. Form Validation

### Epic: Data Quality Assurance

| Issue Type | Summary                | Description                                  | Acceptance Criteria                                                | Priority | Assignee      | Estimate |
| ---------- | ---------------------- | -------------------------------------------- | ------------------------------------------------------------------ | -------- | ------------- | -------- |
| Epic       | Data Quality Assurance | Ensure data quality through input validation | - Required title.<br>- Numeric price.<br>- Blocks invalid submits. | Medium   | Product Owner | —        |

#### User Story: Validate Form Inputs

| Issue Type | Summary              | Description                                                           | Acceptance Criteria                                        | Priority | Assignee           | Estimate |
| ---------- | -------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------- | -------- | ------------------ | -------- |
| Story      | Validate Form Inputs | As a user, I want form validation so that I enter valid product data. | - Title required.<br>- Price numeric.<br>- Error messages. | Medium   | Frontend Developer | 5        |

##### Subtasks

| Issue Type | Summary                | Description             | Acceptance Criteria           | Priority | Assignee           | Estimate |
| ---------- | ---------------------- | ----------------------- | ----------------------------- | -------- | ------------------ | -------- |
| Subtask    | Add Validation Logic   | Check title and price.  | - Prevents submit if invalid. | Medium   | Frontend Developer | 2        |
| Subtask    | Display Error Messages | Show validation errors. | - Inline or alert.            | Low      | Frontend Developer | 2        |
| Subtask    | Test Edge Cases        | Handle invalid inputs.  | - Browser input types.        | Low      | Frontend Developer | 1        |

## 7. Responsive UI

### Epic: Cross-Device Experience

| Issue Type | Summary                 | Description                                           | Acceptance Criteria                                       | Priority | Assignee      | Estimate |
| ---------- | ----------------------- | ----------------------------------------------------- | --------------------------------------------------------- | -------- | ------------- | -------- |
| Epic       | Cross-Device Experience | Deliver consistent user experience across all devices | - Adapts to screen sizes.<br>- Touch-friendly navigation. | Medium   | Product Owner | —        |

#### User Story: Responsive Design

| Issue Type | Summary           | Description                                                                            | Acceptance Criteria                                         | Priority | Assignee           | Estimate |
| ---------- | ----------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------- | ------------------ | -------- |
| Story      | Responsive Design | As a user, I want a responsive design so that I can use the app on mobile and desktop. | - Layout adjusts for devices.<br>- Usable on small screens. | Medium   | Frontend Developer | 8        |

##### Subtasks

| Issue Type | Summary                     | Description                | Acceptance Criteria                  | Priority | Assignee           | Estimate |
| ---------- | --------------------------- | -------------------------- | ------------------------------------ | -------- | ------------------ | -------- |
| Subtask    | Add CSS Media Queries       | Responsive styles.         | - Breakpoints for mobile/tablet.     | Medium   | Frontend Developer | 3        |
| Subtask    | Test on Devices             | Ensure usability.          | - Manual testing on different sizes. | Low      | QA Tester          | 2        |
| Subtask    | Optimize Touch Interactions | Pagination touch-friendly. | - Larger buttons if needed.          | Low      | Frontend Developer | 3        |

## 8. API Integration

### Epic: Data Connectivity

| Issue Type | Summary           | Description                                       | Acceptance Criteria                                                   | Priority | Assignee      | Estimate |
| ---------- | ----------------- | ------------------------------------------------- | --------------------------------------------------------------------- | -------- | ------------- | -------- |
| Epic       | Data Connectivity | Establish robust data connectivity and operations | - CRUD endpoints working.<br>- Error handling.<br>- Uses React Query. | High     | Product Owner | —        |

#### User Story: Integrate REST API

| Issue Type | Summary            | Description                                                                              | Acceptance Criteria                                                 | Priority | Assignee          | Estimate |
| ---------- | ------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------- | ----------------- | -------- |
| Story      | Integrate REST API | As a developer, I want reliable API integration so that data operations work seamlessly. | - GET, POST, PUT, DELETE endpoints.<br>- Handles errors gracefully. | High     | Backend Developer | 10       |

##### Subtasks

| Issue Type | Summary               | Description                  | Acceptance Criteria               | Priority | Assignee           | Estimate |
| ---------- | --------------------- | ---------------------------- | --------------------------------- | -------- | ------------------ | -------- |
| Subtask    | Create API Service    | productService.ts functions. | - Fetch wrappers for each method. | High     | Backend Developer  | 4        |
| Subtask    | Integrate React Query | Set up queries/mutations.    | - Caching and invalidation.       | High     | Frontend Developer | 3        |
| Subtask    | Add Error Handling    | Display API errors.          | - Alerts or UI feedback.          | Medium   | Frontend Developer | 2        |
| Subtask    | Test API Calls        | Unit tests for service.      | - Mocks for endpoints.            | Medium   | QA Tester          | 1        |
