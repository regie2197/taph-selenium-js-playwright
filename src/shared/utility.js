const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser'); // Required for CSV parsing

/**
 * Formats a date into a human-readable format: MM-DD-YYYY_HH-MM-SS
 * @returns {String} - The formatted date string
 */
const getFormattedDate = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${month}-${day}-${year}_${hours}-${minutes}-${seconds}`;
};

/**
 * Takes a screenshot using the given Selenium WebDriver instance and saves it to a defined path.
 * 
 * @param {WebDriver} driver - The Selenium WebDriver instance.
 * @param {String} screenshotDir - The directory where the screenshot will be saved.
 * @param {String} testCaseName - The name of the test case (used in the screenshot file name).
 * @returns {String} screenshotPath - The path where the screenshot was saved.
 */
const takeScreenshot = async (driver, screenshotDir, testCaseName) => {
    try {
        // Take a screenshot
        let screenshot = await driver.takeScreenshot();

        const sanitizedTestCaseName = testCaseName.replace(/[^a-zA-Z0-9_-]/g, '');
        const formattedDate = getFormattedDate();

        const screenshotName = `${sanitizedTestCaseName}-${formattedDate}.png`;

        // Ensure the directory exists (create if it doesn't)
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }

        // Define the full path where the screenshot will be saved
        const screenshotPath = path.join(screenshotDir, screenshotName);

        // Save the screenshot to the file system
        fs.writeFileSync(screenshotPath, screenshot, 'base64');

        // Return the path for the screenshot
        console.log(`Screenshot taken and saved at ${screenshotPath}`);
        return screenshotPath;
    } catch (error) {
        console.error('Error taking screenshot:', error);
        throw error;
    }
};

/**
 * Reads test data from a file (either JSON or CSV).
 * 
 * @param {String} fileName - The name of the test data file (supports JSON or CSV).
 * @returns {Promise<Array>} - Returns a promise that resolves with the parsed test data.
 */
const getTestData = (fileName) => {
    const filePath = path.join(__dirname, '..', '..', 'tests', 'test-data', fileName);
    const fileExtension = path.extname(fileName);

    if (fileExtension === '.json') {
        // Read JSON file
        const rawData = fs.readFileSync(filePath);
        return JSON.parse(rawData);
    } else if (fileExtension === '.csv') {
        // Read CSV file (returns a promise)
        return new Promise((resolve, reject) => {
            const testData = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (row) => {
                    testData.push(row);
                })
                .on('end', () => {
                    resolve(testData);
                })
                .on('error', reject);
        });
    } else {
        throw new Error('Unsupported file format');
    }
};

// Export all utility functions
module.exports = {
    takeScreenshot,
    getFormattedDate,
    getTestData
};
