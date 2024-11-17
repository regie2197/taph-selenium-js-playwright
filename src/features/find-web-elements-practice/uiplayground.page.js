const { By, until } = require('selenium-webdriver');

class UIPlaygroundPage {
    constructor(driver) {
        this.driver = driver;
        // Define the locators for the elements on the page
        this.dynamicIdLink = By.css('a[href="/dynamicid"]');
        this.classAttrLink = By.css('a[href="/classattr"]');
        this.hiddenLayersLink = By.css('a[href="/hiddenlayers"]');
        this.clickLink = By.css('a[href="/click"]');
        this.textInputLink = By.css('a[href="/textinput"]');
        this.scrollbarsLink = By.css('a[href="/scrollbars"]');
        this.dynamicTableLink = By.css('a[href="/dynamictable"]');
        this.verifyTextLink = By.css('a[href="/verifytext"]');
        this.progressBarLink = By.css('a[href="/progressbar"]');
        this.visibilityLink = By.css('a[href="/visibility"]');
        this.homeLink = By.className('navbar-brand');
        this.openTogglePassword = By.className('fas fa-eye');
        this.closeTogglePassword = By.className('fas fa-eye-slash');
        this.togglePassword = By.xpath('/html/body/div/div[1]/div[2]/div[2]/form/div/div[2]/div/div[3]/div[4]/span');
    }

    // Method to navigate to the website
    async open() {
        await this.driver.get('https://www.uitestingplayground.com/');
    }

    // method to click home 
    async navigateHome() {
        await this.driver.findElement(this.homeLink).click();
    }

    // Methods to interact with the page elements
    async clickDynamicIdLink() {
        await this.driver.findElement(this.dynamicIdLink).click();
    }

    async clickClassAttrLink() {
        await this.driver.findElement(this.classAttrLink).click();
    }

    async clickHiddenLayersLink() {
        await this.driver.findElement(this.hiddenLayersLink).click();
    }

    async clickClickLink() {
        await this.driver.findElement(this.clickLink).click();
    }

    async clickTextInputLink() {
        await this.driver.findElement(this.textInputLink).click();
    }

    async clickScrollbarsLink() {
        await this.driver.findElement(this.scrollbarsLink).click();
    }

    async clickDynamicTableLink() {
        await this.driver.findElement(this.dynamicTableLink).click();
    }

    async clickVerifyTextLink() {
        await this.driver.findElement(this.verifyTextLink).click();
    }

    async clickProgressBarLink() {
        await this.driver.findElement(this.progressBarLink).click();
    }

    async clickVisibilityLink() {
        await this.driver.findElement(this.visibilityLink).click();
    }
}

module.exports = UIPlaygroundPage;
