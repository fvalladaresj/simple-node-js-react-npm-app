const {Builder} = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

const service = new chrome.ServiceBuilder('jenkins/scripts/driver/chromedriver.exe');

(async function firstScript() {
  try {
    let driver = await new Builder().forBrowser('chrome').setChromeService(service).build();

    await driver.get('http://localhost:3000/');

    await driver.manage().setTimeouts({implicit: 10000})

    let addContactBtn = await driver.findElement(By.id('addContactBtn'));
    await addContactBtn.click();

    let nameInput = await driver.findElement(By.name('name'));
    await nameInput.sendKeys('Juan');

    assert.deepStrictEqual(nameInput, "Juan");

    await driver.quit();
  } catch (error) {
    console.log(error)
  }
})();