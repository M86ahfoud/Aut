import { test, expect } from "@playwright/test";
import { faker, Faker } from "@faker-js/faker";
import { request } from "http";

test("Register while Checkout", async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    // await page.pause();
    await page.getByLabel('Manage options').click();
    await page.getByRole('button', { name: 'Confirm choices' }).click();
    // await page.pause()
    await page.locator(".product-image-wrapper").first().hover();
    await page.locator(".overlay-content > .btn").first().click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    await page.getByPlaceholder('Name').click();
    await page.getByPlaceholder('Name').fill('Lamine');
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(faker.internet.email());
    await page.getByRole('button', { name: 'Signup' }).click();
    await page.getByLabel('Mr.').check();
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill(faker.internet.password());
    await page.locator('#months').selectOption('5');
    await page.locator('#years').selectOption('2004');
    await page.getByLabel('First name *').click();
    await page.getByLabel('First name *').fill('almani');
    await page.getByLabel('Last name *').click();
    await page.getByLabel('Last name *').fill('karimo');
    await page.getByLabel('Company', { exact: true }).click();
    await page.getByLabel('Company', { exact: true }).fill('ouftille');
    await page.getByLabel('Address * (Street address, P.').click();
    await page.getByLabel('Address * (Street address, P.').fill('01 street carrfour');
    await page.getByLabel('Country *').selectOption('Canada');
    await page.getByLabel('State *').click();
    await page.getByLabel('State *').fill('alméria');
    await page.getByLabel('City *').click();
    await page.getByLabel('City *').fill('iatanboul');
    await page.locator('#zipcode').click();
    await page.locator('#zipcode').fill('560023');
    await page.getByLabel('Mobile Number *').click();
    await page.getByLabel('Mobile Number *').fill('00214589762');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.getByRole('link', { name: 'Continue' }).click();
    await page.getByRole('link', { name: ' Cart' }).click();
    await page.getByText('Proceed To Checkout').click();
    await page.locator('textarea[name="message"]').click();
    await page.locator('textarea[name="message"]').fill('I\'m in the statut of my country if you have any question please call me ');
    await page.getByRole('link', { name: 'Place Order' }).click();
    await page.locator('input[name="name_on_card"]').click();
    await page.locator('input[name="name_on_card"]').fill('Lamine');
    await page.locator('input[name="card_number"]').click();
    await page.locator('input[name="card_number"]').fill('45892569784123');
    await page.getByPlaceholder('ex.').click();
    await page.getByPlaceholder('ex.').fill('624');
    await page.getByPlaceholder('MM').click();
    await page.getByPlaceholder('MM').fill('12/11');
    await page.getByPlaceholder('YYYY').click();
    await page.getByPlaceholder('YYYY').fill('2027');
    //Intercepter la navigation 
    await page.route('**/*', (route, request) => {
        if(request.url() === 'https://automationexercise.com/payment_done/0') {
            // Bloquer temporairemen la navigation 
            route.abort();
        } else {
            route.continue();
            
        }
    })
    
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    // const succesMessage =  page.locator('text="Your order has been placed successfully!"');
    // locator("#payment-form .alert-success.alert");
    // locator('text="Your order has been placed successfully!"');
    // await page.waitForSelector('text="Your order has been placed successfully!"');
    await page.waitForTimeout(20000);
    // await expect(succesMessage).toBeVisible();
    // await page.screenshot({ path: 'before-redirect.png' })
    await page.route('**/*', route => route.continue());
    // await page.pause(); 
    await page.getByText('Congratulations! Your order').click();
    await page.getByRole('link', { name: ' Delete Account' }).click();
    await page.getByText('Your account has been').click();
    await page.getByRole('link', { name: 'Continue' }).click();
})