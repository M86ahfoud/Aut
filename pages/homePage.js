import { expect, test } from "@playwright/test";
import selectore from "../fixture/selectore.json";
import dataUser from "../fixture/dataUser.json";
import selectoreHomePage from "../fixture/selectorHomePage.json"
import { faker } from "@faker-js/faker";

exports.homePage = class homePage {

constructor(page) {
    this.page = page
    this.coockiTextBox1 = page.getByLabel(selectore.Locator.coockiSelect1.locator,
        selectore.Locator.coockiSelect1.option
    );
    this.coockiTextBox2 = page.getByRole(selectore.Locator.coockiSelect2.locator,
        selectore.Locator.coockiSelect2.option);
   
    this.subscription = page.getByRole(selectoreHomePage.subscruption.locator, 
                                        selectoreHomePage.subscruption.Options),
    this.textsubscru = page.getByText(selectoreHomePage.TextSubscription),
    this.email = page.getByPlaceholder(selectoreHomePage.emailAddress),
    this.button = page.getByRole(selectoreHomePage.button.locator, 
                                selectoreHomePage.button.Options),
    this.succesMessage = page.getByText(selectoreHomePage.succesMessage)
    
}

async goto() {
    await this.page.goto(dataUser.url);
    await this.coockiTextBox1.click();
    await this.coockiTextBox2.click();
}
async checkHompage() {
    await expect(this.page).toHaveTitle("Automation Exercise");
}
async vérifyText() {
     await this.textsubscru.scrollIntoViewIfNeeded()
     await expect(this.subscription).toBeVisible();
}
async fillInput() {
    await this.email.fill(faker.internet.email());
    await this.button.click()

}

async verifySuccesMessage() {

    await this.page.waitForSelector("text=You have been successfully")
    await expect(this.succesMessage).toBeVisible()

}


}