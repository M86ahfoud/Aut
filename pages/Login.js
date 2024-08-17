import selectore from "../fixture/selectore.json";
import { expect } from "@playwright/test";

exports.Login = class Login {

    constructor(page) {

        this.checkPageLogin = page.getByRole(selectore.Locator.checkPageLogin.locator,
            selectore.Locator.checkPageLogin.option),
            this.emailLogin = page.locator(selectore.Locator.emailLogin),
            this.passwordLogin = page.getByPlaceholder(selectore.Locator.passwordLogin),
            this.buttonLogin = page.getByRole(selectore.Locator.buttonLogin.locator,
                selectore.Locator.buttonLogin.option
            ),
            this.ButtonLogout = page.getByRole(selectore.Locator.buttonLogout.locator,
                selectore.Locator.buttonLogout.option
            ),
            this.messageLoginIncorrect = page.getByText(selectore.messgeLoginIncorrect);
            this.logedIn = page.getByText(selectore.Locator.loggedIn);
    }

    async login(email, password, name) {

        await expect(this.checkPageLogin).toBeVisible();
        await this.emailLogin.fill(email);
        await this.passwordLogin.fill(password);
        await this.buttonLogin.click();
        await expect(this.logedIn).toContainText(name);
        await expect(this.logedIn).toBeVisible();
    }
    async logout() {
        await this.ButtonLogout.click();
        await expect(this.checkPageLogin).toBeVisible();
    }
    async checkLogin() {
        await expect(this.messageLoginIncorrect).toBeVisible()
    }

}