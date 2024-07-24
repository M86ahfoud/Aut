import selectore from "../fixture/selectore.json";
import { expect } from "@playwright/test";
import dataUser from "../fixture/dataUser.json"


exports.Register = class Register {

    constructor(page) {
        this.page = page
        this.coockiTextBox1 = page.getByLabel(selectore.Locator.coockiSelect1.locator, 
                                              selectore.Locator.coockiSelect1.option
        );
        this.coockiTextBox2 = page.getByRole(selectore.Locator.coockiSelect2.locator, 
                                             selectore.Locator.coockiSelect2.option);
        this.textHomepag = page.getByRole(selectore.Locator.textHomepag.locator,
            selectore.Locator.textHomepag.option
        );

        this.buttonSignUpLogin = page.getByRole(selectore.Locator.buttonSignUpLogin.locator,
            selectore.Locator.buttonSignUpLogin.option
        );
        this.textNewUser = page.getByRole(selectore.Locator.textNewUser.locator,
            selectore.Locator.textNewUser.option
        );
        this.name = page.getByPlaceholder(selectore.Locator.name);
        this.email = page.locator(selectore.Locator.email);
        this.button = page.getByRole(selectore.Locator.button.locator,
            selectore.Locator.button.option
        );
        this.textAccount = page.getByText(selectore.Locator.textAccount);
        this.checkButton = page.locator(selectore.Locator.civility);
        this.password = page.getByLabel(selectore.Locator.password);
        this.dayBirth = page.locator(selectore.Locator.dayBirth);
        this.month = page.locator(selectore.Locator.monthBirth);
        this.yearBirth = page.locator(selectore.Locator.yearBirth);
        this.checkNews = page.getByLabel(selectore.Locator.newsLettre);
        this.firstName = page.getByLabel(selectore.Locator.firstName);
        this.lastName = page.getByLabel(selectore.Locator.lastName);
        this.adress = page.getByLabel(selectore.Locator.streetAdress);
        this.country = page.getByLabel(selectore.Locator.country);
        this.stat = page.getByLabel(selectore.Locator.stat);
        this.city = page.getByLabel(selectore.Locator.city);
        this.zipCode = page.locator(selectore.Locator.zip);
        this.phone = page.getByLabel(selectore.Locator.phone);
        this.accountCreat = page.getByRole(selectore.Locator.buttonCreat.locator,
            selectore.Locator.buttonCreat.option);
        this.checkCreatAccount = page.getByText(selectore.Locator.checkCreat);
        this.buttonContinue = page.getByRole(selectore.Locator.buttonConti.locator,
            selectore.Locator.buttonConti.option
        );
        this.logedIn = page.getByText(selectore.Locator.loggedIn);
        this.deletButton = page.getByRole(selectore.Locator.deletButton.locator,
            selectore.Locator.deletButton.option
        );
        this.checkdeletAccount = page.getByText(selectore.Locator.deletAccount)

    }
    async goto() {
        await this.page.goto(dataUser.url)
        // await this.page.pause();
        // await this.page.waitForSelector('label:has-text("Manage options")')
        await this.coockiTextBox1.click();
        await this.coockiTextBox2.click();
    }
    async checkHompage() {
        await expect(this.textHomepag).toBeVisible();
    }
    async navigateToLoginPage() {
        await this.buttonSignUpLogin.click();
    }
    async sign(name, email) {
        await expect(this.textNewUser).toBeVisible();
        await this.name.fill(name);
        await this.email.fill(email);
        await this.button.click();
    }
    async create(
        password, dayBirth, monthBirth, year, firstName,
        lastName, adress, country, stat, city, zipcode,
        phone, name
    ) {
        await expect(this.textAccount).toBeVisible();
        await this.checkButton.check();
        await this.password.fill(password);
        await this.dayBirth.selectOption(`${dayBirth}`);
        await this.month.selectOption(`${monthBirth}`);
        await this.yearBirth.selectOption(`${year}`);
        await this.checkNews.check();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.adress.fill(adress);
        await this.country.selectOption(`${country}`);
        await this.stat.fill(stat);
        await this.city.fill(city);
        await this.zipCode.fill(zipcode);
        await this.phone.fill(phone);
        await this.accountCreat.click();
        await expect(this.checkCreatAccount).toBeVisible();
        await this.buttonContinue.click();
        await expect(this.logedIn).toContainText(name);
        await expect(this.logedIn).toBeVisible();
    }
    async delete() {
        await this.deletButton.click();
        await expect(this.checkdeletAccount).toBeVisible()
    }
}