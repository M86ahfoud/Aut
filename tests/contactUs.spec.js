import { test, expect, chromium } from "@playwright/test"
import { ContactUsPage } from "../pages/ContactUs"
import dataUser from "../fixture/dataUser.json"
import dataContactForm from "../fixture/dataContactForm.json"
const path = require('path')

test.describe('contact US form', async() => {
    let browser;
    let context;
    let page;
    let contactUsInstance;

    test.beforeAll(async() => {
        browser = await chromium.launch();
    });
    test.beforeEach(async() => {
        context = await browser.newContext();
        page = await context.newPage();
        contactUsInstance = new ContactUsPage(page);
        await contactUsInstance.goto();
        await contactUsInstance.clickContactUsButton();
    });

    test.afterEach(async() => {
        await page.close();
        await context.close()
    });

    test.afterAll(async () => {
        await browser.close()
    });

    test('Contact Us From', async () => {
    
        await contactUsInstance.fillContactForm(
            dataUser.user.name,
            dataUser.user.email,
            dataContactForm.subject,
            dataContactForm.message
        )
        await contactUsInstance.submitForm();
        await contactUsInstance.checkSuccessMessage();
    
        await contactUsInstance.returnHomPage();
       
        await contactUsInstance.checkHompage()
    
    });

})    

