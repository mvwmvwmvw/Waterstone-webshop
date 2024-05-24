const {By,  Builder, Browser} = require('selenium-webdriver');
require('chromedriver');
describe('Add products to shopping cart', () => {
    
    test('Test Open Web Page', async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://www.waterstones.com/');
        let title = await driver.getTitle();
        expect(title).toBe("Buy books, stationery and gifts, online and in store | Waterstones");
        await driver.quit();
    })

    test('Search for any product keyword', async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://www.waterstones.com/');
        await driver.manage().setTimeouts({implicit: 5000});
        let rejectButton = await driver.findElement(By.id('onetrust-reject-all-handler'));
        await rejectButton.click();
        let searchBox = await driver.findElement(By.name('term'));
        let submitButton = await driver.findElement(By.className('input-search-button icon'));
        await searchBox.sendKeys('dog');
        await submitButton.click();
        let searchResult = await driver.findElement(By.className('search-result-tab-all')).then(function(){
            return true;
        });
        expect(searchResult).toBe(true);
        let parentElement = await driver.findElement(By.css('.book-preview-grid-item'));
        let addToBasketButton = await parentElement.findElement(By.xpath('.//button[contains(text(),"Add to Basket")]'));
        expect(addToBasketButton).not.toBeNull();
        await driver.quit();
    })

    test('Search for any product keyword', async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://www.waterstones.com/');
        await driver.manage().setTimeouts({implicit: 5000});
        let rejectButton = await driver.findElement(By.id('onetrust-reject-all-handler'));
        await rejectButton.click();
        let searchBox = await driver.findElement(By.name('term'));
        let submitButton = await driver.findElement(By.className('input-search-button icon'));
        await searchBox.sendKeys('dog');
        await submitButton.click();

        const resultImages = By.css("div.book-thumb > div > a > img");
        const imageElements = await driver.findElements(resultImages);
        const firstImageElement = imageElements[0];
        const actions = driver.actions({async:true});
        await actions.move({origin: firstImageElement}).perform();

        let buttonAddToCart = await driver.findElement(By.className('button-buy button button-teal button-small'));
        await buttonAddToCart.click();
    })

    test('Check if the basket count is greater than 0', async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://www.waterstones.com/');
        await driver.manage().setTimeouts({implicit: 5000});
        let rejectButton = await driver.findElement(By.id('onetrust-reject-all-handler'));
        await rejectButton.click();
        let searchBox = await driver.findElement(By.name('term'));
        let submitButton = await driver.findElement(By.className('input-search-button icon'));
        await searchBox.sendKeys('dog');
        await submitButton.click();
        const resultImages = By.css("div.book-thumb > div > a > img");
        const imageElements = await driver.findElements(resultImages);
        const firstImageElement = imageElements[0];
        const actions = driver.actions({async:true});
        await actions.move({origin: firstImageElement}).perform();
        let addToCartButton = await driver.findElement(By.className('button-buy button button-teal button-small'));
    await addToCartButton.click();
    await driver.sleep(1500);
        let basketCountElement = await driver.findElement(By.className('basket-count'));
        let basketCountText = await basketCountElement.getText();
        let basketCount = parseInt(basketCountText);
        expect(basketCount).toBeGreaterThan(0);
        await driver.quit();
    });



})