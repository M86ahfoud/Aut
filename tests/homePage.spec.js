import { test, expect, chromium } from "@playwright/test";
import {homePage} from "../pages/homePage"

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
        homePageInstance = new homePage(page) 
    })
    // test.afterAll(async() => {
    // await browser.close()
    // })

    test( "verfiy", async () =>{
        
        await homePageInstance.goto();
        await homePageInstance.checkHompage();
        await homePageInstance.vérifyText()
        await homePageInstance.fillInput()
        await homePageInstance.verifySuccesMessage()
    
    } )
})


