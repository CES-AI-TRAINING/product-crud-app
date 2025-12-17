# Safety & Repository Boundaries

Use this page to enforce repository-level safety and security rules for AI agents.

- Secrets & credentials:
  - Never add hardcoded secrets, API keys, or tokens into the repo. If you need credentials for local development, use environment variables or a secrets manager and add `.env` to `.gitignore`.

- Sensitive files:
  - Do not modify GitHub workflow files in `.github/workflows/` unless explicitly instructed and reviewed by a maintainer.
  - Avoid editing server-side or deployment configuration unless the change is required and reviewed.

- Data safety:
  - Avoid changes that could lead to data loss or corruption in production flows (e.g., destructive migrations, mass-deletes without confirmation).

- Privacy / PII:
  - Do not add sample data with real PII. Anonymize or use synthetic data.

- When in doubt:
  - Open a draft PR and request a human reviewer to confirm safety implications.
