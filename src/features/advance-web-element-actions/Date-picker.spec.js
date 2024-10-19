const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const path = require('path');
const addContext = require('mochawesome/addContext');
const { takeScreenshot, initializeDriver } = require('./../../shared/utility.js');

describe('Date Picker Test', function() {
    let driver;
    const featureName = 'advance-web-element-actions';

    beforeEach(async function () {
        screenshotDir = path.join(__dirname, '..', '..', '..', 'tests', 'test-screenshots', featureName);
    });

    before(async function() {
        // Initialize WebDriver using the utility function
        driver = await initializeDriver();
    });

    after(async function() {
        await driver.quit();
    });

    it('Should successfully pick a date in the basic date picker', async function() {
        const testCaseName = 'basic_date_picker';
        // Navigate to the date picker page
        await driver.get('https://qa-automation-practice.netlify.app/calendar');

        // Get the basic date picker element by its ID
        const basicDatePicker = await driver.findElement(By.id('calendar'));

        // Set the desired date (format: MM/DD/YYYY)
        const dateToSelect = '10/18/2024';

        // Clear any pre-existing value, if necessary
        await basicDatePicker.clear();

        // Send the date to the input field
        await basicDatePicker.sendKeys(dateToSelect);

        const actualScreeshotPath = await takeScreenshot(driver, screenshotDir, testCaseName);

        addContext(this, { title: 'Dropdown Option 1 Screenshot', value: actualScreeshotPath });

        const selectedDate = await basicDatePicker.getAttribute('value');
        assert.strictEqual(selectedDate, dateToSelect, `The date should be set to ${dateToSelect}`);
    });

    it('Should successfully pick a date range in the range date picker', async function() {
        // Navigate to the date picker page
        await driver.get('https://qa-automation-practice.netlify.app/calendar');

        // Get the range date picker element by its ID
        const rangeDatePicker = await driver.findElement(By.id('range-date-calendar'));

        // Clear any pre-existing value
        await rangeDatePicker.clear();

        // Set the start date (format: MM/DD/YYYY)
        const startDate = '10/10/2024';
        await rangeDatePicker.sendKeys(startDate);

        // Set the end date (range input might need a space separator)
        const endDate = '10/20/2024';
        await rangeDatePicker.sendKeys(` - ${endDate}`);

        // Verify the date range (this assumes the value in the input field follows the same format)
        const selectedDateRange = await rangeDatePicker.getAttribute('value');
        const expectedDateRange = `${startDate} - ${endDate}`;
        assert.strictEqual(selectedDateRange, expectedDateRange, `The date range should be set to ${expectedDateRange}`);
    });
});
