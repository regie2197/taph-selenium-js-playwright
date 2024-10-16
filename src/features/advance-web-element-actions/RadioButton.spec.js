const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const addContext = require('mochawesome/addContext');
const { takeScreenshot } = require('./../../shared/utility.js');
const path = require('path');

describe('Radio Button Test', function() {
    let driver;

    before(async function() {
        driver = await initializeDriver();
    });

    after(async function() {
        await driver.quit();
    });

    it('should load the radio buttons page and select a radio button', async function() {
        // Navigate to the radio buttons page
        await driver.get('https://qa-automation-practice.netlify.app/radiobuttons');

        // Find the radio buttons
        const radio1 = await driver.findElement(By.id('radio-button1'));
        const radio2 = await driver.findElement(By.id('radio-button2'));
        const radio3 = await driver.findElement(By.id('radio-button3'));

        // Verify radio 3 is selected initially (because it's default)
        let isSelected = await radio3.isSelected();
        assert.strictEqual(isSelected, true, 'Radio 3 should be selected initially');

        // Verify radio 1 and radio 2 are not selected initially
        isSelected = await radio1.isSelected();
        assert.strictEqual(isSelected, false, 'Radio 1 should not be selected initially');

        isSelected = await radio2.isSelected();
        assert.strictEqual(isSelected, false, 'Radio 2 should not be selected initially');

        // Click radio 2 to select it
        await radio2.click();


        // Verify after clicking, radio 2 is selected and radio 3 is not selected anymore
        isSelected = await radio2.isSelected();
        assert.strictEqual(isSelected, true, 'Radio 2 should be selected after clicking it');

        isSelected = await radio3.isSelected();
        assert.strictEqual(isSelected, false, 'Radio 3 should not be selected anymore');
    });
});
