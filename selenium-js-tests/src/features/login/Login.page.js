const { By } = require('selenium-webdriver');


class LoginPage { 
    constructor(driver) {
        this.driver = driver;
    }
    // for arranging web element objects
    get usernameField() {
        // Finding Elements
        return this.driver.findElement(By.id('user-name'));
    }

    get passwordField() {
        return this.driver.findElement(By.id('password'));
    }

    get loginButton() {
        return this.driver.findElement(By.id('login-button'));
    }

    get errorLoginMessage() {
        return this.driver.findElement(By.xpath('/html/body/div/div/div[2]/div[1]/div/div/form/div[3]/h3'));
    }
    // for web app Actions
    async enterUsername(username) {
        // Interacting with Elements
        await this.usernameField.sendKeys(username);
    }

    async enterPassword(password) {
        await this.passwordField.sendKeys(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }
}

module.exports = LoginPage;
