# 🧪 Test Automation Framework (UI + API)

This repository contains an end-to-end **test automation framework built using Playwright and TypeScript**, covering **UI testing** and **API testing** for two independent applications.

The framework follows **real-world QA automation practices** with a clean structure, reusable components, environment-based configuration, schema validation, and CI integration.

---

## 🚀 Tech Stack

- **Playwright** - For both UI and API automation
- **TypeScript**- For type safety and better code maintainability
- **Node.js**- Runtime environment
- **Ajv** – JSON schema validation
- **GitHub Actions** – CI pipeline
- **dotenv** – environment configuration

---

## 📁 Project Structure

```
src/
├── ui/
│   ├── pages/              # Page Object Models
│   ├── data/               # UI test data
├── api/
│   ├── apiClient.ts        # Centralized API client
│   ├── data/               # API endpoints
│   ├── schemas/            # Ajv JSON schemas
│   └── utils/              # Helpers & schema validator

tests/
├── ui/                     # UI test specs
└── api/                    # API test specs

.github/
└── workflows/
    └── playwright.yml      # CI pipeline

playwright.config.ts        # Playwright configuration
package.json
.env.example                # Environment variables template
README.md
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

- **Page Object Model (POM)** – Makes tests easier to maintain and update
- **Shared BasePage** – Common functionality isn't duplicated across pages
- **Stable selectors** – Using `data-test` attributes instead of brittle CSS classes
- **Independent tests** – Each test can run alone without affecting others
- **Parallel execution** – Tests run simultaneously without conflicts

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

- **Single API client** – All requests go through one place for consistency
- **Schema validation** – Using Ajv to catch API contract violations early
- **Dynamic test data** – Helper utilities fetch real data instead of hardcoded IDs

### API Authentication

- **Auto-login:** Token is obtained once during test setup (via `api.init()`)
- **Token reuse:** Same token used for all requests in that test
- **Secure credentials:** Username/password loaded from environment variables, never hardcoded

## 🔐 Environment Configuration

### Local Development (`.env`)
Create a `.env` file in the root directory with your credentials:
```
SAUCE_USERNAME=your_username
SAUCE_PASSWORD=your_password
FAKESTORE_USERNAME=your_username
FAKESTORE_PASSWORD=your_password
```

> ⚠️ `.env` is ignored by git and must **never be committed**

See `.env.example` for the required environment variables template.

### CI/CD (GitHub Secrets)
CI uses **GitHub Secrets** for secure credential management. No `.env` file is needed on CI.


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
- `push` to main/master
- `pull_request` against main/master

Features:
- Secrets injected securely via GitHub Actions
- Playwright HTML report uploaded as artifact
- All tests run in a single worker for stability

### 📄 Workflow file
`.github/workflows/playwright.yml`

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

**How AI Was Used**

AI assisted with:

- Finding the best Playwright synchronization strategies
- Double-checking assertion logic for sorting and schema validation
- Setting up boilerplate code (Ajv, helper utilities)
- Troubleshooting CI failures and implementing the token authentication solution
- Structuring and writing the README for clarity and readability

**Note:** All final design decisions, structure, and validations
were reviewed and implemented intentionally.


### 📝 Notes & Known Limitations
- **Assumptions Made:** All design and implementation assumptions are documented as inline comments throughout the codebase.

- Known API inconsistencies are documented instead of force-failing tests.

- FakeStore API returns 200 for some invalid scenarios

### 👤 Author

Deeksha Srivastava
