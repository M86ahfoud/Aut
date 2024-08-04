import { test, expect, chromium } from "@playwright/test";
import {homePage} from "../pages/homePage";
import { faker } from "@faker-js/faker";

test.describe('Verify Subscription in home page', async() => {
    let browser;
    let context;
    let page;
    let homePageInstance 

    test.beforeAll(async()=> {
        browser = await chromium.launch();
    })
    
    test.beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
        homePageInstance = new homePage(page);
        await homePageInstance.goto();
        await homePageInstance.checkHompage(); 
    })
    test.afterEach(async() => {
    await browser.close()
    })

    test( "verfiy", async () =>{
       
        await homePageInstance.vérifyText()
        await homePageInstance.fillInput()
        await homePageInstance.verifySuccesMessage()
    } )
    
    test("verfify subscruption in cart", async() => {
        await homePageInstance.buttonCardAcces(); 
        await page.waitForNavigation({url:'https://automationexercise.com/view_cart'});
        await homePageInstance.vérifyText()
        await homePageInstance.fillInput()
        await homePageInstance.verifySuccesMessage()
        

    })
})


