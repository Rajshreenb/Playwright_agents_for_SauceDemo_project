# Playwright Agents for SauceDemo

End-to-end test automation for the [Swag Labs (SauceDemo)](https://www.saucedemo.com) e-commerce app, built with **Playwright** and **TypeScript**. The tests were created with the help of Playwright's AI agents (**Planner, Generator and Healer**) running through **GitHub Copilot in VS Code**.

The project covers the **cart** and **checkout** flows of the application and shows how AI agents can speed up test design, test writing and test maintenance.

---

## Highlights

- **AI-assisted workflow:** test plan, test code and test fixes produced with Playwright's Planner, Generator and Healer agents
- **Written test plan:** the scenarios are documented in `specs/swag-labs-test-plan.md` before any code is written
- **Reusable helpers:** shared cart and checkout steps live in `cart-checkout-helpers.ts`, so the specs stay short and readable
- **Stable locators:** uses Playwright's built-in locators, with `testIdAttribute` set to `data-test` for SauceDemo's test attributes
- **Positive and negative coverage:** happy-path orders, validation errors, cancellations and empty-cart behaviour

---

## Tech Stack

| Area | Tool |
|------|------|
| Test framework | Playwright Test |
| Language | TypeScript |
| AI agents | Playwright Planner, Generator, Healer |
| AI tooling | GitHub Copilot + Playwright MCP server (VS Code) |
| Application under test | [saucedemo.com](https://www.saucedemo.com) |

---

## How the AI Agents Were Used

| Agent | Role | Output |
|-------|------|--------|
| **Planner** | Explored the app and designed test scenarios | `specs/swag-labs-test-plan.md` |
| **Generator** | Turned the plan into Playwright test code | Spec files under `tests/` |
| **Healer** | Ran failing tests, found the cause and fixed them | Updated locators and steps |

Agent definitions are stored in `.github/agents/` and the MCP configuration in `.vscode/mcp.json`.

---

## Project Structure

```
.
├── .github/
│   └── agents/                  # Planner, Generator and Healer agent definitions
├── .vscode/
│   └── mcp.json                 # Playwright MCP server config
├── specs/
│   ├── README.md
│   └── swag-labs-test-plan.md   # Test plan created by the Planner agent
├── tests/
│   ├── cart/
│   │   ├── cart-content.spec.ts
│   │   ├── continue-shopping.spec.ts
│   │   └── empty-cart.spec.ts
│   ├── checkout/
│   │   ├── cancel-checkout.spec.ts
│   │   ├── cancel-order-overview.spec.ts
│   │   ├── complete-order.spec.ts
│   │   ├── multiple-product-totals.spec.ts
│   │   ├── required-information.spec.ts
│   │   └── required-last-name-and-postal-code.spec.ts
│   ├── cart-checkout-helpers.ts # Shared helper functions
│   ├── example.spec.js
│   └── seed.spec.ts             # Seed test used by the agents
├── playwright.config.js
└── package.json
```

---

## Test Coverage

### Cart
- Cart shows the correct items after adding products
- Continue Shopping returns the user to the product list
- Empty cart behaviour

### Checkout
- Complete an order end to end
- Cancel from the checkout information page
- Cancel from the order overview page
- Item total, tax and total with multiple products
- Required field validation (first name)
- Required field validation (last name and postal code)

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or later
- Git

### Installation

```bash
git clone https://github.com/Rajshreenb/Playwright_agents_for_SauceDemo_project.git
cd Playwright_agents_for_SauceDemo_project
npm install
npx playwright install
```

### Run the tests

```bash
# Run all tests (headless)
npx playwright test

# Run a single file
npx playwright test tests/checkout/complete-order.spec.ts

# Run in headed mode
npx playwright test --headed

# Run in UI mode
npx playwright test --ui

# Open the HTML report
npx playwright show-report
```

---

## What I Learned

- How to use Playwright's Planner, Generator and Healer agents together in a real workflow
- How to review and refine AI-generated tests instead of accepting them as they are
- How to keep tests maintainable with shared helpers and stable locators
- How AI assistance cut my test-writing time significantly (roughly 30 minutes down to 10 per test)

---

## Author

**Rajshree NB**
QA Engineer

- GitHub: [@Rajshreenb](https://github.com/Rajshreenb)
- LinkedIn: _add your profile link here_

---

## Notes

This is a practice project built on the public SauceDemo site for learning and portfolio purposes.
