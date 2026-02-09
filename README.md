# 🧪 Test Automation Framework (UI + API)

This repository contains an end-to-end **test automation framework built using Playwright and TypeScript**, covering **UI testing** and **API testing** for two independent applications.

The framework follows **real-world QA automation practices** with a clean structure, reusable components, environment-based configuration, schema validation, and CI integration.

---

## 🚀 Tech Stack

- **Playwright** (UI + API testing)
- **TypeScript**
- **Node.js**
- **Ajv** – JSON schema validation
- **GitHub Actions** – CI pipeline
- **dotenv** – environment configuration

---

## 📁 Project Structure

```
src
├── ui
│ ├── pages # Page Object Models
│ ├── data # UI test data
│ └── config # UI environment config
│
├── api
│ ├── apiClient.ts # Centralized API client
│ ├── data # API endpoints & test users
│ ├── schemas # Ajv JSON schemas
│ └── utils # Helpers & schema validator
│
tests
├── ui # UI test specs
└── api # API test specs
│
.github
└── workflows
└── playwright.yml # CI pipeline
│
.env.example # Environment variable template
playwright.config.ts
package.json
README.md

---
```

## 🧑‍💻 UI Test Coverage (SauceDemo)

**Base URL:**  
https://www.saucedemo.com

### Implemented Scenarios

- ✅ Successful checkout with multiple items
- ✅ Sorting products by **Name (Z → A)**
- ❌ Login failure with invalid credentials
- 🔒 Locked-out user validation

### UI Design Decisions

- Page Object Model (POM) for maintainability
- Shared `BasePage` for common assertions
- Stable selectors using `data-test`
- No test dependency between specs
- Tests run safely in parallel

---

## 🌐 API Test Coverage (FakeStore API)

**Base URL:**  
https://fakestoreapi.com

### Implemented Scenarios

- ✅ Successful login and token validation
- ✅ Get product and validate response schema
- ✅ Create a cart with existing products
- ✅ Create and delete a user
- ❌ Invalid login (negative test)
- ❌ Get non-existing product (negative test)

### API Best Practices Used

- Centralized `ApiClient`
- Schema validation using **Ajv**
- Randomized test data via helper utilities
- Clear separation of:
  - Business assertions
  - Contract (schema) assertions
- Known API inconsistencies are documented instead of force-failing tests

---

## 🔐 Environment Configuration

Environment variables are used for flexibility across local and CI runs.

### `.env.example`

> ⚠️ `.env` is ignored by default and must **never be committed**  
> CI uses **GitHub Secrets** instead.

---

## ▶️ Running Tests Locally

### Install dependencies
```bash
npm install
```
### Install Playwright browsers
```bash
npx playwright install
```
### Run all tests
```bash
npx playwright test
```
### Run only UI tests
```bash
npx playwright test tests/ui
```
### Run only API tests
```bash
npx playwright test tests/api
```

### 🔁 Continuous Integration (GitHub Actions)

Runs automatically on:

- push

- pull_request

- Secrets injected securely via GitHub Actions

- Playwright HTML report uploaded as an artifact

### 📄 Workflow file
```bash
.github/workflows/playwright.yml
```

## 📊 Test Reports & Debugging

Playwright generates rich artifacts for easier debugging and failure analysis.

### 🧾 HTML Report

Includes:

- Test results by browser

- Execution steps

- Screenshots on failure

- Videos (if enabled)

- Error stack traces

### View locally
```bash
npx playwright show-report
```

### 📸 Screenshots & Videos

- Automatically captured on failures

- Stored under test-results/

- Uploaded as CI artifacts

### 🤖 AI Usage Transparency

AI tools were used selectively to:
- Explore optimal Playwright synchronization strategies
- Validate complex assertion logic (sorting, schemas)
- Accelerate boilerplate setup (Ajv, helper utilities)
- Debug CI API test failures, identify Cloudflare blocking, and implement token-based authentication solution

All final design decisions, structure, and validations
were reviewed and implemented intentionally.


### 📝 Notes & Known Limitations

- Known API inconsistencies are documented instead of force-failing tests.

- FakeStore API returns 200 for some invalid scenarios

### 👤 Author

Deeksha
Senior QA / Automation Engineer
