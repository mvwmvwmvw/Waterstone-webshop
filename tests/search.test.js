const {Builder, Browser} = require('selenium-webdriver');
describe('Search products by keywords', () => {

    test('Test Open Web Page', async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://www.waterstones.com/');
        let title = await driver.getTitle();
        expect(title).toBe("Buy books, stationery and gifts, online and in store | Waterstones");
        await driver.quit();
    })

    test('More than one product', async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://www.waterstones.com/');
        let searchBox = await driver.findElement(By.name('term'));
        let submitButton = await driver.findElement(By.type('submit'));
        await searchBox.sendKeys('harry potter');
        await submitButton.click();
        let 
        expect().toBe();

        await driver.quit();
    })

})
//https://storage.googleapis.com/chrome-for-testing-public/124.0.6367.155/win64/chromedriver-win64.zip
//chromedriver.exe в PATH
//https://www.selenium.dev/documentation/webdriver/getting_started/first_script/
//https://jestjs.io/docs/getting-started