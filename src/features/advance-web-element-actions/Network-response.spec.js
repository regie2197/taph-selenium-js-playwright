const { By } = require('selenium-webdriver');
const path = require('path');
const { takeScreenshot, initializeDriver } = require('./../../shared/utility.js');

let chai;
let expect;

describe('Network Response Tests', function () {
    let driver;

    before(async function () {
        // Initialize WebDriver and Chai Expect
        chai = await import('chai');
        expect = chai.expect;
        driver = await initializeDriver();

        // Enable Chrome DevTools Protocol (CDP) for network conditions manipulation
        await driver.sendDevToolsCommand('Network.enable');
    });

    after(async function () {
        await driver.quit();
    });

    it('Should verify the status during Offline Mode', async function() {
        // Step 1: Load the page online
        await driver.get('https://qa-automation-practice.netlify.app/pagination');
        
        // Step 2: Set network to offline mode
        await driver.sendDevToolsCommand('Network.emulateNetworkConditions', {
            offline: true,
            latency: 0,
            downloadThroughput: 0,
            uploadThroughput: 0,
        });

        // Step 3: Verify offline status
        const isOnline = await driver.executeScript(() => navigator.onLine);
        expect(isOnline).to.be.false; // Expect the browser to be offline

         // Step 4: Refresh the page while offline
         await driver.navigate().refresh();

         // Step 5: Check for offline error by looking for specific text or element
         const isOfflineError = await driver.wait(async () => {
             const bodyText = await driver.findElement(By.css('body')).getText();
             console.log(bodyText);
             return bodyText.includes('No internet') || bodyText.includes('There is no Internet connection');
         }, 5000);
 
         expect(isOfflineError).to.be.true;
         console.log(isOfflineError);
         
});
});
