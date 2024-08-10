import { chromium, expect, test } from "@playwright/test";
import {Cart} from "../pages/Cart";
import selectorCart from "../fixture/Cart/slectorCart.json";
test.describe("Add Products in Cart", async()=> {
  test.describe.configure({mode: 'serial'})
  let browser; 
  let context;
  let page;
  let CartInstance
 
  test.beforeEach(async()=> {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    CartInstance = new Cart(page); 
    await CartInstance.goto(); 
    await CartInstance.checkHompage()
    await CartInstance.navigateToProductPage();
  });
  test.afterEach(async()=>{
    await browser.close();
  })

  test("Add product to cart", async()=> {
    await CartInstance.addProduct1();
    
    await page.click(selectorCart.buttonContinueShooping);
    await CartInstance.addProduct2();
    await CartInstance.navigateToCartPage();
    await CartInstance.verifyProductInCart();
    await CartInstance.verifyPriceQuanTot();   
  });

  test.only("Verify Product quantity  in cart", async()=> {
    await CartInstance.viewProduct (); 
    await CartInstance.verifyProductDétail();
    await CartInstance.IncreaseQuantity();
    await CartInstance.viewCartAndVerify()
  })
})