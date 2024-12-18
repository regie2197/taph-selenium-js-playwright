// @ts-check
const { test, expect } = require('@playwright/test');

test('Login to Sauce Demo', async ({ page }) => {
  // Step 1: Navigate to the Sauce Demo login page
  await page.goto('https://www.saucedemo.com/');

  // Step 2: Enter username and password
  await page.fill('[data-test="username"]', 'standard_user');  // Username field
  await page.fill('[data-test="password"]', 'secret_sauce');  // Password field

  // Step 3: Click the login button
  await page.click('[data-test="login-button"]');
});
