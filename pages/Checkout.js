import { expect, test } from "@playwright/test";
import selectorproduct from "../fixture/selectorproduct.json";
import selectorCart from "../fixture/Cart/slectorCart.json";
import dataUser from "../fixture/dataUser.json";
import selectorCheckout from "../fixture/Checkout/selectorCheckout.json";
import { faker, Faker } from "@faker-js/faker";
exports.Checkout = class Checkout {
    constructor(page) {

        this.page = page;
        this.productButton = page.getByRole(selectorproduct.productbutton.locator,
            selectorproduct.productbutton.options);
        this.product = page.locator(selectorCart.productLocator);
        this.cartButton = page.locator(selectorCart.cartButtonLocator);

        this.cartProducts = page.textContent(selectorCart.cartProductLocator);

        this.nameInput = page.locator(selectorCheckout.nameInput),
        this.card_numberInput = page.locator(selectorCheckout.card_numberInput),
        this.Code = page.getByPlaceholder(selectorCheckout.Code),
        this.expirationDate = page.getByPlaceholder(selectorCheckout.expirationDate),
        this.expirationYears = page.getByPlaceholder(selectorCheckout.expirationYears),
        this.payementButton = page.getByRole(selectorCheckout.payementButton.locator,
                selectorCheckout.payementButton.option),
        this.infoProduct = page.locator(selectorCheckout.infoProfuctLocator),
        this.description = []
        this.randomDigit = 0

    }

    async addProduct() {
        const countProduct = this.page.locator(selectorproduct.itemProductLocator).count();
        const nbrProduct = parseInt(await countProduct);
        console.log(nbrProduct);

        for (let i = 0; i <= 2; i++) {
            this.randomDigit = faker.number.int({ min: 0, max: nbrProduct - 1 })

            await this.product.nth(this.randomDigit).hover();
            await this.cartButton.nth(this.randomDigit).click();
            this.description.push(await this.infoProduct.nth(this.randomDigit).innerText());
            console.log(this.description[i])

            if (i < 2) {

                await this.page.click(selectorCart.buttonContinueShooping);
            }

        }
        console.log(this.description.length)
    };



    async VerifyAdressDetails() {
        const country = await this.page.locator('#address_delivery .address_country_name').innerText();
        const adress = await this.page.locator('#address_delivery .address_address2').nth(1).innerText();
        const postCode = await this.page.locator('#address_delivery .address_postcode').innerText();
        const phone = await this.page.locator('#address_delivery .address_phone').innerText();
        const lastName = await this.page.locator('#address_delivery .address_lastname').innerText();

        expect(lastName).toEqual("Mr. " + dataUser.user.firstName + " " + dataUser.user.lastName);
        expect(adress).toEqual(dataUser.user.streetAdress);
        expect(postCode).toEqual(dataUser.user.city + " " + dataUser.user.stat + " " + dataUser.user.zipcode);
        expect(country).toEqual(dataUser.user.country);
        expect(phone).toEqual(dataUser.user.phone);

    };
    async ReviewOrderProducts() {
        for (let i = 0; i < this.description.length; i++) {

            expect(await this.page.locator("tbody").innerText()).toContain(this.description[i])
        }
    }
    async verifyPriceQuantityTotal() {
        const countProduct = await this.page.locator(selectorCart.cartProductLocator).count()
        let Totalg = 0;
        const TotalAmount = await this.page.locator(".cart_total_price").last().innerText();
        for (let i = 1; i <= countProduct; i++) {
            const price = await this.page.locator(`tbody tr:nth-child(${i}) .cart_price`).innerText();
            const quantity = await this.page.locator(`tbody tr:nth-child(${i}) .cart_quantity .disabled`).innerText();
            const total = await this.page.locator(`tbody tr:nth-child(${i}) .cart_total`).innerText();

            // Print the details for verification
            console.log(`Product ${i} - Price: ${price}, Quantity: ${quantity}, Total: ${total}`);

            // Assertions
            expect(parseFloat(price.replace(/[^\d-]/g, ''))).toBeGreaterThan(0);
            expect(parseInt(quantity, 10)).toBeGreaterThan(0);
            expect(parseFloat(total.replace(/[^\d-]/g, ''))).toBeGreaterThan(0);

            expect(parseFloat(price.replace(/[^\d-]/g, '')) * parseInt(quantity, 10)).toEqual(parseFloat(total.replace(/[^\d-]/g, '')));

            Totalg += parseFloat(total.replace(/[^\d-]/g, ''));
            // print for verification
            console.log(parseInt(quantity, 10));
            console.log(parseFloat(price.replace(/[^\d-]/g, '')));
            console.log(parseFloat(total.replace(/[^\d-]/g, '')));
        }
        console.log(`Totalg:${Totalg}`);
        console.log(`TotalAmount:${parseFloat(TotalAmount.replace(/[^\d-]/g, ''))}`);
        expect(Totalg).toEqual(parseFloat(TotalAmount.replace(/[^\d-]/g, '')));
    }
    async commentTextArea() {
        await this.page.locator('textarea[name="message"]').fill('I\'m in the statut of my country if you have any question please call me ');
        await this.page.getByRole('link', { name: 'Place Order' }).click();
    }
    async paymentDetails(nameInput, card_numberInput, CVC,
        expirationDate, expirationYears) {
        await this.nameInput.fill(nameInput);
        await this.card_numberInput.fill(card_numberInput);
        await this.Code.fill(CVC);
        await this.expirationDate.fill(expirationDate);
        await this.expirationYears.fill(expirationYears);
        await this.payementButton.click();
    }

}