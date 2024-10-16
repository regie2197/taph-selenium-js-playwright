const { By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const path = require('path');
const addContext = require('mochawesome/addContext');
const { takeScreenshot, initializeDriver } = require('./../../shared/utility.js');

/*
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time || 1000);
    });
}*/

describe('Mouse Actions Test Suite', function () {
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

    it('Should drag and drop the box successfully', async function () {
        const testCaseName = 'drag_and_drop';

        // Navigate to the drag and drop page
        await driver.get('https://crossbrowsertesting.github.io/drag-and-drop.html');
        
        // Locate drag and drop elements
        const sourceElement = await driver.findElement(By.id('draggable'));
        const targetElement = await driver.findElement(By.id('droppable'));
        
        // Perform drag and drop
        const actions = driver.actions({ async: true });
        await actions.dragAndDrop(sourceElement, targetElement).perform();
        
        // Assert target has changed text to "Dropped!"
        const targetText = await targetElement.getText();
        assert.strictEqual(targetText, 'Dropped!', `Expected text to be 'Dropped!' but got ${targetText}`);
        console.log(targetText)
        
        // Take a screenshot after the drag-and-drop action
        const screenshotPath = await takeScreenshot(driver, screenshotDir, `${testCaseName}_drag_and_drop`);
        addContext(this, { title: 'Drag and Drop Screenshot', value: screenshotPath });
    });
    it('Should drag and drop the box manually using mouse actions', async function () {
        const testCaseName = 'manual_drag_and_drop';

        // Navigate to the drag and drop page
        await driver.get('https://crossbrowsertesting.github.io/drag-and-drop.html');
        
        // Locate drag and drop elements
        const sourceElement = await driver.findElement(By.id('draggable'));
        const targetElement = await driver.findElement(By.id('droppable'));
        
        // Perform mouse drag and drop manually
        const actions = driver.actions({ async: true });
        
        // 1. Move to the source element (draggable)
        await actions.move({ origin: sourceElement }).press().perform();
        // 2. Move to the target element (droppable)
        await actions.move({ origin: targetElement }).release().perform();

        // Assert target has changed text to "Dropped!"
        const targetText = await targetElement.getText();
        assert.strictEqual(targetText, 'Dropped!', `Expected text to be 'Dropped!' but got ${targetText}`);
        console.log(`The target text is ${targetText}`);
        
        // Take a screenshot after the drag-and-drop action
        const screenshotPath = await takeScreenshot(driver, screenshotDir, `${testCaseName}_manual_drag_and_drop`);
        addContext(this, { title: 'Manual Drag and Drop Screenshot', value: screenshotPath });
    });
});
