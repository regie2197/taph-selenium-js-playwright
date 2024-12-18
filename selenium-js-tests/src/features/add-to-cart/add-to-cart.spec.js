const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const LoginPage = require('../login/Login.page.js');
const assert = require('assert');
const { takeScreenshot, getTestData } = require('../../shared/utility.js');
const addContext = require('mochawesome/addContext');


describe('Add to Cart Feature', function () {
    let driver;
    let loginPage;
    let loginData;
    let screenshotDir;
    const featureName = process.env.FEATURE_NAME || 'default_feature';

    beforeEach(async function () {
        screenshotDir = path.join(__dirname, '..', '..', '..', 'tests', 'test-screenshots', featureName);
    });

    before(async function () {
        // Set up WebDriver
        const chromeOptions = new chrome.Options();
        const headless = process.env.HEADLESS === 'true'; // Check for headless mode

        if (headless) {
            chromeOptions.addArguments('headless');
        }

        // Create Web Driver Instance
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        // Initialize LoginPage with the Web Driver
        loginPage = new LoginPage(driver);

        await driver.manage().setTimeouts({ implicit: 10000 });
        
        if (!headless) {
            await driver.manage().window().maximize();
        }
        // Open the login page
        await driver.get('https://www.saucedemo.com/');
        
        loginData = getTestData('loginData.json'); 
        const { username, password } = loginData[0];
        // Perform login actions
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.clickLogin();
    });

    after(async function () {
        // Quit WebDriver
        if (driver) {
            await driver.quit();
        }
    });
    it('Should Successfully Add to Cart Item', async function () {
        const testCaseName = 'Should Successfully Add to Cart Item';

        // Click on "Add to Cart" button
        const addToCartButton = await driver.findElement(By.id('add-to-cart-sauce-labs-backpack'));
        await addToCartButton.click();

        // Validate cart badge shows the item was added
        const cartBadge = await driver.wait(
            until.elementLocated(By.css('.shopping_cart_badge')),
            5000
        );
        const badgeText = await cartBadge.getText();
        assert.strictEqual(badgeText, '1', 'Item was not successfully added to the cart.');

        // Take a screenshot
        const actualScreenshotPath = await takeScreenshot(driver, screenshotDir, testCaseName);
        addContext(this, { title: 'Actual Screenshot', value: actualScreenshotPath });
    });
    it('Should Successfully View Item from the Cart', async function () {
        const testCaseName = 'View item from the cart';

        // Click on "Cart" button
        const cartLink = await driver.findElement(By.css('[data-test="shopping-cart-link"]'));
        await cartLink.click();

        // Validate the cart page
        const cartItem = await driver.wait(
            until.elementLocated(By.css('.cart_item')),
            5000
        );
        assert.ok(await cartItem.isDisplayed(), 'Cart item is not displayed.');

        // Take a screenshot
        const actualScreenshotPath = await takeScreenshot(driver, screenshotDir, testCaseName);
        addContext(this, { title: 'Actual Screenshot', value: actualScreenshotPath });
    });
    it('Should Successfully Delete Item from the Cart', async function () {
        const testCaseName = 'Delete item from the cart';

        // Click on "Cart" button to view the cart
        const cartLink = await driver.findElement(By.css('[data-test="shopping-cart-link"]'));
        await cartLink.click();

        // Click on "Remove" button for the item
        const removeButton = await driver.findElement(By.css('[data-test="remove-sauce-labs-backpack"]'));
        await removeButton.click();

        // Validate the cart badge is no longer displayed (cart is empty)
        const cartBadge = await driver.findElements(By.css('.shopping_cart_badge'));
        assert.strictEqual(cartBadge.length, 0, 'Cart is not empty after removing the item.');

        // Take a screenshot
        const actualScreenshotPath = await takeScreenshot(driver, screenshotDir, testCaseName);
        addContext(this, { title: 'Actual Screenshot', value: actualScreenshotPath });
    });
});    