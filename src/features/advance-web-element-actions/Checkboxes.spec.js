const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const addContext = require('mochawesome/addContext');
const { takeScreenshot, initializeDriver } = require('./../../shared/utility.js');
const path = require('path');


describe('Checkboxes Test', function() {
    let driver;    

    before(async function() {
        driver = await initializeDriver();
    });

    after(async function() {
        await driver.quit();
    });

    it('should load the checkboxes page and toggle checkboxes', async function() {
        // Navigate to the checkboxes page
        await driver.get('https://qa-automation-practice.netlify.app/checkboxes');

        // Find the checkboxes by their IDs
        const checkbox1 = await driver.findElement(By.id('checkbox1'));
        const checkbox2 = await driver.findElement(By.id('checkbox2'));
        const checkbox3 = await driver.findElement(By.id('checkbox3'));

        // Check the initial state of the checkboxes (all should be unchecked initially)
        let isChecked = await checkbox1.isSelected();
        assert.strictEqual(isChecked, false, 'Checkbox 1 should be unchecked initially');

        isChecked = await checkbox2.isSelected();
        assert.strictEqual(isChecked, false, 'Checkbox 2 should be unchecked initially');

        isChecked = await checkbox3.isSelected();
        assert.strictEqual(isChecked, false, 'Checkbox 3 should be unchecked initially');

        // Check checkbox 1 and verify it is checked
        await checkbox1.click();
        isChecked = await checkbox1.isSelected();
        assert.strictEqual(isChecked, true, 'Checkbox 1 should be checked after clicking it');

        // Check checkbox 2 and verify it is checked
        await checkbox2.click();
        isChecked = await checkbox2.isSelected();
        assert.strictEqual(isChecked, true, 'Checkbox 2 should be checked after clicking it');

        // Check checkbox 3 and verify it is checked
        await checkbox3.click();
        isChecked = await checkbox3.isSelected();
        assert.strictEqual(isChecked, true, 'Checkbox 3 should be checked after clicking it');

        // Uncheck all the checkboxes again and verify they are unchecked
        await checkbox1.click();
        isChecked = await checkbox1.isSelected();
        assert.strictEqual(isChecked, false, 'Checkbox 1 should be unchecked after clicking it again');

        await checkbox2.click();
        isChecked = await checkbox2.isSelected();
        assert.strictEqual(isChecked, false, 'Checkbox 2 should be unchecked after clicking it again');

        await checkbox3.click();
        isChecked = await checkbox3.isSelected();
        assert.strictEqual(isChecked, false, 'Checkbox 3 should be unchecked after clicking it again');
    });
});
