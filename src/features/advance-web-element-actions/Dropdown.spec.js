const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const path = require('path');
const addContext = require('mochawesome/addContext');
const { takeScreenshot } = require('./../../shared/utility.js');

describe('Dropdown Actions Test Suite', function () {
    let driver;
    let screenshotDir;
    const featureName = 'advance-web-element-actions';

    beforeEach(async function () {
        screenshotDir = path.join(__dirname, '..', '..', '..', 'tests', 'test-screenshots', featureName);
    });

    before(async function () {
        const chromeOptions = new chrome.Options();
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        await driver.manage().setTimeouts({ implicit: 10000 });
        await driver.manage().window().maximize();
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('Should select option 1 and option 2 from the dropdown', async function () {
        const testCaseName = 'dropdown_selection';
        
        // Navigate to the dropdown page
        await driver.get('https://the-internet.herokuapp.com/dropdown');
        
        // Locate the dropdown
        const dropdown = await driver.findElement(By.id('dropdown'));
        
        // Select option 1
        await dropdown.findElement(By.css('option[value="1"]')).click();
        let selectedOption = await dropdown.findElement(By.css('option:checked')).getText();
        assert.strictEqual(selectedOption, 'Option 1', `Expected Option 1 but got ${selectedOption}`);
        
        // Take a screenshot after selecting option 1
        const screenshotPath1 = await takeScreenshot(driver, screenshotDir, `${testCaseName}_option_1`);
        addContext(this, { title: 'Dropdown Option 1 Screenshot', value: screenshotPath1 });
        
        // Select option 2
        await dropdown.findElement(By.css('option[value="2"]')).click();
        selectedOption = await dropdown.findElement(By.css('option:checked')).getText();
        assert.strictEqual(selectedOption, 'Option 2', `Expected Option 2 but got ${selectedOption}`);
        
        // Take a screenshot after selecting option 2
        const screenshotPath2 = await takeScreenshot(driver, screenshotDir, `${testCaseName}_option_2`);
        addContext(this, { title: 'Dropdown Option 2 Screenshot', value: screenshotPath2 });
    });
});
