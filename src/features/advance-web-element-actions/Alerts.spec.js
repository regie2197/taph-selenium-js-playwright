const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const { initializeDriver } = require('./../../shared/utility.js');

describe('Alerts Test', function() {
    let driver;

    before(async function() {
        // Initialize WebDriver using the utility function
        driver = await initializeDriver();
    });

    after(async function() {
        await driver.quit();
    });

    it('should handle the alert box and verify its message', async function() {
        // Navigate to the alerts page
        await driver.get('https://qa-automation-practice.netlify.app/alerts');

        // Click the alert button
        const alertButton = await driver.findElement(By.id('alert-btn'));
        await alertButton.click();

        // Switch to the alert box
        let alertBox = await driver.switchTo().alert();

        // Get the alert message
        const alertMessage = await alertBox.getText();
        console.log(alertMessage);

        // Assert the alert message
        assert.strictEqual(alertMessage, 'Hello! I am an alert box!!', 'Alert message does not match');

        // Accept the alert
        await alertBox.accept();
    });

    it('should handle the confirmation box and dismiss it', async function() {
        // Navigate to the alerts page again
        await driver.get('https://qa-automation-practice.netlify.app/alerts');

        // Click the confirm button
        const confirmButton = await driver.findElement(By.id('confirm-btn'));
        confirmButton.click();

        await driver.sleep(2000)
        let confirmDialog = await driver.switchTo().alert();

        const confirmMessage = await confirmDialog.getText();
        console.log(confirmMessage);

        assert.strictEqual(confirmMessage, 'Press a button!\nEither OK or Cancel.', 'Confirmation message does not match');

        await confirmDialog.accept();
    });
});
