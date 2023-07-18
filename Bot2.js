const puppeteer = require('puppeteer');
const Tesseract = require('tesseract.js');

const product_url = "https://www.newbalance.com/pd/2002r/M2002RV1-42829.html";
const captcha_selector = "img[alt='captcha image']";
const captcha_input_selector = "input[id='captcha']";

async function givePage(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    return page;
}

async function addToCart(page){
    await page.goto(product_url);
    await page.waitForSelector("button[class='mr-2 mr-lg-3 mb-2 mb-lg-3 variation-attribute  size-attribute carouseldk-false nb-button btn-lg ']");
    await page.click("button[class='mr-2 mr-lg-3 mb-2 mb-lg-3 variation-attribute  size-attribute carouseldk-false nb-button btn-lg ']", elem => elem.click());

    await page.waitForNavigation();
}

async function solveCaptcha(page) {
    const captcha_element = await page.$(captcha_selector);
    const captcha_image = await captcha_element.screenshot({ encoding: "base64" });

    const result = await Tesseract.recognize(Buffer.from(captcha_image, 'base64'), {
        lang: 'eng',
        tessedit_char_whitelist: '0123456789'
    });

    const captcha_input = await page.$(captcha_input_selector);
    await captcha_input.type(result.text.trim());
}

async function fillBilling(page){
    await page.waitForTimeout();
    await page.type("input [id-'firstName ']", 'Ritesh');
    await page.waitForTimeout();
    await page.type("input [id-'LastName']", 'verma'); 
    await page.waitForTimeout();
    await page.type("input [id-'addressLineOne']", '501 Frederick Road');
    await page.waitForTimeout();
    await page.type('#phone', '4437645721');
    await page.waitForTimeout();
    await page.type('#email', 'rvbusiness1magmail.com');
    await page.waitForTimeout();
    const input = await page.$("input [id-'city']");
    await input.click({clickCount: 3});
    await input.type('Catonsville');
    await page.waitForTimeout();
    const input2 = await page.$("input [id='postalCode']");
    await input2.click({clickCount: 3});
    await page.waitForTimeout();
    await page.evaluate(() => document.getElementsByClassName('button button -primary')[0].click());
}

async function fillPayment (page) {
    await page.waitForTimeout();
    await page.type('#creditCard', '4024007103939509'); 
    await page.waitForTimeout();
    await page.type('#cuv', '221');
    await page.waitForTimeout();
    await page.select('#month-chooser', '02');
    await page.waitForTimeout();
    await page.select('#year-chooser', '24°'); 
    await page.waitForTimeout();
    await page.click("button [class-'button spin-button button--primary']", elem => elem.click());
}

async function submitOrder (page) {
    await page.waitForTimeout();
    await page.evaluate(() => document.getElementsByClassName()[0].click());
}

async function checkOut(){
    var page = await givePage();
    await addToCart(page);
    await solveCaptcha(page);
    await fillBilling(page);
    await fillPayment(page);
    await submitOrder(page);
}

checkOut();