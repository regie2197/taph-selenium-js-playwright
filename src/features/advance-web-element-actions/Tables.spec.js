const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');
const assert = require('assert');
const addContext = require('mochawesome/addContext');
const { takeScreenshot, initializeDriver } = require('./../../shared/utility.js');

describe('DataTables Row Display Test', function() {
    let driver;
    const featureName = 'advance-web-element-actions';

    beforeEach(async function () {
        screenshotDir = path.join(__dirname, '..', '..', '..', 'tests', 'test-screenshots', featureName);
    });

    before(async function() {
        driver = await initializeDriver();

        await driver.get('https://datatables.net/examples/data_sources/dom.html');
    });

    after(async function() {
        await driver.quit();
    });

    /**
     * Helper function to select a specific row count and verify the displayed row count in the table
     */
    async function selectDropdownValue(expectedCount) {
        const dropdown = await driver.findElement(By.id('dt-length-0'));

        // Get the currently selected option
        const selectedOption = await dropdown.findElement(By.css('option:checked'));
        const selectedValue = await selectedOption.getAttribute('value');

        // Only click the dropdown if the currently selected value is not the desired one
        if (selectedValue !== expectedCount.toString()) {
            await dropdown.click();
            const option = await dropdown.findElement(By.css(`option[value="${expectedCount}"]`));
            await option.click();
        }
    }
    async function verifyRowCount(expectedCount) {
        // Select the rows count from the dropdown only if needed
        await selectDropdownValue(expectedCount); // We call the selectDropdownValue function

        await driver.sleep(2000);

        const rows = await driver.findElements(By.css('#example tbody tr'));

        const infoText = await driver.findElement(By.id('example_info')).getText();
        
        console.log(infoText);

        // Verify that the number of rows is less than or equal to the expected count
        assert.ok(rows.length <= expectedCount, `Table should display no more than ${expectedCount} rows, but found ${rows.length}.`);

        // Verify the infoText contains the correct information
        const regex = new RegExp(`Showing \\d+ to \\d+ of \\d+ entries`);
        assert.ok(regex.test(infoText), 'The table info text does not match the expected format.');
    }

    it('Should display 10 rows when 10 is selected', async function() {
        await verifyRowCount(10);  
    });

    it('Should display 25 rows when 25 is selected', async function() {
        await verifyRowCount(25);
    });

    it('Should display 50 rows when 50 is selected', async function() {
        await verifyRowCount(50); 
    });

    it('Should display 100 rows when 100 is selected', async function() {
        await verifyRowCount(100);
    });
});
