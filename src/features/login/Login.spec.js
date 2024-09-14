const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('./Login.page.js');
const path = require('path');
const assert = require('assert');
const { takeScreenshot, getTestData } = require('./../../shared/utility.js');
const addContext = require('mochawesome/addContext');


describe('Login Test Suites', function() {
    let driver;
    let loginPage;
    let testData;
    let screenshotDir;
    const featureName = process.env.FEATURE_NAME || 'default_feature';

    beforeEach(async function() {
        screenshotDir = path.join(__dirname, '..', '..', '..', 'tests', 'test-screenshots', featureName);
    });

    before(async function() {
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
        
        // Load test data
        try {
            testData = await getTestData('loginData.json');
            console.log('Loaded test data:', testData);
        } catch (error) {
            console.error('Error loading test data:', error);
            throw error; // Fail the test if data loading fails
        }

        if (!testData || testData.length === 0) {
        throw new Error('Test data is undefined or empty');
        }
    });

    after(async function() {
        // Quit WebDriver
        if (driver) {
            await driver.quit();
        }
    });
    it('Should Log in With valid credentials', async function() {
            const testCaseName = 'successful_login';
            const { username, password } = testData[0];
            await driver.get('https://www.saucedemo.com/');
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.clickLogin();
    
            const actualScreenshotPath = await takeScreenshot(driver, screenshotDir, testCaseName);
            addContext(this, { title: 'Actual Screenshot', value: actualScreenshotPath });
    
            const elementLogo = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div/div[1]/div[1]/div[2]/div')), 10000);
            await driver.wait(until.elementIsVisible(elementLogo), 10000);
    
            const text = await elementLogo.getText();
            assert(text.includes('Swag Labs'), `Expected text to include 'Swag Labs', but found: ${text}`);
    });

    it('Should Successfully Logout', async function() {
        await driver.findElement(By.id('react-burger-menu-btn')).click();
        await driver.findElement(By.id('logout_sidebar_link')).click();    
    });
    
    it('Should not Login with Invalid credentials', async function() {
        const testCaseName = "unsuccessful_login";
        const { username, password } = testData[1];
        await loginPage.enterUsername(username);
        await loginPage.enterPassword(password);
        await loginPage.clickLogin();

        const actualScreenshotPath = await takeScreenshot(driver, screenshotDir, testCaseName);

        addContext(this, {
            title: 'Screenshot',
            value: actualScreenshotPath
        });
    
    });
});
