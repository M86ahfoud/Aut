exports.Category = class Category {

    constructor(page) {
        this.page = page
    }

    async navigateToWomenCategory() {
        await this.page.getByRole('link', { name: ' Women' }).click();
        await this.page.getByRole('link', { name: 'Dress' }).click();
    }
    async navigateToMenCategory() {
        await this.page.getByRole('link', { name: ' Men' }).click();
        await this.page.getByRole('link', { name: 'Tshirts' }).click();
    }
}