## Prompt for Capturing High-Level Functional Requirements

"Analyze the provided codebase and README.md for the product-crud-app. Draft a comprehensive high-level functional requirements document in Markdown format. Cover key features such as product listing with pagination, CRUD operations (create, read, update, delete), form validation, responsive UI, and API integration. Structure the document with sections for each feature, including user stories, acceptance criteria, edge cases, and assumptions. Ensure the output is stakeholder-friendly, clear, and concise, referencing the codebase for accuracy."

## Prompt for Architecture Design

"Analyze the codebase, README.md and FUNCTIONAL_REQUIREMENTS.md for the product-crud-app and produce a concise, stakeholder-friendly architecture design document in Markdown, aligned to the high-level functional requirements (see functional_requirements). Cover both high-level and low-level design and include the following deliverables:

- Executive summary (goals, scope, constraints, key decisions)
- System context (mermaid diagram of users, external systems, data flows)
- Component architecture (mermaid diagram + table mapping components to repo files/modules and responsibilities)
- Data model (ERD for core entities, fields, indexes, relationships, migration strategy)
- API design (endpoints, methods, request/response schemas, status codes, auth, pagination, versioning; include example JSON/OpenAPI-style schemas)
- Key sequence diagrams (product listing, create/update/delete, auth — mermaid)
- Deployment architecture (infra diagram, container/k8s/PaaS recommendation, CI/CD steps, promotion & rollback)
- Non-functional requirements (scalability, availability targets, performance benchmarks, security, maintainability)
- Security & compliance (auth patterns, validation, encryption, secrets management, OWASP mitigations)
- Observability & SRE (logging, metrics, tracing, alerting, recommended tooling & thresholds)
- Testing strategy (unit, integration, E2E, load tests) and acceptance criteria
- Migration & backward compatibility plan (schema migrations, versioning, rollback)
- Trade-offs & alternatives considered
- Implementation roadmap (Epics → User Stories → Tasks with rough estimates)
- Decision register, risks & mitigations, and next steps & sign-off criteria

Requirements:

- Keep it concise and actionable; use headings and tables for clarity.
- Include mermaid diagrams and example JSON schemas where useful.
- Reference specific files, modules, or README sections to justify choices and ensure traceability to functional_requirements.
- Provide concrete recommendations (tech stack options, scaling patterns, monitoring tools) and short implementation estimates.

Output: a Markdown architecture document suitable for engineers and stakeholders to review and approve an implementation plan."

## Prompt for Converting Requirements to JIRA Issues (Epics -> User Stories -> Subtasks)

"Given the high-level functional requirements document for the product-crud-app, convert them into JIRA issues structured as Epics -> User Stories -> Subtasks. For each feature section, create an Epic, break it down into User Stories with acceptance criteria, and further decompose into Tasks with estimated effort. Use Markdown formatting for readability, including tables for issue details (e.g., Issue Type, Summary, Description, Acceptance Criteria, Priority, Assignee). Reference the requirements document and ensure alignment with agile practices."

## Prompt to Create JIRA Issues from JIRA_ISSUES.md

### Creting JIRA Issues for all epics with estimation

"Using the structured details in docs/JIRA_ISSUES.md, create JIRA issues in your JIRA project "CES AI TRAINING" for each Epic, User Story, and Task. For each issue, set the Issue Type, Summary, Description, Acceptance Criteria (as a custom field or in description), Priority, Assignee, and Estimate (in story points). Link Stories to their parent Epics and Tasks to their parent Stories. Ensure hierarchical relationships are maintained (e.g., via 'Epic Link' or 'Parent Link' fields)."

### Creting JIRA Issues for all specific epic (recommended)

Using the structured details in docs/JIRA_ISSUES.md, create JIRA issues in your JIRA project "CES AI TRAINING" for User Story, and Task under "Product Catalog Expansion" epic. For each issue, set the Issue Type, Summary, Description, Acceptance Criteria (as a custom field or in description), Priority, Assignee. Link Stories to their parent Epics and Tasks to their parent Stories. Ensure hierarchical relationships are maintained (e.g., via 'Epic Link' or 'Parent Link' fields).