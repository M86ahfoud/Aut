import dataUser from "../fixture/dataUser.json"
import { expect } from "@playwright/test";
import selectorproduct from "../fixture/selectorproduct.json"
import  selectore  from "../fixture/selectore.json";
import selectortestCase from "../fixture/selectorTestCase.json";
import dataProduct from "../fixture/dataProduct.json"

exports.Product = class Product {
    constructor(page) {
        this.page = page;
        this.coockiTextBox1 = page.getByLabel(selectore.Locator.coockiSelect1.locator,
            selectore.Locator.coockiSelect1.option
        );
        this.coockiTextBox2 = page.getByRole(selectore.Locator.coockiSelect2.locator,
            selectore.Locator.coockiSelect2.option);
        this.textHomepag = page.getByRole(selectore.Locator.textHomepag.locator,
            selectore.Locator.textHomepag.option).first();
        this.productButton = page.getByRole(selectorproduct.productbutton.locator,
                                            selectorproduct.productbutton.options
        )
        this.allProducts = page.getByRole(selectorproduct.allProducts.locator,
                                     selectorproduct.allProducts.options);
        this.products = page.locator(selectorproduct.products);
        this.firstProduct = page.locator(selectorproduct.firstProduct).first();
        this.name = page.getByRole(selectorproduct.nameProduct.locator,
                                   selectorproduct.nameProduct.options),
        this.category = page.getByText(selectorproduct.ProductCategory),
        this.price = page.getByText(/Rs\. 500/);
        this.quantity = page.locator(selectorproduct.quantity);
        this.availability = page.getByText(selectorproduct.availability);
        this.condition = page.getByText(selectorproduct.condition);
        this.brand = page.getByText(selectorproduct.brand);

        this.searchProduct = page.getByPlaceholder(selectorproduct.SearchProduct);
        this.searchButton = page.getByRole(selectorproduct.searchButton.locator,
                                            selectorproduct.searchButton.options);
        this.searchProductTitle = page.getByRole(selectorproduct.searchProductTitle.locator
                                                ,selectorproduct.searchProductTitle.options); 
        
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
    async navigateToProductPage() {
        await this.productButton.click();
        await expect(this.page).toHaveURL(/.*products/);
        await this.page.waitForSelector(selectorproduct.textWaitForSelector);
        await expect(this.allProducts).toBeVisible();
        
    }
    
    async visibleListProduct() {

        await this.page.waitForSelector(selectorproduct.products);
        const productCount  = await this.products.count();
        
        expect(productCount).toBeGreaterThan(0);
        for(let i=0; i < productCount; i++) {
            await expect(this.products.nth(i)).toBeVisible()
        } 

    }
    async showDetailOfFirstProduct() {
        await this.firstProduct.click();
        await expect(this.page).toHaveURL(/.*1/)
    }

    async detailVisibility() {
        await this.page.waitForSelector(selectorproduct.productInformation);
        await expect (this.name).toBeVisible()
        await expect (this.category).toBeVisible()
        await expect (this.price).toBeVisible()
        await expect (this.quantity).toBeVisible()
        await expect (this.availability).toBeVisible()
        await expect (this.condition).toBeVisible()
        await expect (this.brand).toBeVisible()
    }
    async vérifyQuantity() {
        const inputValue = await this.quantity.getAttribute('value');
        expect(inputValue).toBe('1')
    }

    async searchForProduct() {
        await this.searchProduct.fill(dataProduct.productName);
        await this.searchButton.click()

    }
    async verifyProductResult() {
        await this.page.waitForSelector('h2:has-text("Searched Products")')
        await expect(this.searchProductTitle).toBeVisible();
        const productTitles = await this.page.locator(selectorproduct.locatorResultProduct).allTextContents()

        if(productTitles) {
            productTitles.forEach(title => {
                expect(title.toLowerCase()).toContain(dataProduct.productName.toLowerCase()).toBeVisible();
            })

        }else {
            
        }
    }

}