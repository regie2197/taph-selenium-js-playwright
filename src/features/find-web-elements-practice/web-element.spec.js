const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const UiPlaygroundPage = require('./uiplayground.page.js');
const path = require('path');
const { takeScreenshot } = require('./../../shared/utility.js');
const addContext = require('mochawesome/addContext');

describe('Finding Web Elements in UIPlayground', function() {
    let driver;
    let uiplaygroundPage;
    let screenshotDir;
    const featureName = process.env.FEATURE_NAME || 'default_feature';

    beforeEach(async function() {
        screenshotDir = path.join(__dirname, '..', '..', '..', 'tests', 'test-screenshots', featureName);
    });

    before(async function() {
        const chromeOptions = new chrome.Options();
        const headless = process.env.HEADLESS === 'true';
        chromeOptions.addArguments('--ignore-certificate-errors');

        if (headless) {
            chromeOptions.addArguments('headless');
        }

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        uiplaygroundPage = new UiPlaygroundPage(driver);

        await driver.manage().setTimeouts({ implicit: 10000 });

        if (!headless) {
            await driver.manage().window().maximize();
        }
    });

    after(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('Visit the Dynamic ID Page & use another Method to click the Button with Dynamic ID', async function() {
        const testCaseName = "handling_dynamic_id";

        await uiplaygroundPage.open();
        await uiplaygroundPage.clickDynamicIdLink();

        await driver.wait(until.elementLocated(By.css('button.btn-primary')), 10000);
        let dynamicButton = await driver.findElement(By.css('button.btn-primary'));

        await dynamicButton.click();

        const actualScreenshotPath = await takeScreenshot(driver, screenshotDir, testCaseName);

        console.log(actualScreenshotPath)
            
        addContext(this, {
            title: 'Screenshot',
            value: actualScreenshotPath
        });

        console.log('Button with dynamic ID clicked successfully!');
    });

    it('Visit the Class Attr Page & Click the Button w/ Primary using XPath with Contains() method', async function() {
        const testCaseName = "using_xpath_contains";

        await uiplaygroundPage.navigateHome();
        await uiplaygroundPage.clickClassAttrLink();

        let classAttrButton = await driver.findElement(By.xpath("//button[contains(concat(' ', normalize-space(@class), ' '), ' btn-primary ')]"));

        await classAttrButton.click();
        await driver.wait(until.alertIsPresent(), 5000);
        let alert = await driver.switchTo().alert();
        await alert.accept();

        takeScreenshot(driver, screenshotDir, testCaseName);

        console.log('Pop-up was handled successfully!');
    });
});
