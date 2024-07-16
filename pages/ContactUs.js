import selectoreContact from "../fixture/selectoreContact.json"
const path = require('path');
import selectore from "../fixture/selectore.json"
import dataUser from "../fixture/dataUser.json"
import { expect } from "@playwright/test";


exports.ContactUsPage = class ContactUsPage {
    constructor(page) {
        this.page = page;
        this.coockiTextBox1 = page.getByLabel(selectore.Locator.coockiSelect1.locator,
            selectore.Locator.coockiSelect1.option
        );
        this.coockiTextBox2 = page.getByRole(selectore.Locator.coockiSelect2.locator,
            selectore.Locator.coockiSelect2.option);

        this.contactUsButton = page.getByRole(selectoreContact.contactUsButton.locator,
            selectoreContact.contactUsButton.options
        );
        this.getInTouche = page.getByRole(selectoreContact.getInTouche.locator,
            selectoreContact.getInTouche.options
        );
        this.name = page.getByPlaceholder(selectoreContact.name);
        this.email = page.getByPlaceholder(selectoreContact.email.locator,
            selectoreContact.email.options
        );
        this.subject = page.getByPlaceholder(selectoreContact.subject);
        this.message = page.getByPlaceholder(selectoreContact.message);

        this.submit = page.getByRole(selectoreContact.submitButton.locatore,
            selectoreContact.submitButton.options
        );
        this.successMessage = page.locator(selectoreContact.successMessage.locatorsuccessmessage)
            .getByText(selectoreContact.successMessage.textSuccessMessage);
        this.homePageButton = page.getByRole(selectoreContact.homePageButton.locator,
            selectoreContact.homePageButton.options);
        this.textHomepag = page.getByRole(selectore.Locator.textHomepag.locator,
            selectore.Locator.textHomepag.option
        );
    }
    async goto() {
        await this.page.goto(dataUser.url);
        await this.coockiTextBox1.click();
        await this.coockiTextBox2.click();
    }
    async clickContactUsButton() {
        await this.contactUsButton.click();
        await expect(this.getInTouche).toBeVisible()
    }
    async fillContactForm(name, email, subject, message) {
        await this.name.fill(name)
        await this.email.fill(email)
        await this.subject.fill(subject)
        await this.message.fill(message);
        if(selectoreContact.filPathe) {
            await this.page.setInputFiles(selectoreContact.uploadInput, 
                           path.resolve(__dirname, selectoreContact.filPathe))
        }
    }
    async submitForm() {
        this.page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
        await this.submit.click();
    }

    async checkSuccessMessage() {
        await this.page.waitForSelector(selectoreContact.successMessage.locatorsuccessmessage,
                                        ':has-text',selectoreContact.successMessage.textSuccessMessage)
        await expect(this.successMessage).toBeVisible();
    }
    async returnHomPage() {
        await this.homePageButton.click()
    }
    async checkHompage() {
        await expect(this.textHomepag).toBeVisible();
    }
    

}