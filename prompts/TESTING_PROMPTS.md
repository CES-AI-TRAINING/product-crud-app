Analyze the following documentation for the product-crud-app and create comprehensive functional test cases:

- docs/JIRA_ISSUES.md (for User Stories, Epics, and Tasks)
- docs/FUNCTIONAL_REQUIREMENTS.md (for acceptance criteria and edge cases)
- docs/ARCHITECTURE_DESIGN.md (for technical implementation details and integration points)

For the specified Epic/User Story (e.g., 'Product Catalog Expansion' or 'Add New Product'), generate detailed test cases in Markdown format with tables. Each test case should include:

**Test Case Structure:**

- Test Case ID (e.g., TC_CREATE_001)
- Test Case Name (descriptive title)
- Feature/Epic Reference (link to JIRA Epic)
- User Story Reference (link to JIRA Story)
- Priority (Critical, High, Medium, Low)
- Test Type (Positive, Negative, Edge Case, Integration, UI, API)
- Preconditions (system state, test data requirements)
- Test Steps (numbered, clear actions)
- Expected Results (specific, measurable outcomes)
- Actual Results (to be filled during execution)
- Status (Pass/Fail/Blocked - to be filled during execution)
- Test Data (sample inputs, API payloads)
- Notes/Dependencies

**Coverage Requirements:**

1. **Positive Test Cases**: Verify happy path scenarios from acceptance criteria
2. **Negative Test Cases**: Test invalid inputs, boundary conditions, error handling
3. **Edge Cases**: Cover scenarios from edge cases section in functional requirements
4. **Integration Tests**: Verify API integration, data persistence, state management
5. **UI Tests**: Validate responsive design, form validation, loading states, error messages
6. **Cross-feature Tests**: Test interactions between related features (e.g., create → list → edit)

**Test Categories to Include:**

- Form validation (required fields, data types, character limits)
- API endpoint testing (request/response validation, error codes, timeout handling)
- Data integrity (CRUD operations, data consistency across operations)
- UI/UX validation (responsiveness, accessibility, loading indicators)
- Pagination and navigation
- Error handling and user feedback
- Performance (loading times, large datasets)

**Format:**
Use Markdown tables for test cases, grouped by feature/user story. Include a test summary table at the beginning showing total test cases by type and priority. Add traceability matrix linking test cases to requirements and JIRA issues.

**Example:**

```markdown
### Test Summary for [Epic Name]

| Test Type   | Critical | High   | Medium | Low    | Total   |
| ----------- | -------- | ------ | ------ | ------ | ------- |
| Positive    | X        | X      | X      | X      | XX      |
| Negative    | X        | X      | X      | X      | XX      |
| Edge Case   | X        | X      | X      | X      | XX      |
| Integration | X        | X      | X      | X      | XX      |
| **Total**   | **XX**   | **XX** | **XX** | **XX** | **XXX** |

### Traceability Matrix

| Test Case ID | Epic | User Story | Requirement Reference | Priority |
| ------------ | ---- | ---------- | --------------------- | -------- |

### Test Cases for [User Story Name]

#### TC\_[FEATURE]\_001: [Test Name]

| Field            | Value                                                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID     | TC_CREATE_001                                                                                                                                                                                                    |
| Priority         | High                                                                                                                                                                                                             |
| Type             | Positive                                                                                                                                                                                                         |
| Epic             | Product Catalog Expansion                                                                                                                                                                                        |
| Story            | Add New Product                                                                                                                                                                                                  |
| Preconditions    | - User is on products page<br>- API is available<br>- No products exist with duplicate name                                                                                                                      |
| Test Steps       | 1. Click 'Add Product' button<br>2. Enter title: 'Test Product'<br>3. Enter price: 99.99<br>4. Enter description: 'Test description'<br>5. Enter image URL: 'https://example.com/image.jpg'<br>6. Click 'Submit' |
| Expected Results | - Form submits successfully<br>- API POST request sent with correct payload<br>- Product appears in list<br>- Form closes<br>- Success message displayed                                                         |
| Test Data        | `{\"title\": \"Test Product\", \"price\": 99.99, \"description\": \"Test description\", \"image\": \"https://example.com/image.jpg\"}`                                                                           |
| Actual Results   | [To be filled]                                                                                                                                                                                                   |
| Status           | [Pass/Fail/Blocked]                                                                                                                                                                                              |
| Notes            | Tests acceptance criteria from FUNCTIONAL_REQUIREMENTS.md section 2                                                                                                                                              |
```

Ensure test cases cover all acceptance criteria, edge cases, and assumptions from the functional requirements. Reference specific sections of the architecture document for technical validation points (e.g., API endpoints, data model fields, validation rules). Make test cases executable and specific enough for manual or automated testing."
