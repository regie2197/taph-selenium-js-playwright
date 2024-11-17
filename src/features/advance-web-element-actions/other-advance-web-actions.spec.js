const { By, until } = require('selenium-webdriver');
const path = require('path');
const { takeScreenshot, initializeDriver } = require('./../../shared/utility.js');

let chai;
let expect;

describe('Other Advance Web Actions', function () {
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

    it('Should switch to new browser tab and verify content', async function() {
        await driver.get('https://qa-automation-practice.netlify.app/tab');
        
        const newTabBtn = await driver.findElement(By.id('newTabBtn'));
        await newTabBtn.click();
        
        const allTabs = await driver.getAllWindowHandles();
    
        const originalTab = allTabs[0];
        const newTab = allTabs[1];
    
        await driver.switchTo().window(newTab);
    
        await driver.sleep(15000);
    
        const h2Element = await driver.findElement(By.css('h2'));
    
        const h2Text = await h2Element.getText();
        console.log('H2 Text in new tab:', h2Text);
    
        expect(h2Text).to.equal('Table Example');
    
        // Switch back to the original tab if needed
        await driver.switchTo().window(originalTab);
    });
    
});
