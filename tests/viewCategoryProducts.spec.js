import {test, expect, chromium} from "@playwright/test";
import {homePage} from "../pages/homePage"
import { Category } from "../pages/Category";

test.describe("viewCategroyProduct", async()=> {
    let browser;
    let context;
    let page;
    let homePageInstance;
    let categoryInstance

    test.beforeEach(async()=> {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        homePageInstance = new homePage(page); 
        categoryInstance = new Category(page)
    });

    test.afterEach(async()=> {
        await page.close()
    });

    test("viewCategory", async() => {
        await homePageInstance.goto();
        await homePageInstance.checkHompage();
        // Verify the Category title is visible 
        await expect(page.locator("h2").getByText("Category")).toBeVisible();
        await categoryInstance.navigateToWomenCategory();
        await expect(page).toHaveURL(/.*category/);
        await expect(page).toHaveTitle(/.*Dress/);
        await expect(page.getByText("Women - Dress Products")).toBeVisible();
        await categoryInstance.navigateToMenCategory()
        await expect(page).toHaveURL(/.*category/);
        await expect(page).toHaveTitle(/.*Tshirts/);
    })
})
