const {By,  Builder, Browser} = require('selenium-webdriver');
require('chromedriver');
describe('Search products by keywords', () => {

    test('the web page has a Waterstones title.', async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://www.waterstones.com/');
        let title = await driver.getTitle();
        expect(title).toBe("Buy books, stationery and gifts, online and in store | Waterstones");
        await driver.quit();
    })

    test('more than 1 products found.', async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://www.waterstones.com/');
        await driver.manage().setTimeouts({implicit: 5000});
        let rejectButton = await driver.findElement(By.id('onetrust-reject-all-handler'));
        await rejectButton.click();
        let searchBox = await driver.findElement(By.name('term'));
        let submitButton = await driver.findElement(By.className('input-search-button icon'));
        await searchBox.sendKeys('harry potter');
        await submitButton.click();
        let searchResult = await driver.findElement(By.className('search-result-tab-all')).then(function(){
            return true;
        });
        expect(searchResult).toBe(true);
        await driver.quit();
    })

    test('found products can be sorted.', async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://www.waterstones.com/');
        await driver.manage().setTimeouts({implicit: 5000});
        let rejectButton = await driver.findElement(By.id('onetrust-reject-all-handler'));
        await rejectButton.click();
        let searchBox = await driver.findElement(By.name('term'));
        let submitButton = await driver.findElement(By.className('input-search-button icon'));
        await searchBox.sendKeys('harry potter');
        await submitButton.click();
        let searchResult = await driver.findElement(By.className('sort'));
        let searchResultNull =searchResult !=null;
        expect(searchResultNull).toBe(true);
        await driver.quit();
    })


    test('less product', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://www.waterstones.com/');
        await driver.manage().setTimeouts({implicit: 5000});
        let rejectButton = await driver.findElement(By.id('onetrust-reject-all-handler'));
        await rejectButton.click();
        let searchBox = await driver.findElement(By.name('term'));
        let submitButton = await driver.findElement(By.className('input-search-button icon'));
        await searchBox.sendKeys('Гharry potter');
        await submitButton.click();
        const searchCountElement = await driver.findElement(By.className('search-result-tab-all')).getText();
        const searchCountNumBefore = parseInt(searchCountElement);
        let hardbackFilter = await driver.findElement(By.css('a.filter-link[href*="format/16"]'));
        await hardbackFilter.click();
        const searchCountFiltered = await driver.findElement(By.className('search-result-tab-all')).getText();
        const searchCountFilteredNum = parseInt(searchCountFiltered);
        expect(searchCountNumBefore).toBeGreaterThan(searchCountFilteredNum);
    
        await driver.quit();
    });
    
    
    
    
    


})
//https://storage.googleapis.com/chrome-for-testing-public/124.0.6367.155/win64/chromedriver-win64.zip
//chromedriver.exe в PATH
//https://www.selenium.dev/documentation/webdriver/getting_started/first_script/
//https://jestjs.io/docs/getting-started