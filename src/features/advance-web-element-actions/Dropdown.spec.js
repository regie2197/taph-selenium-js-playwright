const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const path = require('path');
const addContext = require('mochawesome/addContext');
const { takeScreenshot, initializeDriver } = require('./../../shared/utility.js');

describe('Dropdown Actions Test Suite', function () {
    let driver;
    let screenshotDir;
    const featureName = 'advance-web-element-actions';

    beforeEach(async function () {
        screenshotDir = path.join(__dirname, '..', '..', '..', 'tests', 'test-screenshots', featureName);
    });

    before(async function () {
        driver = await initializeDriver();
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

        const option1 = await driver.findElement(By.css('option[value="1"]')).click();
        const screenshotPath1 = await takeScreenshot(driver, screenshotDir, `${testCaseName}_option_1`);
        addContext(this, { title: 'Dropdown Option 1 Screenshot', value: screenshotPath1 });


        const option2 = await driver.findElement(By.css('option[value="2"]')).click();
        const screenshotPath2 = await takeScreenshot(driver, screenshotDir, `${testCaseName}_option_2`);
        addContext(this, { title: 'Dropdown Option 2 Screenshot', value: screenshotPath2 });

        
        // Locate the dropdown
        //const dropdown = await driver.findElement(By.id('dropdown'));
        
        // Select option 1
        /*
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
        */
    });
});
