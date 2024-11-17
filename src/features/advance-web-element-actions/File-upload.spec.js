const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');
const { takeScreenshot, initializeDriver } = require('./../../shared/utility.js');

let chai;
let expect;

describe('File Upload Test', function () {
    let driver;

    before(async function () {
        // Initialize WebDriver using the utility function
        chai = await import('chai');
        expect = chai.expect;
        driver = await initializeDriver();
    });

    after(async function () {
        await driver.quit();
    });

    it('Should successfully upload a file', async function () {
        await driver.get('https://qa-automation-practice.netlify.app/file-upload');

        const fileInput = await driver.findElement(By.id('file_upload'));

        const filePath = path.resolve(__dirname, '../../../tests/test-data/Chrissy.jpg'); // Adjusted the file path
        console.log(filePath);

        await fileInput.sendKeys(filePath);

        const submitButton = await driver.findElement(By.css('button[type="submit"]'));
        await submitButton.click();

        const successMessage = await driver.wait(
            until.elementLocated(By.xpath('//*[contains(text(), "You have successfully uploaded")]')),
            5000
        );
        const messageText = await successMessage.getText();
        
        // Using Chai's expect for assertion
        expect(messageText).to.equal('You have successfully uploaded "Chrissy.jpg"');
        console.log(messageText);
    });
});
