import { test, expect, chromium } from "@playwright/test"
import { Product } from "../pages/Product"

test.describe('test produt list', async () => {
    let browser;
    let context;
    let page;
    let productInstance

    test.beforeAll(async () => {
        browser = await chromium.launch();
    })

    test.beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
        productInstance = new Product(page)
    })

    test('test navigate to product list', async () => {
        // Navigate to the home page 
        await productInstance.goto();
        // Verify that home page is visible successful
        await productInstance.checkHompage();
        // Click on "Products button" and navigate to the product page
        await productInstance.navigateToProductPage();
        // Verify that list of products is visible  
        await productInstance.visibleListProduct();
        // Check the visibilité the detail of first product
        await productInstance.showDetailOfFirstProduct();
        await productInstance.detailVisibility();
        await productInstance.vérifyQuantity();
    })
    test('search product', async() => {
        await productInstance.goto();
        await productInstance.checkHompage();
        await productInstance.navigateToProductPage();
        await productInstance.searchForProduct();
        await productInstance.verifyProductResult();
    })


})