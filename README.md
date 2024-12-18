Selenium JS Tests

This repository contains automated tests for Login and Add to Cart features using Selenium WebDriver with Mocha (JavaScript). Additionally, there is a Playwright test for login functionality



Setup Instructions
1. Prerequisites
    - Install Node.js (v14+ recommended) from Node.js official site.
    - Install Google Chrome (latest version) for running tests on Chrome.
    - Ensure you have npm (Node.js package manager) installed.

2. Clone the Staging Branch Repository
    - git clone -b staging https://github.com/regie2197/taph-selenium-js-playwright.git


3. Install Dependencies
    - cd selenium-js-tests
    - npm install
    - cd playwright-tests
    - npm install

4. Environment Configuration
    You can configure the environment by setting these variables in the package.json:

    - HEADLESS: Set to true for running tests in headless mode (default is false).
    - FEATURE_NAME: Set a feature name to organize screenshots into separate directories.
5. Run Tests
    In selenium-js-tests directory run the following: 
    - npm run test:headless:login
    - npm run add-to-cart:test
    To execute only the Playwright login test:
    - cd playwright-tests
    - npx playwright test

Test Structure
Selenium JS Tests
Page Object Model (POM):

The project follows the POM pattern to keep the test logic separate from the UI interaction logic.
Example: Login.page.js contains reusable methods for interacting with the login page (e.g., enterUsername, enterPassword).

Tests:

Login Tests (login/Login.spec.js):
Verifies valid and invalid login scenarios using test data from loginData.json.

Add to Cart Tests (add-to-cart/add-to-cart-.spec.js):
Tests adding an item to the cart, viewing the cart, and removing an item from the cart.
Screenshots are taken for each test case and stored in the tests/test-screenshots/ directory.

Utilities:
Shared utilities (shared/utility.js) handle test data loading (getTestData), screenshot capture (takeScreenshot), and more.

Playwright Tests
The playwright/login.spec.js provides a Playwright implementation of login functionality.

Assumptions
The tests are designed for the Sauce Demo Website (https://www.saucedemo.com/).
Ensure the website is accessible before running tests.
Default credentials used for login are provided in loginData.json.
The tests assume all required dependencies are installed, and Google Chrome is available on the system.