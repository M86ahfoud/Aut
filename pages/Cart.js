import { expect } from "@playwright/test";
import datauser from "../fixture/dataUser.json"
import selectore  from "../fixture/selectore.json";
import  selectorproduct from "../fixture/selectorproduct.json";
import selectorCart from "../fixture/Cart/slectorCart.json";
import { faker, Faker } from "@faker-js/faker";
exports.Cart = class Cart {
    constructor(page) {
        this.page = page; 
        this.coockiTextBox1 = page.getByLabel(selectore.Locator.coockiSelect1.locator,
            selectore.Locator.coockiSelect1.option
        );
        this.coockiTextBox2 = page.getByRole(selectore.Locator.coockiSelect2.locator,
            selectore.Locator.coockiSelect2.option);
        this.productButton = page.getByRole(selectorproduct.productbutton.locator,
                selectorproduct.productbutton.options);
        this.product = page.locator(selectorCart.productLocator);
        this.cartButton = page.locator(selectorCart.cartButtonLocator);
        this.viewCartBt = page.getByRole(selectorCart.viewCartBtLocator.locator,
                                        selectorCart.viewCartBtLocator.option
                                                                                );
        this.cartItems =  page.locator(selectorCart.cartProductLocator); 
        this.quantity =  page.locator(selectorCart.quantity);
        this.addToCart = page.getByRole(selectorCart.addToCart.locator, 
                                        selectorCart.addToCart.option) 
        this.randomDigit = 1 
    }

    async goto() {
        await this.page.goto(datauser.url);
        await this.coockiTextBox1.click();
        await this.coockiTextBox2.click(); 
    }
    async checkHompage() {

        await expect(this.page).toHaveTitle(selectorCart.pageTitle);
    }
    async navigateToProductPage() {
        await this.productButton.click();
        await expect(this.page).toHaveURL(/.*products/);
    }
    async addProduct1() {
        await this.product.first().hover();
        await this.cartButton.first().click();
        
    }
    async addProduct2() {
        await this.product.nth(1).hover();
        await this.cartButton.nth(1).click();
        
    }
    async navigateToCartPage() {
        await this.viewCartBt.click();
        await expect(this.page).toHaveURL(/.*view_cart/); 
        
    }
    async verifyProductInCart() {
        await expect(this.cartItems).toHaveCount(2);
    }
     async verifyPriceQuanTot() {
        for (let i = 1; i <= 2; i++) {
            const price = await this.page.locator(`tbody tr:nth-child(${i}) .cart_price`).innerText();
            const quantity = await this.page.locator(`tbody tr:nth-child(${i}) .cart_quantity .disabled`).innerText();
            const total = await this.page.locator(`tbody tr:nth-child(${i}) .cart_total`).innerText();
    
            // Print the details for verification
            console.log(`Product ${i} - Price: ${price}, Quantity: ${quantity}, Total: ${total}`);
    
            // Assertions
            expect(parseFloat(price.replace(/[^\d-]/g, ''))).toBeGreaterThan(0);
            expect(parseInt(quantity, 10)).toBe(1);
            expect(parseFloat(total.replace(/[^\d-]/g, ''))).toBeGreaterThan(0);
        }
     }
     async viewProduct () {
        const countProduct = this.page.locator(selectorCart.productLocator).count();
        const nbrProduct =  parseInt(await countProduct);  
        console.log(nbrProduct);
        this.randomDigit = faker.number.int({min:0, max:nbrProduct-1});
        await this.page.locator(".choose a").nth(this.randomDigit).click();
     }

     async verifyProductDétail() {
        await expect(this.page).toHaveURL(/.*product_details/)
     }

     async IncreaseQuantity() {
        await this.quantity.fill(selectorCart.fillQuantity);
        await this.addToCart.click();
     }

     async viewCartAndVerify() {
        await this.viewCartBt.click();
        
        const quantityReceived = await this.page.locator("tbody tr .cart_quantity .disabled").innerText(); 
    
        expect(parseInt(quantityReceived)).toEqual(parseInt(selectorCart.fillQuantity)); 
     }
}