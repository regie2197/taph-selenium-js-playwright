const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('./Login.page.js');
const path = require('path');
const assert = require('assert');
const { takeScreenshot } = require('../../shared/utility.js');
const addContext = require('mochawesome/addContext');

describe('Login Test Suites', function () {
    let driver;
    let loginPage;
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
    });

    after(async function () {
        // Quit WebDriver
        if (driver) {
            await driver.quit();
        }
    });

    // Login data set for testing different user credentials
    const loginData = [
        { username: 'standard_user', password: 'secret_sauce', valid: true },
        { username: 'wrong_user', password: 'wrong_password', valid: false }
    ];

    loginData.forEach(({ username, password, valid }, index) => {
        it(`Should ${valid ? 'log in' : 'not log in'} with ${valid ? 'valid' : 'invalid'} credentials (Test case ${index + 1})`, async function () {
            const testCaseName = valid ? 'successful_login' : 'unsuccessful_login';
            
            // Open the login page
            await driver.get('https://www.saucedemo.com/');
            
            // Perform login actions
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.clickLogin();

            // Take a screenshot
            const actualScreenshotPath = await takeScreenshot(driver, screenshotDir, testCaseName);
            addContext(this, { title: 'Actual Screenshot', value: actualScreenshotPath });

            if (valid) {
                const elementLogo = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div/div[1]/div[1]/div[2]/div')), 10000);
                await driver.wait(until.elementIsVisible(elementLogo), 10000);

                const text = await elementLogo.getText();
                assert(text.includes('Swag Labs'), `Expected text to include 'Swag Labs', but found: ${text}`);

                // Logout                
                await driver.findElement(By.id('react-burger-menu-btn')).click();
                await driver.findElement(By.id('logout_sidebar_link')).click();
            } else {
                // If credentials are invalid, verify login failure by checking for an error message
                const errorElement = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/div[1]/div/div/form/div[3]/h3')), 10000);
                const errorMessage = await errorElement.getText();
                assert(errorMessage.includes('Epic sadface: Username and password do not match any user in this service'), `Expected error message, but found: ${errorMessage}`);
            }
        });
    });
});
