🧪 SpriteCloud Test Automation Framework

This repository contains an end-to-end test automation framework built using Playwright + TypeScript, covering both UI and API testing.

The framework is structured to reflect real-world QA practices, with clear separation of concerns, reusable components, environment handling, and CI integration.

🚀 Tech Stack

Playwright (UI + API testing)

TypeScript

Node.js

Ajv (JSON schema validation for API responses)

GitHub Actions (CI)

dotenv (environment configuration)

📁 Project Structure
├── src
│   ├── ui
│   │   ├── pages            # Page Object Models
│   │   ├── data             # UI test data
│   │   └── config           # UI environment config
│   │
│   └── api
│       ├── apiClient.ts     # Centralized API client
│       ├── data             # API endpoints & test users
│       ├── schemas          # Ajv JSON schemas
│       └── utils            # Helpers & schema validator
│
├── tests
│   ├── ui                   # UI test specs
│   └── api                  # API test specs
│
├── .github/workflows
│   └── playwright.yml       # CI pipeline
│
├── .env.example             # Environment variable template
├── playwright.config.ts
├── package.json
└── README.md

🧑‍💻 UI Test Coverage (SauceDemo)

Base URL:
https://www.saucedemo.com

Implemented UI Scenarios

✅ Successful checkout with multiple items

✅ Sorting products by Name (Z → A)

❌ Login failure with invalid credentials

🔒 Locked-out user validation

Key UI Design Decisions

Page Object Model (POM) for maintainability

Shared BasePage for common assertions

Stable selectors using data-test

No test dependencies between specs

Tests run safely in parallel

🌐 API Test Coverage (FakeStore API)

Base URL:
https://fakestoreapi.com

Implemented API Scenarios

✅ Successful login and token validation

✅ Get product and validate response schema

✅ Create a cart with existing products

✅ Create & delete a user

❌ Invalid login (negative test)

❌ Get non-existing product (API bug documented)

API Best Practices Used

Centralized ApiClient

Schema validation using Ajv

Randomized test data via helper utilities

Clear separation of:

Business assertions

Contract (schema) assertions

Known API issues are explicitly documented in tests

🔐 Environment Configuration

Environment variables are used for flexibility across local and CI runs.

.env.example
SAUCE_BASE_URL=https://www.saucedemo.com
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce

FAKESTORE_BASE_URL=https://fakestoreapi.com


⚠️ .env is ignored by default and must not be committed
CI uses GitHub Secrets instead.

▶️ Running Tests Locally
Install dependencies
npm install

Install Playwright browsers
npx playwright install

Run all tests
npx playwright test

Run only UI tests
npx playwright test tests/ui

Run only API tests
npx playwright test tests/api

Run in headed mode
npx playwright test --headed

🔁 Continuous Integration (GitHub Actions)

Tests run automatically on:

push

pull_request

Secrets are injected securely via GitHub Actions

Playwright HTML report is uploaded as an artifact

Workflow file:

.github/workflows/playwright.yml

📊 Test Reports & Debugging

Playwright automatically generates rich execution artifacts to help analyze failures and flaky behaviour.

🧾 HTML Report

After every test run, Playwright produces an interactive HTML report containing:

Test results by browser

Execution steps

Screenshots on failure

Videos (if enabled)

Error stack traces

To view the report locally:

npx playwright show-report

Screenshots & Videos

On failure, the framework automatically captures:

Screenshots of the failure state

Video recordings of the test run (browser-dependent)

These artifacts are:

Stored under test-results/

Uploaded as CI artifacts in GitHub Actions

🧠 Design Philosophy

This framework was designed to reflect how automation is built in real QA teams, not just for assessment:

Deterministic tests

Clear failure reasons

Minimal flakiness

Readable specs

Scalable structure

📝 Notes & Known API Limitations

FakeStore API returns 200 for some invalid scenarios (e.g. non-existing products)

Such behaviors are documented in tests instead of being force-failed

👤 Author

Deeksha
Senior QA / Automation Engineer