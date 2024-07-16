import selectore from "../fixture/selectore.json"
import selectortestCase from "../fixture/selectorTestCase.json"
import dataUser from "../fixture/dataUser.json"
import { expect } from "@playwright/test";

exports.testCase = class testCase {

    constructor(page) {
        this.page = page;
        this.coockiTextBox1 = page.getByLabel(selectore.Locator.coockiSelect1.locator,
            selectore.Locator.coockiSelect1.option
        );
        this.coockiTextBox2 = page.getByRole(selectore.Locator.coockiSelect2.locator,
            selectore.Locator.coockiSelect2.option);
        this.textHomepag = page.getByRole(selectore.Locator.textHomepag.locator,
            selectore.Locator.textHomepag.option).first();
        this.testCaseButton = page.getByRole(selectortestCase.buttonTestCase.locator
                                            ,selectortestCase.buttonTestCase.options)
    }
    async goto() {
        await this.page.goto(dataUser.url);
        await this.coockiTextBox1.click();
        await this.coockiTextBox2.click();
    }
    async checkHompage() {
        await this.page.waitForSelector(selectortestCase.textWaitForSelector)
        await expect(this.textHomepag).toBeVisible();
    }
    async accessToTestCasePage() {
        await this.testCaseButton.click(); 
        await expect(this.page).toHaveURL(/.*test_cases/);
    }
    
}