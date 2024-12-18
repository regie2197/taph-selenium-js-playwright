Selenium JS Tests

This repository contains automated tests for Login and Add to Cart features using Selenium WebDriver with Mocha (JavaScript). Additionally, there is a Playwright test for login functionality

Project Structure

selenium-js-tests/
├── src/
│   ├── features/
│   │   ├── login/
│   │   │   ├── Login.page.js
│   │   │   └── Login.spec.js
│   │   ├── add-to-cart/
│   │   │   └── add-to-cart.spec.js
│   ├── shared/
├── tests/
│    ├── test-data/
│    ├── test-screenshots/
playwright-tests/
├── tests/
│   ├── auth.spec.js/


Setup Instructions
1. Prerequisites
    - Install Node.js (v14+ recommended) from Node.js official site.
    - Install Google Chrome (latest version) for running tests on Chrome.
    - Ensure you have npm (Node.js package manager) installed.

2. Clone the Repository

3. Install Dependencies

4. Environment Configuration

Assumptions
The tests are designed for the Sauce Demo Website (https://www.saucedemo.com/).
Ensure the website is accessible before running tests.
Default credentials used for login are provided in loginData.json.
The tests assume all required dependencies are installed, and Google Chrome is available on the system.