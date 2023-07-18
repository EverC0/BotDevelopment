const puppeteer = require('puppeteer');

const product_url = "https://hyperx.com/products/hyperx-cloud-earbuds?variant=41031690846365";

async function givePage(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    return page;
    //console.log('done) set headless: true
}

async function addToCart(page){
    await page.goto(product_url);
    //await page.waitForNavigation();
    await page.waitForSelector("button[class='button button--primary button--block post-init']");
    await page.click("button[class='button button--primary button--block post-init']", elem => elem.click());


    //await page.waitForNavigation();
    const button = document.querySelector('.button--primary.button--block');
    button.click();

}

async function fillBilling(page){
    await page.waitForTimeout();
    await page. type("input [id-'firstName ']", 'Ritesh');
    await page.waitForTimeout();
    await page. type("input (id-'LastName'f", 'verma'); 
    await page.waitForTimeout();
    await page. type("input [id-'addressLineOne ]", '501 Frederick Road');
    await page.waitForTimeout();
    await page. type(' #phone', '4437645721');
    await page.waitForTimeout();
    await page. type( '#email', 'rvbusiness1magmail.com');
    await page.waitForTimeout();
    const input = await page.$("input [id-'city']");
    await input.click({clickCount: 3});
    await input. type( 'Catonsville');
    await page.waitForTimeout();
    const input2 = await page.$("input [id='postalCode']");
    await input2.click({clickCount: 3});
    await page.waitForTimeout();
    await page. evaluate(() => document.getElementsByClassName('button button -primary') [0].click());
    

}

async function fillPayment (page) {
    await page.waitForTimeout();
    await page. type( '#creditCard', '4024007103939509') ; 
    await page.waitForTimeout();
    await page. type('#cuv', '221');
    await page.waitForTimeout();
    await page. select ('#month-chooser', '02');
    await page.waitForTimeout();
    await page. select ('#year-chooser', '24°'); 
    await page.waitForTimeout();
    await page.click("button [class-'button spin-button button--primary']", elem => elem.click());
}

async function submitOrder (page) {
    await page.waitForTimeout();
    await page.evaluate(() => document.getElementsByClassName()[0].click);
}

async function checkOut(){
    var page = await givePage();
    await addToCart(page);
    await fillBilling(page);
    await fillPayment(page);
    await submitOrder(page);
}

checkOut()