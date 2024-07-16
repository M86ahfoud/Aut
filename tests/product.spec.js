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
        await productInstance.goto();
        await productInstance.checkHompage();
        await productInstance.navigateToProductPage();
        await productInstance.visibleListProduct();
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